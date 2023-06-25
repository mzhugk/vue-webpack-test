<template>
  <div class="home">
    <div @click="btn">home12</div>
    <KeepAlive>
      <Test v-if="ww"></Test>
    </KeepAlive>
<!--    <Transition>-->
<!--      <button v-if="docState === 'saved'">Edit</button>-->
<!--      <button v-else-if="docState === 'edited'">Save</button>-->
<!--      <button v-else-if="docState === 'editing'">Cancel</button>-->
<!--    </Transition>-->
<!--    <span @click="btn">{{ docState }}</span>-->
  </div>
</template>

<!--<script setup>-->
<!--import { ref, onMounted, useAttrs } from 'vue'-->
import Test from './C-test.vue'

<!--let test = ref('test')-->
<!--let docState = ref('saved')-->

<!--function btn () {-->
<!--  docState.value = 'edited'-->
<!--}-->
<!--</script>-->

<script>
import {mapMutations} from 'vuex'
import Test from './C-test.vue'
// import TestCopy from './C-test-copy.vue'

export default {
  name: 'HomeComponent',
  components: {Test},
  data() {
    return {
      qq: 'Test',
      ww: false,
      someObject: {
        a: 1
      }
    }
  },
  watch: {
    'someObject.a': {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          console.log('相同')
        }
        console.log(newValue)
        console.log(oldValue)
        // 注意：在嵌套的变更中，
        // 只要没有替换对象本身，
        // 那么这里的 `newValue` 和 `oldValue` 相同
      },
      deep: true
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    count2() {
      return this.count + 2
    }
  },
  async mounted () {
    console.log(222)
  },
  activated() {
    console.log('activated')
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    console.log('deactivated')
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  },
  methods: {
    ...mapMutations([
      'increment'
    ]),
    test() {
      // return new Promise((resolve, reject) => {
      //   resolve('1')
      //   // reject('2')
      // })
    },
    async btn() {
      // if (this.qq === 'Test') {
      //   this.qq = 'TestCopy'
      // } else {
      //   this.qq = 'Test'
      // }
      this.ww = !this.ww
    },
  }
}

</script>

<style lang="scss" scoped>
.home {
  font-size: 50px;
}
</style>
