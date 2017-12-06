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
    tienda: {},
    envios: {},
    banners: [],
    id: conf.id,
    urlHttp: '',
    totalCart: 0,
    productos: [],
    categorias: [],
    tema: conf.tema,
    subcategorias: [],
    productsCart: cart,
    currentProduct: {},
    togglePayment: false,
    menuComponent: false,
    geolocalizacion: null,
    orderComponent: false,
    urlFondo: conf.url_fondo,
    existCurrentProduct: false,
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
    beforeCombination: [],
    mediospago: {
      epayco: false,
    },
    politicas: {
      garantia: '',
      datos: '',
    },
  },
  mutations: {
    getData(state){
      axios.get(`${state.urlHttp}/api/front/tienda/${conf.id}`).then((response) => {
        store.state.banners = response.data.data.banners;
        store.state.productos = response.data.data.productos;
        store.state.categorias = response.data.data.categorias;
        store.state.subcategorias = response.data.data.subcategorias;
        store.state.geolocalizacion = response.data.data.geolocalizacion;
        store.state.mediospago = response.data.data.medios_pago || { epayco: false };
        store.state.politicas = response.data.data.politicas || { garantia: '', datos: '' };
        store.state.tienda = response.data.data.tienda;
        store.state.envios = response.data.data.medios_envio;
        store.state.envios.valores = JSON.parse(response.data.data.medios_envio.valores);
      })
    },
    getDataProduct(state){
      axios.get(`${state.urlHttp}/api/front/producto/${state.currentProduct.id}`).then((response) => {
          state.currentProduct = Object.assign(response.data, state.currentProduct);
      }).catch((error) => {
      });
    },
    updateContentCart (state) {
      localStorage.setItem('ShoppingCart', JSON.stringify(state.productsCart))
      store.commit('calculateTotalCart');
    },
    productsPurchased(state) {
      // for(let product of state.productsCart){
      //   setTimeout(()=>{
      //     if(document.getElementById(product.id)){
      //       document.getElementById(product.id).classList.add('bought');
      //       document.getElementById(product.id).style.borderColor = state.colorSecundario;
      //       document.getElementById(product.id).querySelector('.quantity_add').style.cssText = `border-color: ${state.colorSecundario}; color: ${state.colorSecundario};`;
      //       document.getElementById(product.id).querySelector('.quantity_remove').style.cssText = `border-color: ${state.colorSecundario}; color: ${state.colorSecundario};`;
      //     }
      //   }, 500)
      // }
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
