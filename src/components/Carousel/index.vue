<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(carousel, index) in list"
            :key="carousel.id">
            <img :src="carousel.imgUrl">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name:'Carousel',
    props: ['list'],
    watch: {
        // 立即监听
        immediate: true,    
        // 监听list数据的变化，因为这条数据发生过变化
        list: {
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    // 当执行此回调时，数据已经得到，v-for执行完毕了，轮播图结构有了
                    var mySwiper = new Swiper('.swiper-container', {
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    }  
}
</script>

<style>

</style>