<template>
  <div class="show-view" v-show="show" @click.stop="closeShow($event)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ShowView',
    props: {
      show: {
        type: Boolean,
        default: () => false
      }
    },
    setup(props, context) {
      const closeShow = (e) => {
        if (e.target.className === 'show-view') {
          context.emit('setShow', false);
        }
      }

      return { 
        closeShow 
      }
    }
  }
</script>

<style scoped>
  .show-view {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
</style>