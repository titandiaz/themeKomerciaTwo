<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="banner in banners" :key="banner.id"><img class="banner" :src="setBanner(banner.ruta_banner)"></swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: { swiper, swiperSlide },
    name: 'carrousel',
    data() {
          return {
            swiperOption: {
              direction: 'horizontal',
              pagination: '.swiper-pagination',
              setWrapperSize: true,
              paginationClickable: true,
              grabCursor : true,
              autoplay: 2500,
            }
          }
        },
        computed: {
          banners(){
            return this.$store.state.banners;
          }
        },
        methods: {
          setBanner(banner){
            return `${this.$urlHttp}/banners/${banner}`;
          }
        }
      }
    </script>

<style>
  header .swiper-container {
    width: 100%;
    height: 100%;
    background-color: #FFF;
  }
  header .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  header .swiper-slide .banner{
    width: 100%;
    margin: 0 auto;
  }
  header .swiper-pagination-bullet{
    background-color: rgba(255,255,255,0.5);
  }
  header .swiper-pagination-bullet-active{
    background-color: #FFF;
  }
</style>
