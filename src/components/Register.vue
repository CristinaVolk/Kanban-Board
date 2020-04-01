<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="name">Username</label>
            <div>
                <input id="name" type="text" v-model="username" required autofocus>
            </div>

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email">
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
    import { mapActions } from "vuex"

    export default {
        data(){
            return {
                username : "",
                email : "",
                password : ""
            }
        },
        methods: {
            ...mapActions(['registerUser']),
            register: function ()
                {
                    let user = {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    }
                    this.registerUser( user )
                        .then( () => this.$router.push( '/board' ) )
                        .catch( err => console.log( err ) )
                },
        }
    }
</script>
