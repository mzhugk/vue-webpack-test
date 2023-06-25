import { createStore, createLogger } from 'vuex'
const moduleA = {
  namespaced: true,
  state: () => {
    return {
      moduleA: 'A'
    }
  },
  mutations: {
  	testA(state) {
		  console.log(state)
	  }
  },
  actions: {
	  actionA ({ state, commit, rootState }) {
      console.log(state)
      console.log(rootState.b.moduleB)
	  }
  },
  getters: {  }
}

const moduleB = {
  state: () => {
    return {
      moduleB: 'B'
    }
  },
  mutations: {  },
  actions: {  },
  getters: {  }
}

// 创建一个新的 store 实例
let store = createStore({
  plugins: [createLogger()],
  modules: {
	  a: moduleA,
	  b: moduleB
  },
  state () {
    return {
	    count: 10,
	    todos: [
		    { id: 1, text: '...', done: true },
		    { id: 2, text: '...', done: false }
	    ]
    }
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    },
	  doneTodosCount (state, getters) {
		  console.log(getters)
		  return getters.doneTodos.length
	  }
  },
  mutations: {
    increment (state, n) {
      state.count += n
    }
  },
  actions: {
    actionA ({ commit }) {
	    console.log(123)
    	// return Promise.reject('error123')
    	// return 1133444
    	// return 'aaaaa'
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     // commit('someMutation')
      //     resolve('someMutation')
      //   }, 1000)
      // })
    }
  }
})
store.registerModule('myModule', {
  state: () => {
    return {
      myModule: 'myModule',
	    count: 100
    }
  },
  mutations: {  },
  actions: {  },
  getters: {  }
},{
  preserveState: true
})
export default store
