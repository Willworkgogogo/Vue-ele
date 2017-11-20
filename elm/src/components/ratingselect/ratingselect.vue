<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive"
        @click="select(2, $event)"
        :class="{'active': selectType == 2}">
        {{desc.all}}
        <span class="count">{{rating.length}}</span>
      </span>
      <span class="block positive"
        @click="select(0, $event)"
        :class="{'active': selectType == 0}">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative"
        @click="select(1, $event)"
        :class="{'active': selectType == 1}">
        {{desc.negative}}
        <span class="count">{{negative.length}}</span>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./ratingselect.styl";
</style>
