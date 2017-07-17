<template>
  <div class="home">
    <header>
      <header-menu></header-menu>
      <img class="banners" :src="`http://komercia.co/banners/${banners.ruta_banner}`" alt="">
    </header>
      <section class="items">
        <div class="items_item offers">
          <div class="items_item_info">
            <h3>Nuestras Ofertas</h3>
            <p class="detail">Encuentra lo que</br> siempre has querido</p>
            <a href="#" class="detail block">Ver Catalogo</a>
          </div>
          <img src="../assets/offers.png">
        </div>
        <div class="items_item login">
          <div class="items_item_info">
            <h3>Registrate Gratis</h3>
            <p class="detail">Crea una cuenta de comprador</p>
            <a href="#" class="detail">REGISTRATE</a>
          </div>
        </div>
        <div class="items_item shopping_cart">
          <img src="../assets/shopping.png">
          <div class="items_item_info">
            <h3>Carrito de compras</h3>
            <p class="detail">Añade tus productos</br> favoritos al carrito</p>
            <a href="#" class="detail block">Ir al carrito</a>
          </div>
        </div>
      </section>
      <section class="products">
          <product v-for="product in products" :data="product" :key="product.id"></product>
      </section>
      <div class="goProducts">
          <router-link to="/productos">Ir a  Productos</router-link>
      </div>
      <section class="features">
          <div class="features_item"></div>
          <div class="features_item"></div>
      </section>
  </div>
</template>

<script>

  import headerMenu from './menu.vue';
  import product from './product.vue';
  import axios from 'axios';

  export default {
    components: { headerMenu, product },
    name: 'home',
    created(){
      axios.get(`http://www.komercia.co/api/tienda/inventario/${this.$store.state.id}`).then((response) => {
        this.products = response.data.datos;
      })
    },
    data () {
      return {
        products: [],
      }
    },
    computed: {
      banners() {
        console.log(this.$store.state.banners)
        return this.$store.state.banners;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    box-sizing: border-box;
    color: #4a4a4a;
  }
  header{
    position: relative;
    width: 100%;
    display: flex;
  }
  .banners{
    height: auto;
    margin: 0 auto;
  }
  .items{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #FFF;
    color: #4a4a4a;
    padding: 40px 0;
  }
  .items_item{
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
  .items_item h3{
    font-size: 18px;
    font-weight: 600;
  }
  .items_item img{
    padding: 0 15px;
  }
  .items_item_info .detail{
    margin: 3px 0px;
  }
  .items_item.offers a{
    color: #4990e2;
  }
  .items_item.login{
    text-align: center;
  }
  .items_item.login a{
    border: 1px solid rgba(151, 151, 151, 0.76);
    padding: 10px 30px;
    border-radius: 19px;
    color: #4c4c4c;
  }
  .items_item.shopping_cart{
    text-align: end;
  }
  .items_item.shopping_cart a{
    color: #e87e04;
  }
  .items_item_info{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .products{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 16px;
  }
  .goProducts{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
  .goProducts a{
    border-style: none;
    background-color: #4383ff;
    color: #FFF;
    border-radius: 100px;
    padding: 15px 45px;
    cursor: pointer;
  }
  .features{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 30px 0px;
    background-color: #FFF;
  }
  .features_item{
    width: 430px;
    height: 155px;
    background-color: #f1f1f1;
    border-radius: 10.8px;
  }
</style>
