// 当前这个模块，api进行统一管理
import requests from "./request";
import mockRequests from './mockAjax';
// 三级联动接口
// /api/product/getBaseCategoryList get请求 无参数
// 发请求:axios发请求返回结果promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
// 获取banner轮播图接口
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });
// 获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });
// 获取搜索模块数据 地址：/api/list
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });
// 获取产品详情信息的接口 URL:/api/item/{skuId}  请求方式 Get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
// 将产品添加到购物车中(或更新某一产品的个数)  /api/cart/addToCart/   POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车列表数据接口 /api/cart/cartList   Get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });
// 删除购物车产品的接口  /api/cart/deleteCart/{skuId} method: delete
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
// 修改商品的选中状态   /api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
// 获取验证码接口  url:/api/user/passport/sendCode/{phone}  method:get   
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
// 注册接口 url:/api/user/passport/register method: post  phone code password
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' });
// 登录接口 url:/api/user/passport/login method: post  phone password
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' });
// 获取用户信息(需要带着用户的token向服务器要用户信息) url:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
// 退出登录 url:/api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// 获取商品清单  url:/api/order/auth/trade  method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单的接口  url:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post 
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });
// 获取支付信息   url:/api/payment/weixin/createNative/{orderId}   get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
// 获取个人中心的数据   url:/api/order/auth/{page}/{limit}    get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });

