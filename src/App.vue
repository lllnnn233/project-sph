<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在home、search显示，在登录、注册隐藏 -->
  <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'app',
  components: { Header, Footer },
  mounted() {
    // 派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>

</style>