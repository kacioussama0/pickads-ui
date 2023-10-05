<template>
  <div class="container my-5">
    <card v-if="loaded">
      <template v-slot:body>
        <div class="d-flex flex-column align-items-center p-5">
          <img :src="userProfile.avatar['small']" alt="" :class="`${userProfile.avatar['small'].includes('logo') ? ' w-50 img-fluid' : 'rounded-circle'}`" v-if="userProfile.avatar['small']">
          <span class="badge text-bg-warning mt-3">{{userProfile.category.name}}</span>
          <h1 class="text-capitalize">{{userProfile.last_name + ' ' + userProfile.first_name  }}</h1>
          <h6 class="text-warning mb-4">@{{userProfile.username}}</h6>

          <p>{{userProfile.bio}}</p>

          <a :href="`mailto:${userProfile.email}`" class=" text-decoration-none mb-3 text-dark">
            <i class="bi bi-mailbox"></i>
            {{userProfile.email}}
          </a>

          <div class="social-media d-flex align-items-center justify-content-center justify-content-lg-between  flex-wrap">
            <a v-for="social in userProfile['social_medias']" class="text-center me-4 text-white text-decoration-none text-center mb-3 mb-lg-0" target="_blank" :href="`${social.url}${social.pivot.url}`">
              <i :class="`bi bi-${social.name.toLowerCase()} fs-3  text-primary `"></i>
              <span class="d-block text-primary">{{HRNumbers.toHumanString(social.pivot.followers)}} Followers</span>
            </a>
          </div>

        </div>
      </template>
    </card>
  </div>
</template>

<script>

import {fetchAPI} from "../axios.js";
import Card from "../components/Card.vue";
import HRNumbers from 'human-readable-numbers';
export default  {

  components: {Card},

  async created() {

    const username = this.$route.params.username;
    const userResponse = await fetchAPI.get('/profile/' + username);
    this.profile = await userResponse.data.data;
    this.loaded = true

  },
  data() {
    return {
      profile: {},
      loaded: false
    }
  },
  computed: {
    userProfile() {
        return this.profile
    },
    HRNumbers() {
      return HRNumbers
    }
  }

}
</script>


<style scoped>



</style>