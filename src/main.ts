import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";
import IndicatorsCore from "highcharts/indicators/indicators";

Stock(Highcharts);
IndicatorsCore(Highcharts);
Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
