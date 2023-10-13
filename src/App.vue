<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import {fetchAPI} from "./axios.js";
import {VueProgressbar} from "@jambonn/vue-next-progressbar";

export default  {

  async created() {
      if(localStorage.getItem('token')) {
        const response = await fetchAPI.get('user');
        this.$store.dispatch('user',response.data.data)
      }
     await  VueProgressbar.start();
  },

  mounted() {
    VueProgressbar.done()
  },

  components: {NavBar,Footer},

  methods: {
    noHeader() {
      return this.$route.name != 'Se Connecter'
    },

  }

}

</script>

<template>





    <header class="bg-transparent sticky-top" v-if="noHeader()">
        <nav-bar/>

    </header>


    <main>

        <router-view/>
    </main>

    <footer class="py-2  bg-transparent  border-top border-1 border-opacity-10 border-light py-3" v-if="noHeader()">
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
