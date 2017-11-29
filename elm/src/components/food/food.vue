<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="last-price"><span class="unit">￥</span>{{food.price}}</span><span v-show="food.oldPrice" class="old-price"><span class="unit">￥</span>{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol @add="addFood" :food="food"></v-cartcontrol>
          </div>
          <div @click.stop.prevent="addCart" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
      </div>

      <!--商品介绍-->
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>

      <!--商品评价-->
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <rating-select
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="food.ratings"></rating-select>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect.vue';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      // 子组件方法可以被父组件调用，父组件方法不允许子组件调用
      show() {
        this.showFlag = true;
        // 初始化状态
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'split': split,
      'rating-select': ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'food.styl';
</style>
