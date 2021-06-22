<template>
  <section id="download">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col sm="4" class="hidden-xs-only">
              <v-img src="@/assets/img/ill2.svg" class="d-block ml-auto mr-auto" max-width="350px" />
            </v-col>
            <v-col cols="12" sm="8" class=" text-left">
              <h1 class="display-2 mb-2 ">Domaines d’intervention</h1>
              <h1>
                AB Serve accompagne les industriels de tous secteurs dans leurs démarches
                d’amélioration continue à travers une large gamme de prestations complémentaires.
              </h1>
              <v-btn rounded outlined href="https://ab-serve.com/fr/" target="_blank" large color="#352a39" class="mt-4">
                
                Site France
                <v-spacer></v-spacer>
                <v-icon class="mr-5">
                  mdi-arrow-top-right
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>

#download {
  background-image: url("~@/assets/img/globe.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 500px;
}

#download .container,
#download .row {
  height: 100%;
}
h1{
  color: #352a39;
}
</style>