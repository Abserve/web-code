<template>
<div  v-bind:style="[drawer ? {'margin-left':'100px'} : {'margin-left': '10px'}]">
  <div class="container">
  <h4 class="display-1" style="font-size: 2rem;">Bienvenue {{name.full_name}}</h4>
  
  <p class="">AB Serve dashboard</p>
  
<div class="row">
  <div class="col-md-4">
    <a class="datcard my-3" @click="miss">
      <span style="color:white;" class="h4">Gestion des Missions</span>
      <h1/>
      <br/>
      <p>Cliquer ici pour accéder aux missions</p>
      <div class="go-corner">
      </div>
    </a>
  </div>
  <div class="col-md-4">
    <a class="datcard my-3" @click="ussers">
      <span style="color:white;" class="h4">Gestion des Clients</span>
      <h1/>
      <br/>
      <p>Consulter vos clients</p>
      <div class="go-corner">
      </div>
    </a>
  </div>
  <div class="col-md-4">
    <a class="datcard my-3" @click="op">
      <span style="color:white;" class="h4">Gestion des utilisateurs</span>
      <h1/>
      <br/>
      <p>Gérer les utilisateurs</p>
      <h1/>
      <br/>
      <div class="go-corner">
      </div>
    </a>
  </div>
</div>
  <div class="row">
    <div class="col-md-4 col-lg-6">
            <div class="wrimagecard wrimagecard-topimage">
              <div class="wrimagecard-topimage_header">
                <i class="fas fa-users cardIcon"></i>
              </div>
              <div class="wrimagecard-topimage_title h-140">
                <h2 class="h4 text-center">
                  Actualités
                </h2>
                <p>Les actualités d’AB Serve en lien avec le développement de l’entreprise</p>
              </div>
              <div class="card-action-bar">
                <a class="float-lg-none link" href="https://ab-serve.com/fr/rse-ab-serve-choisit-leco-paturage/">Voir plus</a>
              </div>
            </div>
          </div>
    <div class="col-md-4 col-lg-6">
            <div class="wrimagecard wrimagecard-topimage">
              <div class="wrimagecard-topimage_header">
                <i class="fas fa-desktop cardIcon"></i>
              </div>
              <div class="wrimagecard-topimage_title h-140">
                <h2 class="h4 text-center">
                  Site Officiel
                </h2>
                <p>Site officiel AB Serve France</p>
              </div>
              <div class="card-action-bar">
                <a class="float-right link" href="https://ab-serve.com/fr/">Voir plus</a>
              </div>
            </div>
          </div>
    
  </div>
   
</div>
</div>
</template>

<script> 

export default{
methods:{
  miss(){
    this.$router.push('/missions')
  },
  ussers(){
    this.$router.push('/Clients')
  },
  op(){
    this.$router.push('/employees')
  },
},
     		computed: {
          drawer: {
                  get() {
                    return this.$store.getters.drawer;
                  },
                },
          name: {
                  get() {
                    return this.$store.getters.getUser;
                  },
                },
		},
}
</script>
<style scoped>
.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: rgb(224, 102, 36);
  border-radius: 0 4px 0 32px;
}

span {
  color: white;
}
.datcard {
  height: 10em;
      color: white;
    display: block;
    font-family: sans-serif;
    position: relative;
    background-color: #062a57;
    border-radius: 4px;
    padding: 1em;
    z-index: 0;
    overflow: hidden;
    text-decoration: none !important;
}

.datcard:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: rgb(224, 102, 36);
  height: 1em;
    width: 1em;
  border-radius: 100%;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.25s ease-out;
}

.datcard:hover:before {
  transform: scale(45);
}

.datcard:hover p {
  transition: all 0.3s ease-out;
  color: rgb(255, 255, 255);
  color: rgba(255, 255, 255, 0.8);
}

.cardImg {
  background-color: #03244d;
  color: #03244d;
}

.cardIcon {
  color: #03244d;
}

.background-color {
  color: rgba(3, 36, 77, 0.1);
}

.invisible {
  display: none;
}

.visible {
  display: block;
}
.grid {
  background-color: #ffffff;
  border-radius: 10px 10px / 0px 0px;
  margin-bottom: 20px;
}

#pageHeader {
  margin-top: 25px;
  margin-bottom: 25px;
}
.gridHeader {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  margin-bottom: 10px;
}

.gridHeaderTxt {
  color: #000000;
  padding: 10px 0px;
}

.gridRow {
  padding-bottom: 25px;
}

.cardImg {
  background-color: #f4f4ff;
  color: #65377b;
  padding: 25px;
}

.link {
  color: #727375;
  padding: 17px 0px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}

.link100 {
  color: #727375;
  padding: 17px 0px;
  width: 100% !important;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}

.link:hover {
  background-color: #f1f1f1;
  color: #03244d;
  transition: background 0.5s ease;
}

.link100:hover {
  background-color: #f4f4ff;
  color: #000000;
  transition: background 0.5s ease;
}

.card-action-bar {
  display: flex;
  border-top: 1px solid #e0e0e0;
  width: 100%;
}

.center {
  text-align: center;
}

.wrimagecard {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  background: #fff;
  box-shadow: 0 15px 20px 0px rgba(46, 61, 73, 0.15);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.wrimagecard .far {
  position: relative;
  font-size: 70px;
}

.wrimagecard .fas {
  position: relative;
  font-size: 70px;
}

.wrimagecard-topimage_header {
  background-color: rgba(3, 36, 77, 0.1);
  padding: 20px;
}

a.wrimagecard:hover,
.wrimagecard-topimage:hover {
  box-shadow: 2px 4px 8px 0px rgba(46, 61, 73, 0.2);
}

.wrimagecard-topimage a {
  height: 100%;
  display: block;
}

.wrimagecard-topimage_title {
  padding: 20px 24px;
  height: 80px;
  padding-bottom: 0.75rem;
  position: relative;
}

.wrimagecard-topimage a {
  border-bottom: none;
  text-decoration: none;
  color: #525c65;
  transition: color 0.3s ease;
}

.h-140 {
  height: 140px !important;
}

#navBtns {
  width: 100%;
}

/*modal */
.modalHeader {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  width: 100%;
  text-align: center;
}

.closeModalLink100 {
  color: #727375;
  padding: 17px 0px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}

.closeModalLink100:hover {
  background-color: #fff0d9;
  color: #03244d;
  transition: background 0.5s ease;
}

.modal-body {
  padding-left: 1.3rem;
  padding-right: 1.3rem;
}

.modalFooter {
  display: flex;
  border-top: 1px solid #e0e0e0;
  width: 100%;
}

.bg-g {
  padding: 7px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

    .app {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(10em,1fr));
        justify-items: center;
    }

    .display-4 {
        font-size: 1.5rem;
    }

    .card.tile {
        height: 10em;
        width: 10.75em;
        text-align: center;
    }

        .card.tile:hover {
            box-shadow: 0 0 1rem 0 #00000040;
            transform: scale(1.05);
        }


    .bg-secondary-orange {
        background-color: #f68026;
    }

    .top {
        display: flex;
        justify-content: space-between;
    }

    .topper {
        padding: 0;
        height: .5rem;
    }

    a {
        text-decoration: none !important;
    }

        a.btn.btn-info.btn-sm {
            justify-content: center;
        }

    .top {
        align-items: baseline;
    }

span.fa-3x.mb-auto.mt-auto {
    color: black;
}
</style>