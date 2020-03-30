<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>Username</label>
     <input required v-model="username" type="text" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
	 <button type="submit">Login</button>
		<span v-if="error">{{error}}
			<router-link to="/register" :class="buttonClass('/register')">
				Register
				<i id="space" class="fa fa-th-large" aria-hidden="true"></i>
			</router-link>
			</span>
   </form>
 </div>
</template>
<script>
	export default {
		data(){
			return {
				username : "",
				password : "",
				error: ""
            }
		},
		methods: {
		 	login: function () {
		   		let username = this.username
		   		let password = this.password
		   		this.$store.dispatch('login', { username, password })
		   		.then(() => this.$router.push('/board'))
		   		.catch(err => {
					   console.log(err)
					   this.error = `Unable to log in with provided credentials. Please try again or `
				   })
			   },
			   buttonClass( path )
			{
				return {
					btn: true,
					'btn-primary': this.$route.path === path,
					'btn-secondary': this.$route.path !== path
				};
			}
		}
	}
</script>