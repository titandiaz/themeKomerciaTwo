import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const conf = JSON.parse(localStorage.getItem("conf"));

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
    tienda: {}
  }
})

axios.get(`http://komercia.la/api/front/tienda/${conf.id}`).then((response) => {
  console.log(response.data.data);
  store.state.banners = response.data.data.banners[0];
  store.state.productos = response.data.data.productos;
  store.state.tienda = response.data.data.tienda;
})
