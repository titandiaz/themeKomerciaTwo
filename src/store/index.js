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
    tienda: {
      ciudad: 0,
      colorPrincipal: '',
    }
  }
})

axios.get(`http://komercia.la/api/front/tienda/${conf.id}`).then((response) => {
  console.log(response)
})
