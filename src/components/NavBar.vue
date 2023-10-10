<template>


  <div class="offcanvas offcanvas-end bg-dark w-md-50 text-center" ref="offCanvas" tabindex="-1" id="offcanvasWithBothOptions"  aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body py-3 p-0" >

        <ul class="navbar-nav  text-start mb-lg-0 ">
          <li :class="`nav-item px-3 fs-lg-2 ${item.name.toLowerCase()}`" v-for="item in navList" style="letter-spacing: 1px">
            <router-link class="nav-link active text-white" aria-current="page" :to="item.path" @click.prevent="hideThisCanvas">{{item.name}}</router-link>
          </li>

          <div class="dropdown" v-if="user">

            <a class="text-white dropdown-toggle rounded-pill " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-fill text-dark"></i>
              {{user.username}}
            </a>

            <ul class="dropdown-menu">
              <router-link  aria-current="page"  to="/dashboard" class="dropdown-item"  @click.prevent="hideThisCanvas">Profile</router-link>
              <a class="dropdown-item" aria-current="page"  href="javascript:void(0)" @click="logout" >Logout</a>
            </ul>

          </div>


          <li class="nav-item px-3" v-if="!user">
            <router-link class="nav-link active  text-white" aria-current="page"  to="/login"  @click.prevent="hideThisCanvas">Login</router-link>
          </li>

          <li class="nav-item px-3" v-if="!user">
            <router-link class="nav-link active text-white " aria-current="page"  to="/register"  @click.prevent="hideThisCanvas" >Register</router-link>
          </li>

        </ul>


        <div class="social-media mt-3">
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


  <nav class="navbar navbar-expand-xxl bg-dark border-bottom border-1 border-opacity-10 border-light py-3">

    <div class="container-fluid mx-0 px-md-5">

      <router-link class="navbar-brand m-0 p-0 " to="/">
        <img src="/logo-white.svg" alt="pickads-logo" class="nav-logo">
      </router-link>



      <button class="btn btn-primary p-0 navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <i class="bi bi-list text-light " style="font-size: 30px"></i>
      </button>


      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto mb-lg-0 flex-grow-1 justify-content-center">
          <li :class="`nav-item ${item.name.toLowerCase()}`" v-for="item in navList" style="letter-spacing: 1px"  >

            <router-link class="nav-link active  text-white" aria-current="page"   :to="item.path" >
            <i :class="`${item.icon} fs-5`" style="margin-right: .5rem"></i>
              {{item.name}}
            </router-link>
          </li>


        </ul>


<!--        <div class="d-flex align-items-center position-relative  ms-3" v-if="this.$route.path == '/influencers'">-->
<!--          <i class="bi bi-search position-absolute top-50 ms-3 translate-middle-y text-white"></i>-->
<!--          <input type="text" v-model="search"  @input="filterBySearch(search)" class="ps-5 d-block bg-white bg-opacity-10 rounded-5 form-control" placeholder="Rechercher Influenceur">-->
<!--        </div>-->



        <ul class="navbar-nav mx-auto mb-lg-0 align-items-center justify-content-center">
          <div class="dropdown" v-if="user">
            <a class="dropdown-toggle btn btn-light text-dark px-3 rounded-pill " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
          icon: 'bi bi-house-fill'
        },
        {
          name: 'Influenceurs',
          path: '/influencers',
          icon: 'bi bi-people-fill'
        },
        {
          name: 'À propos de nous',
          path: '/about-us',
          icon: 'bi bi-info-circle-fill'
        },
        {
          name: 'Contactez-nous',
          path: '/contact',
          icon: 'bi bi-envelope-fill'
        },
      ],

    }
  },
  computed: {
    ...mapGetters(['user']),

  },

  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('user',null)
      this.$router.push('/login')
    },
    hideThisCanvas(){
      let myOffcanvas = document.getElementById('offcanvasWithBothOptions')
      let bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
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


input[type=text] {
  caret-color: var(--bs-warning);
  color: #ffffff;

  transition: .3s;
}

input[type=text]::placeholder {
  color: #ffff !important;
}


@media screen and (max-width : 991px) {
  .nav-link {
    font-size: 18px !important;
  }

  .nav-item {
    border-bottom: 1px solid var(--bs-primary);
    padding: 13px;
  }

}


.social-media, .dropdown {
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