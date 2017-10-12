<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      'seller': {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        margin-right: 16px
        img
          border-radius: 2px
      .content
        display: inline-block
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            margin-right: 6px
            bg-image('./img/brand')
            background-size: 30px 18px
          .name
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .support
          margin-bottom: 2px
          .icon
            display: inline-block
            vertical-align: middle
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('./img/decrease_1')
            &.discount
              bg-image('./img/discount_1')
            &.guarantee
              bg-image('./img/guarantee_1')
            &.invoice
              bg-image('./img/invoice_1')
            &.special
              bg-image('./img/special_1')

          .text
            font-size: 10px
            line-height: 12px


      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        background-color: rgba(0, 0, 0 , 0.2)
        font-size: 10px
        height: 24px
        line-height: 24px
        border-radius: 14px
        text-align: center
        .count
          vertical-align: top
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-icon
        vertical-align: top
        display: inline-block
        width: 22px
        height: 12px
        margin-top: 8px
        bg-image('./img/bulletin')
        -webkit-background-size: 22px 12px
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
        line-height: 28px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 9px
    .background
      position: absolute
      top: 0px
      left: 0px
      z-index: -1
      width: 100%
      height: auto
      filter: blur(10px)
</style>
