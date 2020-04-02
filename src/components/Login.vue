<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in
		<router-link to="/register" :class="buttonClass('/register')">
			Register
			<i id="space" class="fa fa-th-large" aria-hidden="true"></i>
		</router-link>
	 </h1>
     <label>Username</label>
     <input required v-model="username" type="text" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
	 <button type="submit">Login</button>
		<span v-if="error">{{error}}</span>
   </form>
 </div>
</template>
<script>
	import { mapActions } from "vuex"
	export default {
		data(){
			return {
				username : "",
				password : "",
				error: ""
            }
		},
		methods: {
			...mapActions(["loginUser"]),
		 	login: function () {
		   		let username = this.username
		   		let password = this.password
		   		this.loginUser( { username, password })
		   		.then(() => this.$router.push('/board'))
		   		.catch(err => {
					   console.log(err)
					   this.error = `Unable to log in with provided credentials. Please try again`
				   })
			   },
			   buttonClass( path )
			{
				return {
					btn: true,
					'btn-primary': this.$route.path === path
				};
			}
		}
	}
</script>

<style>
	label {
		margin: 5px;
	}
	.btn {
		color: rgb(252, 161, 128);
	}
</style>