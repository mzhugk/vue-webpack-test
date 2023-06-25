<template>
  <div>child-</div>
</template>

<!--<script setup>-->
<!--import { ref, onMounted, useAttrs, onUpdated } from 'vue'-->
<!--const attrs = useAttrs()-->

<!--onMounted(() => {-->
<!--  console.log(attrs)-->
<!--})-->
<!--// onUpdated(() => {-->
<!--//   console.log(attrs)-->
<!--// })-->
<!--</script>-->

<script>
export default {
  name: 'cTest',
  activated() {
    console.log('activated-child')
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    console.log('deactivated-child')
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  },
  methods: {}
}
</script>
<style scoped>

</style>
