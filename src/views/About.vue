<template>
  <div style="margin-left: 170px; padding-top:-15px; padding-right: 20px">
    <v-app>
      <v-main class="container px-1">
        <h2 class="font-weight-light mb-2" style="padding-top: 30px">
          Tableau mission
        </h2>
        <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-card>
          <v-data-table
              :headers="headers"
              :items="items"
              mobile-breakpoint="800"
              class="elevation-0"
              @click:row="handleClick"
              :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <div class="text-truncate">
                <v-icon
                    small
                    class="mr-2"
                    @click="showEditDialog(item)"
                    color="primary"
                >
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)" color="pink">
                  mdi-delete
                </v-icon>
              </div>
            </template>
            <template v-slot:item.operateur="{ item }" >
              <div class="text-truncate"  style="width: 180px" >
                {{ item.mission }}
              </div>
            </template>
          </v-data-table>
          <!-- this dialog is used for both create and update -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <div class="d-flex">
                <v-btn color="primary" dark class="ml-auto ma-3" v-on="on">
                  New
                  <v-icon small>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span v-if="editedItem.id">Edit {{ editedItem.id }}</span>
                <span v-else>Create</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.date_declanche"
                        label="Nom"
                    ></v-text-field>
                  </v-col>                 
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="showEditDialog()"
                >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
                >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
const apiToken = localStorage.getItem('token');

export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id", width: "100" },
        { text: "Nom", value: "full_name", width: "200" },
        { text: "Action", value: "actions", sortable: false },

      ],
      items: [],
      dialog: false,
      editedItem: {},
      search: '',

    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    handleClick(value) {
      console.log(value.id);
    },

    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    loadItems() {
      this.items = [];
      axios
          .get(`http://139.99.238.74:8000/api/1/datepointage/show_operateur`, {
            headers: { Authorization: "Bearer " + apiToken }
          })
          .then(response => {
            this.items = response.data.operateur.map(item => {
              return {
                id: item.id,
                ...item
              };
            });
          })
          .catch(error => {
            console.log(error);
          });
    },
    saveItem(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */

      let method = "post";
      let url = `http://139.99.238.74:8000/api/Missions`;
      const id = item.id;

      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item
      };

      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url = `http://139.99.238.74:8000/api/Missions/${id}`;

        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }

      // save the record
      console.log(data.fields);
      axios[method](url, data.fields, {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.data && response.data.id) {
          console.log(response.data);
          // add new item to state
          this.editedItem.id = response.data.id;
          if (!id) {
            this.items.push(this.editedItem);
          }
          this.editedItem = {};
        }
        this.dialog = !this.dialog;
      })
          .catch(error=>{
            console.log(error)
            console.log(error.response.data);
            console.log(error.response.status);
          })
    },
    deleteItem(item) {
      const id = item.id;
      const idx = this.items.findIndex(item => item.id === id);
      if (confirm("Are you sure you want to delete this?")) {

        axios.delete(`http://139.99.238.74:8000/api/Missions/${id}`,
            { headers: {
                Authorization: "Bearer " + apiToken,
                "Content-Type": "application/json"
              }
            }).then((response) => {
          this.items.splice(idx, 1)
        })
        this.items.splice(idx, 1);
      }
    }
  }
};
</script>
<style lang="css" scoped>
.row-pointer:hover {
  cursor: pointer;
}
