<script>
import {fetchAPI} from "../axios.js";
export default  {
  created() {
    fetchAPI.post('/password/reset',{'token': this.$route.params.token})
        .catch((error)=> {
          if(error.response.status == 400) {
            this.$router.push('/forget-password')
          }
        });
  },

  data() {
    return {
      password: '',
      password_confirmation: '',
      successMessage: '',
      failedMessage: ''
    }
  },
  methods: {
    submit() {
      fetchAPI.post('/password/reset',
          {
            'token': this.$route.params.token,
            'password': this.password,
            'password_confirmation': this.password_confirmation
          }
      )
          .then((res)=> {
            this.$router.push('/login')
          })

          .catch((error)=> {
            this.successMessage = '';
            this.failedMessage = error.response.data.msg;
          });

    }
  },
  computed: {
    success() {
      return this.successMessage;
    },
    failed() {
      return this.failedMessage;
    }
  }
}
</script>

<template>

  <div class="container">
    <div class="card p-3 border-0 shadow">

      <div class="card-body">

        <h1 class="text-center mb-4">Réinitialiser le mot de passe</h1>

        <form action="" @submit.prevent.stop="submit" class="vstack gap-2 text-dark">

          <div>
            <label for="password" class="form-label">
              <i class="bi bi-key"></i>
              Mot de passe
            </label>
            <input type="password" id="password" class="form-control" v-model="password" placeholder="*********" required>
          </div>

          <div>
            <label for="password_confirmation" class="form-label">
              <i class="bi bi-key"></i>
              Confirmation mot de passe
            </label>
            <input type="password" class="form-control" id="password_confirmation" v-model="password_confirmation" placeholder="*********" required>
          </div>

          <div>
            <button class="btn btn-primary w-100 text-light d-block mt-3 bg-gradient rounded-pill border-0">Changer le mot de passe</button>
          </div>

        </form>

      </div>

    </div>
  </div>

</template>

<style scoped>
.container {
  height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>