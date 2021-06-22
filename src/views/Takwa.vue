<template>
  <div class="takwa">
    <nav-bar></nav-bar>

    <h1 style="margin-left: 170px; padding-top:15px;padding-right: 20px">This My new page :))))</h1>
    <my-footer></my-footer>
    <header></header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Takwa from "@/components/Footer.vue"; // @ is an alias to /src
import NavbarPage from "@/components/navbar.vue";
//import SideBar from "@/components/SideBar.vue";

@Component({
  components: {
    "my-footer": Takwa,
    "nav-bar": NavbarPage
    //"side-bar": SideBar
  }
})
export default class Home extends Vue {}
</script>
