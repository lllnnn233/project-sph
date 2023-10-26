// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        // 将仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        // 将本地存储数据清空
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 服务器下发token,用户唯一标识符(uuid)
        if (result.code == 200) {
            // 用户已经登陆成功且获取到token
            commit('USERLOGIN', result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器发起请求清除token
        let result = await reqLogout();
        if (result.code == 200) {
            commit("CLEAR");
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
};
// 计算属性

const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}