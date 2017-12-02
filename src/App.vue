<template>
  <div id="app" :style="stylesConf">
    <header class="ko_header" :style="stylesConf.colorPrincipal">
			<header-menu></header-menu>
		</header>
    <product-preview v-if="existCurrentProduct"></product-preview>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import headerMenu from './components/menu2.vue';
import productPreview from './components/product_preview.vue';
import footerComponent from './components/footer.vue'
export default {
  name: 'app',
  components: { headerMenu, productPreview, footerComponent },
  data() {
    return {
      stylesConf: {
        color: this.$store.state.colorTexto,
        colorPrincipal:{backgroundColor: this.$store.state.colorPrincipal},
      }
    }
  },
  computed: {
    existCurrentProduct(){
      return this.$store.state.existCurrentProduct;
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.ko_header{
  position: relative;
  width: 100%;
  height: 90px;
  background-color: #9b9b9b;
  padding: 0 20px;
}
.block{
  font-weight: bold;
}
.text{
  font-size: 15px;
}
.detail{
  font-size: 12px;
}
a{
  text-decoration: none;
}
.pointer{
  cursor: pointer;
}
.maxcontainer{
  max-width: 1600px;
}
.infinite-status-prompt{
    display: none;
}
</style>
