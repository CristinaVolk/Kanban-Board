<template>
  <div id="app">
    <div id="nav">
     <span v-if="isLoggedIn"></span>
      <a @click="logout">Logout</a>
      </div>
      <router-view></router-view>
  </div>
</template>
<script>
  import axios from "axios"
  import { mapGetters } from "vuex"

  export default {
    name: "App",
    computed: {...mapGetters( [ 'isLoggedIn' ] )},
    methods: {
      logout() {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    created () {
      this.$http.interceptors.response.use(function (response) {
        return response;
      }, function (error)
      {
        const originalRequest = error.config;
        if ( error.response.status === 401 && !originalRequest._retry )
        {
          originalRequest._retry = true;
          const refreshToken = window.localStorage.getItem( 'refreshToken' );
              return axios.post( 'https://trello.backend.tests.nekidaem.ru/api/v1/users/refresh_token/', { refreshToken } )
              .then( ( { data } ) =>
              {
                window.localStorage.setItem( 'token', data.token );
                window.localStorage.setItem( 'refreshToken', data.refreshToken );
                axios.defaults.headers.common[ 'Authorization' ] = data.token;
                originalRequest.headers[ 'Authorization' ] =data.token;
                return axios( originalRequest );
              } );
          }

          return Promise.reject( error );
        });
      }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  color: #e0e5ea;
}

#nav a {
  font-weight: bold;
  cursor: pointer;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
