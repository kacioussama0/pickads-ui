<template>
  <div class="container my-5">
    <card v-if="loaded">
      <template v-slot:body>
        <div class="d-flex flex-column align-items-center">
          <img :src="userProfile.avatar['small']" alt="" :class="`${userProfile.avatar['small'].includes('logo') ? ' w-50 img-fluid' : 'rounded-circle'}`" v-if="userProfile.avatar['small']">
          <span class="badge text-bg-warning mt-3">{{userProfile.category.name}}</span>
          <h1 class="text-capitalize">{{userProfile.last_name + ' ' + userProfile.first_name  }}</h1>
          <h6 class="text-warning mb-4">@{{userProfile.username}}</h6>

          <p>{{userProfile.bio}}</p>

          <a :href="`mailto:${userProfile.email}`" class="link-light text-decoration-none mb-3">{{userProfile.email}}</a>

          <div class="social-media d-flex align-items-center justify-content-between">
            <a v-for="social in userProfile['social_medias']" class="text-center me-4 text-white text-decoration-none" target="_blank" :href="`${social.url}${social.pivot.url}`">
              <i :class="`bi bi-${social.name.toLowerCase()} fs-3 me-2`"></i>
              <span class="d-block">{{HRNumbers.toHumanString(social.pivot.followers)}} Followers</span>
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