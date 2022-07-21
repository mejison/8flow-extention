import Vue from 'vue'
import App from '../view/popup/index.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database';
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDWnAPpa_wKCAeneN2FoSPNGjQ8lIfCTTc",
  authDomain: "flow-extension.firebaseapp.com",
  projectId: "flow-extension",
  storageBucket: "flow-extension.appspot.com",
  messagingSenderId: "966140707617",
  appId: "1:966140707617:web:35dddf6c4e2e97f113f460"
};

firebase.initializeApp(firebaseConfig);

import "../assets/main.css"

import store from '../store';

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
