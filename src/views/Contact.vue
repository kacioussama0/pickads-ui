<script>

import {defineComponent} from "vue";
import Card from "../components/Card.vue";
import CInput from "../components/CInput.vue";
import CButton from "../components/CButton.vue";
import {fetchAPI} from "../axios.js";
export default defineComponent({
  components: {CButton, CInput, Card},
  data() {
    return {
      name: {
        value: '',
        valid: false
      },
      subject: {
        value: '',
        valid: false
      },
      email: {
        value: '',
        valid: false
      },
      message: {
        value: '',
        valid: false
      },
      contactFormStatus: '',
      contactLoadingUpdate : false,

    }
  },
  methods: {
    async sendMessage() {
      this.contactLoadingUpdate = true;
      try {
        const response = await fetchAPI.post('send-message',{
          'name': this.name.value,
          'email': this.email.value,
          'subject': this.subject.value,
          'message': this.message.value
        })

        this.contactLoadingUpdate = false;

        this.name.value = this.email.value = this.subject.value = this.message.value = ''

        this.contactFormStatus = 'success'

      }catch (error) {
        console.log(error)
        this.contactLoadingUpdate = false;
        this.contactFormStatus = 'failed'
      }

    },
    update(data) {
      this[data.name] = data
    },

  },
  computed: {
    valid() {
      return this.name.valid && this.subject.valid && this.message.valid && this.email.valid
    }
  }
})
</script>

<template>
    <div class="contact d-flex justify-content-center align-items-center">
      <div class="container">

        <card class="my-5 p-3 rounded-4 p-lg-4">
          <template v-slot:body>

            <div class="row d-flex justify-content-center align-items-center g-5">

              <div class="col-lg-6 ">

                <h1 class="mb-3 mt-2">Contactez-nous</h1>

                <p>
                  Nous sommes toujours ravis d'entendre nos visiteurs. Si vous avez des questions, des commentaires ou des besoins spécifiques, n'hésitez pas à nous contacter à [adresse e-mail ou numéro de téléphone].
                  Nous avons hâte de vous servir et de vous aider à atteindre vos objectifs. Merci d'avoir visité PickADS.
                </p>

                <span>
                    <i class="bi bi-mailbox-flag me-2" style="font-size: 20px"></i>
                    <span>Email : contact@pickads.com</span>
                  </span>

              </div>


              <div class="col-lg-6 mt-4">
                <form action="" @submit.prevent="sendMessage">
                  <div class="mb-3">
                    <c-input id="name" :rules="{required:true,min: 3}" type="text" name="Nom Complet" :value="name.value" @onUpdate="update" />
                  </div>

                  <div class="mb-3">
                    <c-input id="subject" :rules="{required:true}" type="text" name="Sujet" :value="subject.value" @onUpdate="update"/>
                  </div>

                  <div class="mb-3">
                    <c-input id="email" :rules="{required:true,email:true}" type="email" name="Email" :value="email.value" @onUpdate="update"/>
                  </div>


                  <div class="mb-3">
                    <c-input id="message" :rules="{required:true,min:10}"  type="textarea" name="Message" :value="message.value" @onUpdate="update"/>
                  </div>

                  <div class="mb-3">
                    <c-button title="Envoyer" :disabled="!valid"  :status="contactFormStatus" :loading="contactLoadingUpdate" />
                  </div>

                </form>
              </div>


            </div>


          </template>
        </card>


      </div>
    </div>

</template>

<style scoped>
@media (768px <= height <= 1440px) {
  .contact{
    min-height: calc(100vh - 150px);
  }
}
</style>