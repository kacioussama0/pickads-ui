<script >
import {fetchAPI} from "../axios.js";
import CInput from "../components/CInput.vue";
import CButton from "../components/CButton.vue";

export default  {
  components: {CButton, CInput},
  data() {
    return {
      username: {
        value: '',
        valid: false,
      },
      password: {
        value: '',
        valid: false,
      },
      errors: ''
    }
  },
  methods: {
    submit() {
      if(this.valid) {

        fetchAPI.post('/login', {
          'username': this.username.value,
          'password': this.password.value,
        }).then(response => {
          localStorage.setItem('token',response.data['access_token']);
          this.$store.dispatch('user',response.data.user)
          this.$router.push('/influencers')
        }).catch(error => {
          this.errors = error.response.data.message
        })

        }
      },
    update(data) {
      this[data.name] = data
    },
  },
  computed: {
    valid() {
      return this.username.valid && this.password.valid
    },
    loginError() {
      return this.errors
    }
  }
}

</script>

<template>

          <div class="login d-flex flex-column align-items-center justify-content-center">

              <div class="container">

                <img src="/logo-white.svg" alt="logo white" class="w-25 d-block mx-auto  my-5">

                <div class="card mx-auto rounded-4 " style="max-width: 600px">

                  <div class="card-body p-5">

                    <h1 class="mb-4">Se Connecter</h1>

                    <div class="alert alert-danger" v-if="loginError">
                      {{loginError}}
                    </div>

                    <form action="" @submit.prevent.stop="submit" class="vstack gap-2 text-dark">
                      <c-input :rules="{required: true, min: 8, max:25}" type="text" name="Username" id="username" @onUpdate="update" :value="username.value"/>
                      <c-input :rules="{required: true, min: 8, max:25}" type="password" name="Password" id="password" @onUpdate="update" :value="password.value"/>
                      <c-button title="Login"  class="btn-gradient" :disabled="!valid"/>
                    </form>
                    <router-link to="/forget-password" class="mt-3 d-block">Forget Password ?</router-link>
                  </div>

                </div>

              </div>

            <router-link to="/" class="mt-3 d-block  btn btn-outline-light">Return To Home</router-link>

          </div>

</template>
<style scoped>

.login {
  height: 100vh;
  background-image: url("../assets/imgs/bg-login.JPG");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
}

.login::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: var(--bs-dark);
  position: absolute;
  top: 0;
  left: 0;
  opacity: .9;
  z-index: -1;
}

</style>