<script>
import {fetchAPI} from "../axios.js";

export default  {
  data() {
    return {
      email: '',
      successMessage: '',
      failedMessage: ''
    }
  },
  methods: {
    submit() {
        fetchAPI.post('/forget-password',{'email': this.email})
            .then((res)=> {
                this.successMessage = res.data.message
                this.failedMessage = '';
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


      <h1 class="text-center">Forget Password</h1>

      <form action="" @submit.prevent.stop="submit" class="vstack gap-2 text-dark">

        <div class="alert alert-success" v-if="success">
          {{success}}
        </div>

        <div class="alert alert-danger" v-if="failed">
          {{failed}}
        </div>


        <div>
          <label for="email" class="form-label">
            <i class="bi bi-mailbox"></i>
            Email
          </label>
          <input type="email" id="email" class="form-control" v-model="email" placeholder="example@xyz.com" required>
        </div>

        <div>
          <button class="btn btn-primary w-100 text-light d-block mt-3 bg-gradient rounded-pill border-0">Reset Password</button>
        </div>

      </form>

    </div>

  </div>
</template>

<style scoped>

</style>