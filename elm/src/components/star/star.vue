<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" ></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let res = [];
        let score = Math.floor(this.score * 2) / 2; // 算法：区分出.5上下
        let hasDecimal = score % 1 !== 0; // boolean 分数是否有小数
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          res.push(CLS_ON);
        }
        if (hasDecimal) {
          res.push(CLS_HALF);
        }
        while (res.length < LENGTH) {
          res.push(CLS_OFF);
        }

        return res;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./img/star48_on')
        &.off
          bg-image('./img/star48_off')
        &.half
          bg-image('./img/star48_half')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 16px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./img/star48_on')
        &.off
          bg-image('./img/star48_off')
        &.half
          bg-image('./img/star48_half')
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./img/star48_on')
        &.off
          bg-image('./img/star48_off')
        &.half
          bg-image('./img/star48_half')
</style>
