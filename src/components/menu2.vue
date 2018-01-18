<template>
  <div class="header_main maxcontainer">
    <router-link to="/" class="header_brand">
        <figure class="header__logo">
          <img v-if="info.logo" :src="`${$urlHttp}/logos/${info.logo}`" alt="">
        </figure>
        <!-- <h1 class="header__title">{{ info.nombre }}</h1> -->
    </router-link>
    <nav class="header_navigation">
      <ul class="header_navigation_list">
        <li class="header_navigation__item"><router-link to="/">Inicio</router-link></li>
        <li class="header_navigation__item"><router-link to="/catalogo">Catalogo</router-link></li>
        <li class="header_navigation__item"><router-link to="/pedido">Carrito</router-link></li>
        <li class="header_navigation__item"><router-link to="/contacto">Contacto</router-link></li>
      </ul>
      <!-- <span class="separator">|</span> -->
      <ul class="icons-list">
        <li class="icon-item"><a @click="openOrderComponent"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a></li>
        <div class="container-quantity">
          <span class="quantity">{{quantityCart}}</span>
        </div>
      </ul>
      <div class="container-search">
        <form role="search" method="get" class="searchform" action="">
          <input v-model="search" type="text" value="" autocomplete="off" placeholder="buscador" id="s" />
          <label class="search-label" for="s">
            <i class="fa fa-search icon-search" aria-hidden="true"></i>
          </label>
        </form>
      </div>
    </nav>
    <i class="material-icons icon_menu" v-on:click="openMenuComponent">menu</i>
    <menu-lateral></menu-lateral>
  </div>
</template>

<script>
import menuLateral from './menu_lateral.vue';

export default {
  components: { menuLateral },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    styles() {
      return {
        colorPrincipal: { backgroundColor: this.$store.state.colorPrincipal },
        colorSecundario: { backgroundColor: this.$store.state.colorSecundario },
      };
    },
    info() {
      return this.$store.state.tienda;
    },
    productsData() {
      return this.$store.state.productos;
    },
    quantityCart() {
      var quantityCart = 0;
      this.$store.state.productsCart.map(product => {
        quantityCart += product.cantidad;
        return product;
      });
      return quantityCart;
    },
  },
  methods: {
    openMenuComponent() {
      this.$store.state.menuComponent = true;
    },
    openOrderComponent() {
      this.$store.state.orderComponent = true;
    },
    searchProduct() {
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['nombre'],
      };
      this.$search(this.search, this.productsData, options).then(results => {
        this.$store.state.searchProducts = results;
        console.log(results);
      });
      // this.paginationActions = false;
    },
  },
  watch: {
    search: function() {
      this.searchProduct();
      if (this.$route.path != '/catalogo') {
        this.$router.push('/catalogo');
      }
      // if(this.search == ''){
      // 	this.paginationActions = true;
      // }
    },
  },
};
</script>

<style scoped>
a:visited {
  color: initial;
}
.fa-shopping-cart {
  color: black;
  cursor: pointer;
}
.container-quantity {
  position: relative;
  right: 25px;
  top: -10px;
  line-height: 15px;
  width: 15px;
  height: 15px;
  background: var(--color_secundario);
  color: #fff;
  font-size: 8px;
  text-align: center;
  border-radius: 50%;
}
.icon-search {
  display: flex;
  justify-content: center;
  padding-right: 7px;
}
.container-search {
  margin: auto;
  /* padding:3em 0 0; */
  /* text-align:center; */
}
.search-label {
  cursor: pointer;
  /* padding-left: 1px; */
  display: inline-block;
  margin-top: 0.3em;
  /* color:rgba(218,208,190,1); */
  /* text-shadow:0 0 0.1em rgba(60,60,60,0.3); */
  /* position: relative; */
  /* left:0.1em; */
}
#s:focus {
  width: 8em;
  opacity: 1;
}
#s {
  text-align: center;
  transition: all 0.2s ease-out;
  width: 1px;
  /* border-radius:0; */
  /* box-shadow:none; */
  outline: none;
  /* padding:0; */
  /* margin:0; */
  border: 0;
  background-color: transparent;
  opacity: 0;
  font-size: 14px;
  /* padding: 10px; */
}
.searchform {
  display: inline;
  font-size: 1em;
  border-radius: 8em;
  /* border:0.1em solid rgba(218,208,190,1); */
  box-shadow: 0 0 0.1em rgba(60, 60, 60, 0.4);
  padding: 0.2em;
  background: white;
}
.separator {
  display: flex;
  align-self: center;
  padding-left: 10px;
}
.icons-list {
  list-style: none;
  display: flex;
  align-items: center;
  /* margin-left: 10px; */
}
.icon-item {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 20px !important;
}
.header_main {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  font-size: 20px;
  background-color: var(--color_principal);
}
.header_brand {
  display: flex;
  align-items: center;
}
.header__logo {
  max-width: 150px;
  /* width: 100%; */
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0 0;
  /* border-radius: 50%;
    overflow: hidden;
    background-color: #FFF; */
  /* box-shadow: 0px 0px 0px 4px rgba(255,255,255, 0.5); */
}
.header__logo img {
  max-width: 100%;
  max-height: 90%;
}
/* .header__title{
    font-size: 1.25em;
    color: #FFF;
  } */
.icon_menu {
  display: none;
}
.header_navigation {
  height: 100%;
  display: flex;
}
.header_navigation_list {
  height: 100%;
  list-style: none;
  display: flex;
  align-items: center;
}
.header_navigation__item:hover {
  border-bottom: 2px solid var(--color_secundario);
}
.header_navigation__item {
  height: 60%;
  display: flex;
}
.header_navigation__item a {
  height: 100%;
  margin: 0 10px;
  display: flex;
  align-items: center;
  color: var(--color-texto);
}
@media (max-width: 700px) {
  .header__logo {
    max-width: 120px;
    width: 100%;
    height: 55px;
  }
  /* .header__title{
      font-size: 1em;
      color: #FFF;
    } */
  .icon_menu {
    display: flex;
    color: #000;
  }
  .header_navigation {
    display: none;
  }
}
</style>
