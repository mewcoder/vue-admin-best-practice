import Vue from 'vue';
import Vuex from 'vuex';
import { getUserInfo } from '@/api/user';
import { setUser } from '@/utils/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: { userInfo: null },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setUser(userInfo);
    }
  },
  actions: {
    async userInfo(context, username) {
      const userInfo = await getUserInfo({ username }); // mock
      context.commit('setUserInfo', userInfo);
      return userInfo;
    }
  }
});
