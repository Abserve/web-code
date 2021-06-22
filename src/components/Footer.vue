<template>
  <v-footer dark padless>
    <v-card flat tile class="secondary white--text text-center">
      <v-card-text>
        <span>&#169;</span>  {{ new Date().getFullYear() }} — <strong>Site Web Officiel</strong>
      </v-card-text>
      
     
    

      <v-card-text class="white--text pt-0">
        

      Z. Activité Economique de Bizerte Plateau N°3 – Lot 08 Bis | 7050 Menzel Bourguiba | Tunisie

      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        Developed by : <a href="https://www.linkedin.com/in/med-cherif-js/">  Mohamed Cherif </a> & <a href="https://www.linkedin.com/in/takwa-mekni-8a4503171/">Takwa Al-Mekni </a>
        
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style scoped>
.v-card {
  width: 100%;
}
</style>

<script>
export default {
  data: () => ({
    icons: [
      {
        text: "mdi-facebook",
        link: "",
      },
      {
        text: "mdi-twitter",
        link: "",
      },
      {
        text: "mdi-linkedin",
        link: "",
      },
      {
        text: "mdi-instagram",
        link: "",
      },
    ],
  }),
};
</script>
