<template>


  <div class="offcanvas offcanvas-end bg-dark w-100 text-center"  ref="offCanvas" tabindex="-1" id="offcanvasWithBothOptions"  aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body py-3 p-0" >

        <ul class="navbar-nav mx-auto mb-lg-0  justify-content-center">
          <li :class="`nav-item  ${item.name.toLowerCase()}`" v-for="item in navList" style="letter-spacing: 1px"  @click="hideThisCanvas">
            <router-link class="nav-link active  text-white" aria-current="page"   :to="item.path">{{item.name}}</router-link>
          </li>

          <div class="dropdown" v-if="user">

            <a class="text-white dropdown-toggle  rounded-pill " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-fill text-dark"></i>
              {{user.username}}
            </a>

            <ul class="dropdown-menu">
              <router-link  aria-current="page"  to="/dashboard" class="dropdown-item">Profile</router-link>
              <a class="dropdown-item" aria-current="page"  href="javascript:void(0)" @click="logout">Logout</a>
            </ul>

          </div>


          <li class="nav-item" v-if="!user">
            <router-link class="nav-link active  text-white" aria-current="page"  to="/login" >Login</router-link>
          </li>

          <li class="nav-item " v-if="!user">
            <router-link class="nav-link active  text-white " aria-current="page"  to="/register" >Register</router-link>
          </li>

        </ul>


        <div class="social-media">
          <a href="#">
            <i class="bi bi-facebook"></i>
          </a>

          <a href="#">
            <i class="bi bi-twitter"></i>
          </a>

          <a href="#">
            <i class="bi bi-youtube"></i>
          </a>

          <a href="#">
            <i class="bi bi-instagram"></i>
          </a>

        </div>


      </div>

    </div>


  <nav class="navbar navbar-expand-xl">

    <div class="container">

      <router-link class="navbar-brand m-0 p-0" to="/">
        <img src="/logo-white.svg" alt="pickads-logo" class="nav-logo">
      </router-link>


      <button class="btn btn-primary navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <i class="bi bi-list text-light " style="font-size: 30px"></i>
      </button>


      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto mb-lg-0 flex-grow-1  justify-content-center">
          <li :class="`nav-item  ${item.name.toLowerCase()}`" v-for="item in navList" style="letter-spacing: 1px">

            <router-link class="nav-link active  text-white" aria-current="page"   :to="item.path">
              <i :class="item.icon"></i>
              {{item.name}}
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav mx-auto mb-lg-0  justify-content-center">


          <div class="dropdown" v-if="user">

            <a class="dropdown-toggle btn btn-light text-dark px-3  rounded-pill " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-fill text-dark"></i>
              {{user.username}}
            </a>

            <ul class="dropdown-menu">
              <router-link  aria-current="page"  to="/dashboard" class="dropdown-item">Profile</router-link>
              <a class="dropdown-item" aria-current="page"  href="javascript:void(0)" @click="logout">Logout</a>
            </ul>

          </div>


          <li class="nav-item" v-if="!user">
            <router-link class="nav-link active  text-white" aria-current="page"  to="/login" >
              <i class="bi bi-box-arrow-in-right me-1"></i>
              Se Connecter
            </router-link>
          </li>

          <li class="nav-item " v-if="!user">
            <router-link class="nav-link active  text-white btn-gradient ms-3 rounded-pill px-5" aria-current="page"  to="/register">
              <i class="bi bi-plus-circle me-2"></i>
              S'inscrire
            </router-link>
          </li>

        </ul>

      </div>


    </div>
  </nav>

</template>


<script>
import {mapGetters} from "vuex";
export default  {
  data() {
    return {
      navList : [
        {
          name: 'Accueil',
          path: '/',
          icon: 'bi bi-house'
        },
        {
          name: 'Influenceurs',
          path: '/influencers',
          icon: 'bi bi-people'
        },
        {
          name: 'À propos de nous',
          path: '/about-us',
          icon: 'bi bi-info'
        },
        {
          name: 'Contactez-nous',
          path: '/contact',
          icon: 'bi bi-envelope'
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('user',null)
      this.$router.push('/login')
    },

    hideThisCanvas(){
      let myOffcanvas = this.$refs.offCanvas;
      let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
      bsOffcanvas.hide();
    }
  }

}




</script>

<style scoped>

.nav-logo {
  width: 150px;
}



.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  box-shadow: none;
}

@media screen and (max-width : 991px) {
  .nav-link {
    font-size: 30px;
  }

  .nav-item {
    border-bottom: 1px solid var(--bs-primary);
    padding: 20px;
  }

}


.social-media, .dropdown {
  padding: 20px;
  text-align: center;
}

.social-media a {
  color: #fff;
  margin-right: 20px;
  font-size: 25px;
  text-decoration: none;
}


.btn-gradient {
  background-image: linear-gradient(to right, var(--bs-info),var(--bs-warning)) !important;
  transition: .3s;
}

</style>