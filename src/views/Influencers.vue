<script>
import {fetchAPI} from "../axios.js";
import Card from "../components/Card.vue";
import HRNumbers from 'human-readable-numbers';
import {ClientJS} from "clientjs";
import Toastify from 'toastify-js'
import {VueProgressbar} from "@jambonn/vue-next-progressbar";
import {MY_URL} from "../router.js";
import {Modal} from "bootstrap";

export default  {


  computed: {
    HRNumbers() {
      return HRNumbers
    },
    getInfluncers() {
      return this.influencers;
    }
  },
  components: {Card},
  async created() {
    await VueProgressbar.start();
    const response = await fetchAPI.get('/influencers');
    const ads = await fetchAPI.get('/ads');
    const socialMedias = await fetchAPI.get('social-media');
    this.ads =  ads.data.length >= 1 ? await ads.data.slice(1) : await ads.data;
    this.first_ad = await ads.data[0];
    this.influencers = await response.data;
    this.socialMedias = await socialMedias.data;
    this.influencersLoaded = true;
    this.adsLoaded = true;
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
      followers: ''
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
      let response = await fetchAPI.get(`/influencers?social=${social}`);
      this.influencers = await response.data;
      this.influencersLoaded = true;
    },

    async filterByFollowers() {

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
      }
    },

    async like(userId) {


      let client = new ClientJS();
      let text = event.target.lastElementChild;
      let heart = event.target.firstElementChild;



      try {

        let liked = await  fetchAPI.post('put-like',{
          'fingerprint': client.getFingerprint(),
          'user_agent': client.getUserAgent(),
          'user_id': userId,
        })

        if(liked.status === 200) {
          text.textContent++;
          heart.classList = "bi bi-heart-fill text-danger";
        }


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

  },

}

</script>

<template>


  <div id="carouselExampleCaptions" class="carousel slide" v-if="ads.length" data-bs-ride="carousel">

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
                <div class="col-md-6 order-sm-first order-md-last d-none d-lg-flex">
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
                <div class="col-md-6 text-center vstack gap-3 justify-content-center align-items-start  order-sm-last order-md-first">
                  <span>{{ad['ad_owner']}}</span>
                  <h2 class="text-light display-6 fw-bolder">{{ad.title}}</h2>
                  <p>{{ad.description}}</p>
                  <a :href="ad.url" target="_blank" class="btn btn-light px-5">Visiter</a>
                </div>
                <div class="col-md-6 order-sm-first order-md-last d-none d-lg-flex">
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

    <h1 class="mb-5 text-center">Choisir votre Influenceur</h1>


      <div class="d-flex row align-items-center justify-content-md-center justify-content-lg-between flex-wrap">


<!--        <div class="d-flex align-items-center position-relative mb-lg-0 mb-3">-->
<!--          <i class="bi bi-search position-absolute top-50 ms-3 translate-middle-y text-primary"></i>-->
<!--          <input type="text" v-model="search"  @input="filterBySearch(search)" class="ps-5 d-block  form-control" placeholder="Rechercher Influenceur">-->
<!--        </div>-->


        <div class="btn-group col-xl-6 align-items-center flex-wrap mb-5 mb-xl-0 " role="group" aria-label="Basic radio toggle button group" style="height: 48px" v-if="socialMedias.length">
          <input type="radio" class="btn-check" name="social-media"  id="tout" autocomplete="off" :value="''" @change="filterBySocialMedia(socialMedia)" v-model="socialMedia">
          <label class="btn btn-outline-light rounded-0" for="tout" >
            <i class="bi bi-people-fill" style="font-size: 18px" ></i>
            Tout
          </label>
            <template  v-for="social in socialMedias">
              <input type="radio" class="btn-check" name="social-media" :id="social.name.toLowerCase()" autocomplete="off" :value="social.id" @change="filterBySocialMedia(socialMedia)" v-model="socialMedia">
              <label class="btn btn-outline-light rounded-0 m-0" :for="social.name.toLowerCase()" >
                <img :src="`${MY_URL()}/storage/${social.logo}`" :alt="social.name" width="25" height="25" > {{social.name}}
              </label>
            </template>
        </div>
            <div class="d-flex col-xl-6 align-items-center justify-content-between mt-5 m-md-0">

              <select class="form-select w-75 "  v-model="followers" @change="filterByFollowers(followers)" v-if="this.socialMedia"  style="width: 300px;height: 40px">
                <option value="" selected disabled >Nombre Abonnés</option>
                <option value="10000-50000" class="fw-bold" selected>10k - 50k</option>
                <option value="50000-100000" class="fw-bold" selected>50k - 100k</option>
                <option value="100000-500000" class="fw-bold" selected>100k - 500k</option>
                <option value="500000-1000000" class="fw-bold" selected>500k - 1M</option>
                <option value="1000000-100000000" class="fw-bold" selected>1M+</option>
              </select>

              <a data-bs-toggle="modal" class="me-3 btn btn-light" href="#search" role="button">
                <i class="bi bi-search"></i>
              </a>

              <div class="modal fade " id="search" ref="search" tabindex="-1" aria-labelledby="search" aria-modal="true" role="dialog" >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header ">
                      <h1 class="modal-title text-black fs-5 " id="search">Rechercher Influenceur</h1>
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
            </div>
      </div>


    <div class="row gy-5 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 my-3">

      <div  v-for="influencer in getInfluncers.data" v-if="influencersLoaded" >

        <div class="card border-0 rounded-4 overflow-hidden">

          <div class="position-relative overlay z-1">

              <img class="card-img-top" :src="influencer.avatar['medium']" :alt="influencer.last_name">


            <span class="position-absolute likes start-50 w-100 h-100 d-flex align-items-end justify-content-center bottom-0 text-white translate-middle-x z-3 fs-4"  @click.once="like(influencer.id)">
              <i class="bi bi-heart "></i>
              <span class="like d-flex align-items-end justify-content-center ms-2" >
                {{influencer['likes']}}
              </span>
            </span>

          </div>

          <div class="card-body text-center">
            <router-link :to="`/profile/${influencer.username}`" class="text-decoration-none">
              <h5 class="card-title text-capitalize mb-3">{{influencer.first_name + ' ' + influencer.last_name}}</h5>
              <p class="card-text mb-0" style="height: 72px">{{influencer.bio}}</p>
            </router-link>

            <div class="buttons  d-flex flex-column" v-if="influencer['social_medias'].length">
              <div class="mt-4">
                <button class="btn btn-info d-block rounded-pill mx-auto dropdown-toggle rounded-2 d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                  <a class="text-decoration-none text-white d-inline-flex align-items-center"  target="_blank" >
                      <img :src="`${MY_URL()}/storage/${oneSocialMedia(influencer['social_medias']).logo}`" alt="" width="20" height="20">
                      <span class="px-4 fw-bold">{{HRNumbers.toHumanString(oneSocialMedia(influencer['social_medias']).pivot.followers )}}</span>

                  </a>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item d-flex align-items-center" :href="social.url + social.pivot.url" target="_blank" v-for="social in influencer['social_medias']">
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

        <div class="card border-0 shadow rounded-4 text-center">
          <div style="height: 400px" class="bg-secondary rounded-top-4 "></div>
          <div class="card-body">
            <h5 class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-8"></span>
            </p>
            <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
          </div>
        </div>

      </div>



    </div>


<!--    <nav aria-label="Page navigation example" class="my-5" v-if="influencers['meta']['links']">-->
<!--      <ul class="pagination pagination-lg justify-content-center">-->
<!--        <li class="page-item"  v-for="link in influencers['meta']['links']"><a :class="`page-link ${link['active'] ? 'active' : ''}`" href="#">{{link['label']}}</a></li>-->
<!--      </ul>-->
<!--    </nav>-->

    </div>




</template>

<style scoped>


h1 {

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
  border-radius:  1rem 1rem 0 0;
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
  height: 70vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.carousel-item,.carousel-inner {
  height: 70vh;
}

</style>