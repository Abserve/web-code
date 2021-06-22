<template>
  <section id="accueil">
    <v-parallax dark src="@/assets/img/test22.jpg" height="650">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <h1 class="display-2 font-weight-bold mb-4">Ab Serve</h1>
              <h1 >
                Vos meilleurs choix dans le domaine de la qualité et de la logistique industrielle.
              </h1>
              <v-btn
                rounded
                outlined
                large
                dark
                @click="$vuetify.goTo('#features')"
                class="mt-5"
                
              >
                Découvrez nos services
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
              <div class="video d-flex align-center py-4">
                
               
              </div>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/img/borderWaves.svg" />
      </div>
    </v-parallax>
    <v-container fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <!-- <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> -->
            <v-col
              cols="10"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  height="700px"
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                 style="color:#352a39"
                >
                 <v-img
                    :src="feature.img"
                    max-width="350px"
                    class="d-block ml-auto mr-auto"
                    
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 class="font-weight-regular " style="color:#453159">
                    {{ feature.text }}
                  </h4>

                  <v-col align="right">
                  <v-btn
                  bottom
                  outlined 
                  color="#8c657e" 
                  @click="dialog2 = true">
                    Voir plus
                  </v-btn>
                  </v-col>

                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog2" max-width="500">
      <v-card>
        <v-card-title  align="right">
          Sécurisation

          <v-spacer />

          <v-icon aria-label="Close" @click="dialog2 = false">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="body-1 text-center">
          <v-row>
            <v-col cols="12" md="8">
              <div>
               
                <div class="grey--text">
                 En gérant ces prestations de A à Z pour eux, AB Serve permet à ses clients de se recentrer sur des fonctions à plus forte valeur ajoutée. S’appuyant sur son expérience du monde industriel, les compétences de ses équipes et l’exigence de ses processus internes, AB Serve a une réponse spécifique (contrôle, tri et mur qualité) à chaque problématique qualité détectée, en fonction de l’étape du processus de production.

AB Serve intervient depuis plus de 15 ans en tant que prestataire de services correctifs et préventifs d’inspection et de gestion de la qualité au sein des secteurs de l’automobile, la métallurgie, l’aéronautique, l’électronique, la cosmétique, et la cristallerie.
                </div>
              </div>
            </v-col>

          </v-row>

          <v-btn
            class="mt-6"
            color="info"
            depressed
            default
            rounded
            @click="dialog2 = false"
          >
            Sounds good
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-container>
    
    
  </section>
</template>

<script>
export default {
  data() {
    return {
      
      features: [
        {
          img: require("@/assets/img/security.jpg"),
          title: "Sécurisation des processus",
          text: "AB Serve intègre les standards de l’amélioration continue dans ses prestations de gestion de la qualité, en interne et sur sites.",
        },
        {
          img: require("../assets/img/conformite.jpg"),
          title: "Mise en conformité",
          text: "AB Serve intervient auprès des industriels, et réalise une gamme complète de services de retouche et de mise en conformité.",
        },
    
        {
          img: require("@/assets/img/flux.jpg"),
          title: "Logistique des flux",
          text: "La disponibilité et la large gamme des ressources qualifiées mises à disposition, participent à l’optimisation de la gestion de la production interne des industriels en toute tranquillité.",
        },
       
        
      ],
      dialog2: false,
    };
  },
  
  
  
};
</script>

<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}
.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;
  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }
  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;
      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.btn-play {
  transition: 0.2s;
}
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
#accueil {
  z-index: 0;
}
.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}
.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}
.card h1 {
  margin-bottom: 10px;
}
.zoom-efect {
  transform: scale(1.1);
}
.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}
</style>