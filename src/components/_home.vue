<template>
  <div class="home">
    <header>
      <header-menu></header-menu>
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
          <product></product>
          <product></product>
          <product></product>
          <product></product>
          <product></product>
      </section>
      <div class="goProducts">
          <button>Ir a  Productos</button>
      </div>
      <section class="features">
          <div class="features_item"></div>
          <div class="features_item"></div>
      </section>
      <footer>
            <div class="footer_last">
              <span class="effects"></span>
              <p class="text">Desarrollado por komercia.co</p>
              <img src="../assets/komercia.png">
            </div>
      </footer>
  </div>
</template>

<script>

import headerMenu from './menu.vue';
import product from './product.vue';

export default {
  components: { headerMenu, product },
  name: 'home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    box-sizing: border-box;
  }
  header{
    width: 100%;
    height: 60vh;
    background-color: blue;
  }
  .items{
    width: 100%;
    display: flex;
    justify-content: space-around;
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
  .goProducts button{
    border-style: none;
    background-color: #4383ff;
    color: #FFF;
    border-radius: 100px;
    padding: 15px 45px;
  }
  .features{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .features_item{
    width: 430px;
    height: 155px;
    background-color: #f1f1f1;
    border-radius: 10.8px;
  }
  footer{
    width: 100%;
  }
  .footer_last{
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    background-color: #616061;
    color: #FFF;
  }
  .footer_last .effects{
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border-right: 0px solid transparent;
    border-left: 60px solid transparent;
    border-top: 60px solid #4a4a4a;
  }
  .footer_last img{
    width: 120px;
    z-index: 2;
  }
</style>
