script<template>

  <div v-bind:style="[drawer ? {'margin-left':'100px'} : {'margin-left': '10px'}]" >
    <v-app>
      <v-main class="container px-1">
        <h2 class="font-weight-light mb-2" style="padding-top: 30px">
          Tableau mission
        </h2>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <download-excel
            class="btn btn-default"
            :data="items"
            worksheet="My Worksheet"
            type="csv"
            name="Rapport.xls">
          Download Data
        </download-excel>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="filteredDesserts"
             mobile-breakpoint="800"
            class="elevation-0"
            :search="search"
              show-select
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
          >
              <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
         
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
            <template v-slot:item.operations="{ item }">

              <div class="text-truncate">
                <v-btn rounded outlined text @click="sendtop(item.id)"> Operations </v-btn>
              </div>
            </template>
            
            <template v-slot:item.mission="{ item }">
              <div class="text-truncate" style="width: 180px">
                {{ item.mission }}
              </div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  More info about {{ item.mission }}
                  <Operation></Operation>
                </td>
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
                      label="Date declanche"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-text-field
                      v-model="editedItem.date_end"
                      label="Date Fin"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.qt_totale_article"
                      label="qt totale article"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="editedItem.nbr_operateur"
                      label="Nbr Operateur"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="editedItem.jours_qte"
                      label="jours Qte"
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
import Operation from '../views/Operations.vue';
//const apiToken = localStorage.getItem('token');

const apiToken = "";
/* eslint-disable @typescript-eslint/camelcase */

export default {
  components:{
    Operation
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id", width: "50" },
        { text: "Description", value: "description", width: "200", sortable: true },
        { text: "Date declanche", value: "date_declanche", width: "200" , sortable: true},
        { text: "date end", value: "date_end", width: "200", sortable: true },
        { text: "Qt totale Article", value: "qt_totale_article", width: "70", sortable: true },
        { text: "Nbr operateur", value: "nbr_operateur", width: "70", sortable: true },
        { text: "Action", value: "actions", sortable: true,width:"100" },
        { text: "Check operations", value: "operations", width: "100" },
      ],
       expanded: [],
        singleExpand: false,
      items: [],
      dialog: false,
      editedItem: {},
      search: "",
      selected: [],
      	filters: {
        date_declanche: [],
				date_end: [],
			},
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    sendtop(id) {
      this.$router.push("/operations/" + id);
    },
    handleClick(value) {
      console.log(value.id);
    },

    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    loadItems() {
      this.items = [];
      const apiToken = this.$store.getters.getToken;
      axios
        .get(`http://139.99.238.74:8000/api/Missions`, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.items = response.data.missions.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
        })
        .catch((error) => {
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
        fields: item,
      };

      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url = `http://139.99.238.74:8000/api/Missions/${id}`;

        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }
      const apiToken = this.$store.getters.getToken;

      // save the record
      console.log(data.fields);
      axios[method](url, data.fields, {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data && response.data.id) {
            // add new item to state
            this.editedItem.id = response.data.id;
            if (!id) {
              this.items.push(this.editedItem);
            }
            this.editedItem = {};
          }
          this.dialog = !this.dialog;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    deleteItem(item) {
            const apiToken = this.$store.getters.getToken;
      const id = item.id;
      const idx = this.items.findIndex((item) => item.id === id);
      if (confirm("Are you sure you want to delete this?")) {
        axios
          .delete(`http://139.99.238.74:8000/api/Missions/${id}`, {
            headers: {
              Authorization: "Bearer " + apiToken,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.items.splice(idx, 1);
          });
        this.items.splice(idx, 1);
      }
    },
    			columnValueList(val) {
				return this.items.map((d) => d[val]);
			},
  },

    		computed: {
			filteredDesserts() {
				return this.items.filter((d) => {
					return Object.keys(this.filters).every((f) => {
						return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
					});
				});
			},
      drawer: {
              get() {
                return this.$store.getters.drawer;
              },
            },

		},
};
</script>
<style lang="css" scoped>
.row-pointer:hover {
  cursor: pointer;
}
