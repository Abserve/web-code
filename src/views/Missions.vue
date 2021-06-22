script<template>

  <div v-bind:style="[drawer ? {'margin-left':'100px'} : {'margin-left': '10px'}]" >
    <v-app>
      <v-main class="container px-1">
        <h2 class="mb-2" style="padding-top: 30px;color:#311B92">
          Tableau des Missions
        </h2>
        <v-divider></v-divider>
        
        <download-excel
            class="btn btn-default indigo"
            :data="items"
            worksheet="My Worksheet"
            type="csv"
            name="Rapport.xls">
          Télécharger Excel
        </download-excel>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="filteredDesserts"
            mobile-breakpoint="800"
            class="elevation-0"
            :search="search"
            show-select
             :loading="chargement"
          >
          	<template v-slot:header="{ header }">
				  	<tr class="grey lighten-3">
						<th style="margin-left:30px;">
              <br/>
							<v-list-item-icon>&nbsp;{{header}}</v-list-item-icon>
						</th>
						<th v-for="header in headers" :key="header.text">
							<div v-if="filters.hasOwnProperty(header.value)">
								<v-autocomplete
									flat
									hide-details
									multiple
									attach
									chips
									dense
									clearable
									:items="columnValueList(header.value)"
									v-model="filters[header.value]"
								>
                  	<template v-slot:selection="{ item, index }">
                      <v-chip v-if="index < 5">
											 <span>
                        {{ item }}
                      </span>
										</v-chip>
										<span v-if="index === 5" class="grey--text caption" >
                      (+{{ filters[header.value].length - 5 }} others)
                      </span>
									</template>
								</v-autocomplete>
							</div>
						</th>
					</tr>
				</template>
            <template v-if="role!='client'" v-slot:[`item.actions`]="{ item }">
              <div class="text-truncate">
                <v-icon
                v-if="role!='client'"
                  small
                  class="mr-2"
                  @click="showEditDialog(item)"
                  color="primary"
                >
                  mdi-pencil
                </v-icon>
                <v-icon v-if="role!='client'" small @click="deleteItem(item)" color="pink">
                  mdi-delete
                </v-icon>
              </div>
            </template>
            <template v-slot:[`item.operations`]="{ item }">

              <div class="text-truncate">
                <v-btn  rounded outlined @click="sendtop(item.id)"> Rapport </v-btn>
              </div>
            </template>
            <template v-if="role!='client'" v-slot:[`item.mission`]="{ item }">
              <div class="text-truncate" style="width: 180px">
                {{ item.mission }}
              </div>
            </template>
          </v-data-table>
          <!-- this dialog is used for both create and update -->
          <v-dialog v-if="role!='client'" v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <div class="d-flex">
                <v-btn 
                v-if="role!='client'" 
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
              <v-card-title class="headline grey lighten-2">
                <span v-if="editedItem.id">Modifier une mission</span>
                <span v-else>Créer une mission</span>
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
                  <v-col >
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.date_declanche"
                      label="Date declanche"
                    ></v-text-field>
                  </v-col>
                  <v-col >
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.date_end"
                      label="Date Fin"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.qt_totale_article"
                      label="qt totale article"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.nbr_operateur"
                      label="Nbr Operateur"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.jours_qte"
                      label="jours Qte"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                  >Enregistrer</v-btn
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

const apiToken = "";
/* eslint-disable @typescript-eslint/camelcase */

export default {
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
        { text: "Plus de details", value: "operations", width: "100" },
      ],
      items: [],
      dialog: false,
      editedItem: {},
      chargement:true,
      search: "",
      selected: [],
      	filters: {
        date_declanche: [],
				date_end: [],
			},
    };
  },
  
    		computed: {
       role() { return this.$store.getters.getRole; },

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
          this.chargement=false;
        },
        ) 
        .catch((error) => {
                    this.chargement=false;
    if(error.message=="Request failed with status code 401")
             {  this.$store.dispatch("performLogoutAction");
                
             }        });
                     
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
            // add new item to state
            this.editedItem.id = response.data.mission.id;
            console.log("idddd",response);
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
          .delete(`http://139.99.238.74:8000/api/Missions/${id}`, {
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

};
</script>
<style lang="css" scoped>
.row-pointer:hover {
  cursor: pointer;
}
