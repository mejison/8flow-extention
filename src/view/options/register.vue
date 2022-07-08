<template>
    <div>
        <a href="#" @click.prevent="$emit('go-to', 'welcome')" class="go-back">Go back</a>
        <form class="auth-form" @submit.prevent="onSubmit">
            <div>
                <input 
                    type="text" 
                    name="name"
                    class="field" 
                    v-model="form.name" 
                    placeholder="Name" 
                />
            </div>
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
                Register
            </button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database';

import * as api from '../../api'

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
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
            this.message = 'Successfuly signup!';
            this.hasError = false;

            data.user
                .updateProfile({
                    displayName: this.form.name
                })
                .then(() => {
                    api.insertToTable('sys_user', {
                      name: data.user.displayName,
                      user_name: data.user.displayName,
                      first_name: data.user.displayName,
                      email: data.user.email,
                    }).then(() => {
                      this.$emit('go-to', 'dashboard');
                    })
                });
        })
        .catch(err => {
          this.message = err.message;
          this.hasError = true;
        });
    }
  }
};
</script>