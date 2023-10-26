import { reqGetSearchInfo } from '@/api';
// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search模块的数据
    async getSearchList({ commit }, params = {}) {
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
// 计算属性
// 项目当中getters的主要作用是简化仓库中的数据
const getters = {
    // 当前形参state：当前仓库中的state，并非大仓库中的那个state
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}