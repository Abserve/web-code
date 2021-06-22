<template>
  <section id="société">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="7">
              <h1 class="font-weight-light display-2">Valeurs et Forces</h1>
              <br>
              <p  class="text-justify" style="color:#352a39">AB Serve intervient auprès de ses clients afin qu’ils puissent
                 se recentrer sur des fonctions à plus forte valeur ajoutée au
                  sein de leur activité.
              </p>
              <br>
              
              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/quality.png"
                    max-width="70px"
                    class="mr-5"
                  />
                  <p class="text-justify" style="color:#352a39">
                    Fournir des services de qualité et des solutions adaptées à
                     la fois à l’activité mais également à la structure et au
                      processus interne de ses clients,
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/padlock.png"
                    max-width="70px"
                    class="mr-5"
                  />
                  <p class="text-justify" style="color:#352a39">
                    Sécuriser la chaîne d’approvisionnement 
                    de ses clients par la mise en place de services 
                    correctifs et préventifs d’inspection et de gestion de la qualité,
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/bookkeeping.png"
                    max-width="70px"
                    class="mr-5"
                  />
                  <p class="text-justify" style="color:#352a39">
                    Favoriser la transparence du suivi budgétaire
                     des projets, des méthodes et compétences mises à
                      disposition de ses clients,
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/assets/img/process.png"
                    max-width="70px"
                    class="mr-5"
                  />
                  <p class="text-justify" style="color:#352a39">
                    Mettre en place des procédures de travail adaptées à l’activité et aux besoins,
                    
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5" class="d-none d-md-flex">
              <v-img
                src="@/assets/img/success.svg"
                class="d-block ml-auto mr-auto"
                max-width="400px"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#société {
  background-color: #e2d2ce;
  color:#352a39
;
 
}
</style>