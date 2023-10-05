<template>

  <div class="landing-page d-flex align-items-center justify-content-center">

    <img src="../assets/imgs/iconsSocial/2.png" alt="icon" class="w-25 position-absolute start-0  bottom-0 z-n1">

   <div class="container">

     <div class="row align-items-center">

       <div class="col-lg-5 vstack gap-4 justify-content-center align-items-start order-1 order-lg-0 text-center text-lg-start">

         <h1 class="display-3 mx-auto mx-lg-0">
           Avec <span class="fw-bolder text-warning">PickAds</span>
         </h1>

         <p class="text-light fs-2 fw-light">D'un simple clic, Vous pouvez choisir l'un des <span class="text-gradient">influenceurs</span> sur les réseaux sociaux pour créer votre publicité.</p>

         <router-link to="/influencers" class="btn btn-warning px-5 py-3 fw-bolder shadow-warning mx-auto mx-lg-0 mb-5">
           Commancer Maintenant
           <i class="bi bi-chevron-double-right"></i>
         </router-link>

       </div>

       <div class="col-lg-7">
         <img src="../assets/imgs/1.png" alt="landing bg" class="img-fluid wow animate animate__bounce">
       </div>

     </div>

   </div>

  </div>


</template>

<script>


</script>

<style scoped>

.landing-page {
  min-height: calc(100vh - 150px);
}

.landing-page::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: var(--bs-dark);
  background-image: url("../assets/imgs/home-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: .5;
  z-index: -1;
}


.shadow-warning {
  box-shadow: 5px 3px  25px 1px var(--bs-warning) !important;
}

.text-gradient {
   background: -webkit-linear-gradient(left,var(--bs-info),var(--bs-warning));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>