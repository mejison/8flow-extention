<template>
    <div class="dashboard">
        dashboard
        <button class="btn" @click="signOut">Logout</button>
    </div>
</template>

<script>
    import firebase from 'firebase/compat/app'
    import 'firebase/compat/auth';
    import 'firebase/compat/database';

    import * as api from '../../api'

    export default {
        name: 'dashbaord',

        props: ['user'],

        async created() {
            api.getFromTable('sys_user')
                .then((data) => {
                    console.log(data)
                });
        },

        methods: {
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
</style>