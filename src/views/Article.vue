<template>
  <div style="margin-left: 100px; padding-right: 20px">
    <v-app>
      <v-main class="container px-1">
        <h2 class="font-weight-light mb-2" style="padding-top: 30px">
          Tableau article
        </h2>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Chercher"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-card>
          <v-data-table
              :headers="headers"
              :items="items"
              mobile-breakpoint="800"
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
             
            <template v-slot:item.operation="{ item }" >
              <div class="text-truncate"  style="width: 180px" >
                {{ item.operation }}
              </div>
            </template>

          </v-data-table>
          <!-- this dialog is used for both create and update -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <div class="d-flex">
                <v-btn color="primary" dark class="ml-auto ma-3" v-on="on">
                  Nouvelle article
                  <v-icon small>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span v-if="editedItem.id">Edit {{ editedItem.id }}</span>
                <span v-else>Ajouter un article</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.ref_abs"
                        label="Ref abs"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.ref_client"
                        label="ref client"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.designation"
                        label="Designation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.cmj"
                        label="CMJ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.type_op"
                        label="Type operation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.cadence_dti"
                        label="Cadence dti"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="editedItem.cadence_abs"
                        label="Cadence ABS"
                    ></v-text-field>
                  </v-col>

                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="showEditDialog()"
                >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
                >Sauvegarder</v-btn
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
//const apiToken = localStorage.getItem('token');

const apiToken='';
export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id", width: "50" },
        { text: "Ref abs", value: "ref_abs",  width: "100" },
        { text: "Ref client", value: "ref_client",  width: "100" },
        { text: "Designation", value: "designation",  width: "100" },
        { text: "CMJ", value: "cmj",  width: "100" },
        { text: "Type operation", value: "type_op",  width: "100" },
        { text: "Cadence ABS", value: "cadence_abs",  width: "100" },
        { text: "ref abs", value: "ref_abs",  width: "100" },
        { text: "Action", value: "actions", sortable: false,width:"50" }
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
    sendtop(id){
      this.$router.push('/rapport/'+id)
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
     const apiToken= this.$store.getters.getToken;
     const urlll= "http://139.99.238.74:8000/api/"+this.$route.params.id+"/article";
     console.log(urlll);
      axios
          .get(urlll, {
            headers: { Authorization: "Bearer " + apiToken }
          })
          .then(response => {
            this.items = response.data.articles.map(item => {
              return {
                id: item.id,
                ...item,

              };
            });
          })
          .catch(error => {
    if(error.message=="Request failed with status code 401")
             {  this.$store.dispatch("performLogoutAction");
             }          });
    },
    saveItem(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */
      let method = "post";
      let url = `http://139.99.238.74:8000/api/`+this.$route.params.id+"/article";
      const id = item.id;

      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item
      };

      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url = `http://139.99.238.74:8000/api/`+this.$route.params.id+`/article/${id}`;

        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }

      // save the record
      const apiToken= this.$store.getters.getToken;

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
              if(error.message=="Request failed with status code 401")
             {  this.$store.dispatch("performLogoutAction");
             }
          })
    },
    deleteItem(item) {
      const id = item.id;
      const idx = this.items.findIndex(item => item.id === id);
      if (confirm("Are you sure you want to delete this?")) {
       const url = `http://139.99.238.74:8000/api/`+this.$route.params.id+`/article/${id}`;
        const apiToken= this.$store.getters.getToken;
        axios.delete(url,
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
