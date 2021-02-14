<template>
  <div class="preloader w-100 bg-black home-slider-height">
    <div class="lights">
      <svg viewBox="0 0 144 144">
        <ellipse v-for="x in 3" :key="`lights-${x}`" cx="72" cy="72" rx="50" ry="50" />
      </svg>
    </div>
    <img
      class="logo-overlay"
      src="/img/branding/logo-black.svg"
      alt="loading..."
    />
  </div>
</template>

<script>
export default {
  name: 'preloader'
}
</script>

<style lang="scss">
.preloader {
  position: relative;
  .logo-overlay,
  .lights {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 144px;
    height: 144px;
    margin-left: 0px - (144/2);
    margin-top: 0px - (144/2);
  }
  .lights {
    width: 144px;
    height: 144px;
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 144px;
      height: 144px;
      ellipse {
        mix-blend-mode: screen;
        $lightColors: rgb(237, 15, 67), rgb(136, 225, 35), rgb(144, 58, 230);
        @for $i from 1 through 3 {
          &:nth-child(3n + #{$i}) {
            fill: nth($lightColors, $i);
            transform-origin: 44% + random(6) 44% + random(6);
            animation: lightshow (5s * $i) linear -1s * $i infinite forwards;
          }
        }
      }
    }
  }
}
@keyframes lightshow {
  from {
    transform: translate(0px, 0px) rotate(0deg) scaleX(1) scaleY(1);
  }
  @for $i from 1 through 3 {
    #{$i * 25%} {
      transform: translate(random(13) + px, random(13) + px)
        rotate(((360 / 4) * $i) + deg)
        scaleX((random(60) / 100) + 0.7)
        scaleY((random(30) / 100) + 0.7);
    }
  }
  to {
    transform: translate(0px, 0px) rotate(360deg) scaleX(1) scaleY(1);
  }
}
</style>
