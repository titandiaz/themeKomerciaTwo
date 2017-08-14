<template>
  <div class="home">
    <header>
      <header-menu class="menu_responsive_home"></header-menu>
      <header-menu2 class="menu_responsive_home2"></header-menu2>
      <banners></banners>
      <!--<label for="searchProduct" class="header__search"><i class="material-icons">search</i><input type="text" id="searchProduct" placeholder="Buscar producto"></label>-->
    </header>
      <section class="items">
        <div class="items_item offers">
          <div class="items_item_info">
            <h3>Nuestras Ofertas</h3>
            <p class="detail">Encuentra lo que</br> siempre has querido</p>
            <router-link to="/productos" class="detail block">Ver Catalogo</router-link>
          </div>
          <img src="../assets/offers.png">
        </div>
        <div class="items_item login">
          <div class="items_item_info">
            <h3>Registrate Gratis</h3>
            <p class="detail">Crea una cuenta de comprador</p>
            <router-link to="/productos" class="detail">REGISTRATE</router-link>
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
          <div class="features_item">
            <img src="../assets/cards.png" alt="">
            <div class="features_item_info">
              <h3>Pagos online</h3>
              <p>Contamos con diferentes medios de pago para que realices tus compras por internet </p>
              <router-link to="/productos">EMPEZAR A COMPRAR</router-link>
            </div>
          </div>
          <div class="features_item">
            <img src="../assets/mensajero.png" alt="">
            <div class="features_item_info">
              <h3>Recibe tu producto</h3>
              <p>Recibe tus compras sin salir de casa Enviamos tus productos con seguridad</p>
              <router-link to="/productos">EMPEZAR A COMPRAR</router-link>
            </div>
          </div>
      </section>
  </div>
</template>

<script>

  import headerMenu from './menu.vue';
  import headerMenu2 from './menu2.vue';
  import banners from './banners.vue';
  import product from './product.vue';
  import axios from 'axios';

  export default {
    components: { headerMenu, headerMenu2, product, banners },
    name: 'home',
    created(){
      axios.get(`https://komercia.co/api/tienda/inventario/${this.$store.state.id}`).then((response) => {
        this.products = response.data.datos.slice(0,8);
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
    flex-direction: column;
    align-items: center;
  }
  .menu_responsive_home2{
    display: none !important;
  }
  .banners{
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .header__search{
    position: absolute;
    bottom: 30px;
    max-width: 350px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    background-color: #FFF;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 10px;
    z-index: 3;
    box-shadow:  0 0 10px 2px rgba(0,0,0,0.3);
  }
  .header__search i{
    color: #5c5c5c;
  }
  .header__search input{
    width: 91%;
    height: 100%;
    outline: none;
    border-style: none;
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
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 30px 0px;
    background-color: #FFF;
  }
  .features_item{
    width: 430px;
    min-height: 155px;
    display: flex;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 10.8px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    margin: 10px;
    padding: 0 25px;
  }
  .features_item:nth-child(2) img{
    align-self: flex-end;
  }
  .features_item_info{
    text-align: right;
  }
  .features_item_info h3{
    font-size: 16px;
  }
  .features_item_info p{
    font-size: 14px;
    margin: 8px 0;
  }
  .features_item_info a{
    font-size: 12px;
    font-weight: bold;
    color: #1c65b9;
  }
  @media(max-width: 800px){
    header{
      flex-direction: column;
    }
    .banners{

    }
  }
  @media(max-width: 700px){
    .menu_responsive_home{
      display: none;
    }
    .menu_responsive_home2{
      width: 100%;
      padding: 0 10px;
      display: flex !important;
    }
    .header__search{
      display: none;
    }
  }
  @media(max-width: 320px){
    .features_item{
        flex-direction: column;
    }
    .features_item_info{
      text-align: center;
      margin: 10px 0;
    }
  }
</style>
