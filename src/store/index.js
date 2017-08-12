import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const conf = JSON.parse(localStorage.getItem("conf"));
let cart = [];
if(localStorage.getItem('ShoppingCart')){
  cart = JSON.parse(localStorage.getItem('ShoppingCart'));
}

export const store = new Vuex.Store({
  state: {
    id: conf.id,
    colorPrincipal: conf.color_principal,
    colorSecundario: conf.color_secundario,
    colorTexto: conf.color_texto,
    tema: conf.tema,
    urlFondo: conf.url_fondo,
    nombreFuente: conf.nombre_fuente,
    banners: [],
    categorias: [],
    productos: [],
    subcategorias: [],
    geolocalizacion: [],
    tienda: {},
    productsCart: cart,
    totalCart: 0,
    orderComponent: false,
    menuComponent: false,
  },
  mutations: {
    updateContentCart (state) {
      localStorage.setItem('ShoppingCart', JSON.stringify(state.productsCart))
      store.commit('calculateTotalCart');
    },
    calculateTotalCart (state) {
      state.totalCart = 0;
      for(let product of state.productsCart){
        state.totalCart += (product.precio * product.cantidad);
      }
    }
  }
})

axios.get(`http://komercia.co/api/front/tienda/${conf.id}`).then((response) => {
  store.state.banners = response.data.data.banners;
  store.state.productos = response.data.data.productos;
  store.state.categorias = response.data.data.categorias;
  store.state.subcategorias = response.data.data.subcategorias;
  store.state.geolocalizacion = response.data.data.geolocalizacion;
  store.state.tienda = response.data.data.tienda;
})
