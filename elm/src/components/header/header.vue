<template>
  <div class="heade">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar" alt="">
      </div>
    </div>
    <div class="bullet-wrapper">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      'seller': {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
