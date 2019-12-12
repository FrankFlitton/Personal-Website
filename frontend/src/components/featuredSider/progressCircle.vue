<template>
  <div class="progress-circle" :class="{active: this.markerIndex === this.realIndex}">
    <svg viewBox="0 0 89 89" xmlns="http://www.w3.org/2000/svg">
      <circle cx="44.5" cy="44.5" r="43.5" />
    </svg>
    <span class="number">{{ markerIndex + 1 }}</span>
    <hr />
    <span class="number">{{ totalLength }}</span>
  </div>
</template>

<style lang="scss">
.progress-circle {
  border-radius: 50%;
  border: 2px solid white;
  width: 89px;
  height: 89px;
  margin: 0 auto;
  padding: 13px;
  position: relative;
  transform: scale(0.8);
  svg,
  circle {
    position: absolute;
    stroke-width: 2.5px;
    stroke: black;
    fill: transparent;
    width: 89px;
    top: -2px;
    left: -2px;
    transition: all 8.25s linear !important;
    stroke-dasharray: 275;
    stroke-dashoffset: 0;
  }
  svg {
    transform: rotate(270deg);
  }
  hr {
    margin: 5px auto;
    border-top: 2px solid white;
    width: 2em;
  }
  &.active {
    svg,
    circle,
    path {
      stroke-dashoffset: 275;
    }
  }
}
</style>

<script>
export default {
  name: 'progressCircle',
  props: {
    realIndex: {
      type: Number,
      default: 0,
      required: true
    },
    markerIndex: {
      type: Number,
      default: 0,
      required: true
    },
    totalLength: {
      type: Number,
      default: 1,
      required: true
    }
  }
}
</script>
