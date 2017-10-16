<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="control-decrease" v-show="food.count > 0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="control-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="control-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object,
        default() {
          return {count: 10};
        }
      }
    },
    created() {
    },
    methods: {
      // 添加商品
      addCart() {
        if (!this.food.count) {
          // Vue.set 给一个对象添加一个不存在的属性，并赋值
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }

        this.$emit('cart.add', event.target);
      },

      // 减
      decreaseCart() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 0
  .control-decrease
    display: inline-block
    opacity: 1
    transform: translate3d(0, 0, 0)
    .inner
      display: inline-block
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transition: all .4s linear
      transform: rotate(0)
    &.move-enter-active, &.move-leave-active
      // 定义过程状态
      transition: all .4s linear
    &.move-enter, &.move-leave-to
      // 定义进入和离开状态
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
  .control-count
    display: inline-block
    vertical-align: top
    width: 24px
    text-align: center
    font-size: 10px
    line-height: 24px
    color: rgb(147, 153, 159)
  .control-add
    display: inline-block
    font-size: 24px
    color: rgb(0, 160, 220)
    line-height: 24px
</style>
