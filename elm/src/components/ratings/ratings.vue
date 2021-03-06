<template>
  <div class="ratings" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <split></split>

      <ratingselect
        @select="selectRating"
        @toggle="toggleContent"
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
        ></ratingselect>

      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="star"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import {formatDate} from 'common/js/date';

  const ALL = 2;
  const ERR_OK = 0;
  const debug = process.env.NODE_ENV !== 'production';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [], // 请求获得
        selectType: ALL,
        onlyContent: true
      };
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    created() {
      const url = debug ? '/api/rating' : 'http://ustbhuangyi.com/sell/api/ratings';
      this.$http.get(url).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.rating, {
              click: true
            });
          });
        }
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      Star,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .ratings
    position: absolute
    top: 176px
    bottom: 0px
    left: 0px
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0px
      .overview-left
        padding: 6px 0
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
        .rank
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0px
          .title
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .star
            display: inline-block
            vertical-align: top
            margin: 0 12px
            @media only screen and (max-width: 320px)
              margin-left: 6px
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
          .delivery
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
            margin-left: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0px
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          position: relative
          .name
            margin-bottom: 4px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 12px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              margin-right: 6px
              display: inline-block
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 12px
          .text
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
          .recommend
            font-size: 0
            .icon-thumb_up
              margin-right: 8px
              display: inline-block
              vertical-align: top
              font-size: 12px
              color: rgb(0, 160, 220)
              line-height: 16px
            .recommend-item
              margin: 0 8px 4px 0
              display: inline-block
              vertical-align: top
              padding: 0 12px
              font-size: 9px
              color: rgb(147, 153, 159)
              line-height: 16px
              border: 1px solid rgba(7, 17, 27, 0.1)
              background-color: rgb(255, 255, 255)
              border-radius: 1px
          .time
            position: absolute
            top: 0px
            right: 0px
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)
            line-height: 12px
</style>
