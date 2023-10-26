import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index';
// 封装游客身份模块uuid---生成一个随机字符串（不能再变）
import { getUUID } from '@/utils/uuid_token';
// home模块的小仓库
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 当前这个函数如果执行返回promise
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return 'ok'
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}