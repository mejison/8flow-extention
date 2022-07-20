<template>
  <div class="main_app" v-if="view">
    {{ items }}
    <component 
        :is="view"
        :user="user"
        @go-to="goTo"
    ></component>
  </div>
</template>

<script>
import welcome from './welcome'
import register from './register'
import login from './login'
import dashboard from './dashboard'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database';

export default {
    name: 'popupView',

    created() {
        firebase.auth().onAuthStateChanged(user =>  {
            this.goTo(user ? 'dashboard' : 'welcome');
            this.user = user;
        });
    },

    data() {
        return {
            view: '',
            user: null,
        }
    },

    methods: {
        goTo(view) {
            this.view = view
        },
    },

    components: {
        welcome,
        register,
        login,
        dashboard,
    },
}
</script>