<template>
  <div class="home">
    <header>
      <banners></banners>
    </header>
    <!-- <div class="container-title-special">
      <i class="fa fa-star icon-title" aria-hidden="true"></i>
      <h1 class="main-title-promo">productos especiales</h1>
      <i class="fa fa-star icon-title" aria-hidden="true"></i>
    </div>
    <promo/> -->
      <h1 class="title-news-products">Nuevos Productos</h1>
      <section class="products maxcontainer">
          <product v-for="product in products" :data="product" :key="product.id"></product>
          <product v-if="products.length == 0" v-for="product in productsPlaceholder" :data="product" :key="product.id"></product>
      </section>
      <div class="goProducts">
          <router-link to="/catalogo" >Ir a  Productos</router-link>
      </div>
      <section class="features">
        <div class="wrapper">
          <div class="features_item">
            <img src="/template2/cards.png" alt="">
            <div class="features_item_info">
              <h3>Pagos online</h3>
              <p>Contamos con diferentes medios de pago para que realices tus compras por internet </p>
              <router-link to="/catalogo">EMPEZAR A COMPRAR</router-link>
            </div>
          </div>
          <div class="features_item">
            <img src="/template2/mensajero.png" alt="">
            <div class="features_item_info">
              <h3>Recibe tu producto</h3>
              <p>Recibe tus compras sin salir de casa Enviamos tus productos con seguridad</p>
              <router-link to="/catalogo">EMPEZAR A COMPRAR</router-link>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import banners from './banners.vue';
import promo from './promo.vue';
import product from './product.vue';
import axios from 'axios';

export default {
  components: { product, banners, promo },
  name: 'home',
  mounted() {
    this.$store.commit('productsPurchased');
  },
  watch: {
    products: function(value) {
      this.$store.commit('productsPurchased');
    },
  },
  data() {
    return {};
  },
  computed: {
    productsPlaceholder() {
      return this.$store.state.productsPlaceholder;
    },
    products() {
      return this.$store.state.productos.slice(0, 4);
    },
    styles() {
      return {
        colorPrincipal: { backgroundColor: this.$store.state.colorPrincipal },
        colorSecundario: { color: this.$store.state.colorSecundario },
      };
    },
    banners() {
      return this.$store.state.banners;
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  color: #4a4a4a;
}
.title-news-products {
  margin-bottom: 30px;
}
.icon-title {
  color: var(--color_secundario);
}
.main-title-promo {
  text-transform: uppercase;
  font-weight: 700px;
  padding: 0 20px;
}
.container-title-special {
  display: flex;
  align-items: center;
  margin-top: 60px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.placeholder_banners {
  width: 100%;
  height: 100%;
}
.placeholder_banners svg {
  display: block;
  fill: rgba(120, 129, 136, 0.35);
  background-color: #fff;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid rgba(120, 129, 136, 0.2);
}
.menu_responsive_home2 {
  display: none !important;
}
.banners {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.header__search {
  position: absolute;
  bottom: 30px;
  max-width: 350px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 10px;
  z-index: 3;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
}
.header__search i {
  color: #5c5c5c;
}
.header__search input {
  width: 91%;
  height: 100%;
  outline: none;
  border-style: none;
}
.items {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #fff;
  color: #4a4a4a;
  padding: 40px 0;
}
.items_item {
  min-width: 285px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin: 5px;
  padding: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
}
.items_item h3 {
  font-size: 18px;
  font-weight: 600;
}
.items_item img {
  padding: 0 15px;
}
.items_item_info .detail {
  margin: 3px 0px;
}
.items_item.offers a {
  color: #4990e2;
}
.items_item.login {
  text-align: center;
}
.items_item.login a {
  border: 1px solid rgba(151, 151, 151, 0.76);
  padding: 10px 30px;
  border-radius: 19px;
  color: #4c4c4c;
}
.items_item.shopping_cart {
  text-align: end;
}
.items_item.shopping_cart a {
  color: #e87e04;
}
.items_item_info {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 16px;
}
.goProducts {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
.goProducts a {
  border-style: none;
  background-color: var(--color_secundario);
  color: #fff;
  /* border-radius: 100px; */
  padding: 10px 45px;
  cursor: pointer;
}
.features {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 30px 0px;
  background-color: #fff;
}
.features_item {
  width: 430px;
  min-height: 155px;
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  /* border-radius: 10.8px; */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  margin: 10px;
  padding: 0 25px;
}
.features_item:nth-child(2) img {
  align-self: flex-end;
}
.features_item_info {
  text-align: right;
}
.features_item_info h3 {
  font-size: 16px;
}
.features_item_info p {
  font-size: 14px;
  margin: 8px 0;
}
.features_item_info a {
  font-size: 12px;
  font-weight: bold;
  color: var(--color_secundario);
}
.wrapper {
  max-width: 1600px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
@media (max-width: 800px) {
  header {
    flex-direction: column;
  }
}
@media (max-width: 700px) {
  .menu_responsive_home {
    display: none !important;
  }
  .menu_responsive_home2 {
    width: 100%;
    padding: 0 10px;
    display: flex !important;
    background-color: #9b9b9b;
  }
  .header__search {
    display: none;
  }
}
@media (max-width: 500px) {
  .container-title-special {
    text-align: center;
    line-height: 1;
  }
}
@media (max-width: 320px) {
  .features_item {
    flex-direction: column;
  }
  .features_item_info {
    text-align: center;
    margin: 10px 0;
  }
}
</style>
