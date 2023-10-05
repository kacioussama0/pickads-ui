<script>
export default  {
  props: {
    title: {type:String,required:true},
    disabled: {type:Boolean},
    status: {type: String}
  },
  methods: {
    btnStatus() {
      if(this.status === 'success' ) {
        return 'btn-success'
      }else if(this.status === 'failed' )
      return   'btn-danger'
    }
  }
}
</script>

<template>
  <button :class="`btn btn-warning w-100 text-light d-block mt-3 rounded-0 py-3 fw-bolder border-0 ${btnStatus()}`" :disabled="disabled">{{title}}</button>
</template>

<style scoped>
.btn-gradient {
  background-image: linear-gradient(to right, var(--bs-info),var(--bs-warning)) !important;
  transition: .3s;
}

.btn-gradient:hover {
  background-image: linear-gradient(to left, var(--bs-info),var(--bs-warning)) !important;
}

.btn-gradient:disabled {
  opacity: .2;
}
</style>