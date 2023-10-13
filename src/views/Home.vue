<template>

  <div class="landing-page d-flex align-items-center justify-content-center">


   <div class="container">

     <div class="row align-items-center">

       <div class="col-lg-5 vstack gap-4 justify-content-center align-items-start align-items-xl-center order-1 order-lg-0 text-center text-lg-start">

         <h1 class="display-3 mx-auto mx-lg-0 my-3">
           Avec <span class="fw-bolder text-warning">PickAds</span>
         </h1>

         <p class="text-light fs-4 fw-lighter text-xl-center">D'un simple clic, Vous pouvez choisir l'un des <span class="text-warning">influenceurs</span> sur les réseaux sociaux pour créer votre <span class="text-warning">publicité</span>.</p>

         <router-link to="/influencers" class="btn btn-warning px-5 py-3 fw-bolder shadow-warning mx-auto mx-lg-0 mb-5">
           Commancer Maintenant
           <i class="bi bi-chevron-double-right"></i>
         </router-link>

       </div>

       <div class="col-lg-7">
         <img src="../assets/imgs/landing-bg.png" alt="landing bg" class="h-100 w-100">
       </div>

     </div>

   </div>

  </div>


</template>

<script>

export default {

}

</script>

<style scoped>

.landing-page {
  min-height: calc(100vh - 150px);
}

p {
  font-family: "RadiateSans-ExtraBoldExpanded",sans-serif;
}

.shadow-warning {
  box-shadow: 5px 3px  25px 1px var(--bs-warning) !important;
}


</style>