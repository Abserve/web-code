<template>
  <v-app id="inspire" background="@/assets/loginbg.jpg" >
    <v-img
      align="center"
      contain
      justify="center"

      max-height="100px"
      max-width="100px"
      src="@/assets/logo.png"
    >
    </v-img>

    <v-main>
      <v-container class="" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-20">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center display-2"
                        >
                          Connectez-vous à Ab Serve
                        </h2>
                        <div class="text-center mt-4"></div>

                        <v-form>
                          <v-text-field
                            id="email"
                            v-model="email"
                            color="teal accent-5"
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                          />

                          <v-text-field
                            id="password"
                            v-model="password"
                            color="teal accent-5"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            v-on:keyup.enter="performLogin"
                          />
                          <div v-if="error" style="color: red">{{ error }}</div>
                        </v-form>

                        <h6 class="text-right mt-4">Mot de passe oubilé ?</h6>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn

                          color="#352a39"
                          dark
                          rounded
                          type="submit"
                          @click.prevent="performLogin"
                          >CONNEXION</v-btn
                        >
                      </div>
                      <br />
                    </v-col>
                    <v-col class="purple darken-3" cols="12" md="4">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Vous n'avez pas de compte?</h1>
                        <h5 class="text-center">

                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn dark outlined rounded @click="step++"
                          >S'INSCRIRE</v-btn
                        >
                      </div>
                      <br>
                      <br>
                      <div align="center">
                        <v-img

                        max-height="200px"
                        max-width="100px"
                        src="@/assets/img/password.png"></v-img>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col class="purple darken-4" cols="12" md="4">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Bienvenue</h1>
                        <h5 class="text-center">
                          Si vous avez déjà un compte vous puvez simplement se connecter...
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn dark outlined rounded @click="step--"
                          >S'IDENTIFIER</v-btn
                        >

                        <br>
                      <br>
                      <div align="center">
                        <v-img

                        max-height="200px"
                        max-width="100px"
                        src="@/assets/img/verified.png"></v-img>
                      </div>
                      </div>
                      <h1></h1>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center display-2"
                        >
                          si vous n'avez pas de compte merci de nous contacter 

                        </h2>
                        <div class="text-center mt-4"></div>
                        <h4 class="text-center mt-4">
                        </h4>
                      </v-card-text>
                   
                      <br />
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      step: 1,
      // eslint-disable-next-line @typescript-eslint/camelcase
      full_name: "",
      semail: "",
      spassword: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      spassword_confirmation: "",
      error: "",
      passwordRules: [
        value => !!value || "Please type password.",
        value => (value && value.length >= 6) || "minimum 6 characters"
      ],
      confirmPasswordRules: [
        value => !!value || "type confirm password",
        value =>
          value === this.spassword ||
          "The password confirmation does not match."
      ]
    };
  },
  methods: {
    performLogin() {
      this.$store
        .dispatch("performLoginAction", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$router.push("/Dashboard");
        })
        .catch(error => {
          if (error.message == "Request failed with status code 401") {
            this.error = "Email ou mot de passe incorrecte";
          } else {
            this.error = error+"Erreur serveur";
          }
        });
    },
    performSignup() {
      axios
        .post("http://139.99.238.74:221/api/auth/register", {
          email: this.semail,
          password: this.spassword,
          // eslint-disable-next-line @typescript-eslint/camelcase
          full_name: this.full_name,
          // eslint-disable-next-line @typescript-eslint/camelcase
          password_confirmation: this.spassword_confirmation
        })
        .then(res => {
          const token = localStorage.setItem(
            "token",
            res.data.user.original.token
          );
          const user = localStorage.setItem(
            "user",
            res.data.user.original.user
          );
          this.$router.push("/Dashboard");
        })
        .catch(err => {
          console.log(err.message);
          this.error = err.message;
        });
    }
  },
  props: {
    source: String
  }
};
</script>
<style scoped>
#inspire {
  background-image: url("~@/assets/loginbg.jpg");
  background-size: cover;
};
h2{
  color: #8c657e;
}
h4{
  color: #352a39;
}
</style>
