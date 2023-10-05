<script>

import {defineComponent} from "vue";
import Card from "../components/Card.vue";
import CInput from "../components/CInput.vue";
import CButton from "../components/CButton.vue";

export default defineComponent({
  components: {CButton, CInput, Card}
})
</script>

<template>

    <div class="container">


          <card class="my-5 py-5">
            <template v-slot:body>

              <div class="row g-5 px-5">

                <div class="col-lg-6">

                  <h1 class="my-5">Contactez-nous</h1>

                  <p>
                    Nous sommes toujours ravis d'entendre nos visiteurs. Si vous avez des questions, des commentaires ou des besoins spécifiques, n'hésitez pas à nous contacter à [adresse e-mail ou numéro de téléphone].
                    Nous avons hâte de vous servir et de vous aider à atteindre vos objectifs. Merci d'avoir visité PickADS.
                  </p>

                  <span>
                    <i class="bi bi-mailbox-flag me-2" style="font-size: 20px"></i>
                    <span>Email : contact@pickads.com</span>
                  </span>

                </div>


                <div class="col-lg-6">
                  <form action="">
                    <div class="mb-3">
                      <c-input id="name" rules="" type="text" name="Nom Complet"/>
                    </div>

                    <div class="mb-3">
                      <c-input id="subject" rules="" type="text" name="Sujet"/>
                    </div>

                    <div class="mb-3">
                      <c-input id="name" rules="" type="email" name="Email"/>
                    </div>


                    <div class="mb-3">
                      <c-input id="message" rules="" type="textarea" name="Message"/>
                    </div>

                    <div class="mb-3">
                      <c-button title="Envoyer" />
                    </div>

                  </form>
                </div>


              </div>


            </template>
          </card>


      </div>

</template>

<style scoped>

</style>