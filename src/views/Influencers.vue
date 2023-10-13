<script>
import {fetchAPI} from "../axios.js";
import Card from "../components/Card.vue";
import HRNumbers from 'human-readable-numbers';
import {ClientJS} from "clientjs";
import Toastify from 'toastify-js'
import {VueProgressbar} from "@jambonn/vue-next-progressbar";
import {MY_URL} from "../router.js";
import {Modal} from "bootstrap";
import NavBar from "../components/NavBar.vue";
import {store} from "../store.js";

export default  {


  computed: {
    HRNumbers() {
      return HRNumbers
    },
    getInfluncers() {
      return this.influencers;
    },
    myLikes() {
      return this.likes
    }
  },
  components: {NavBar, Card},
  async created() {

    await VueProgressbar.start();
    const response = await fetchAPI.get('/influencers');
    const ads = await fetchAPI.get('/ads');
    const socialMedias = await fetchAPI.get('social-media');
    const likes = await fetchAPI.get(`who-like/${store.state.fingerprint}`);
    this.ads =  ads.data.length >= 1 ? await ads.data.slice(1) : await ads.data;
    this.first_ad = await ads.data[0];
    this.influencers = await response.data;
    this.socialMedias = await socialMedias.data;
    this.influencersLoaded = true;
    this.adsLoaded = true;
    this.likes = await likes.data.data;
    await VueProgressbar.done();
  },

  data() {
    return {
      influencers: [],
      ads: [],
      socialMedias: [],
      first_ad: {},
      adsLoaded: false,
      influencersLoaded: false,
      search: "",
      socialMedia: "",
      range: 0,
      followers: '',
      likes: []
    }
  },

  methods: {

    MY_URL() {
      return MY_URL
    },

    async filterBySearch(search) {
        let searched = this.$refs.search;
      this.influencersLoaded = false;
      let response = await fetchAPI.get(`/influencers?search=${search}`);
      this.influencers = await response.data;
      this.influencersLoaded = true;
      Modal.getInstance(searched).hide();
      this.search = '';
    },

    async filterBySocialMedia(social) {
      this.influencersLoaded = false;
      let url = social ? `/social-media/${social}` : `/influencers`
      let response = await fetchAPI.get(url);
      this.influencers = await response.data;
      this.influencersLoaded = true;
      this.followers = '';
    },

    async filterByFollowers() {

      let followedSearch = this.$refs.filter_followers;
      let followersFrom = 0;
      let followersTo = 0;

      if(this.followers && this.socialMedia) {
        this.influencersLoaded = false;
        let splitted = this.followers.split('-');
        followersFrom = splitted[0];
        followersTo = splitted[1];
        let response = await fetchAPI.get(`/social-media/${this.socialMedia}?followersFrom=${followersFrom}&followersTo=${followersTo}`);
        this.influencers = await response.data;
        this.influencersLoaded = true;
        Modal.getInstance(followedSearch).hide();

      }
    },



    async like(userId) {

      try {

        let text = event.target.lastElementChild;
        let heart = event.target.firstElementChild;

        let liked = await  fetchAPI.post('put-like',{
          'fingerprint': store.state.fingerprint,
          'user_agent': store.state.userAgent,
          'user_id': userId,
        })

        text.textContent++;
        heart.classList = "bi bi-heart-fill text-danger";

      }catch (error) {

        Toastify({
          text: "Ce profil est déjà aimé",
          position: "left",
          style: {
            background: "var(--bs-danger)",
          }
        }).showToast();
      }

    },

    oneSocialMedia(arr) {
      let result = arr.filter((item) => this.socialMedia === item.id);
      return result.length ? result[0] : arr[0]
    }

  } ,



}

</script>

<template>

  <div id="carouselExampleCaptions" class="carousel slide" v-if="adsLoaded && ads.length" data-bs-ride="carousel">

    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="0" class="active rounded-circle" style="width: 10px;height: 10px" aria-current="true" aria-label="Slide 0"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index+1" class="rounded-circle"  aria-current="true" style="width: 10px;height: 10px" aria-label="Slide 1" v-for="(ad, index) in ads"></button>
    </div>

    <div class="carousel-inner">

      <div class="carousel-item active" >
        <div class="card border-0  rounded-top-0 text-light" :style="{backgroundColor: first_ad['background_color'],backgroundImage: `url(${MY_URL()}/storage/${first_ad['background']})`}">
          <div class="card-body py-5">
            <div class="container">
              <div class="row align-items-center justify-content-between">
                <div class="col-md-6 vstack gap-3  text-center text-sm-start justify-content-center align-items-start order-sm-last order-md-first">
                  <span>{{first_ad['ad_owner']}}</span>
                  <h2 class="text-light display-6 fw-bolder">{{first_ad.title}}</h2>
                  <p>{{first_ad.description}}</p>
                  <a :href="first_ad.url" target="_blank" class="btn btn-light px-5">Visiter</a>
                </div>
                <div class="col-md-6 order-sm-first order-md-last">
                  <div class="background-image-owner" :style="{backgroundImage: `url('${MY_URL()}/storage/${first_ad['ad_owner_logo']}')`}"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="carousel-item" v-for="ad in ads">

        <div class="card border-0 shadow-sm rounded-top-0 text-light" :style="{backgroundColor: ad['background_color'],backgroundImage: `url('${MY_URL()}/storage/${ad['background']}')`}">
          <div class="card-body py-5">
            <div class="container">
              <div class="row align-items-center justify-content-between">
                <div class="col-md-6   vstack gap-3 justify-content-center align-items-start  order-sm-last order-md-first">
                  <span>{{ad['ad_owner']}}</span>
                  <h2 class="text-light display-6 fw-bolder">{{ad.title}}</h2>
                  <p>{{ad.description}}</p>
                  <a :href="ad.url" target="_blank" class="btn btn-light px-5">Visiter</a>
                </div>
                <div class="col-md-6 order-sm-first order-md-last ">
                  <div class="background-image-owner" :style="{backgroundImage: `url('${MY_URL()}/storage/${ad['ad_owner_logo']}')`}"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container-fluid  px-md-5 me-5 my-5 w-100">


    <div class="modal fade" id="search" ref="search" tabindex="-1" aria-labelledby="search" aria-modal="true" role="dialog"  >
      <div class="modal-dialog modal-dialog-centered" >
        <div class="modal-content" >
          <div class="modal-header ">
            <h2 class="modal-title text-black fs-5 " id="search">Rechercher Influenceur</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="filterBySearch(search)" class="d-flex" role="search">
              <input class="form-control me-2"  v-model="search" type="search" placeholder="Rechercher Influenceur" aria-label="Search">
              <button class="btn btn-primary" type="submit">Rechercher</button>
            </form>
          </div>

        </div>
      </div>
    </div>




    <h1 class="mb-5 text-center">Choisir votre Influenceur</h1>


      <div class="d-flex align-items-center justify-content-center flex-wrap flex-md-nowrap my-5">


        <div class="btn-group social-filter  align-items-center flex-wrap justify-content-start me-md-4  mb-xl-0" role="group" aria-label="Basic radio toggle button group" style="height: 48px" v-if="socialMedias.length">
          <input type="radio" class="btn-check" name="social-media"  id="tout" autocomplete="off" value="" @change="filterBySocialMedia(socialMedia)" v-model="socialMedia">
          <label class="btn btn-outline-light rounded-0" for="tout" >
            <i class="bi bi-people-fill" style="font-size: 18px" ></i>
            Tout
          </label>
            <template  v-for="social in socialMedias">
              <input type="radio" class="btn-check" name="social-media" :id="social.name.toLowerCase()" autocomplete="off" :value="social.id" @change="filterBySocialMedia(socialMedia)" v-model="socialMedia">
              <label class="btn btn-outline-light rounded-0 m-0" :for="social.name.toLowerCase()" >
                <img :src="`${MY_URL()}/storage/${social.logo}`" :alt="social.name" width="25" height="25" class="me-2"> {{social.name}}
              </label>
            </template>
        </div>

        <a data-bs-toggle="modal" href="#filter-followers" class="btn btn-light me-0 me-md-3 d-flex align-items-center filter-followers justify-content-center"  role="button" style="height: 40.7px" v-if="socialMedias.length">
          <i class="bi bi-funnel"></i>
        </a>

        <div class="modal fade" id="filter-followers" ref="filter_followers" tabindex="-1" aria-labelledby="filter-followers" aria-modal="true" role="dialog" >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h2  class="modal-title text-black fs-5" id="search">Nombre Abonnés</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center" >
                <select class="form-select text-center fw-bolder"  v-model="followers" @change="filterByFollowers(followers)"  style="height: 40px">
                  <option value="" selected disabled >Nombre Abonnés</option>
                  <option value="10000-50000" class="fw-bold" selected>10k - 50k</option>
                  <option value="50000-100000" class="fw-bold" selected>50k - 100k</option>
                  <option value="100000-500000" class="fw-bold" selected>100k - 500k</option>
                  <option value="500000-1000000" class="fw-bold" selected>500k - 1M</option>
                  <option value="1000000-100000000" class="fw-bold" selected>1M+</option>
                </select>
              </div>

            </div>
          </div>
        </div>

      </div>


    <div class="row g-4 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 my-3">

      <div  v-for="influencer in getInfluncers.data" v-if="influencersLoaded" >

        <div class="card border-0 rounded-4 overflow-hidden bg-transparent">

          <div class="position-relative overlay z-1">
            <div class="background-avatar-image rounded-top-4" :style="{backgroundImage: `url('${influencer.avatar['medium']}')`}"></div>
            <span class="position-absolute likes start-50 w-100 h-100 d-flex align-items-end justify-content-center bottom-0 text-white translate-middle-x z-3 fs-4"  @click.once ="like(influencer.id)">
              <i :class="myLikes.includes(influencer.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>

              <span class="like d-flex align-items-end justify-content-center ms-2 fw-bolder" >
                {{influencer['likes']}}
              </span>
            </span>

          </div>

          <div class="card-body text-center bg-white">
            <router-link :to="`/profile/${influencer.username}`" class="text-decoration-none">
              <h5 class="card-title text-capitalize mb-">{{influencer.first_name + ' ' + influencer.last_name}}</h5>
              <p class="card-text text-muted mb-0" style="min-height: 48px">{{influencer.bio}}</p>
            </router-link>

<!--            <span class="email">-->
<!--              <i class="bi bi-envelope me-1"></i>-->
<!--              <a :href="`mailto:${influencer.email}`" class="text-decoration-none">{{influencer.email}}</a>-->
<!--            </span>-->

            <div class="buttons  d-flex flex-column" v-if="influencer['social_medias'].length">
              <div class="mt-3 dropup">
                <button class="btn  btn-info d-block  mx-auto dropdown-toggle rounded-2 d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                  <a class="text-decoration-none text-white d-inline-flex align-items-center"  target="_blank" >
                      <img :src="`${MY_URL()}/storage/${oneSocialMedia(influencer['social_medias']).logo}`" alt="" width="20" height="20">
                      <span class="px-4 fw-bold">{{HRNumbers.toHumanString(oneSocialMedia(influencer['social_medias']).pivot.followers )}}</span>

                  </a>
                </button>


                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item d-flex align-items-center" :href="social.pivot.url" target="_blank" v-for="social in influencer['social_medias']">
                        <img :src="`${MY_URL()}/storage/${social.logo}`" :alt="social.name" width="20" height="20" class="me-2">
                        {{HRNumbers.toHumanString(social.pivot.followers)}} Abonnées
                      </a>
                    </li>
                  </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="" v-else-if="!influencersLoaded" v-for="item in 8">

        <div class="card border-0 shadow rounded-4 overflow-hidden text-center bg-transparent">
          <div style="height: 300px" class="bg-secondary rounded-top-4 "></div>
          <div class="card-body bg-white">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-8"></span>
            </p>
            <a class="btn btn-info disabled placeholder col-5" aria-disabled="true"></a>
          </div>
        </div>

      </div>


    </div>


<!--    <nav aria-label="Page navigation example" class="my-5" v-if="influencers['meta']['links']">-->
<!--      <ul class="pagination justify-content-center">-->
<!--        <li class="page-item"  v-for="link in influencers['meta']['links']"><a :class="`page-link ${link['active'] ? 'active' : ''}`" href="#">{{link['label']}}</a></li>-->
<!--      </ul>-->
<!--    </nav>-->

    </div>




</template>

<style scoped>

h1 {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6vw;
}

.overlay::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: var(--bs-dark);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: .2;
}



.card {
  box-shadow: 10px 15px 25px 0 rgba(13, 110, 253, 0.1);
  transition: .3s;
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  h1 {
    font-size: 12vw;
  }
}

.background-image-owner {
  width: 100%;
  height: 50vh !important;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.social-filter {
  width : 90% !important;
}


@media screen and (max-width: 768px) {

    .social-filter {
      width : 85% !important;
    }
    .carousel-item .card .col-md-6:first-child {
      height: 50vh !important;
    }

    .carousel-item .card  .col-md-6:last-child {
      height: 50vh !important;
    }


  .background-image-owner {
      height: 100% !important;
  }

  .carousel-item,.carousel-inner , .carousel-inner .card {
    height: 100vh;
  }


}



@media screen and (max-width: 425px){
  .social-filter,
  .filter-followers{
    width : 100% !important;
    margin-top: 100px;
  }
}


.background-avatar-image {
  height: 300px;
  background-size: cover;
  background-color: var(--bs-dark);
  background-repeat: no-repeat;
  background-position: top center;
}

</style>