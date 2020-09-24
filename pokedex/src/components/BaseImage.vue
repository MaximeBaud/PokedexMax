<template>
  <div
    class="base-image"
    :class="{
      loaded
    }"
  >
    <img
      v-bind="$attrs"
      class="image"
      @load="onLoad"
    >

    <transition name="fade">
      <BaseLoading
        v-if="!loaded"
      />
    </transition>
  </div>
</template>

<script>
const loadedImages = new Set()

export default {
  inheritAttrs: false,
  data () {
    return {
      loaded: loadedImages.has(this.$attrs.src)
    }
  },
  methods: {
    onLoad () {
      this.loaded = true
      loadedImages.add(this.$attrs.src)
    }
  }
}
//   props: {
//     url: {
//       type: String,
//       required: true
//     },
//     alt: {
//       type: String,
//       required: true
//     }
//   }
// }
</script>

<style lang="stylus" scoped>
.base-image
  position relative
  .image
    width 100%
    height @width
    opacity 0
    transition opacity .15s
  &.loaded
    .image
      opacity 1
  .base-loader
    position absolute
    top 0
    left 0
    width 100%
    height 100%
</style>
