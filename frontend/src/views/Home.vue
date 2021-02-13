<template>
  <div class="home">
    <feature-slider></feature-slider>
    <mediumStories></mediumStories>
  </div>
</template>

<script>
import featureSlider from '@/components/featuredSider/featureSlider.vue'
import mediumStories from '@/components/mediumStories.vue'

export default {
  name: 'home',
  components: {
    featureSlider,
    mediumStories
  }
}
</script>
