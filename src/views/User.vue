<template>
  <div>
    <a @click="hash">hhh</a>
    <a href="#hhh">testetetetetetee</a>
    <div @click="test" style="height: 4000px;">User-{{id}}-{{newsletterPopup}}</div>
    <div id="hhh">哈哈</div>
    <router-link to="/">Go to Home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { router } from '../router'
import UserProfile from './UserProfile.vue'

export default {
  name: 'UserComponent',
  props: ['id','newsletterPopup'],
  mounted () {
    console.log(this.$route)
  },
  methods: {
    test() {
      router.addRoute({ path: '/about', component: UserProfile })
      console.log(router.getRoutes())
      console.log(router.currentRoute.value.fullPath)
      router.replace(router.currentRoute.value.fullPath)
    },
    hash() {
      alert(1)
      this.$router.push({ hash: '#hhh'})
    }
  }
}
</script>

<style scoped>

</style>
