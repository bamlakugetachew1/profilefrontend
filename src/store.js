// import vue and vuex
// import Vue from 'vue'
import Vuex from 'vuex'

// create our store
export default new Vuex.Store({
  state:{
    username:0,
  },
  getters: {
  
     getgroupmembers(state){
      return state.groupmembers
     },
   
  },
  mutations:{
   
    changegroupmembers(state, groupmembers){
      state.groupmembers = groupmembers
    },
  }

})
