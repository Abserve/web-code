<template>
  <div style="margin-left: 90px; padding-top: -15px; padding-right: 20px">
    <v-app>
      <v-main class="container px-1">
        <h2 class="mb-2" style="padding-top: 30px; color: #311b92">
          Détails Operations
        </h2>
        <v-divider></v-divider>
        <v-card-title class="text--secondary"> A propos mission </v-card-title>

        <v-row>
          <v-col>
            <v-data-table
              :headers="titres"
              :items="missiondate"
              hide-default-footer
              class="light-blue darken-4"
              dark
              
            >
            
            </v-data-table>

            <br>
            <v-divider    v-if="role != 'client'" ></v-divider>
               <v-select 
              
                                  v-model="e7"
                                  :items="clientss"
                                  label="Clients"
                                  item-text="id"
                                  multiple
                                  chips
                                  hint="Selectionner un client pour cette mission"
                                  persistent-hint
                                     v-if="role != 'client'"
                                ></v-select>
                                <v-btn
                                  class="ma-2"
                                 dark
                                 outlined
                                  color="blue-grey"
                                  @click="lllog()"
                                     v-if="role != 'client'"
                                >
                                  Affectation
                                </v-btn>
          </v-col>
          
          <v-col>
            <v-data-table
              :headers="clientheader"
              :items="client"
              hide-default-footer
              class="light-blue darken-4"
              dark
              
            >
            
    

           
         
            </v-data-table>
          </v-col>
          <v-col>
            <v-data-table
              :headers="Siteheader"
              :items="sites"
              hide-default-footer
              class="light-blue darken-4"
              dark
            >
            <template v-slot:[`item.action`]="{ item }"    v-if="role != 'client'">
                    <div class="text-truncate">
                      <v-icon
                        small
                        class="mr-2"
                        @click="showEditDialogSite(item)"
                        color="light-blue darken-1"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deleteSite(item)" color="red">
                        mdi-delete
                      </v-icon>
                    </div>
                  </template>
            </v-data-table>
           <!--  <template v-if="role!='client'" v-slot:[`item.select`]="{ item }"> -->
            
         
            <v-col cols="auto">
              <v-dialog
                transition="dialog-top-transition"
                max-width="600"
                v-model="dialogsite"
              >
                <template
                  v-if="role != 'client'"
                  v-slot:activator="{ on, attrs }"
                >
                  <v-btn
                    v-if="role != 'client'"
                    color="blue-grey"
                    outlined
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >Ajouter un site</v-btn
                  >
                </template>
                <template v-slot:default="dialogsite">
                  <v-card>
                    <v-toolbar
                      class="headline grey lighten-2"
                      style="color: black"
                      >Ajouter site</v-toolbar
                    >
                    <v-card-text>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="edsite.name"
                          label="Nom Site"
                        ></v-text-field>
                      </v-col>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        rounded
                        color="indigo"
                        outlined
                        v-if="role != 'client'"
                        @click="dialogsite.value = false"
                        >Annuler</v-btn
                      >
                      <v-btn
                        v-if="role != 'client'"
                        rounded
                        dark
                        color="indigo"
                        @click="addsite(edsite)"
                        >Ajouter</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-card-title class="text--secondary">
          Details des opérations par date
        </v-card-title>
        <v-expansion-panels
        >
          <v-expansion-panel
          
            v-for="(group, date_operation) in groups"
            :key="group.id"
          >
            <v-expansion-panel-header
            class="optab"
              @click.stop="clearr()"
              @click="addtotab(date_operation, group)"
              style="background-color: #d8e3e7"
            >
              <strong color="#194350" style="text-align: left; "
                >Date Operation: {{ date_operation }}</strong
              >
              <v-spacer></v-spacer>
              <div    v-if="role != 'client'" style="text-align: left" class="text-truncate">
                <v-btn dark color="indigo" @click="ccc(group)">
                  <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                  Opérateurs pointés
                  
                </v-btn>
              </div>
              <template v-slot:actions>
                <v-icon color="primary"> $expand </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
             
                 
              <v-data-table
                :headers="headers"
                :items="newitems"
                hide-default-footer
                :loading="chargement"
                loading-text="Chargement des données en cours..."
              >
                <template v-slot:[`item.article_btn`]="{ item }"  v-if="role != 'client'">
                  <div class="text-truncate">
                    <v-btn color="blue-grey" dark @click.stop="this.opidd =''"  @click="showArticle(item.id)">
                      voir article
                    </v-btn>
                  </div>
                </template>
            <template v-slot:[`item.arref`]="{ item }">
                  <div  class="text-truncate">
                          <p
                          v-text="item.arref[0]"
            label="Regular"
          ></p>
                  </div>
                </template>

                <template
                  v-if="role != 'client'"
                  v-slot:[`item.actions`]="{ item }"
                >
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
              
                <template slot="body.append" >
                 
                 
                     <template >
                   <tr class="orange--text">
                    
                    <th class="title">Totals</th>
                    <th class="title">{{ sumField("qte_controlée") }}</th>
                    <th class="title">{{ sumField("qte_ok") }}</th>
                    <th class="title">{{ sumField("qte_notOk") }}</th>
                  </tr>
    
                </template > 
                         
                
                
                </template>
              </v-data-table>
              
              
              
                
                   
         
               <v-form   v-if="menuOpen">
      
          <v-row>
    
          <v-col>
            <v-text-field
            label="Quantité"
            v-model="editedItem.qte_controlée">
            </v-text-field>
          
          </v-col>
          <v-col>
       
            <v-text-field
            label="qty ok"
            v-model="editedItem.qte_ok">
            </v-text-field>
          </v-col>
            
          <v-col>
            <v-text-field
            label="qty not ok"
            v-model="editedItem.qte_notOk">
            </v-text-field>
          </v-col> 
          
           
          <v-col>
            <v-text-field
            label="Défaut"
            v-model="editedItem.détail_defaut">
            </v-text-field>
          </v-col> 
           
          <v-col>
            <v-text-field
            label="Bunch Num"
            v-model="editedItem.buch_num">
            </v-text-field>
          </v-col> 
             
          <v-col>
            <v-text-field
            label="Delivery Num"
            v-model="editedItem.Delivery_num">
            </v-text-field>
          </v-col> 
             
          <v-col>
            <v-text-field
            label="Remarque(Optionnelle)"
            v-model="editedItem.remarque">
            </v-text-field>
          </v-col> 
             
          <v-col>
            <v-btn color="grey darken-2" @click="sssave(editedItem)" dark>save</v-btn>
           
          </v-col>  
            
          </v-row>
         
       </v-form>
              <br>
              <v-btn v-on:click="menuOpen = !menuOpen"> ajout </v-btn>
            
              <br>
             
              <br />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <br />
        </v-expansion-panels>

        <br />
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">
                  Rapport Total
                </div>
                <v-row>
                  <v-timeline align-top dense>
                    <v-timeline-item>
                      <div class="font-weight-normal">
                        <h5>
                          Quantité controllée : {{ sumField2("qte_controlée") }}
                        </h5>
                      </div>
                    </v-timeline-item>
                    <v-timeline-item>
                      <div class="font-weight-normal">
                        <h5>Quantité Ok : {{ sumField2("qte_ok") }}</h5>
                      </div>
                    </v-timeline-item>
                    <v-timeline-item>
                      <div class="font-weight-normal">
                        <h5>Quantité Not OK : {{ sumField2("qte_notOk") }}</h5>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-dialog v-model="dialogarticle" max-width="700px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Article de l'opération
                <v-spacer></v-spacer>
                <v-btn icon @click="dialogarticle = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="articleheader"
                  :items="articles"
                  :loading="arload"
                  hide-default-footer
                >
                  <template v-slot:[`item.modifier`]="{ item }">
                    <div class="text-truncate">
                      <v-icon
                        small
                        class="mr-2"
                        @click="showEditDialogArticle(item)"
                        color="indigo"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deleteArticle(item)" color="pink">
                        mdi-delete
                      </v-icon>
                    </div>
                  </template>
                </v-data-table>
                <br />
                <br />

                <v-btn
                  depressed
                  dark
                  color="indigo"
                  @click="showSavedDialogArticle(item)"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>

          <!----------------------------------Dialog Pointage----------------------->
          <v-dialog v-model="dialogpoint" max-width="700px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Operateurs Pointées
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="pointageheader"
                  :items="points"
                  hide-default-footer
                  :loading="pload"
                >
                  <!--   <template v-slot:[`item.tot`]="{ item }">
                   {{item.tot}}
                  </template>
                -->
                  <template v-slot:[`item.modifier`]="{ item }">
                    <div class="text-truncate">
                      <v-icon
                        small
                        class="mr-2"
                        @click="showEditDialogPointage(item)"
                        color="indigo"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deletePointage(item)" color="pink">
                        mdi-delete
                      </v-icon>
                    </div>
                  </template>
                  <template slot="body.append">
                    <tr class="orange--text">
                      <th class="title">Totale Heures</th>
                      <th class="title">{{ sumField3("tot") }}</th>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-dialog>

          <!----------------------------------Dialog adding bucchhh----------------------->

          <v-dialog v-model="dilbuchh" max-width="700px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span v-if="editedPointage.id">Modifier Pointage</span>
                <span v-else>Ajouter</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="dilbuchh = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <br />
              <v-card-text>
                <!--------ligne 1------>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.qte_controlée"
                      label="Quantité controllée"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.qte_ok"
                      label="Quantité OK"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.qte_notOk"
                      label="Quantité Not OK"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> </v-row>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.détail_defaut"
                      label="Défaut"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.buch_num"
                      label="Bunch Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedItem.Delivery_num"
                      label="Delivery Number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <row>
                  <v-col>
                    <v-textarea
                      auto-grow
                      rounded
                      shaped
                      dense
                      outlined
                      v-model="editedItem.remarque"
                      color="teal"
                      label="Remarque"
                    >
                      <template v-slot:label>
                        <div>Remarque <small>(optionnelle)</small></div>
                      </template>
                    </v-textarea>
                  </v-col>
                </row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded dark color="indigo" @click="sssave(editedItem)"
                  >Enregistrer</v-btn
                >
                <v-btn rounded color="indigo" outlined @click="dilbuchh = false"
                  >Annuler</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!----------------------------------Dialog Edit pointage----------------------->
          <!----------------------------------Dialog Edit Site----------------------->
         <v-dialog v-model="Editdialogsite" max-width="700px">
           <v-card>
              <v-card-title class="headline grey lighten-2">
                <span v-if="editedSite.id">Modifier le site</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="Editdialogsite = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <br />
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedSite.name"
                      label="Nom Site"
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
                  @click="Editdialogsite = false"
                  >Annuler</v-btn
                >
                <v-btn
                  rounded
                  dark
                  color="indigo"
                  @click="editItemSite(editedSite)"
                  >Enregistrer</v-btn
                >
              </v-card-actions>
           </v-card>
         </v-dialog> 

          <!----------------------------------Dialog Edit articleee----------------------->
          <v-dialog v-model="Editdialogarticle" max-width="700px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span v-if="editedArticle.id">Modifier l'article</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="Editdialogarticle = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <br />
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.ref_abs"
                      label="Référence obs"
                    ></v-text-field>
                  </v-col>
                 
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.designation"
                      label="Désignation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.cmj"
                      label="CMJ"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.type_op"
                      label="Type Opération"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.cadence_dti"
                      label="Cadence dti"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.cadence_abs"
                      label="Cadence abs"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="editedArticle.ref_client"
                      label="Réference Client"
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
                  @click="Editdialogarticle = false"
                  >Annuler</v-btn>
                  <v-btn
                  rounded
                  dark
                  color="indigo"
                  @click="editItemArticle(editedArticle)"
                  >Enregistrer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!----------- Fin dialog Edit article-------->

          <!---------------save articel--------------->
          <v-dialog v-model="savedialogarticle" max-width="700px">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <span v-if="savedArticle.id">Ajouter un article</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="savedialogarticle = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <br />
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.ref_abs"
                      label="Référence obs"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.designation"
                      label="Désignation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.cmj"
                      label="CMJ"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.type_op"
                      label="Type Opération"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.cadence_dti"
                      label="Cadence dti"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.cadence_abs"
                      label="Cadence abs"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      rounded
                      dense
                      outlined
                      v-model="savedArticle.ref_client"
                      label="Réference Client"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  rounded
                  dark
                  color="indigo"
                  @click="saveItemArticle(savedArticle, savedArticle.op_id)"
                  >Enregistrer</v-btn
                >
                <v-btn
                  rounded
                  color="indigo"
                  outlined
                  @click="savedialogarticle = false"
                  >Annuler</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-------------Fin save article--------------->

          <v-col>
            <v-card>
              <!-- this dialog is used for both create and update -->
              <v-dialog v-model="dialog" max-width="700px">
                <template v-slot:activator="{ on }">
                  <div class="d-flex">
                    <v-btn
                      v-on="on"
                      v-if="role != 'client'"
                      class="ml-auto ma-3"
                      fab
                      dark
                      color="indigo"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </div>
                  <v-timeline align-top dense>
                    <v-timeline-item>
                      <div class="font-weight-normal">
                        <h5>Quantité Heure : {{ toteure }}</h5>
                      </div></v-timeline-item
                    >
                  </v-timeline>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2">
                    <span v-if="editedItem.id">Modifier l'opération</span>
                    <span v-else>Nouvelle operation</span>

                    <v-spacer></v-spacer>
                    <v-btn icon v-if="role != 'client'" @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <br />
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.date_operation"
                          label="Date declanche"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <!--------ligne 1------>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.qte_controlée"
                          label="Quantité controllée"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.qte_ok"
                          label="Quantité OK"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.qte_notOk"
                          label="Quantité Not OK"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row> </v-row>

                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.détail_defaut"
                          label="Défaut"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.buch_num"
                          label="Bunch Number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          rounded
                          dense
                          outlined
                          v-model="editedItem.Delivery_num"
                          label="Delivery Number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <row>
                      <v-col>
                        <v-textarea
                          auto-grow
                          rounded
                          shaped
                          dense
                          outlined
                          v-model="editedItem.remarque"
                          color="teal"
                          label="Remarque"
                        >
                          <template v-slot:label>
                            <div>Remarque <small>(optionnelle)</small></div>
                          </template>
                        </v-textarea>
                      </v-col>
                    </row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      v-if="role != 'client'"
                      rounded
                      dark
                      color="indigo"
                      @click="saveItem(editedItem)"
                      >Enregistrer</v-btn
                    >
                    <v-btn
                      v-if="role != 'client'"
                      rounded
                      color="indigo"
                      outlined
                      text
                      @click="showEditDialog()"
                      >Annuler</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
//const apiToken = localStorage.getItem('token');
const apiToken = "";
export default {
  data() {
    return {
     
      //-------FIRST TABLE------------
      titres: [
        { text: "Date Declenche", value: "date_declanche" },
        { text: "Date Fin", value: "date_end" },
        { text: "Description", value: "description" },
      ],

      //----------Table Client----------//
      clientheader: [
        { text: "Client", value: "full_name" },
        { text: "Email", value: "email" },
        
      ],
      client: [],
      //-----------Site table------------------//
      Siteheader: [
        { text: "Lieu/Site", value: "name" },
        { text: "Details on map", value: "detail_site" },
        { text: "Actions", value: "action" },
      ],
      sites: [],
      pointageheader: [
        { text: "Id Operateur", value: "user_id" },
        { text: "Heure Début", value: "heur_deb" },
        { text: "Heure Fin", value: "heure_fin" },
        { text: "majoration", value: "majoration" },
       
//        { text: "Modifier", value: "modifier" },
        { text: "Totale Heure", value: "tot" },
      ],
      points: [],
      dialogpoint: false,
      missiondate: [],
      //expanded: [],
      model: [0, 0, 0, 0],
      dattt: "",
      //------------Article----------//
      articleheader: [
        { text: "Ref obs", value: "ref_abs" },
        { text: "Ref Client", value: "ref_client" },
        { text: "Designation", value: "designation" },
        { text: "CMJ", value: "cmj" },
        { text: "Type Opération", value: "type_op" },
        { text: "Cadence dti", value: "cadence_dti" },
        { text: "Cadence abs", value: "cadence_abs" },
        { text: "Modifier", value: "modifier" },
      ],
      opidd: "",
      opiddop: "",

      articles: [],
      arload:true,
      dialog: false,
      //--------------Table Operation--------
     
      headers: [
        //{ text: "Article", value: "", width: "" },
        //{ text: "Date operation", value: "date_operation"},
        { text: "", value: "" },
        { text: "Quentité controlée", value: "qte_controlée" },
        { text: "Qty OK", value: "qte_ok" },
        { text: "Qty not_OK", value: "qte_notOk" },
        { text: "Défaut", value: "détail_defaut" },
        { text: "Bunch Num", value: "buch_num" },
        { text: "Delivery Num", value: "Delivery_num" },
        { text: "Remarque", value: "remarque" },
        { text: "Action", value: "actions", sortable: false, width: "80" },
        { text: "Ref Article", value: "arref" },
        { text: "Article", value: "article_btn" },
        
        
      ],
   pload:true,
      menuOpen: false,
      e7: [],
      dilbuchh: false,
      Editdialogarticle: false,
      Editdialogsite: false,
      Editdialogpoint: false,
      savedialogarticle: false,
      editedSite:{},
      editedArticle: {},
      editedPointage: {},
      savedArticle: {},
      dialogarticle: false,
      dialogsite: false,
      missdetails: [],
      expanded: [],
      items: [],
      editedItem: {},
      edsite: {},
      search: "",
      newitems: [],
      chargement: false,
      toteure: 0,
      clientss:[]
    };
  },
  mounted() {
    this.loadItems();
    this.selectt();
  },
  computed: {
    groups() {
      return this.groupBy(this.items, "date_operation");
    },
    role() {
      return this.$store.getters.getRole;
    },
  },

  methods: {
      selectt() {
      this.clientss = [];
      const apiToken = this.$store.getters.getToken;
      const url = process.env.VUE_APP_API_ENDPOINT + "/api/Users/getclient";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.clientss = response.data.client.map((item) => {
       
            return {
              id: item.id,
              ...item,
            };
          });
          this.myloadingvariable = false;
        })
        .catch((error) => {
    if(error.message=="Request failed with status code 401")
    console.log(error);
             {  this.$store.dispatch("performLogoutAction");
                
             }});
    },

      lllog() {
     // console.log(this.e7);
      //console.log(id);
            const apiToken = this.$store.getters.getToken;
            for (let i=0;i<this.e7.length;i++){

           
         axios.post("http://139.99.238.74:8000/api/clientmission", {
          clientID: this.e7[i],
          missid:this.$route.params.id,       
        },
       {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
        },
      }
        )
          .then(res => {
            alert("Affecter avec succée");
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
      if(err.message=="Request failed with status code 401")
          //    console.log(err);
               this.$store.dispatch("performLogoutAction");
                     })
           }
    },

    deleteClient(item) {
      const apiToken = this.$store.getters.getToken;
      const id = item.id;
      console.log("hhhhhhhhhhhhh",item)
      const idx = this.clientss.findIndex((item) => item.id === id);
      if (confirm("Supprimer ce client?")) {
        axios
          .delete(`http://139.99.238.74:8000/clientmission/${id}`, {
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
    addsite(edsite) {
      const apiToken = this.$store.getters.getToken;
      const sitef =
        "http://139.99.238.74:8000/api/" + this.$route.params.id + "/sites";
     // console.log(edsite);
      const data = {
        fields: edsite,
      };
    //  console.log(data);
      axios
        .post(sitef, data.fields, {
          headers: {
            Authorization: "Bearer " + apiToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // add new item to state
          this.sites.push(this.edsite);
          this.edsite = {};
          this.dialogsite = !this.dialogsite;
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 401") {
            this.$store.dispatch("performLogoutAction");
          }
        });
    },
    //---------edit site---------------------
    editItemSite(editedSite) {
      const apiToken = this.$store.getters.getToken;
      const id = editedSite.id;
      const siteff =
        `http://139.99.238.74:8000/api/` + this.$route.params.id + `/sites/${id}`;
      console.log(editedSite);
      const data = {
        fields: editedSite,
      };
      //console.log(data);
      axios
        .put(siteff, data.fields, {
          headers: {
            Authorization: "Bearer " + apiToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // add new item to state
          //this.sites.push(this.editedSite);
          //console.log(this.editedSite);
          this.editedSite = {};
          this.Editdialogsite = !this.Editdialogsite;
        })
        .catch((error) => {
          if (error.message == "Request failed with status code 401") {
            this.$store.dispatch("performLogoutAction");
          }
        });
        // window.location.reload();
      
    },
    //------------Delete Site-----------
    deleteSite(item) {
      const id = item.id;
      const idx = this.sites.findIndex((item) => item.id === id);
      if (confirm("Supprimer site?")) {
        
        const apiToken = this.$store.getters.getToken;
        axios
          .delete(`http://139.99.238.74:8000/api/` +
          this.$route.params.id +
          `/sites/${id}`, {
            headers: {
              Authorization: "Bearer " + apiToken,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.sites.splice(idx, 1);
          });
        //window.location.reload();
      }
    },
    
  
    ccc(group) {
      const a = ((group.length)-1);
      console.log(group);
      for (let i = 0; i < a; i++) {
        this.showPoint(group[i].id);
      }
    },
    CalcHeure(id) {
   //   console.log(id);
      const totale = 0;
      const apiToken = this.$store.getters.getToken;

      const aaaa =
        "http://139.99.238.74:8000/api/" + id + "/datepointage/infoo";
      axios
        .get(aaaa, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          response.data.operateur.map((item) => {
            const a = this.$options.filters
              .humanize(item.heure_fin)
              .replace("hours", "");
            const b = this.$options.filters
              .humanize(item.heur_deb)
              .replace("hours", "");
            if (Number.isInteger(Number(a - b))) {
              this.toteure = this.toteure + Number(a - b);
            }

      //      console.log("heeh", totale);
          });
        })
        .catch((error) => {
          console.log(error);
        });

     // console.log(this.toteure);
    },
    showPoint(id) {
      console.log(id);

      const apiToken = this.$store.getters.getToken;
      this.opiddop = id;
      const urlarticle =
        "http://139.99.238.74:8000/api/" + id + "/datepointage/infoo";
      axios
        .get(urlarticle, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          if(response.data.operateur.length!=0)
         
       {  
          console.log(response.data.operateur)
         this.points = response.data.operateur.map((item) => {
            
            const a = this.$options.filters
              .humanize(item.heure_fin)
              .replace("hours", "");
            const b = this.$options.filters
              .humanize(item.heur_deb)
              .replace("hours", "");
            return {
              id: item.id,
              tot: Number(a - b),
              ...item,
            };
          });}
          this.pload=false;
        })
        .catch((error) => {
          console.log(error);
          this.pload=false;
        });
      this.dialogpoint = true;
    },
    //---------Edit Pointage---------//
    editItemPointage(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */
      let method = "put";

      const id = item.id;
      let url =
        `http://139.99.238.74:8000/api/` + this.opiddop + `/datepointage/${id}`;
      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item,
      };
      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url =
          `http://139.99.238.74:8000/api/` +
          this.opiddop +
          `/datepointage/${id}`;
        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }
      // save the record
      const apiToken = this.$store.getters.getToken;
      axios
        .put(url, data.fields, {
          headers: {
            Authorization: "Bearer " + apiToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data && response.data.id) {
            // add new item to state
            this.editedPointage.id = response.data.id;
            if (!id) {
              this.items.push(this.editedPointage);
            }
            this.editedPointage = {};
          }
          this.Editdialogpoint = !this.Editdialogpoint;
          this.opidd = "";
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
        });
      this.opiddop = "";
    },
    //---------Fin Pointage---------//
    showArticle(id) {
      this.opidd = id;
  //    console.log("iddd", id);
      this.articles = [];
      const apiToken = this.$store.getters.getToken;
      const urlarticle = "http://139.99.238.74:8000/api/" + id + "/article";
      axios
        .get(urlarticle, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.articles = response.data.articles.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
          this.arload=false;
        })
        .catch((error) => {
          console.log(error);
          this.arload=false;
        });
      this.dialogarticle = true;
    },
    showEditDialogPointage(item) {
      this.editedPointage = item || {};
      this.Editdialogpoint = !this.Editdialogpoint;
    },
    showEditDialogArticle(item) {
      this.editedArticle = item || {};
      this.Editdialogarticle = !this.Editdialogarticle;
    },
    showEditDialogSite(item) {
      this.editedSite = item || {};
      this.Editdialogsite = !this.Editdialogsite;
    },
    showSavedDialogArticle(item) {
      this.savedArticle = item || {};
      this.savedialogarticle = !this.savedialogarticle;
    },

   /* deletePointage(item) {
      const id = item.id;
      const idx = this.points.findIndex((item) => item.id === id);
      if (confirm("Supprimer cette pointage?")) {
        const url =
          `http://139.99.238.74:8000/api/` +
          this.$route.params.id +
          `/datepointage/${id}`;
        const apiToken = this.$store.getters.getToken;
        axios
          .delete(url, {
            headers: {
              Authorization: "Bearer " + apiToken,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.points.splice(idx, 1);
          });
      }
    }
    */
    deleteArticle(item) {
      const id = item.id;
      const idx = this.articles.findIndex((item) => item.id === id);
      if (confirm("Supprimer l aricle?")) {
        const url =
          `http://139.99.238.74:8000/api/` +
          this.$route.params.id +
          `/article/${id}`;
        const apiToken = this.$store.getters.getToken;
        axios
          .delete(url, {
            headers: {
              Authorization: "Bearer " + apiToken,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.articles.splice(idx, 1);
          });
      }
    },
    saveItemArticle(item) {
  //    console.log(this.opidd);
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */
      let method = "post";
      let url = `http://139.99.238.74:8000/api/` + this.opidd + "/article";
      const id = item.id;
      console.log(item);
      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item,
      };
      if (id) {
        // if the item has an id, we're updating an existing item
        method = "post";
        url = `http://139.99.238.74:8000/api/` + this.opidd + `/article`;
        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }
      // save the record
      const apiToken = this.$store.getters.getToken;
      axios[method](url, data.fields, {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
            console.log(response)
            this.editedArticle.id = response.data.mission.id;
            if (!id) {
              this.articles.push(response.data.mission);
           
            }
            this.editedArticle = {};
          
          this.savedialogarticle = !this.savedialogarticle;
          
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    
    
    
    editItemArticle(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */
      let method = "put";

      const id = item.id;
      let url =
        `http://139.99.238.74:8000/api/` + this.opidd + `/article/${id}`;
      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item,
      };
      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url = `http://139.99.238.74:8000/api/` + this.opidd + `/article/${id}`;
        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }
      // save the record
      const apiToken = this.$store.getters.getToken;
      axios
        .put(url, data.fields, {
          headers: {
            Authorization: "Bearer " + apiToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data && response.data.id) {
           // console.log(response.data);
            // add new item to state
            this.editedArticle.id = response.data.id;
            if (!id) {
              this.items.push(this.editedArticle);
            }
            this.editedArticle = {};
          }
          this.Editdialogarticle = !this.Editdialogarticle;
          this.opidd = "";
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    //-----------FIN ARTICLE-----------
    sumField(key) {
      // sum data of one operation
      return this.newitems.reduce((a, b) => a + (b[key] || 0), 0);
    },
    sumField2(key) {
      // sum data of mission
      return this.items.reduce((a, b) => a + (b[key] || 0), 0);
    },
    sumField3(key, bnb) {
      // sum data of mission
      return this.points.reduce((a, b) => a + (b[key] || 0), 0);
    },
    groupBy(array, key) {
      const result = {};
      array.forEach((item) => {
        if (!result[item[key]]) {
          result[item[key]] = [];
        }
        result[item[key]].push(item);
      });
      return result;
    },
    sendtop(id, missid) {
      this.$router.push("/rapport/" + id + "/" + missid);
    },
    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    clearr() {
      this.newitems = [];
      this.articles = [];
      this.dattt='';
    },
    addtotab(da, ba) {
      this.dattt = da;
      this.articles = [];
      const apiToken = this.$store.getters.getToken;
      // for(let k=0;k<ba.length;k++){}

      const urlarticle =
        "http://139.99.238.74:8000/api/" + ba[0].id + "/article";
      axios
        .get(urlarticle, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.articles = response.data.articles.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });

      ////////////////////////////////
      this.items.forEach((item) => {
        if (item.date_operation == da) {
          this.newitems.push(item);
        }
      });
    },
     uniq_fast(a) {
    const seen = {};
    const out = [];
    const len = a.length;
    let j = 0;
    for(let i = 0; i < len; i++) {
         const item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
},
llload(id){
 const k =[];
    const apiToken = this.$store.getters.getToken;
      const urlarticle = "http://139.99.238.74:8000/api/" + id + "/article";
      axios
        .get(urlarticle, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
       response.data.articles.map((item) => {
           
           // console.log(item.ref_client);
           k.push(item.ref_client);
            
                
          });
        })
        .catch((error) => {
          console.log(error);
        });
        return k;
      
},
    loadItems() {
      this.items = [];
      this.sites = [];

      const apiToken = this.$store.getters.getToken;
      const urlll =
        "http://139.99.238.74:8000/api/" + this.$route.params.id + "/Operation";
      const urlmissid =
        "http://139.99.238.74:8000/api/Missions/missid/" +
        this.$route.params.id;
      const urlclient =
        "http://139.99.238.74:8000/api/clientmission/getmissionClient/" +
        this.$route.params.id;
      const urlsite =
        "http://139.99.238.74:8000/api/Missions/missid/" +
        this.$route.params.id;
      const urlarticle = "http://139.99.238.74:8000/api/" + +"/article";
      const sitef =
        "http://139.99.238.74:8000/api/" + this.$route.params.id + "/sites";
      axios
        .get(sitef, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.sites = response.data.sites.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
      //////////////////
      axios
        .get(urlmissid, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.missiondate = response.data.missions.map((item) => {
            return {
              id: item.id,
              ...item,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(urlll, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
          this.items = response.data.operations.map((item) => {
            
            //hereeeee
            this.CalcHeure(item.id);
            return {
              id: item.id,
              arref:this.llload(item.id),
              ...item,
            };
            
          });
        })
        .catch((error) => {
          console.log(error);
        });
         
      axios
        .get(urlclient, {
          headers: { Authorization: "Bearer " + apiToken },
        })
        .then((response) => {
        console.log(response.data.clients[(response.data.clients.length)-1][0])
     this.client.push(   response.data.clients[(response.data.clients.length)-1][0]);
           
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sssave(item){
        /* this is used for both creating and updating API records
       the default method is POST for creating a new item */
      let method = "post";
     
      const dd = this.dattt;
      let url =
        `http://139.99.238.74:8000/api/` + this.$route.params.id + "/Operation";
      const id = item.id;
       // eslint-disable-next-line  
      item.date_operation=dd;
      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item
      };
   //   console.log(dd);
     // console.log(data);
      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url =
          `http://139.99.238.74:8000/api/` +
          this.$route.params.id +
          `/Operation/${id}`;
        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }
      // save the record
      const apiToken = this.$store.getters.getToken;
      axios[method](url, data.fields, {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          //   if (response.data && response.data.id) {
          // add new item to state
          this.editedItem.id = response.data.operation.id;
          if (!id) {
            this.newitems.push(this.editedItem);
          }
          this.editedItem = {};
          //}
         
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    saveItem(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */
      let method = "post";
      let url =
        `http://139.99.238.74:8000/api/` + this.$route.params.id + "/Operation";
      const id = item.id;
      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item,
      };
      if (id) {
        // if the item has an id, we're updating an existing item
        method = "put";
        url =
          `http://139.99.238.74:8000/api/` +
          this.$route.params.id +
          `/Operation/${id}`;
        // must remove id from the data for airtable patch to work headers: { Authorization: "Bearer " + apiToken }
        delete data.fields.id;
      }
      // save the record
      const apiToken = this.$store.getters.getToken;
      axios[method](url, data.fields, {
        headers: {
          Authorization: "Bearer " + apiToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          //   if (response.data && response.data.id) {
          // add new item to state
          this.editedItem.id = response.data.id;
          if (!id) {
            this.items.push(this.editedItem);
          }
          this.editedItem = {};
          //}
          this.dialog = !this.dialog;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    },
    deleteItem(item) {
      const id = item.id;
      const idx = this.items.findIndex((item) => item.id === id);
      if (confirm("Voulez vous supprimer cette opération?")) {
        const url =
          `http://139.99.238.74:8000/api/` +
          this.$route.params.id +
          `/Operation/${id}`;
        const apiToken = this.$store.getters.getToken;
        axios
          .delete(url, {
            headers: {
              Authorization: "Bearer " + apiToken,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.newitems.splice(idx, 1);
          });
      }
    },
  },
};
</script>