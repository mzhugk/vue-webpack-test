<template>
  <div class="root">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
import Home from './views/C-Home.vue'
export default {
  name: 'App',
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.25s ease-in;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-active {
  transition: all 0.25s ease-in;
}

.fade-leave-to {
  opacity: 0;
}
</style>
