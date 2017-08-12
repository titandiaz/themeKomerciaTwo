<template>
  <div id="order" v-on:click="backPage">
    <div class="order">
      <header :style="styles.colorPrincipal">
        <i class="material-icons">shopping_cart</i>
        <p>Mi pedido</p>
        <i id="closeOrder" class="material-icons">close</i>
      </header>
      <div class="products">
        <div v-for="product in productsCart" class="product">
          <figure class="photo">
            <img :src="setFoto(product.foto)" alt="">
          </figure>
          <p class="nombre">{{product.nombre}}</p>
          <p class="precio" v-show="product.precio">{{product.precio}}</p>
          <i class="material-icons">close</i>
        </div>
      </div>
      <div class="total">
        <p>Total</p>
        <h3>$14.000</h3>
      </div>
      <button class="actionOrder" :style="styles.colorSecundario">Finalizar compra</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    productsCart(){
      return this.$store.state.productsCart;
    },
    styles(){
      return {
        colorPrincipal:{backgroundColor: this.$store.state.colorPrincipal},
        colorSecundario: {backgroundColor: this.$store.state.colorSecundario}
      }
    }
  },
  methods: {
    setFoto(f) {
      return `http://komercia.la/productos/${f}`
    },
    backPage(e) {
      if(e.target.id == 'order' || e.target.id == 'closeOrder'){
        this.$router.push('/productos');
      }
    }
  }
}
</script>

<style scoped>
  #order{
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(255,255,255,0.5);
    z-index: 10;
  }
  #closeOrder{
    cursor: pointer;
  }
  .order{
    position: absolute;
    top: calc(50% - 300px);
    right: -430px;
    max-width: 400px;
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #FFF;
    box-shadow: 0 0 19px 7px rgba(121, 121, 121, 0.45);
    transition: all .5s;
  }
  .order header{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .products{
    height: calc(600px - 160px);
    overflow-y: auto;
  }
  .product{
    display: flex;
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
  .order .total{
    display: flex;
    justify-content: space-around;
  }
  .actionOrder{
    width: 100%;
    border-style: none;
    padding: 15px 0;
  }
</style>
