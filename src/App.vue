<template>
  <div id="app" :style="stylesConf">
    <ko-notify></ko-notify>
    <header class="ko_header" :style="stylesConf.colorPrincipal">
			<header-menu></header-menu>
		</header>
    <product-preview v-if="existCurrentProduct"></product-preview>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import koNotify from './components/notify_product.vue'
import headerMenu from './components/menu2.vue';
import productPreview from './components/product_preview.vue';
import footerComponent from './components/footer.vue'
export default {
  name: 'app',
  components: { koNotify, headerMenu, productPreview, footerComponent },
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
@import url('../node_modules/font-awesome/css/font-awesome.min.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: var(--color_fondo);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.ko_header{
  position: relative;
  width: 100%;
  height: 70px;
  background-color: var(--color_principal);
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
