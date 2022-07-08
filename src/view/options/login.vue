<template>
    <div>
        <a href="#" @click.prevent="$emit('go-to', 'welcome')" class="go-back">Go back</a>
        <form class="auth-form" @submit.prevent="onSubmit">
            <div>
                <input 
                    type="email" 
                    name="email"
                    class="field" 
                    v-model="form.email" 
                    placeholder="Email *" 
                />
            </div>
            <div>
                <input 
                    type="password" 
                    name="password"
                    class="field" 
                    v-model="form.password" 
                    placeholder="Password *" 
                />
            </div>
           <div v-if="message">
             <a href="#" :class="{'danger': hasError, 'success': ! hasError}">{{ message }}</a>
           </div>
            <button class="btn" @click.prevent="onSubmit">
                Login
            </button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database';

export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: ""
            },
            message: null,
            hasError: false,
        };
    },

    methods: {
        onSubmit() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    this.hasError = false;
                    this.message = 'Successfuly logged in!'
                     setTimeout(() => {
                        this.$emit('go-to', 'dashboard');
                    }, 1000);
                })
                .catch(err => {
                    this.message = err.message;
                    this.hasError = true;
                });
        }
    }
}
</script>