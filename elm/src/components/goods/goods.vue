<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
        @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <v-label class="icon" :type="item.type" :size="12" :styl="3"></v-label>
            <span>{{ item.name }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="month-sell">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="price-now">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <div class="cartcontrol-wrapper">
                    <v-cartcontrol @add="addFood" :food="food"></v-cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart
      ref="shopcart"
      :selectFoods="selectFoods"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
    ></v-shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import label from 'components/label/label.vue';
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        };
      });

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      // 关联food和menu
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
      },

      // 计算被选择的食物
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });

        return foods;
      }
    },
    methods: {
      selectMenu: function(index, event) {
        if (!event._constructed) {
          // event._constructed 是iscroll的属性为true， pc无此属性
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 异步执行下落动画, 体验优化
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll: function() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight: function() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      'v-label': label,
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  @import './goods.styl';
</style>
