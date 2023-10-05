<script>

import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import {fetchAPI} from "./axios.js";

export default  {

  async created() {
      if(localStorage.getItem('token')) {
        const response = await fetchAPI.get('user');
        this.$store.dispatch('user',response.data.data)
      }
  },

  components: {NavBar,Footer},

  methods: {
    noHeader() {
      return this.$route.name != 'Se Connecter'
    }
  }

}

</script>

<template>

<!--    <video autoplay muted loop id="myVideo" src="/src/assets/videos/landing-video.mp4" v-if="this.$route.path == '/'"></video>-->
    <header class="py-2  bg-transparent" v-if="noHeader()">
        <nav-bar/>
    </header>


    <main>
        <router-view/>
    </main>


    <footer class="py-2  bg-transparent" v-if="noHeader()">
        <Footer/>
    </footer>
</template>

<style>
@import url('bootstrap-icons/font/bootstrap-icons.min.css');
@import "toastify-js/src/toastify.css";

body {
  background-color: var(--bs-dark) !important;
  color: #fff !important;

}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
