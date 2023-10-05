<template>

  <div class="container my-5">

    <div class="row g-5">

        <div class="col-md-6">

          <div class="row gy-5">
            <div class="col-lg-12" v-show="loading">

              <card>

                <template v-slot:header>
                  <h4 class="p-3">Informations</h4>
                </template>


                <template v-slot:body>
                  <form @submit.prevent="updateInfo">
                    <c-input id="first_name" :rules="{required:true}" type="text" name="First Name" :value="first_name.value" @onUpdate="update"/>
                    <c-input id="last_name" :rules="{required:true}" type="text" name="Last Name" :value="last_name.value" @onUpdate="update"/>
                    <c-input id="username" :rules="{required:true}" type="text" name="Username" :value="username.value" @onUpdate="update"/>
                    <c-input id="email" :rules="{required:true}" type="email" name="Email" :value="email.value" @onUpdate="update"/>
                    <c-input id="description" :rules="{required:false}" type="textarea" name="Bio" :value="description.value" @onUpdate="update"/>
                    <c-input id="gender" :rules="{required:true}" type="select" name="Gender" :options="[{title:'Male',value:'male'},{title:'Female',value:'female'}]" :value="gender.value" @onUpdate="update"/>
                    <c-input id="mobile"  :rules="{required:false}" type="text" name="Mobile" :value="mobile.value" @onUpdate="update"/>
                    <c-input id="date_of_birth" :rules="{required:true}" type="date" name="Date Of Birth" :value="date_of_birth.value" @onUpdate="update"/>
                    <c-input id="category_id" :rules="{required:true}" type="select" name="Category" :options="categories" :value="category_id.value" @onUpdate="update"/>
                    <c-button title="Update Info" :disabled="!infoValid" :status="infoFormStatus"/>
                  </form>
                </template>

              </card>


            </div>
          </div>

        </div>

        <div class="col-md-6" v-show="loading">
            <div class="row gy-5">
              <div class="col-lg-12" v-show="loading">

                <card>

                  <template v-slot:header>
                    <h4 class="p-3">Avatar</h4>
                  </template>

                  <template v-slot:body>
                    <form @submit.prevent=""  enctype="multipart/form-data">
                      <span class="bg-dark p-5 rounded-circle d-flex justify-content-center align-items-center mx-auto position-relative " style="width: 150px;height: 150px">
                        <img :src="user.avatar['small']" alt=""  class="rounded-circle profile-photo" width="150" height="150">
                          <input id="avatar"  type="file" class="w-100 h-100 position-absolute hiding" name="avatar" accept="image/*"/>
                      </span>
                      <c-button title="Update Avatar" id="submit-image" @click="updateAvatar" :status="avatarFormStatus" disabled/>
                    </form>
                  </template>

                </card>


              </div>
              <div class="col-lg-12">

                <card>

                  <template v-slot:header>
                    <h4 class="p-3">Password</h4>
                  </template>

                  <template v-slot:body>
                    <form @submit.prevent="">
                      <c-input id="actualPassword" :rules="{required:true}" :value="actualPassword.value" type="password" name="Actual Password" @onUpdate="update"/>
                      <c-input id="newPassword" :rules="{required:true}" :value="newPassword.value" type="password" name="New Password" @onUpdate="update"/>
                      <c-input id="newPasswordConfirmation" :value="newPasswordConfirmation.value" :rules="{required:true}" type="password" name="New Password Confirmation" @onUpdate="update"/>
                      <c-button title="Update Password" :status="passwordFormStatus" @click="updatePassword" :disabled="!passwordValid"/>
                    </form>
                  </template>

                </card>

              </div>
            </div>
        </div>
    </div>


  </div>

</template>

<script>

import {defineComponent} from "vue";
import Card from "../components/Card.vue";
import CInput from "../components/CInput.vue";
import {mapGetters} from "vuex";
import CButton from "../components/CButton.vue";
import {fetchAPI} from "../axios.js";


export default defineComponent({

  components: {CButton, CInput, Card},

  async created() {
    const userResponse = await fetchAPI.get('user');
    const user = userResponse.data.data;
    const categories = await fetchAPI.get('categories');
    this.$store.dispatch('user',user);
    this.categories = categories.data.map((category)=> {
        return {
          title: category.name,
          value: category.id
        }
    })

    this.first_name['value'] = user['first_name'];
    this.last_name['value'] = user['last_name'];
    this.username['value'] = user['username'];
    this.email['value'] = user['email'];
    this.description['value'] = user['bio'];
    this.mobile['value'] = user['mobile'];
    this.gender['value'] = user['gender'];
    this.category_id['value'] = user['category']['id'];
    this.date_of_birth['value'] = user['dob'];
    this.first_name['valid'] = this.last_name['valid'] = this.username['valid'] = this.email['valid'] = this.description['valid'] = this.mobile['valid'] = this.gender['valid'] = this.category_id['valid'] = this.date_of_birth['valid'] = true;
    this.loading = true;


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
      avatar: '',
      avatarFormStatus: '',
      infoFormStatus: '',
      passwordFormStatus: '',
      categories: [],
      first_name: {value:'',valid: false},
      last_name: {value:'',valid: false},
      date_of_birth: {value:'',valid: false},
      username: {value:'',valid: false},
      email: {value:'',valid: false},
      category_id: {value:'',valid: false},
      gender: {value:'',valid: false},
      description: {value:'',valid: false},
      mobile: {value:'',valid: false},
      actualPassword: {value:'',valid: false},
      newPassword: {value:'',valid: false},
      newPasswordConfirmation: {value:'',valid: false},
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    infoValid() {
      return this.first_name.valid && this.last_name.valid && this.email.valid && this.date_of_birth.valid && this.category_id.valid && this.gender.valid && this.mobile.valid && this.description.valid && this.username.valid
    },
    passwordValid() {
      return this.actualPassword.valid && this.newPassword.valid && this.newPasswordConfirmation.valid
    },

  },
  methods: {
    updateInfo() {
      fetchAPI.post('user/update/profile',{
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        date_of_birth: this.date_of_birth.value,
        username: this.username.value,
        email: this.email.value,
        category_id: Number(this.category_id.value),
        gender: this.gender.value,
        description: this.description.value,
        mobile: this.mobile.value,
      },{
        headers: {
          "content-type":"application/json",
        }
      }).then(response => {
          this.infoFormStatus = 'success'
      }).catch(error => {
        this.infoFormStatus = 'failed'
      })
    },

    updateAvatar() {

      let file = document.querySelector('#avatar').files[0];
      let form = new FormData();
      form.append("avatar",file);
      fetchAPI.post('user/update/avatar',form).then(response => {
          this.avatarFormStatus = 'success'
      }).catch(error => {
        this.avatarFormStatus = 'failed'
      })

    },

    updatePassword() {
      fetchAPI.post('user/update/password',{
          'current_password': this.actualPassword.value,
          'new_password': this.newPassword.value,
          'new_password_confirmation': this.newPasswordConfirmation.value,
      }).then(response => {
        this.passwordFormStatus = 'success'
      }).catch(error => {
        this.passwordFormStatus = 'failed'
      });
    }
    ,
    update(data) {
      this[data.name] = data
    },
  },


})
</script>


<style scoped>

#avatar {
  opacity: 0;
}
</style>