<template>
  <div id="order" v-on:click="backPage" :class="{activeOrder:orderComponent}">
    <header>
        <header-menu></header-menu>
    </header>
    <h2></h2>
    <div :class="{order: true ,active: orderComponent}">
      <div v-show="productsCart.length == 0" class="empty_products">
        <img src="../assets/empty_cart.png" alt="">
        <router-link to="/productos" :style="styles.colorPrincipalFont">Comprar</router-link>
      </div>
      <div v-show="productsCart.length != 0"  class="products">
        <div v-for="(product, index) in productsCart" class="product">
          <figure class="photo">
            <img :src="setFoto(product.foto)" alt="">
          </figure>
          <p class="nombre">{{product.nombre}}</p>
          <p class="precio" v-show="product.precio">{{product.cantidad}} X {{product.precio | currency}}</p>
          <i class="material-icons pointer" v-on:click="deleteItemCart(index)">close</i>
        </div>
      </div>
      <div class="content" :style="styles.colorSecundario">
        <div class="total">
          <p>Total</p>
          <h3>{{ totalCart | currency }}</h3>
        </div>
        <button class="actionOrder" v-on:click="next">Finalizar compra</button>
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
        colorPrincipalFont:{color: this.$store.state.colorPrincipal, border: `2px solid ${this.$store.state.colorPrincipal}`},
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
    width: 100%;
    background-color: rgba(255,255,255,1);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #closeOrder{
    cursor: pointer;
  }
  header{
    width: 100%;
    background-color: #9b9b9b;
    padding: 0 20px;
  }
  .order{
    max-width: 1000px;
    width: 95%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #FFF;
    box-shadow: 0 0 19px 7px rgba(121, 121, 121, 0.25);
    color: rgba(0,0,0,0.6);
    margin: 50px auto;
    transition: all .3s;
  }
  #order.activeOrder{
    opacity: 1;
    right: 0%;
  }
  .order.active{
    right: 0;
  }
  .empty_products{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .empty_products a{
    border-style: none;
    border: 2px solid red;
    background-color: transparent;
    border-radius: 15px;
    padding: 10px 30px;
    cursor: pointer;
    transition: .3s;
    outline: none;
  }
  .products{
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: auto;
    align-content: flex-start;
  }
  .product{
    width: 45%;
    max-height: 100px;
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
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .order .total{
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .order .total h3{
    font-size: 1.2em;
  }
  .actionOrder{
    border-style: none;
    color: #FFF;
    border: 2px solid #FFF;
    background-color: transparent;
    border-radius: 15px;
    padding: 10px 30px;
    cursor: pointer;
    transition: .3s;
    outline: none;
  }
  .actionOrder:hover{
    transform: scale(0.9);
    background-color: rgba(0,0,0,0.1);
  }
  @media (max-width: 1000px) {
    .products{
      justify-content: center;
    }
    .product{
      width: 95%;
    }
  }
</style>
