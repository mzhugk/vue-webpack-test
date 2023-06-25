import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import Home from '../views/C-Home.vue'
import NotFound from '../views/NotFound.vue'
import UserGeneric from '../views/UserGeneric.vue'
import User from '../views/User.vue'
import UserProfile from '../views/UserProfile.vue'
import qs from 'qs'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
	  meta: {
    	selfName: 'Home'
	  },
	  alias: '/Home Copy'
  },
  { path: '/article Name', component: User },
  {
    path: '/user/:id',
    component: User,
	  name: 'User',
	  meta: {
		  selfName: 'User'
	  },
	  props: route => {
		  return { id: route.params.id, newsletterPopup: 123 }
	  },
    children: [
	    {
		    // 当 /user/:id/profile 匹配成功
		    // UserProfile 将被渲染到 User 的 <router-view> 内部
		    path: 'UserProfile',
		    name: 'UserProfile',
		    component: UserProfile,
		    meta: {
			    selfName: 'UserProfile'
		    },
	    },
      // {
      //   // 当 /user/:id/profile 匹配成功
      //   // UserProfile 将被渲染到 User 的 <router-view> 内部
      //   path: 'UserProfile',
	    //   name: 'UserProfile',
      //   component: UserProfile,
      // },
    ],
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下，
  // 例如pathMatch=['a', 'b'],*号修饰了/:patchMatch(.*)，可以0或多个,(.*)修饰了:patchMatch可以是 0个或多个字符
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下,例如afterUser=/a/b/c,区别在于少了一个*号
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
  scrollBehavior(to, from, savedPosition) {
	  if (to.hash) {
		  return {
			  el: to.hash,
			  behavior: 'smooth',
		  }
	  }
  },
})
router.beforeEach((to, from) => {
  // if (to.name === 'User') {
  //   return {
  //     // path: '/user/13/UserProfile',
  //     name: 'UserProfile',
  //     // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
  //     params: { id: 4},
  //   }
  // }
  // // return false
})
export {
  router
}
