<script>
import {fetchAPI} from "../axios.js";
import Card from "../components/Card.vue";
import HRNumbers from 'human-readable-numbers';
import {ClientJS} from "clientjs";
import Toastify from 'toastify-js'


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
    const response = await fetchAPI.get('/influencers');
    const ads = await fetchAPI.get('/ads');
    const categories = await fetchAPI.get('categories');
    this.first_ad = await ads.data[0];
    this.ads =  ads.data.length > 1 ? await ads.data.slice(1,ads.data.length) : await ads.data;
    this.influencers = await response.data;
    this.categories = await categories.data;
    this.influencersLoaded = true;
    this.adsLoaded = true;
  },

  data() {
    return {
      influencers: [],
      ads: [],
      categories: [],
      first_ad: {},
      adsLoaded: false,
      influencersLoaded: false,
      search: "",
      category: "",
      range: 0
    }
  },

  methods: {
    async filterBySearch(search) {
      this.influencersLoaded = false;
      let response = await fetchAPI.get(`/influencers?search=${search}`);
      this.influencers = await response.data;
      this.influencersLoaded = true;
    },
    async filterByCategory(category) {
      this.influencersLoaded = false;
      let response = await fetchAPI.get(`/influencers?category=${category}`);
      this.influencers = await response.data;
      this.influencersLoaded = true;
    },

    async like(userId,event) {

      let client = new ClientJS();

      try {

        let liked = await  fetchAPI.post('put-like',{
          'fingerprint': client.getFingerprint(),
          'user_agent': client.getUserAgent(),
          'user_id': userId,
        })

        event.target.textContent++;

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

  },


}

</script>

<template>


  <div id="carouselExampleCaptions" class="carousel slide" v-if="adsLoaded && ads.length">

    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 0"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index+1"  aria-current="true" aria-label="Slide 1" v-for="(ad, index) in ads"></button>
    </div>

    <div class="carousel-inner">

      <div class="carousel-item active">

        <div class="card border-0 shadow-sm rounded-top-0 text-light" :style="{backgroundColor: first_ad['background_color'],backgroundImage: `url(http://127.0.0.1:8000/storage/${first_ad['background']})`}">
          <div class="card-body py-5">
            <div class="container">
              <div class="row align-items-center justify-content-between">
                <div class="col-md-6 vstack gap-3 justify-content-center align-items-start">
                  <span>{{first_ad['ad_owner']}}</span>
                  <h2 class="text-light display-6 fw-bolder">{{first_ad.title}}</h2>
                  <p>{{first_ad.description}}</p>
                  <a :href="first_ad.url" target="_blank" class="btn btn-light px-5">Visit Ad</a>
                </div>
                <div class="col-md-6">
                  <img :src="`http://127.0.0.1:8000/storage/${first_ad['ad_owner_logo']}`" :alt="first_ad['ad_owner']" class="img-fluid w-100 h-100">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="carousel-item" v-for="ad in ads">

        <div class="card border-0 shadow-sm rounded-top-0 text-light" :style="{backgroundColor: first_ad['background_color'],backgroundImage: `url('http://127.0.0.1:8000/storage/${ad['background']}')`}">
          <div class="card-body py-5">
            <div class="container">
              <div class="row align-items-center justify-content-between">
                <div class="col-md-6 vstack gap-3 justify-content-center align-items-start">
                  <span>{{ad['ad_owner']}}</span>
                  <h2 class="text-light display-6 fw-bolder">{{ad.title}}</h2>
                  <p>{{ad.description}}</p>
                  <a :href="ad.url" target="_blank" class="btn btn-light px-5">Visit Ad</a>
                </div>
                <div class="col-md-6">
                  <img :src="`http://127.0.0.1:8000/storage/${ad['ad_owner_logo']}`" :alt="ad['ad_owner']" class="img-fluid w-100 h-100">
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

  <div class="container my-5">

    <h1 class="mb-5">Influencers</h1>


      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap">

        <div class="d-flex align-items-center position-relative">
          <i class="bi bi-search position-absolute top-50 translate-middle-y"></i>
          <input type="text" v-model="search"  @input="filterBySearch(search)" class="ps-4 d-block form-control form-control bg-transparent  border-0" placeholder="Search An Influncer">
        </div>

        <div>
          <select class="form-select" @change="filterByCategory(category)" v-model="category">
            <option value="" selected>All</option>
            <option :value="category.id" v-for="category in categories">{{category.name}}</option>
          </select>
        </div>

      </div>


      <div class="d-flex flex-column">
        <label for="" class="form-label">0 to {{range}}</label>
        <input type="range" class="form-range w-50" v-model="range" min="0" max="100000" step="0.5" >
      </div>

    <div class="row mt-5 g-5">

      <div class="col-md-6 col-lg-4 col-xl-3" v-for="influencer in getInfluncers.data" v-if="influencersLoaded">

        <div class="card border-0 rounded-4 overflow-hidden">

          <div class="position-relative overlay z-1">

              <img class="card-img-top" :src="influencer.avatar['medium']" :alt="influencer.last_name">


            <span class="position-absolute likes start-50 w-100 d-flex align-items-center justify-content-center bottom-0 text-white translate-middle-x z-3 fs-5" >
              <i class="bi bi-heart me-2 text-danger"></i>
              <span class="like" @click="like(influencer.id)">
                {{influencer.likes}}
              </span>
            </span>

          </div>

          <div class="card-body text-center">
            <router-link :to="`/profile/${influencer.username}`" class="text-decoration-none">
              <h5 class="card-title text-capitalize ">{{influencer.first_name + ' ' + influencer.last_name}}</h5>
              <p class="card-text mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </router-link>

            <div class="buttons d-flex flex-column" v-if="influencer['social_medias'].length">
              <div class="dropdown mt-4">
                <button class="btn btn-info d-block px-4 mx-auto dropdown-toggle rounded-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <a class="text-decoration-none text-white" :href="influencer['social_medias'][0]['url'] + influencer['social_medias'][0].pivot.url" target="_blank" >
                    <i :class="`bi bi-${influencer['social_medias'][0].name.toLowerCase()}`"></i>
                    {{HRNumbers.toHumanString(influencer['social_medias'][0].pivot.followers)}}
                  </a>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" :href="social.url + social.pivot.url" target="_blank" v-for="social in influencer['social_medias']">
                      <i :class="`bi bi-${social.name.toLowerCase()}`"></i>
                      {{HRNumbers.toHumanString(social.pivot.followers)}} Followers
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>


      </div>

      <div class="col-md-6 col-lg-4 col-xl-3" v-else-if="!influencersLoaded" v-for="item in 8">

        <div class="card border-0 shadow rounded-4 text-center">
          <div style="height: 288px" class="bg-secondary rounded-top-4 "></div>
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

      <div v-else-if="!influencers.length">
        <h1>No Influencers</h1>
      </div>

    </div>

    </div>




</template>

<style scoped>


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

input[type=text] {
  caret-color: var(--bs-warning);
  color: #fff;
  font-size: 20px;
  border-radius: 0;
  transition: .3s;
  border-bottom: 1px solid transparent !important;
}

input[type=text]:focus {
  box-shadow: none;
  border-bottom-color: #fff !important;

}

input[type=text]::placeholder {
  color: white;
  opacity: .4;
}

.carousel,
.carousel-inner {
  min-height: 50vh;
}

.avatar {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: top;
}


.card {
  box-shadow: 10px 15px 25px 0 rgba(13, 110, 253, 0.09);
  transition: .3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
}


.form-floating > .form-control:focus ~ label::after {
  background-color: transparent !important;
}



</style>