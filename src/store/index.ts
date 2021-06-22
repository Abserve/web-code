import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    user: null,
    token: null,
    loggedIn: false,
    role: '',
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    toggleDrawer(state, data) {
      state.drawer = data
    },
    SETtoken(state, payload) {
      state.token = payload
    },
    SETuser(state, payload) {
      state.user = payload
    },
    SETloggedIn(state, payload) {
      state.loggedIn = payload
    },
    SETRole(state, payload) {
      state.role = payload
    }
  },
  actions: {
    performLoginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post("http://139.99.238.74:8000/api/auth/login", {
          email: payload.email,
          password: payload.password
        })
          .then(res => {
            commit('SETtoken', res.data.token)
            commit('SETuser', res.data.user)
            commit('SETRole', res.data.user.role)
            commit('SETloggedIn', true)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    performLogoutAction({ commit }) {
      commit('SETloggedIn', false),
      localStorage.clear();
    }
  },
  modules: {},
  getters: {
    drawer: (state) => state.drawer,
    getloggedIn(state) {
      return state.loggedIn
    },
    getToken(state) {
      return state.token
    },
    getUser(state) {
      return state.user
    },
    getRole(state) {
      return state.role
    },

  }
});
