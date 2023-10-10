<template>
  <div class="container">

    <h1 class="my-5">S'inscrire</h1>


    <form-wizard title="Register" color="#FEC402" @on-complete="onComplete">
      <tab-content title="Personal details" icon="bi bi-person" :before-change="onValidate">
        <div class="row g-3">

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 3, max:50}" type="text" name="First Name" id="first_name" @onUpdate="update" :value="first_name.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 3, max:50}" type="text" name="Last Name" id="last_name" @onUpdate="update" :value="last_name.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 8, max:25}" type="text" name="Username" id="username" @onUpdate="update" :value="username.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true,email}" type="email" name="Email" id="email" @onUpdate="update" :value="email.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true}" type="date" name="Date Of Birth" id="date_of_birth" @onUpdate="update" :value="date_of_birth.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: false, max:10}" type="number" name="Mobile" id="mobile" @onUpdate="update" :value="mobile.value"/>
          </div>

          <div class="col-md-12">
            <c-input :rules="{required: false, max:50}" type="textarea" name="Bio" id="description" @onUpdate="update" :value="description.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 8, max:25}" type="password" name="Password" id="password" @onUpdate="update" :value="password.value"/>
          </div>

          <div class="col-md-6">
            <c-input :rules="{required: true, min: 8, max:25}" type="password" name="Password Confirmation" id="passwordConfirmation" @onUpdate="update" :value="passwordConfirmation.value"/>
          </div>

          <div class="col-md-6">
            <c-input  :rules="{required:true}" type="select" name="Gender" id="gender" :options="[{title:'Male',value:'male'},{title:'Female',value:'female'}]" @onUpdate="update" :value="gender.value"/>
          </div>

          <div class="col-md-6">
            <c-input id="category" :rules="{required:true}" type="select" name="Categories" :options="categories" @onUpdate="update" :value="category.value"/>
          </div>


        </div>



      </tab-content>
      <tab-content title="Social Media" icon="bi bi-instagram" :before-change="socialValidate">


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
      <tab-content title="Set Avatar" icon="bi bi-camera">
        <form @submit.prevent=""  enctype="multipart/form-data">
                      <span class="bg-dark p-5 rounded-circle d-flex justify-content-center align-items-center mx-auto position-relative " style="width: 150px;height: 150px">
                        <img src="/logo-white.svg" alt=""  class="rounded-circle profile-photo" width="150" height="150">
                          <input id="avatar"  type="file" class="w-100 h-100 position-absolute hiding" name="avatar" accept="image/*"/>
                      </span>
          <c-button title="Update Avatar" id="submit-image" :loading="avatarLoadingUpdate" @click="updateAvatar" :status="avatarFormStatus" disabled/>
        </form>
      </tab-content>
    </form-wizard>

  </div>
</template>


<script>
import {MY_URL} from "../router.js";
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    MY_URL() {
      return MY_URL
    }
  }
})

</script>


<style scoped>
#avatar {
  opacity: 0;
}
</style>