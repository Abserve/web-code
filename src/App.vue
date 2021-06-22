<template>
<div>
  <HelloWorld v-if="['Tunisie'].includes($route.name)"></HelloWorld>
 <v-card  v-else>
  <v-app>
    <v-main>
        <Navbar2  v-if="!['login'].includes($route.name)  &&  !['Tunisie'].includes($route.name)"></Navbar2>
      <barup  v-if="!['login'].includes($route.name)  &&  !['Tunisie'].includes($route.name)"></barup>
            <router-view></router-view>
     </v-main>
  <div v-if="['Tunisie'].includes($route.name) ">
    <h1>cromba</h1>
  </div>
  </v-app>
 </v-card>
 </div>
</template>

<script lang="ts">
import Vue from "vue";


import Navbar2 from "./components/Navbar2.vue";
import Barup from "./components/Barup.vue";
import HelloWorld from "./views/HelloWorld.vue";

export default Vue.extend({
  name: "App",
  components: {
     Navbar2,
    Barup,
    HelloWorld,

  },
  data: () => ({
    //
  }),
 
   
})
</script>
<style scoped>
template{
  margin:30px;
}
</style>
