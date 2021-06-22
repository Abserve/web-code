import Vue from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import colors from 'vuetify/lib/util/colors'

import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#119DA4",
        secondary: "#171b34",
        accent: "3D87E4",
        bar: "#966495",
        btn:"#3F51B5",
        optap:"indigo",
        dateop:"#194350",
        
      },
      dark: {
        primary: colors.blue.lighten3,
        background: colors.indigo.base,
        grey:"#000000",
        bar:"#000000",
        aaab:"black",
        btn:"#3F51B5",
        optab:"#263238",
        dateop:"white"
      }
    }
  },
  icons: {
    iconfont: "md" || "fa"
  },
});
