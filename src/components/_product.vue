<template>
    <div class="product" v-if="data.detalle">
      <ko-modal v-show="modalPayment"></ko-modal>
      <div class="wrapper">
        <div class="section">
          <div class="photos">
            <div class="photos_selected">
              <img :src="setMiniPhoto(data.detalle.foto)" v-on:mouseover="selectedPhoto(data.detalle.foto)">
              <img :src="setMiniPhoto(foto.foto)" v-on:mouseover="selectedPhoto(foto.foto)" v-for="foto in data.fotos">
              <img v-if="idYoutube" :src="`https://img.youtube.com/vi/${idYoutube}/0.jpg`" v-show="idYoutube" v-on:mouseover="existYoutube = true">
            </div>
            <div class="photo_main">
              <zoomed v-show="!existYoutube" :photo="selectPhotoUrl"></zoomed>
              <iframe v-show="existYoutube" width="400" height="250" :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          <div class="photos responsive">
            <product-slide :photos="data.fotos" :photo="data.detalle.foto"></product-slide>
          </div>
          <div class="content">
            <h2 class="content_name">{{data.detalle.nombre}}</h2>
            <div class="content_buy_price">
              <h3 class="colorTexto" v-show="salesData.precio">${{ salesData.precio | currency }}</h3>
              <p class="colorTexto" v-show="salesData.precio">COP</p>
            </div>
            <p><strong>{{ data.info.marca }}</strong></p>
            <!-- <p>{{beforeCombination}}</p> -->
            <div class="content_variant">
              <div class="content_variant_item" v-for="(variant, index) in data.variantes">
                <label>{{ variant.nombre }}:</label><ko-radio-group :options="variant.valores" :index="index"></ko-radio-group>
              </div>
            </div>
            <div class="content_buy">
              <div class="quantity">
                <button class="quantity_remove" v-on:click="removeQuantity()"><i class="material-icons">remove</i></button>
                <p class="quantity_value"> {{ quantityValue }}</p>
                <button class="quantity_add" v-on:click="addQuantity()"><i class="material-icons">add</i></button>
              </div>
              <div class="content_buy_action">
                <button v-if="spent" class="spent">Producto agotado<i class="material-icons">add_shopping_cart</i></button>
                <button v-else v-on:click="addShoppingCart">Agregar<i class="material-icons">add_shopping_cart</i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="content_desc" v-if="data.info.descripcion && data.info.descripcion.length > 12">
            <h3>Descripción del producto</h3>
            <div v-html="data.info.descripcion"></div>
          </div>
          <div class="features">
            <div class="features_item">
              <img src="/template3/cards.png" alt="">
              <div class="features_item_info">
                <h3>Pagos online</h3>
                <p>Contamos con diferentes medios de pago para que realices tus compras por internet </p>
                <button v-show="existPayments" v-on:click="togglePayment">VER MEDIOS DE PAGOS</button>
              </div>
            </div>
            <div class="features_item">
              <img src="/template3/mensajero.png" alt="">
              <div class="features_item_info">
                <h3>{{ envio.titulo }}</h3>
                <p>{{ envio.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <ko-collapse></ko-collapse>
      </div>
    </div>
</template>
<script>
import axios from "axios";
import zoomed from "./zoomed.vue";
import productSlide from "./product_slide.vue";
export default {
  components: { zoomed, productSlide },
  created() {
    axios
      .get(`${this.$urlHttp}/api/front/producto/${this.$route.params.id}`)
      .then(response => {
        this.selectedPhoto(response.data.detalle.foto);
        this.videoYoutube(response.data.info.video);
        this.data = response.data;
        this.salesData = {
          precio: this.data.detalle.precio,
          unidades: this.data.info.inventario,
          sku: this.data.info.sku
        };
        this.maxQuantityValue = this.data.info.inventario;
        for (let [
          index,
          productCart
        ] of this.$store.state.productsCart.entries()) {
          if (this.data.detalle.id == productCart.id) {
            this.productIndexCart = index;
            this.productCart = productCart;
            this.maxQuantityValue =
              this.data.info.inventario - productCart.cantidad;
          }
        }
        if (this.salesData.unidades == 0 || this.maxQuantityValue <= 0) {
          this.spent = true;
        }
      });
  },
  mounted() {
    if (Object.keys(this.$store.state.envios).length) {
      this.setOptionEnvio();
    }
  },
  data() {
    return {
      data: {},
      selectPhotoUrl: "",
      idYoutube: "",
      existYoutube: false,
      maxQuantityValue: 1,
      quantityValue: 1,
      productIndexCart: null,
      productCart: {},
      salesData: null,
      spent: false,
      envio: {
        titulo: "",
        desc: ""
      }
    };
  },
  watch: {
    envios(value) {
      this.setOptionEnvio();
    },
    beforeCombination(value) {
      let combinationSelected = JSON.stringify(value);
      let combinaciones = JSON.parse(this.data.combinaciones.combinaciones);
      let result = combinaciones.filter(
        (combinacion, index) =>
          JSON.stringify(combinacion.combinacion) == combinationSelected
      )[0];
      this.productCart = [];
      this.productIndexCart = null;
      for (let [
        index,
        productCart
      ] of this.$store.state.productsCart.entries()) {
        if (
          this.data.detalle.id == productCart.id &&
          JSON.stringify(productCart.combinacion) ==
            JSON.stringify(result.combinacion)
        ) {
          this.productIndexCart = index;
          this.productCart = productCart;
        }
      }
      if (result) {
        this.spent = false;
        this.maxQuantityValue = result.unidades;
        if (result.unidades == 0) {
          this.spent = true;
        }
        if (this.productCart.cantidad) {
          this.maxQuantityValue =
            parseInt(result.unidades) - this.productCart.cantidad;
          if (this.maxQuantityValue <= 0) {
            this.spent = true;
          }
        }
        this.salesData = result;
        this.quantityValue = 1;
      }
    }
  },
  computed: {
    existPayments() {
      let mediospago = this.$store.state.mediospago;
      if (
        mediospago.consignacion ||
        mediospago.convenir ||
        mediospago.payco ||
        mediospago.tienda ||
        mediospago.efecty
      ) {
        return true;
      } else {
        return false;
      }
    },
    modalPayment() {
      return this.$store.state.togglePayment;
    },
    beforeCombination() {
      return this.$store.state.beforeCombination;
    },
    envios() {
      return this.$store.state.envios;
    },
    precio() {
      if (this.data.detalle.precio) {
        return `$${this.data.detalle.precio
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    }
  },
  methods: {
    togglePayment() {
      this.$store.state.togglePayment = !this.$store.state.togglePayment;
    },
    setOptionEnvio() {
      switch (this.envios.valores.envio_metodo) {
        case "gratis":
          this.envio = {
            titulo: "Envío gratis",
            desc: "Disfruta de este obsequio por parte de la tienda."
          };
          break;
        case "tarifa_plana":
          this.envio = {
            titulo: "Tarifa plana",
            desc: "Este costo de envio no varia"
          };
          break;
        case "precio":
          this.envio = {
            titulo: "Tarifa por precio",
            desc:
              "Segun la suma del costo de tus productos te cobraran el envio"
          };
          break;
        case "peso":
          this.envio = {
            titulo: "Tarifa por peso",
            desc: ""
          };
          break;
        default:
      }
    },
    quantity(productCart) {
      this.quantityValue = productCart.cantidad;
    },
    addQuantity() {
      if (this.maxQuantityValue > this.quantityValue) {
        this.quantityValue++;
        this.data.cantidad = this.quantityValue;
      } else {
        // Alerta de limite de sku
      }
    },
    removeQuantity() {
      if (this.data.cantidad >= 2) {
        this.quantityValue--;
        this.data.cantidad = this.quantityValue;
      }
    },
    setMiniPhoto(photo) {
      if (photo) {
        return `${this.$urlHttp}/mini/${photo}`;
      }
    },
    selectedPhoto(photo) {
      if (photo) {
        this.selectPhotoUrl = `${this.$urlHttp}/productos/${photo}`;
        this.existYoutube = false;
      }
    },
    videoYoutube(video) {
      if (video) {
        let index = video.indexOf("?v=") + 3;
        this.idYoutube = video.substring(index);
      }
    },
    addShoppingCart() {
      if (!this.data.cantidad) {
        this.data.cantidad = this.quantityValue;
      }
      let product = {
        id: this.data.detalle.id,
        precio: this.salesData.precio,
        cantidad: this.data.cantidad,
        foto: this.data.detalle.foto,
        nombre: this.data.detalle.nombre,
        combinacion: this.salesData.combinacion
      };
      if (this.salesData) {
        product.limitQuantity = this.salesData.unidades;
      } else {
        product.limitQuantity = this.data.info.inventario;
      }
      if (typeof this.productIndexCart == "number") {
        let mutableProduct = this.$store.state.productsCart[
          this.productIndexCart
        ];
        mutableProduct.cantidad += this.data.cantidad;
        this.$store.state.productsCart.splice(
          this.productIndexCart,
          1,
          mutableProduct
        );
      } else {
        this.$store.state.productsCart.push(product);
      }
      this.$store.commit("updateContentCart");
      this.$store.commit("notifyProduct", product);
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    }
  }
};
</script>
<style scoped>
.product {
  background-color: #fff;
}
.wrapper {
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 30px;
}
.section {
  display: flex;
  justify-content: space-between;
}
.photos {
  display: flex;
  justify-content: center;
  align-items: center;
}
.photos.responsive {
  display: none;
}
.photos_selected {
  width: 80px;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
.photos_selected img {
  width: 100%;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}
.photo_main {
  max-width: 450px;
  max-height: 400px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 15px;
  /* border-radius: 10px; */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
}
i.close {
  color: black;
  align-self: flex-end;
  cursor: pointer;
}
.content_name {
  font-weight: normal;
  color: #333;
  margin: 7px 0;
}
.content_buy {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
}
.content_buy_price {
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
}
.content_buy_price h3 {
  font-weight: normal;
  font-size: 40px;
}
.content_buy_price p {
  margin-bottom: 8px;
}
.content_buy_action {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0;
}
.content_buy_action button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  align-items: center;
  color: #fff;
  border-style: none;
  /* border-radius: 12px; */
  background-color: var(--color_secundario);
  font-size: 13px;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
}
.content_buy_action button.spent {
  background-color: #b0b0b0;
  pointer-events: none;
}
.content_buy_action button:hover {
  transform: scale(0.9);
}
.content_buy_action button i {
  font-size: 19px;
  margin-left: 10px;
  padding: 4px 0px;
  padding-left: 10px;
}
.content_desc {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 30px 0;
  margin-right: 20px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  text-align: justify;
  word-break: break-word;
}
.content_desc * {
  color: #333;
  /* margin-top: 0; */
}
.content_variant {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
}
.content_variant_item {
  display: flex;
  align-items: center;
}
.content_variant_item label {
  margin-right: 10px;
  color: #333;
}
.quantity {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /*justify-content: center;*/
  align-items: center;
  margin: 5px;
}
.quantity em {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  font-size: 13px;
}
.quantity_remove,
.quantity_add {
  border-style: none;
  background-color: transparent;
  /* border-radius: 10px; */
  /* box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1); */
  padding: 5px 10px;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}
.quantity_value {
  margin: 0 10px;
  font-weight: normal;
  color: #333;
}
.quantity_remove:hover,
.quantity_add:hover,
#actionAddCart:hover {
  transform: scale(1.1);
}
.quantity_remove i,
.quantity_add i {
  color: var(--color_secundario);
  font-size: 14px;
  font-weight: bold;
  pointer-events: none;
}
.features {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 0px;
  background-color: #fff;
}
.features_item {
  width: 500px;
  min-height: 155px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  /* border-radius: 10px; */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  margin: 10px 0;
  padding: 0 25px;
}
.features_item:nth-child(2) img {
  align-self: flex-end;
}
.features_item_info {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.features_item_info h3 {
  font-size: 16px;
  color: #333;
}
.features_item_info p {
  font-size: 14px;
  margin: 8px 0;
  color: #333;
}
.features_item_info button {
  border-style: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: bold;
  color: var(--color_secundario);
  cursor: pointer;
  outline: none;
}
.features_item .epayco {
  width: 85%;
  margin: 8px 0;
}
.features_item .efecty {
  max-width: 200px;
  max-height: 200px;
}
.features_item .convenir {
  max-width: 100px;
  max-height: 100px;
}
.features_item .tienda {
  max-width: 100px;
  max-height: 100px;
}
@media (max-width: 1150px) {
  .section:nth-child(2) {
    flex-direction: column;
  }
  .features {
    max-width: 100%;
  }
  .features_item {
    max-width: 500px;
    width: 100%;
  }
}
@media (max-width: 1000px) {
  .section:nth-child(1) {
    flex-direction: column;
  }
  .content {
    /* margin-top: 30px; */
    width: 100%;
    height: initial;
  }
  .photos {
    padding-bottom: 30px;
  }
}
@media (max-width: 710px) {
  .product {
    position: relative;
    width: 100%;
    min-height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
@media (max-width: 600px) {
  .photos {
    max-width: 100%;
    width: 100%;
    display: none;
  }
  .photos.responsive {
    display: flex;
  }
}
@media (max-width: 320px) {
  .features_item {
    flex-direction: column;
  }
  .features_item_info {
    text-align: center;
    margin: 10px 0;
  }
}
</style>
