<template>
  <div id="order" v-on:click="backPage" :class="{activeOrder:orderComponent}">
    <header>
        <header-menu></header-menu>
    </header>
    <div :class="{order: true ,active: orderComponent}">
      <div class="products">
        <div v-for="(product, index) in productsCart" class="product">
          <figure class="photo">
            <img :src="setFoto(product.foto)" alt="">
          </figure>
          <p class="nombre">{{product.nombre}}</p>
          <p class="precio" v-show="product.precio">{{product.cantidad}} X {{product.precio | currency}}</p>
          <i class="material-icons pointer" v-on:click="deleteItemCart(index)">close</i>
        </div>
      </div>
      <div class="content">
        <header :style="styles.colorPrincipal">
          <i class="material-icons">shopping_cart</i>
          <p>Mi pedido</p>
          <i id="closeOrder" class="material-icons">close</i>
        </header>
        <div class="total">
          <p>Total</p>
          <h3 :style="styles.colorSecundarioTotal">{{ totalCart | currency }}</h3>
        </div>
        <button class="actionOrder" :style="styles.colorSecundario" v-on:click="next">Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
import headerMenu from './menu2.vue';

export default {
  components: { headerMenu },
  computed: {
    totalCart(){
      return this.$store.state.totalCart;
    },
    orderComponent(){
      return this.$store.state.orderComponent;
    },
    productsCart(){
      return this.$store.state.productsCart;
    },
    styles(){
      return {
        colorPrincipal:{backgroundColor: this.$store.state.colorPrincipal},
        colorSecundario: {backgroundColor: this.$store.state.colorSecundario},
        colorSecundarioTotal: {color: this.$store.state.colorSecundario}
      }
    }
  },
  methods: {
    setFoto(f) {
      return `http://komercia.co/productos/${f}`;
    },
    deleteItemCart(i){
      this.$store.state.productsCart.splice(i, 1);
      this.$store.commit('updateContentCart');
      this.$store.commit('removeProductsPurchased');
    },
    backPage(e) {
      if(e.target.id == 'order' || e.target.id == 'closeOrder'){
        this.$store.state.orderComponent = false;
      }
    },
    next(){
      let json = {
        products: this.$store.state.productsCart,
        tienda: this.$store.state.id,
        tipo: 0,
        total: this.$store.state.totalCart,
        estado: 0,
        direccion_entrega: 1
      }
      json = JSON.stringify(json)
      location.href = `https://komercia.co/beforecheckout/${json}`;
    }
  },
  filters: {
    currency(value) {
      // return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return value
    }
  }
}
</script>

<style scoped>
  #order{
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(255,255,255,1);
    z-index: 10;
    right: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #closeOrder{
    cursor: pointer;
  }
  header{
    width: 100%;
    background-color: #e4e4e4;
  }
  .order{
    width: 90%;
    height: 600px;
    display: flex;
    align-items: flex-start;
    background-color: #FFF;
    box-shadow: 0 0 19px 7px rgba(121, 121, 121, 0.25);
    color: rgba(0,0,0,0.6);
    margin: auto;
    transition: all .3s;
  }
  #order.activeOrder{
    opacity: 1;
    right: 0%;
  }
  .order.active{
    right: 0;
  }
  .products{
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    overflow-y: auto;
  }
  .product{
    width: 45%;
    display: flex;
    flex: none;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 10px 20px;
    border-radius: 4px;
    border: solid 1px #e5e5e5;
  }
  .product .photo img{
    max-width: 50px;
    max-height: 50px;
  }
  .product .nombre{
    max-width: 160px;
    font-size: 13px;
  }
  .content{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .order header{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .order .total{
    display: flex;
    justify-content: space-around;
  }
  .order .total h3{
    font-size: 1.2em;
  }
  .actionOrder{
    width: 100%;
    border-style: none;
    padding: 15px 0;
  }
</style>
