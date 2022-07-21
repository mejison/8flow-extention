<template>
    <div class="dashboard">
        <a href="#" class="success" v-show="message">{{ message }}</a>
        <component :is="page"></component>
        <!-- <button class="btn btn-primary" :class="{'disabled': submited}" @click="createNewIncident" :disabled="submited">New Incident</button> -->
        <button class="btn" @click="signOut">Logout</button>
    </div>
</template>

<script>
    import firebase from 'firebase/compat/app'
    import 'firebase/compat/auth';
    import 'firebase/compat/database';

    import * as api from '../../api'

    import scrap from '../../pages/scrap.vue'

    export default { 
        name: 'dashbaord',

        components: {
            scrap
        },

        props: ['user'],

        data() {
            return {
                page: 'scrap',
                message: '',
                submited: false,
            }
        },

        methods: {
            createNewIncident() {
                this.submited = true;
                api.insertToTable('incident', {
                    "description": JSON.stringify({"requested_for": { 
                        email: this.user.email,
                        name: this.user.displayName,
                     }}),
                }).then(() => {
                    this.message = "Successfuly inserted";
                    this.submited = false;
                    setTimeout(() => {
                        this.message = "";
                    }, 3000);
                }).catch(() => {
                    this.submited = false;
                })
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$emit('go-to', 'welcome');
                    });
            }
        }
    }
</script>

<style>
    .dashboard {
        display: flex;
        flex-direction: column;
    }

    .dashboard .btn {
        margin-bottom: 15px;
    }

    .dashboard a {
        margin-bottom: 15px;
    }
</style>