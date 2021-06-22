<template>
<div id="app">
  <v-app id="inspire">
    <v-container fluid>
      <v-flex>
        <v-layout row wrap>
          <v-flex v-for="person in newPeople" :key="person.md5" xs12 sm4 md4 mr-4 mb-5>
            <v-card color="white" class="blue-grey--text elevation-0">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="title"><b>{{ person.name.first }} {{ person.name.last}}</b></div>
                     <br> <div><b>User: </b>{{ person.login.username }}</div>
                      <div><b>Address: </b>{{ person.location.street }}</div>
                      <div><b>City: </b>{{ person.location.city }}</div>
                      <div><b>State: </b>{{ person.location.state }}</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      :src="person.picture.large"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="blue-grey darken-4" @click.native="person.show = !person.show">View personal data</v-btn>
              
              </v-card-actions>
              <v-slide-y-transition>
                <v-card-text v-show="person.show">
                  <div class="text-lg-right"><b>DOB: </b>{{ person.dob }}</div>
                  <div class="text-lg-right"><b>Registered: </b>{{ person.registered }}</div>
                  <div class="text-lg-right"><b>Phone: </b>{{ person.phone }}</div>
                  <div class="text-lg-right"><b>Cell: </b>{{ person.cell }}</div>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </v-app>
</div>
</template>
<script>
export default{
  mounted(){
    this.addShow()
  },
  methods: {
    addShow() {
      this.newPeople = this.people.map(people => ({
        ...people,
        show: false
      })) 
    }
  },
  data: () => ({
    newPeople: [],
    people: [
{
"gender": "male",
"name": {
"title": "mr",
"first": "xavier",
"last": "wood"
},
"location": {
"street": "4525 cumberland street",
"city": "rotorua",
"state": "southland",
"postcode": 66345
},
"email": "xavier.wood@example.com",
"login": {
"username": "whitewolf428",
"password": "1234",
"salt": "JkNaC6Sn",
"md5": "9f786097a5d539d54745929ca69ea6d3",
"sha1": "e3718a9dbb7fa49dee2005e6361bd26a034e6f09",
"sha256": "192608fd77a201c4f500e447928accaccc43e53d1d18583d485791c2118a79ec"
},
"dob": "1961-03-22 05:22:35",
"registered": "2010-05-26 11:10:04",
"phone": "(053)-458-5967",
"cell": "(668)-771-4698",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/75.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
},
"nat": "NZ"
},
{
"gender": "female",
"name": {
"title": "miss",
"first": "sedef",
"last": "erkekli"
},
"location": {
"street": "7297 maçka cd",
"city": "yalova",
"state": "erzurum",
"postcode": 60982
},
"email": "sedef.erkekli@example.com",
"login": {
"username": "orangegorilla184",
"password": "snuffy",
"salt": "s9funw0h",
"md5": "baaf5ddc06d3863bd20d152de31482d5",
"sha1": "040e9573ddd963a45a091611f0ff9362964baf99",
"sha256": "b24971a7e452911eafa9510812ad38591c02724461e4cdaf28f190ee9c362a1b"
},
"dob": "1972-10-09 11:02:12",
"registered": "2003-11-14 13:54:57",
"phone": "(205)-635-3801",
"cell": "(883)-677-1018",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/28.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/28.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/28.jpg"
},
"nat": "TR"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "dominic",
"last": "harcourt"
},
"location": {
"street": "2336 bay ave",
"city": "tecumseh",
"state": "alberta",
"postcode": 21030
},
"email": "dominic.harcourt@example.com",
"login": {
"username": "beautifulswan232",
"password": "654321",
"salt": "WeJjndkZ",
"md5": "8fd2b7fbdeb28e109bd0000c9d92390b",
"sha1": "61cf20e8b65d3278f0b1e2b20b3e8aa608756512",
"sha256": "950142dfb7c5552dfe6e8c893cf99ffefea7b5f538240bc55400ec447a49abc7"
},
"dob": "1983-07-23 09:07:37",
"registered": "2015-09-27 20:21:37",
"phone": "131-629-3959",
"cell": "441-748-8421",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/2.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/2.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/2.jpg"
},
"nat": "CA"
},
{
"gender": "female",
"name": {
"title": "mrs",
"first": "lya",
"last": "fabre"
},
"location": {
"street": "4129 rue louis-garrand",
"city": "rouen",
"state": "loir-et-cher",
"postcode": 38926
},
"email": "lya.fabre@example.com",
"login": {
"username": "orangeelephant626",
"password": "duncan",
"salt": "hKgmdP3C",
"md5": "fdac99a4599c08e7c0720356050e6116",
"sha1": "bfe096751d0e9f65d442118a038105230fa522a5",
"sha256": "15df5caea7f401ee6336f886bd21e2db3da612d987b1284e4f894dd85bc2ceae"
},
"dob": "1946-06-18 09:03:29",
"registered": "2003-04-01 00:27:30",
"phone": "02-18-12-56-07",
"cell": "06-13-96-06-89",
"id": {
"name": "INSEE",
"value": "246572005259 25"
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/95.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/95.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/95.jpg"
},
"nat": "FR"
},
{
"gender": "female",
"name": {
"title": "mrs",
"first": "نازنین",
"last": "رضاییان"
},
"location": {
"street": "3907 آفریقا",
"city": "همدان",
"state": "تهران",
"postcode": 43333
},
"email": "نازنین.رضاییان@example.com",
"login": {
"username": "organicmouse164",
"password": "patty",
"salt": "uT0bOa53",
"md5": "32b1d359a70c3adcd28b437c030c6389",
"sha1": "053cd32845076d7f9b81cbbc6d2050d1c59b85cb",
"sha256": "bd1a934c433d62c44e91f6bc06c60bd52eae729210bac53571c628de32064c41"
},
"dob": "1969-01-13 23:35:59",
"registered": "2015-09-12 02:36:34",
"phone": "080-33347300",
"cell": "0970-138-8998",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/4.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/4.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/4.jpg"
},
"nat": "IR"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "gonçalo",
"last": "souza"
},
"location": {
"street": "8512 rua vinte de setembro",
"city": "barreiras",
"state": "pernambuco",
"postcode": 79014
},
"email": "gonçalo.souza@example.com",
"login": {
"username": "blackswan829",
"password": "saturday",
"salt": "awTsDsmO",
"md5": "2b5c2a035851a1be9f003742504b655f",
"sha1": "09906f2e1e36526f5b6ddc65fa26952724cb24f0",
"sha256": "7cdd9336adce6815eda6199019882db48dd4985d2fe683733409d6ad00194586"
},
"dob": "1962-03-16 09:06:16",
"registered": "2006-03-30 07:16:55",
"phone": "(02) 7445-0822",
"cell": "(88) 5916-7148",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/33.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/33.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/33.jpg"
},
"nat": "BR"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "jose",
"last": "diez"
},
"location": {
"street": "1210 calle de ángel garcía",
"city": "logroño",
"state": "melilla",
"postcode": 71754
},
"email": "jose.diez@example.com",
"login": {
"username": "ticklishfrog303",
"password": "lips",
"salt": "0Wr1XHB4",
"md5": "95b64dafb61505c4c79afb6c3ba330ff",
"sha1": "06b2629f92b3adb5196596f6b802cabeaa448cbb",
"sha256": "aac3ff3ab916f8a46bf086326bcad757cb5f6165532d90da74720496d3385f8b"
},
"dob": "1984-05-22 14:00:34",
"registered": "2006-08-04 21:56:02",
"phone": "952-412-693",
"cell": "633-361-753",
"id": {
"name": "DNI",
"value": "40134053-L"
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/69.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/69.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/69.jpg"
},
"nat": "ES"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "tristan",
"last": "slawa"
},
"location": {
"street": "4503 22nd ave",
"city": "killarney",
"state": "manitoba",
"postcode": 39493
},
"email": "tristan.slawa@example.com",
"login": {
"username": "crazygoose680",
"password": "darkange",
"salt": "d7U4kibK",
"md5": "eb5ea45aee02cebb21ef1c2a50cf64d3",
"sha1": "9a6a623b1988325829014067ed1de83cce35ce4c",
"sha256": "febde1e901abfceb9ab602d0cf8c9de9399443a8ef5c80759bb596c693093ca4"
},
"dob": "1968-11-25 11:51:42",
"registered": "2004-07-08 16:18:28",
"phone": "593-830-3664",
"cell": "549-409-1058",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/93.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/93.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/93.jpg"
},
"nat": "CA"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "vedat",
"last": "toraman"
},
"location": {
"street": "1498 bağdat cd",
"city": "kilis",
"state": "bolu",
"postcode": 85016
},
"email": "vedat.toraman@example.com",
"login": {
"username": "whitemeercat972",
"password": "kenny1",
"salt": "Pb1nZ0ac",
"md5": "8d8c9146e3da7416055e84d5a196181f",
"sha1": "4fe897ff63678012a74284c8d7da27c3dfc8f4e6",
"sha256": "4b0856ebe9a042de294a9427c5cf77989780ad055cf2e686c582bd19a863dfe8"
},
"dob": "1970-01-22 16:19:24",
"registered": "2004-12-17 16:08:59",
"phone": "(662)-870-3432",
"cell": "(870)-851-4711",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/84.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/84.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/84.jpg"
},
"nat": "TR"
},
{
"gender": "female",
"name": {
"title": "miss",
"first": "mathilda",
"last": "dittrich"
},
"location": {
"street": "9062 birkenweg",
"city": "oder-spree",
"state": "sachsen-anhalt",
"postcode": 64403
},
"email": "mathilda.dittrich@example.com",
"login": {
"username": "heavyduck980",
"password": "caramel",
"salt": "Lburygni",
"md5": "c96643adc73af8cedd2b6b2c9e114af2",
"sha1": "22ae2abf89c79370c0d87a15050c5396c9c0ca00",
"sha256": "bc03e1c6dc69fb5249b4d23548a922af42ecd94971418d3fb1433fa1239aa768"
},
"dob": "1950-07-20 20:41:58",
"registered": "2007-03-26 02:55:14",
"phone": "0755-3725836",
"cell": "0174-3168399",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/11.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/11.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/11.jpg"
},
"nat": "DE"
},
{
"gender": "female",
"name": {
"title": "miss",
"first": "gabriella",
"last": "zwiggelaar"
},
"location": {
"street": "3683 keizerstraat",
"city": "schinnen",
"state": "zuid-holland",
"postcode": 17074
},
"email": "gabriella.zwiggelaar@example.com",
"login": {
"username": "blackgorilla270",
"password": "respect",
"salt": "ZLINNIFn",
"md5": "02913248e9b560bf75a6efc5f86dfcba",
"sha1": "36972c21234fd68d284a2cb2aa45c48cbd75f3da",
"sha256": "a491724190dbb641e484abfa72848d4b9ef0e1fba52e6387b2a2d88b1f2f6c1b"
},
"dob": "1957-09-20 06:57:18",
"registered": "2016-07-10 20:05:35",
"phone": "(618)-862-8024",
"cell": "(945)-885-9289",
"id": {
"name": "BSN",
"value": "90849268"
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/38.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/38.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/38.jpg"
},
"nat": "NL"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "wade",
"last": "larson"
},
"location": {
"street": "3893 college st",
"city": "launceston",
"state": "tasmania",
"postcode": 9952
},
"email": "wade.larson@example.com",
"login": {
"username": "orangebutterfly404",
"password": "speedo",
"salt": "xR2cRflO",
"md5": "bad09cabea1f9fa1db691d7426c04910",
"sha1": "a30001e34bcbb159c6b8d2a98b35ad98058817f0",
"sha256": "1e60fd709e16b6ad3f5dae1faa0db0fa760954c3d581d680ec9d90f2fbbce879"
},
"dob": "1947-07-23 22:02:48",
"registered": "2006-11-29 05:16:34",
"phone": "00-6074-1076",
"cell": "0415-786-018",
"id": {
"name": "TFN",
"value": "304509045"
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/37.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/37.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/37.jpg"
},
"nat": "AU"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "brian",
"last": "dean"
},
"location": {
"street": "3035 washington ave",
"city": "warragul",
"state": "australian capital territory",
"postcode": 8558
},
"email": "brian.dean@example.com",
"login": {
"username": "organiccat131",
"password": "soccer10",
"salt": "GjG1zYt0",
"md5": "19be9ac2fcade04b2e04f1d4429c07e5",
"sha1": "2d6f05ad5c7266d5d173ede9005b21886037f3f8",
"sha256": "52deb9453e185e2337296696f46075ebf49bbcc9ad7c26fbced3ac367378ad01"
},
"dob": "1976-02-09 17:35:27",
"registered": "2003-04-04 18:31:54",
"phone": "07-1980-9040",
"cell": "0423-164-752",
"id": {
"name": "TFN",
"value": "514754488"
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/50.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/50.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/50.jpg"
},
"nat": "AU"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "elmer",
"last": "hall"
},
"location": {
"street": "8465 hogan st",
"city": "sunshine coast",
"state": "south australia",
"postcode": 4354
},
"email": "elmer.hall@example.com",
"login": {
"username": "brownpeacock747",
"password": "freaks",
"salt": "e1Pe5Izz",
"md5": "5b02278adf174aa26328ea311314e0cd",
"sha1": "3f6ade7db78c47026fd2baa46088e9812d0133e1",
"sha256": "c3e98b46d236c7dcbd08f815f5cf9993d2ed80b6077f53ab95a1fd28c48a3eca"
},
"dob": "1985-09-17 15:10:21",
"registered": "2002-09-02 14:56:25",
"phone": "02-1761-5288",
"cell": "0451-288-421",
"id": {
"name": "TFN",
"value": "357135086"
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/62.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/62.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
},
"nat": "AU"
},
{
"gender": "female",
"name": {
"title": "miss",
"first": "walesca",
"last": "araújo"
},
"location": {
"street": "2112 rua mato grosso ",
"city": "cachoeirinha",
"state": "rio de janeiro",
"postcode": 43459
},
"email": "walesca.araújo@example.com",
"login": {
"username": "heavymouse624",
"password": "rebel",
"salt": "39qmqphN",
"md5": "ee9a0449021c7b08b27d8937a4b0caba",
"sha1": "393092ffd47b8c7b8eaa169002bc40d022bb55bc",
"sha256": "f5e3e338dcbdad0dd3a17db9d6a9860237aa56a12c4624fa9a52bd914e2f717d"
},
"dob": "1950-11-17 21:45:54",
"registered": "2009-02-08 12:26:36",
"phone": "(78) 9918-7355",
"cell": "(46) 1918-2457",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/0.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/0.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/0.jpg"
},
"nat": "BR"
},
{
"gender": "female",
"name": {
"title": "ms",
"first": "dolores",
"last": "romero"
},
"location": {
"street": "7731 mcgowen st",
"city": "tempe",
"state": "alaska",
"postcode": 13292
},
"email": "dolores.romero@example.com",
"login": {
"username": "greentiger623",
"password": "trample",
"salt": "9pZkSlPP",
"md5": "9727ae5ec8e676a5792339bd17b5eb8c",
"sha1": "d5915c2d8ea571a462f6df94dd62cd79e4bd1cad",
"sha256": "b939581e01287810fbffa2933061dd82393d1de8f4e48f22691e6f218f4d5a61"
},
"dob": "1947-02-28 19:58:51",
"registered": "2002-07-02 01:12:46",
"phone": "(410)-302-0920",
"cell": "(525)-059-6124",
"id": {
"name": "SSN",
"value": "601-50-9003"
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/15.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/15.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/15.jpg"
},
"nat": "US"
},
{
"gender": "male",
"name": {
"title": "monsieur",
"first": "nolhan",
"last": "olivier"
},
"location": {
"street": "5211 place de la mairie",
"city": "morges 1",
"state": "schwyz",
"postcode": 9925
},
"email": "nolhan.olivier@example.com",
"login": {
"username": "orangegorilla556",
"password": "blink",
"salt": "rotOCHuh",
"md5": "1c15a23f5af43adbbd912f60a14cbaf6",
"sha1": "ae33cc6d4b4d38a516fc662d65e24c9aeadf4ded",
"sha256": "f01fb391081a9bbb8dd6adafab37446df367ee4fff4788a132d014b0f6c6d035"
},
"dob": "1988-05-07 17:18:52",
"registered": "2009-07-27 03:50:06",
"phone": "(716)-535-4757",
"cell": "(280)-574-4586",
"id": {
"name": "AVS",
"value": "756.MNHX.VBUC.69"
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/34.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/34.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/34.jpg"
},
"nat": "CH"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "ryan",
"last": "fortin"
},
"location": {
"street": "6340 st. catherine st",
"city": "georgetown",
"state": "québec",
"postcode": 52108
},
"email": "ryan.fortin@example.com",
"login": {
"username": "bluewolf403",
"password": "marcus",
"salt": "vXI3MTLM",
"md5": "e0af39e1d1cd7b60b992439547fccadb",
"sha1": "df6105594e794d02558257e82d61a8cbb1aa3956",
"sha256": "20ab0e4096b051fab9ffb3b13ffaddd21368f74b1c87e27e6f6defd570c1a7de"
},
"dob": "1980-05-15 23:55:29",
"registered": "2009-06-19 21:06:47",
"phone": "219-861-4440",
"cell": "319-648-8021",
"id": {
"name": "",
"value": null
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/63.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/63.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
},
"nat": "CA"
},
{
"gender": "male",
"name": {
"title": "mr",
"first": "eemeli",
"last": "lehtonen"
},
"location": {
"street": "4996 pirkankatu",
"city": "taipalsaari",
"state": "tavastia proper",
"postcode": 82998
},
"email": "eemeli.lehtonen@example.com",
"login": {
"username": "whitepeacock120",
"password": "alice1",
"salt": "09tDqZKw",
"md5": "fd1a0831476ca6bcade22adfab54e130",
"sha1": "b6ac2aac9df9b0ad493380cde82e80d1a9426845",
"sha256": "29744802f1a50e18a66fa769244ef7d9b528c1fff5f733a37e3298154418a690"
},
"dob": "1977-02-01 22:13:16",
"registered": "2006-03-03 20:09:26",
"phone": "02-527-763",
"cell": "044-796-03-43",
"id": {
"name": "HETU",
"value": "377-4637"
},
"picture": {
"large": "https://randomuser.me/api/portraits/men/1.jpg",
"medium": "https://randomuser.me/api/portraits/med/men/1.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/men/1.jpg"
},
"nat": "FI"
},
{
"gender": "female",
"name": {
"title": "mrs",
"first": "amalie",
"last": "pedersen"
},
"location": {
"street": "9344 gurrevej",
"city": "pandrup",
"state": "midtjylland",
"postcode": 67496
},
"email": "amalie.pedersen@example.com",
"login": {
"username": "crazymeercat378",
"password": "fiddle",
"salt": "xTmXoved",
"md5": "bf9410314c8983f58de594d80cda12ad",
"sha1": "dd516b6e4db433857be504740d457186e6fb4869",
"sha256": "a6e42dc788d5e0153ffaecfb253f436dbf2a22349254cd91f8e2bfb3ac4226ba"
},
"dob": "1975-10-27 04:29:13",
"registered": "2012-12-24 13:29:51",
"phone": "04537868",
"cell": "84593506",
"id": {
"name": "CPR",
"value": "488186-8006"
},
"picture": {
"large": "https://randomuser.me/api/portraits/women/73.jpg",
"medium": "https://randomuser.me/api/portraits/med/women/73.jpg",
"thumbnail": "https://randomuser.me/api/portraits/thumb/women/73.jpg"
},
"nat": "DK"
}
]
  })
};
</script>