import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    options: {
      minifyTheme: function(css) {
        return process.env.NODE_ENV === "production"
          ? css.replace(/[\r\n|\r|\n]/g, "")
          : css;
      }
    },
    themes: {
      light: {
        primary: colors.purple.darken1,
        secondary: colors.purple,
        accent: colors.purple.lighten1
      }
    }
  }
});
