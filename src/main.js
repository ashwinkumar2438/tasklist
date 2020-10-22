import Vue from 'vue'
import App from './App.vue'
import modal from "@/components/modal.vue";

Vue.config.productionTip = false

Vue.component("modal-block",modal);

export default new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
