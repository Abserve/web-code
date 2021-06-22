script<template>
  <div
    v-bind:style="[
      drawer ? { 'margin-left': '100px' } : { 'margin-left': '10px' },
    ]"
  >
    <v-app>
      <v-main class="container px-1">
        <h2 class="mb-2" style="padding-top: 30px;color:#311B92">
          Gestion des Clients
        </h2>
        <v-divider></v-divider>
        <v-card-title>
          <v-spacer></v-spacer>
          <br>
        </v-card-title>
        <download-excel
          class="btn btn-default indigo"
          :data="items"
          worksheet="My Worksheet"
          type="csv"
          name="Rapport.xls"
        >
          Télécharger Excel
        </download-excel>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="filteredDesserts"
            mobile-breakpoint="800"
            :search="search"
            :single-expand="true"
            show-expand
            :loading="myloadingvariable"
            loading-text="chargement, veuillez patienter"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <div class="text-truncate">
                <v-icon
                  small
                  class="mr-2"
                  @click="showEditDialog(item)"
                  color="indigo"
                >
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)" color="red">
                  mdi-delete
                </v-icon>
              </div>
            </template>
            <template v-slot:[`item.operateur`]="{ item }">
              <div class="text-truncate" style="width: 180px">
                {{ item.operateur }}
              </div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-card
                  class="mx-auto elevation-0"
                  style="margin-bottom: 5px; margin-top: 5px"
                  max-width="1500"
                >
                  <v-card-title >
                   <h4> A propos votre client {{item.full_name}}</h4> 
                  </v-card-title>

                  <v-card-text>
                    
                    <div style="text-align:left">
                  <v-row>

                     <v-col> Email : {{item.email}} </v-col>
                    <v-col> Adresse : {{item.adresse}}  </v-col>
                    <v-col>  Email accounting : {{item.email_accounting}}</v-col>
                   </v-row>  
                   <v-row> 
                  <v-col>  Email damandeur : {{item.email_demandeur}} </v-col>
                   <v-col>  Téléphone : {{item.phone}} </v-col>
                   <v-col>  Code TVA : {{item.tva_code}} </v-col>
                   </v-row>

                   </div>
                    
                    
                  </v-card-text>
                </v-card>
              </td>
            </template>
          </v-data-table>
          <!-- this dialog is used for both create and update -->
          <v-dialog
            @click:outside="closeDialog()"
            v-model="dialog"
            max-width="700px"
          >
            <template v-slot:activator="{ on }">
              <div class="d-flex">
                <v-btn 
                class="ml-auto ma-3"
                fab
                dark
                color="indigo" 
                v-on="on">
                  
                  <v-icon dark>
                  mdi-plus
                </v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                >
              <v-card-title class="headline grey lighten-2">
              
                <span v-if="editedItem.id">Modifier</span>
                <span v-else>Création d'un nouveau client</span>
                <v-spacer></v-spacer>
                  <v-btn
                  icon
                   @click="showEditDialog()"
                  >
                      <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <br>
              <v-card-text>
                <v-row>
                  <v-col>
                    <validation-provider
                        v-slot="{ errors }"
                        name="fullname"
                        rules="required"
                      >
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.full_name"
                      label="Nom Société *"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                    </validation-provider> 
                  </v-col>
                  
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.tva_code"
                      label="Code TVA"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                     <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                    >
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.email"
                      label="Email *"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                     </validation-provider>
                  </v-col>
                </v-row>
                  <v-row>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.phone"
                      label="Téléphone"
                    ></v-text-field>
                  </v-col>
               
                  
                  
                  <v-col> 
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.adresse"
                      label="Adresse"
                    ></v-text-field>
                  </v-col>
          <v-row>
                    <v-col> 
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.email_accounting"
                      label="Email Accounting"
                    ></v-text-field>
                  </v-col>
                
                  <v-col> 
                     <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                    >
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.email_demandeur"
                      label="Email Demandeur"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                     </validation-provider>
                  </v-col>
                   <v-col> 
                      <validation-provider
                      v-slot="{ errors }"
                      name="select"
                      rules="required"
                    >
                    <v-select
                  rounded
                    :items="roles"
                    v-model="editedItem.role"
                    label="Role *"
                    outlined
                    :error-messages="errors"
                      required
                  ></v-select>
                      </validation-provider> 
                   </v-col>
                  </v-row>
                <v-row>
                  
                  <v-col> 

                      <validation-provider
                        v-slot="{ errors }"
                        name="password"
                        rules="required"
                      >
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.password"
                      label="Mot de passe*"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                      </validation-provider>
                  </v-col>
                </v-row>
                  
                </v-row>
                <small class="red--text">*indique un champ obligatoire</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                rounded
                color="indigo"
                outlined
                 @click="showEditDialog()"
                  >Annuler</v-btn
                >
                <v-btn 
                rounded
                dark
                color="indigo"
                @click="saveItem(editedItem)"
                :disabled="invalid"
                  >Enregistrer</v-btn
                >
              </v-card-actions>
              </validation-observer>
            </v-card>
          </v-dialog>
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
const apiToken = "";
/* eslint-disable @typescript-eslint/camelcase */

setInteractionMode('eager')
  extend('required', {
    ...required,
    message: 'champ doit etre rempli !',
  })

  extend('email', {
    ...email,
    message: 'Email doit etre valide',
  })
export default {
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  data() {
    return {
      headers: [
        { text: "Id", value: "id", width: "50" },
        { text: "Nom Société", value: "full_name", width: "200", sortable: true },
        { text: "Email", value: "email", width: "200", sortable: true },
        { text: "Role", value: "role", width: "70", sortable: true },
        { text: "Tel", value: "phone", width: "200", sortable: true },
        { text: "Code TVA", value: "tva_code", width: "70", sortable: true },
        { text: "Action", value: "actions", sortable: true, width: "100" },
      ],
      e7: [],
      items: [],
            roles: ['client'],
      missions: [],
      dialog: false,
      editedItem: {},
      search: "",
      expanded: [],
      singleExpand: true,
      myloadingvariable: true,
      filters: {
        date_declanche: [],
        date_end: [],
      },
    };
  },
  mounted() {
    this.loadItems();
    this.selectt();
  },
  methods: {
    lllog(id) {
     // console.log(this.e7);
      //console.log(id);
            const apiToken = this.$store.getters.getToken;
            for (let i=0;i<this.e7.length;i++){
              console.log(this.e7[i]);
           
         axios.post("http://139.99.238.74:8000/api/clientmission", {
          missid: this.e7[i],
          clientID: id,       
        },
       {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
        },
      }
        )
          .then(res => {
            console.log(res)
          })
          .catch(err => {
      if(err.message=="Request failed with status code 401")
              console.log(err);
               this.$store.dispatch("performLogoutAction");
                     })
           }
    },
    selectt() {
      this.missions = [];
      const apiToken = this.$store.getters.getToken;
      const url = process.env.VUE_APP_API_ENDPOINT + "/api/Missions";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.missions = response.data.missions.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
          this.myloadingvariable = false;
        })
        .catch((error) => {
    if(error.message=="Request failed with status code 401")
             {  this.$store.dispatch("performLogoutAction");
                
             }});
    },

    closeDialog() {
      this.editedItem = {};
      this.dialog = !this.dialog;
    },

    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    loadItems() {
      this.items = [];
      const apiToken = this.$store.getters.getToken;
      const url = process.env.VUE_APP_API_ENDPOINT + "/api/Users/getclient";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.items = response.data.client.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
          this.myloadingvariable = false;
        })
        .catch((error) => {
            if(error.message=="Request failed with status code 401")
             {  this.$store.dispatch("performLogoutAction");
                
             }
        });
    },
    saveItem(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */

      let method = "post";
      let url = `http://139.99.238.74:8000/api/Users`;
      const id = item.id;

      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item,
      };

      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url = `http://139.99.238.74:8000/api/Users/${id}`;

        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
        delete data.fields.password;
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
             // add new item to state
            this.editedItem.id = response.data.id;
            if (!id) {
              this.items.push(this.editedItem);
            }
            this.editedItem = {};
          
          this.dialog = !this.dialog;
        })
        .catch((error) => {
           if(error.message=="Request failed with status code 401")
             {  this.$store.dispatch("performLogoutAction");
                
             }
        });
    },
    deleteItem(item) {
      const apiToken = this.$store.getters.getToken;
      const id = item.id;
      const idx = this.items.findIndex((item) => item.id === id);
      if (confirm("Are you sure you want to delete this?")) {
        axios
          .delete(`http://139.99.238.74:8000/api/Users/${id}`, {
            headers: {
              Authorization: "Bearer " + apiToken,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.items.splice(idx, 1);
          });
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
<style>
span.vertical-line {
  width: 0px; /* Use only border style */
  height: 100%;
  float: left;
  border: 1px inset; /* This is default border style for <hr> tag */
  margin-left: 100px;
}
</style>