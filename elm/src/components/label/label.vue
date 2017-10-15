<template>
  <i v-show="type > 0" :class="iconSize"></i>
</template>

<script type="text/ecmascript-6">
  const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  export default {
    props: {
      type: {
        type: Number
      },
      size: {
        type: Number
      },
      styl: {
        type: Number
      }
    },
    computed: {
      iconSize() {
        return 'icon' + this.size + '-' + this.styl + ' ' + classMap[this.type];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

iconSize($size, $style)
  display: inline-block
  vertical-align: top
  margin-right: 3px
  width: $size
  height: $size
  background-size: $size $size
  background-repeat: no-repeat
  &.decrease
    bg-image('./img/decrease_' + $style)
  &.discount
    bg-image('./img/discount_' + $style)
  &.guarantee
    bg-image('./img/guarantee_' + $style)
  &.invoice
    bg-image('./img/invoice_' + $style)
  &.special
    bg-image('./img/special_' + $style)

.icon12-1
  iconSize(12px, 1)
.icon12-2
  iconSize(12px, 2)
.icon12-3
  iconSize(12px, 3)
.icon16-1
  iconSize(16px, 1)
.icon16-2
  iconSize(16px, 2)
.icon16-3
  iconSize(16px, 3)
</style>
