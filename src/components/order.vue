<template>
  <div id="order" v-on:click="backPage" :class="{activeOrder:orderComponent}">
    <div :class="{order: true ,active: orderComponent}">
      <header :style="styles.colorPrincipal">
        <i class="material-icons">shopping_cart</i>
        <p>Mi pedido</p>
        <i id="closeOrder" class="material-icons">close</i>
      </header>
      <div class="products">
        <div v-for="(product, index) in productsCart" :key="index" class="product">
          <figure class="photo">
            <img :src="setFoto(product.foto)" alt="">
          </figure>
          <p class="nombre">{{product.nombre | capitalize}}</p>
          <div class="">
            <p v-for="opcion in product.combinacion">{{opcion}} -</p>
          </div>
          <p class="precio">{{product.cantidad}} <span v-show="product.precio">X {{product.precio | currency}}</span></p>
          <i class="material-icons pointer" v-on:click="deleteItemCart(index, product.id)">close</i>
        </div>
      </div>
      <div class="total">
        <p>Total</p>
        <h3>{{ totalCart | currency }}</h3>
      </div>
      <div class="actionOfCheckout">
        <button class="actionOrder" v-on:click="next">Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totalCart() {
      return this.$store.state.totalCart;
    },
    orderComponent() {
      return this.$store.state.orderComponent;
    },
    productsCart() {
      return this.$store.state.productsCart;
    },
    styles() {
      return {
        colorPrincipal: { backgroundColor: this.$store.state.colorPrincipal },
        colorSecundario: { backgroundColor: this.$store.state.colorSecundario },
        colorSecundarioTotal: { color: this.$store.state.colorSecundario }
      };
    }
  },
  methods: {
    setFoto(f) {
      return `${this.$urlHttp}/mini/${f}`;
    },
    deleteItemCart(i, id) {
      this.$store.state.productsCart.splice(i, 1);
      this.$store.commit("updateContentCart");
      this.$store.commit("removeProductsPurchased", id);
    },
    backPage(e) {
      if (e.target.id == "order" || e.target.id == "closeOrder") {
        this.$store.state.orderComponent = false;
      }
    },
    next() {
      let json = {
        products: this.$store.state.productsCart,
        tienda: this.$store.state.id,
        tipo: 0,
        total: this.$store.state.totalCart,
        estado: 0,
        direccion_entrega: 1
      };
      json = JSON.stringify(json);
      if (this.$store.state.productsCart.length != 0) {
        location.href = `${this.$urlHttp}/before/checkout/${json}`;
      }
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    },
    capitalize(value) {
      if (value) {
        value = value.toLowerCase();
        return value.replace(/^\w|\s\w/g, l => l.toUpperCase());
      }
    }
  }
};
</script>

<style scoped>
#order {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  right: 0;
  transition: 0.2s;
}
#closeOrder {
  cursor: pointer;
}
.order {
  position: absolute;
  top: calc(50% - 300px);
  right: -430px;
  max-width: 400px;
  width: 100%;
  max-height: 100vh;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.6);
  /* border-radius: 10px 0 0 10px; */
  overflow: hidden;
  transition: all 0.3s;
}
#order.activeOrder {
  opacity: 1;
  visibility: visible;
}
.order.active {
  right: 0;
}
.order header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.products {
  height: calc(600px - 160px);
  overflow-y: auto;
}
.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 20px;
  /* border-radius: 4px; */
  border: solid 1px #e5e5e5;
}
.product .photo img {
  max-width: 50px;
  max-height: 50px;
}
.product .nombre {
  max-width: 160px;
  font-size: 13px;
}
.order .total {
  display: flex;
  justify-content: space-around;
}
.order .total h3 {
  font-size: 1.2em;
  color: var(--color_secundario);
}
.order .actionOfCheckout {
  width: 100%;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  background-color: var(--color_secundario);
}
.actionOrder {
  border-style: none;
  color: #fff;
  border: 2px solid #fff;
  background-color: transparent;
  /* border-radius: 15px; */
  padding: 10px 50px;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
}
.actionOrder:hover {
  color: var(--color_secundario);
  /* transform: scale(0.9); */
  background-color: #fff;
}
@media (max-height: 600px) {
  .order {
    top: initial;
  }
}
</style>
