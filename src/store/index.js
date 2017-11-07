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
    geolocalizacion: null,
    tienda: {},
    productsCart: cart,
    totalCart: 0,
    orderComponent: false,
    menuComponent: false,
    productsPlaceholder: [
      {
        placeholder: true,
        foto: 'placeholder1.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },{
        placeholder: true,
        foto: 'placeholder2.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },{
        placeholder: true,
        foto: 'placeholder3.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      },{
        placeholder: true,
        foto: 'placeholder4.svg',
        nombre: 'Nombre del producto',
        precio: '14999',
      }
    ],
    mediospago: {
      epayco: false,
    },
    politicas: {
      garantia: '',
      datos: '',
    },
  },
  mutations: {
    updateContentCart (state) {
      localStorage.setItem('ShoppingCart', JSON.stringify(state.productsCart))
      store.commit('calculateTotalCart');
    },
    productsPurchased(state) {
      for(let product of state.productsCart){
        setTimeout(()=>{
          if(document.getElementById(product.id)){
            document.getElementById(product.id).classList.add('bought');
            document.getElementById(product.id).style.borderColor = state.colorSecundario;
            document.getElementById(product.id).querySelector('.quantity_add').style.cssText = `border-color: ${state.colorSecundario}; color: ${state.colorSecundario};`;
            document.getElementById(product.id).querySelector('.quantity_remove').style.cssText = `border-color: ${state.colorSecundario}; color: ${state.colorSecundario};`;
          }
        }, 500)
      }
    },
    removeProductsPurchased(state, id) {
      if(document.getElementById(id)){
        document.getElementById(id).classList.remove('bought');
      }
    },
    calculateTotalCart (state) {
      state.totalCart = 0;
      for(let product of state.productsCart){
        state.totalCart += (product.precio * product.cantidad);
      }
    }
  }
})

axios.get(`https://komercia.co/api/front/tienda/${conf.id}`).then((response) => {
  store.state.banners = response.data.data.banners;
  store.state.productos = response.data.data.productos;
  store.state.categorias = response.data.data.categorias;
  store.state.subcategorias = response.data.data.subcategorias;
  store.state.geolocalizacion = response.data.data.geolocalizacion;
  store.state.mediospago = response.data.data.medios_pago || { epayco: false };
  store.state.politicas = response.data.data.politicas || { garantia: '', datos: '' };
  store.state.tienda = response.data.data.tienda;
})
