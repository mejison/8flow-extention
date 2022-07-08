import Vue from 'vue'
import App from '../view/options/index.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database';
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCd60c2M34eatzFUT282nEAfuzwLB5Ttpk",
  authDomain: "flow-extention.firebaseapp.com",
  projectId: "flow-extention",
  storageBucket: "flow-extention.appspot.com",
  messagingSenderId: "626171795152",
  appId: "1:626171795152:web:eee74958e3624e01b330d5",
  measurementId: "G-QTYD5K1WQG"
};

firebase.initializeApp(firebaseConfig);


import "../assets/main.css"

new Vue({
  render: (h) => h(App)
}).$mount('#app')
