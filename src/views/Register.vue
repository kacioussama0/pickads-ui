<template>
  <div class="container">

    <h1 class="my-5">S'inscrire</h1>


    <form-wizard title="Register" color="#FEC402" @on-complete="onComplete" nextButtonText="Suivant" backButtonText="Précédent" finishButtonText="Terminer">
      <tab-content title="details Personnels" icon="bi bi-person" :before-change="onValidate">
        <div class="row g-3">

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 3, max:50}" type="text" name="Nom" id="last_name" @onUpdate="update" :value="last_name.value"/>
          </div>


          <div class="col-md-6">
            <c-input :rules="{required: true, min: 3, max:50}" type="text" name="Prenom" id="first_name" @onUpdate="update" :value="first_name.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 8, max:25}" type="text" name="Nom D'utilisateur" id="username" @onUpdate="update" :value="username.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true,email}" type="email" name="E-mail" id="email" @onUpdate="update" :value="email.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true}" type="date" name="Date De Naissance" id="date_of_birth" @onUpdate="update" :value="date_of_birth.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: false, max:10}" type="number" name="Telephone" id="mobile" @onUpdate="update" :value="mobile.value"/>
          </div>

          <div class="col-md-12">
            <c-input :rules="{required: false, max:50}" type="textarea" name="Bio" id="description" @onUpdate="update" :value="description.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 8, max:25}" type="password" name="Mot de Passe" id="password" @onUpdate="update" :value="password.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 8, max:25}" type="password" name="Confirmation Mot de Passe" id="passwordConfirmation" @onUpdate="update" :value="passwordConfirmation.value"/>
          </div>

          <div class="col-md-6">
            <c-input  :rules="{required:true}" type="select" name="Le Sexe" id="gender" :options="[{title:'Mâle',value:'male'},{title:'Femelle',value:'female'}]" @onUpdate="update" :value="gender.value"/>
          </div>

          <div class="col-md-6">
            <c-input id="category" :rules="{required:true}" type="select" name="Catégorie" :options="categories" @onUpdate="update" :value="category.value"/>
          </div>


        </div>



      </tab-content>
      <tab-content title="Social Media" icon="bi bi-instagram" :before-change="socialValidate">

        <div class="alert alert-danger" v-if="errors">
            <ul>
              <li v-for="error in errors">{{error[0]}}</li>
            </ul>
        </div>


        <div>

          <div class="input-group mb-3" v-for="(item,index) in socialMedias" :key="item.id">
            <label class="visually-hidden" :for="item.name">username</label>
            <div class="input-group-text rounded-start-2">
              <img :src="`${MY_URL()}/storage/${item.logo}`" :alt="item.name" width="25" height="25"  >
            </div>
            <input type="text" class="form-control p-3" :id="item.name" v-model="userSocial[item.id]"  placeholder="Votre Lien">

            <input type="number" class="form-control" :id="item.name"  v-model="userFollowers[item.id]"   placeholder="Abonnés">
          </div>



        </div>

      </tab-content>
      <tab-content title="Définir votre photo de profile" icon="bi bi-camera">
        <form @submit.prevent=""  enctype="multipart/form-data">
                      <span class="bg-dark p-5 rounded-circle  d-flex justify-content-center align-items-center mx-auto position-relative " style="width: 150px;height: 150px">
                        <img src="/logo-white.svg" alt=""  class="rounded-circle border-white border-1 profile-photo" width="150" height="150">
                          <input id="avatar"  type="file" class="position-absolute hiding" width="150" height="150" name="avatar" accept="image/*"/>
                      </span>
          <c-button title="Update Avatar" id="submit-image" :loading="avatarLoadingUpdate" @click="updateAvatar" :status="avatarFormStatus" disabled/>
        </form>
      </tab-content>
    </form-wizard>

  </div>
</template>


<script>
import {FormWizard,TabContent} from "vue3-form-wizard";
import 'vue3-form-wizard/dist/style.css'
import CInput from "../components/CInput.vue";
import {fetchAPI} from "../axios.js";
import CButton from "../components/CButton.vue";
import {MY_URL} from "../router.js";

export default  {

  components: {
    CButton,
    CInput,
    FormWizard,
    TabContent
  },

  async created() {
    const categories = await fetchAPI.get('categories');
    const socialMedias = await fetchAPI.get('social-media');
    this.categories = categories.data.map((category)=> {
      return {
        title: category.name,
        value: category.id,

      }
    })
    this.socialMedias = socialMedias.data;

  },

  mounted() {
    document.querySelector('#avatar').onchange = function () {
      let reader = new FileReader();
      reader.addEventListener('load',()=> {
        const image = reader.result;
        document.querySelector('.profile-photo').setAttribute('src',image);
        document.querySelector('#submit-image').removeAttribute('disabled');
      })
      reader.readAsDataURL(this.files[0]);
    }
  },



  data() {
    return {
      categories: [],
      socialMedias: [],
      userSocial: {},
      userFollowers: {},
      first_name: {value:'',valid: false},
      last_name: {value:'',valid: false},
      date_of_birth: {value:'',valid: false},
      username: {value:'',valid: false},
      email: {value:'',valid: false},
      category: {value:'',valid: false},
      gender: {value:'',valid: false},
      description: {value:'',valid: true},
      mobile: {value:'',valid: true},
      password: {value:'',valid: false},
      passwordConfirmation: {value:'',valid: false},
      avatarFormStatus: '',
      avatarLoadingUpdate:false,
      errors: []
    }
  },
  methods: {

    updateAvatar() {
      this.avatarLoadingUpdate = true;
      let file = document.querySelector('#avatar').files[0];
      let form = new FormData();
      form.append("avatar",file);
      fetchAPI.post('user/update/avatar',form,{
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      }).then(response => {
        this.avatarFormStatus = 'success';
        this.avatarLoadingUpdate = false;
      }).catch(error => {
        this.avatarFormStatus = 'failed';
      })

    },

    onComplete() {
      this.$router.push('/influencers')
    },
    update(data) {
      this[data.name] = data
    },

    onValidate() {
       return this.first_name.valid && this.last_name.valid && this.email.valid && this.date_of_birth.valid && this.category.valid && this.gender.valid && this.mobile.valid && this.description.valid && this.username.valid && this.password.valid && this.passwordConfirmation.valid
    },

    async socialValidate() {

      if(this.userSocialMedia.length >= 1) {
          try {
            const response = await fetchAPI.post('register',{
              'first_name': this.first_name.value,
              'last_name': this.last_name.value,
              'username': this.username.value,
              'email': this.email.value,
              'category_id': this.category.value,
              'password': this.password.value,
              'password_confirmation': this.password.value,
              'gender': this.gender.value,
              'social_media': JSON.stringify(this.userSocialMedia),
              'date_of_birth': this.date_of_birth.value,
              'description': this.description.value,
            })

            localStorage.setItem('token',response.data['access_token']);
            this.$store.dispatch('user',response.data.user)

            return true

          }catch (error) {
            this.errors = error.response.data.errors
          }

      }

      return false;
    },
    MY_URL() {
      return MY_URL
    }

  },

  computed: {
    userSocialMedia() {

      let arr = [];

      for(let item in this.userSocial) {
        for(let i in this.userFollowers) {
          if(i === item) {
            arr.push({
              "social_media_id": Number(i),
              "info": {
                "followers": this.userFollowers[i],
                "url": this.userSocial[i]
              }
            })
          }
        }
      }
      return arr

      },
    errors() {
      return this.errors;
    }
  }


}


</script>


<style scoped>
#avatar {
  opacity: 0;
}
</style>