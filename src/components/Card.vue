<script>
export default  {

}
</script>

<template>

  <div class="card border-0  rounded-3">

    <div class="card-header bg-transparent border-0 p-0" v-if="this.$slots.header">
        <slot name="header"></slot>
    </div>

    <div class="card-body p-0" v-if="this.$slots.body">
      <slot name="body"></slot>
    </div>

    <div class="card-footer" v-if="this.$slots.footer">
      <slot name="footer"></slot>
    </div>

  </div>

</template>

<style scoped>

</style>