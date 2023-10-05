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

  <div class="card w-25 position-absolute start-50 top-50 translate-middle border-0 shadow">

    <div class="card-body">

      <h1 class="text-center">Reset Password</h1>

      <form action="" @submit.prevent.stop="submit" class="vstack gap-2 text-dark">

        <div>
          <label for="password" class="form-label">
            <i class="bi bi-key"></i>
            Password
          </label>
          <input type="password" id="password" class="form-control" v-model="password" placeholder="*********" required>
        </div>

        <div>
          <label for="password_confirmation" class="form-label">
            <i class="bi bi-key"></i>
            Password Confirmation
          </label>
          <input type="password" class="form-control" id="password_confirmation" v-model="password_confirmation" placeholder="*********" required>
        </div>

        <div>
          <button class="btn btn-primary w-100 text-light d-block mt-3 bg-gradient rounded-pill border-0">Change Password</button>
        </div>

      </form>

    </div>

  </div>
</template>

<style scoped>

</style>