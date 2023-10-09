<template>

  <div class="about">
    <div class="container">

      <h1 class="my-5">À propos de nous</h1>

      <p>
        PicksADS est un site web dédié aux utilisateurs des réseaux sociaux.
        Fondé en 2023, notre objectif est de faciliter le processus publicitaire sur les réseaux sociaux et d’établir un lien direct entre le client et l’influenceur.
      </p>


      <div class="row my-5 g-5">

        <div class="col-md-4">
          <card>
            <template v-slot:body >
              <div class="p-3">
                <h4>Notre Équipe</h4>
                <p>
                  Notre équipe dévouée se compose de professionnels expérimentés dans le désigne et le développement des applications web et dans la gestion des comptes de réseaux sociaux.
                </p>
              </div>
            </template>
          </card>
        </div>

        <div class="col-md-4">
          <card>
            <template v-slot:body>
              <div class="p-3">
                <h4>Nos Valeurs</h4>
                <p>
                  Chez PickADS, nous croyons fermement en la qualité de nos services. Ces valeurs nous guident dans tout ce que nous faisons.
                </p>
              </div>
            </template>
          </card>
        </div>

        <div class="col-md-4">
          <card >
            <template v-slot:body >
              <div class="p-3">
                <h4>Nos Réalisations</h4>
                <p >
                  Au fil des années, nous avons accompli [liste certaines de vos réalisations clés ou jalons]. Ces succès ont renforcé notre engagement envers l'excellence.
                </p>
              </div>
            </template>

          </card>
        </div>

      </div>


    </div>
  </div>

</template>

<script setup>

import Card from "../components/Card.vue";
</script>


<style scoped>



</style>