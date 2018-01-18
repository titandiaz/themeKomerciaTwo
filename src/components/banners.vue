<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <div class="transition-banner"></div>
    <swiper-slide v-for="banner in banners" :key="banner.id">
      <img class="banner" :src="setBanner(banner.ruta_banner)">
      <div v-show="false" class="banner-container">
        <p class="title-banner">make style cool</p>
        <p class="paragraph-banner">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, placeat. Similique ea inventore natus nihil.</p>
        <button class="btn-banner">Saber mas</button>
      </div>
      <div class="triangle"></div>
      <div class="triangle"></div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: { swiper, swiperSlide },
  name: 'carrousel',
  data() {
    return {
      swiperOption: {
        loop: true,
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        setWrapperSize: true,
        paginationClickable: true,
        grabCursor: true,
        autoplay: 3500,
      },
    };
  },
  computed: {
    banners() {
      return this.$store.state.banners;
    },
  },
  methods: {
    setBanner(banner) {
      return `${this.$urlHttp}/banners/${banner}`;
    },
  },
};
</script>

<style>
/* .triangle {
  position: absolute;
  display: flex;
  left: 0;
  top:0;
  width: 0; 
  height: 0; 
  border-right: 10px solid transparent;
  border-top: 10px solid red;
  border-left: 10px solid transparent;
  border-bottom: 10px solid transparent;
} */
.transition-banner {
  height: 4px;
  width: 100%;
  background: var(--color_secundario);
  z-index: 10000;
  position: absolute;
  /* animation: transition-banner 3500ms linear infinite; */
}
/* @keyframes transition-banner {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
} */
.btn-banner:hover {
  background: rgba(0, 0, 0, 0);
  color: var(--color_secundario);
  /* box-shadow: inset 0 0 0 3px red; */
}
.btn-banner {
  cursor: pointer;
  background: var(--color_secundario);
  color: #fff;
  border: 0;
  padding: 5px 15px;
  margin-top: 25px;
  display: flex;
  font-size: 18px;
}
.paragraph-banner {
  max-width: 300px;
  text-align: left;
  font-family: 'helvetica', sans-serif;
  font-weight: 300;
  margin-top: 15px;
  font-size: 16px;
}
.title-banner {
  font-size: 40px;
  line-height: 1;
  text-align: left;
  text-transform: uppercase;
  font-weight: 700;
}
.banner-container {
  position: absolute;
  color: #fff;
  left: 60px;
}
header .swiper-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
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
header .swiper-slide .banner {
  width: 100%;
  margin: 0 auto;
}
header .swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0.5);
}
header .swiper-pagination-bullet-active {
  background-color: #fff;
}
@media screen and (max-width: 700px) {
  .banner-container {
    display: none;
  }
}
</style>
