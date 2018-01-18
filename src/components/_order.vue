<template>
  <div id="order" v-on:click="backPage" :class="{activeOrder:orderComponent}">
    <h2></h2>
    <div :class="{order: true ,active: orderComponent}">
      <div v-show="products.length == 0" class="empty_products">
        <img src="../assets/empty_cart.png" alt="">
        <router-link to="/catalogo">Comprar</router-link>
      </div>
      <div v-show="products.length != 0"  class="products">
        <div v-for="(product, index) in products" class="product">
          <figure class="photo">
            <img :src="setFoto(product.foto)" alt="">
          </figure>
          <p class="nombre">{{product.nombre}}</p>
          <div class="">
            <p v-for="opcion in product.combinacion">{{opcion}} -</p>
          </div>
          <p class="precio" v-show="product.precio">{{product.cantidad}} X {{product.precio | currency}}</p>
          <div class="quantity">
            <button class="quantity_remove" v-on:click="removeQuantity(product, index)"><i class="material-icons">remove</i></button>
            <p class="quantity_value">{{ product.cantidad }}</p>
            <button class="quantity_add" v-on:click="addQuantity(product, index)"><i class="material-icons">add</i></button>
          </div>
          <i class="material-icons pointer" v-on:click="deleteItemCart(index)">close</i>
        </div>
      </div>
      <div class="content">
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
export default {
  mounted() {
    this.products = this.$store.state.productsCart;
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    totalCart() {
      return this.$store.state.totalCart;
    },
    orderComponent() {
      return this.$store.state.orderComponent;
    }
  },
  methods: {
    addQuantity(product, index) {
      if (product.limitQuantity > product.cantidad) {
        product.cantidad = product.cantidad + 1;
        this.products.splice(index, 1, product);
        this.$store.commit("updateContentCart");
      }
    },
    removeQuantity(product, index) {
      if (this.products[index].cantidad >= 2) {
        product.cantidad = product.cantidad - 1;
        this.products.splice(index, 1, product);
        this.$store.commit("updateContentCart");
      }
    },
    setFoto(f) {
      return `${this.$urlHttp}/mini/${f}`;
    },
    deleteItemCart(i) {
      this.$store.state.productsCart.splice(i, 1);
      this.$store.commit("updateContentCart");
      this.$store.commit("removeProductsPurchased");
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
    }
  }
};
</script>

<style scoped>
#order {
  width: 100%;
  min-height: calc(100vh - 306px);
  background-color: rgba(255, 255, 255, 1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#closeOrder {
  cursor: pointer;
}
header {
  width: 100%;
  background-color: #9b9b9b;
  padding: 0 20px;
}
.order {
  max-width: 1000px;
  width: 95%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: 0 0 19px 7px rgba(121, 121, 121, 0.25);
  color: rgba(0, 0, 0, 0.6);
  margin: 50px auto;
  transition: all 0.3s;
}
#order.activeOrder {
  opacity: 1;
  right: 0%;
}
.order.active {
  right: 0;
}
.empty_products {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.empty_products a {
  border-style: none;
  border: 2px solid red;
  background-color: transparent;
  border-radius: 15px;
  padding: 10px 30px;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  color: var(--color_principal);
  border: 2px solid var(--color_principal);
}
.products {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: auto;
  align-content: flex-start;
}
.product {
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
.product .photo img {
  max-width: 50px;
  max-height: 50px;
}
.product .nombre {
  max-width: 160px;
  font-size: 13px;
}
.content {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--color_secundario);
}
.order .total {
  width: 25%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}
.order .total h3 {
  font-size: 1.2em;
  color: #fff;
}
.order .quantity {
  display: flex;
  align-items: center;
}
.quantity_remove,
.quantity_add {
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: none;
  background-color: transparent;
  border: 1px solid black;
  padding: 2.5px;
  outline: none;
  cursor: pointer;
  transition: 0.5s;
}
.quantity_value {
  margin: 0 10px;
}
.quantity_remove:hover,
.quantity_add:hover {
  transform: scale(0.9);
}
.quantity_remove i,
.quantity_add i {
  font-size: 14px;
}
.actionOrder {
  border-style: none;
  color: #fff;
  border: 2px solid #fff;
  background-color: transparent;
  /* border-radius: 15px; */
  padding: 8px 30px;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
}
.actionOrder:hover {
  transform: scale(0.97);
  background-color: rgba(0, 0, 0, 0.1);
}
@media (max-width: 1000px) {
  .products {
    justify-content: center;
  }
  .product {
    width: 95%;
  }
}
</style>
