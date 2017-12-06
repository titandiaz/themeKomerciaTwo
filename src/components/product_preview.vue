<template>
  <div id="modalProduct" v-on:click="closeModal">
    <div class="product">
      <div class="photos">
        <img :src="selectPhotoUrl" :alt="data.nombre" class="photo_main">
        <div class="photos_selected">
          <img :src="`${$urlHttp}/mini/${data.foto}`" v-on:click="selectedPhoto(data.foto)">
          <img :src="`${$urlHttp}/mini/${foto.foto}`" v-on:click="selectedPhoto(foto.foto)" v-for="foto in data.fotos">
        </div>
      </div>
      <div class="content">
        <i id="closeModal" class="material-icons close">close</i>
        <h2 class="content_name">{{data.nombre}}</h2>
        <h3 class="content_buy_price" v-show="salesData.precio">${{ salesData.precio | currency }}</h3>
        <div class="content_desc" v-if="data.info" v-html="data.info.descripcion"></div>
        <div class="content_variant">
          <div class="content_variant_item" v-for="(variant, index) in data.variantes">
            <label>{{ variant.nombre }}:</label><ko-radio-group :options="variant.valores" :index="index"></ko-radio-group>
          </div>
        </div>
        <div class="content_buy">
          <h3 class="content_buy_price"></h3>
          <button v-if="spent" class="content_buy_action spent">Producto agotado<i class="material-icons">add_shopping_cart</i></button>
          <button v-else class="content_buy_action" v-on:click="addShoppingCart">Agregar<i class="material-icons">add_shopping_cart</i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
    data() {
      return {
        selectPhotoUrl: '',
        spent: false,
        maxQuantityValue: 1,
        quantityValue: 1,
        productIndexCart: null,
        productCart: {},
        salesData: {},
      }
    },
    watch: {
      data(value){
        this.selectedPhoto(value.foto);
        if(value.info.inventario == 0){
          this.spent = true;
        }
      },
      beforeCombination(value){
        let combinationSelected = JSON.stringify(value);
        let combinaciones = JSON.parse(this.data.combinaciones.combinaciones);
        let result = combinaciones.filter((combinacion, index) => JSON.stringify(combinacion.combinacion) == combinationSelected)[0];
        this.productCart = [];
        this.productIndexCart = null;
        for(let [index, productCart] of this.$store.state.productsCart.entries()){
          if(this.data.detalle.id == productCart.id && JSON.stringify(productCart.combinacion) == JSON.stringify(result.combinacion)){
            this.productIndexCart = index;
            this.productCart = productCart;
          }
        }
        if(result){
          this.spent = false;
          this.maxQuantityValue = result.unidades;
          if(result.unidades == 0){
            this.spent = true;
          }
          if(this.productCart.cantidad){
            this.maxQuantityValue = (parseInt(result.unidades) - this.productCart.cantidad);
            if(this.maxQuantityValue <= 0){
              this.spent = true;
            }
          }
          this.salesData = result;
          this.quantityValue = 1;
        }
      }
    },
    computed: {
      data(){
        return this.$store.state.currentProduct;
      },
      beforeCombination(){
        return this.$store.state.beforeCombination;
      },
      precio() {
				if(this.data.precio){
					return `$${this.data.precio}`;
				}
			}
    },
    methods: {
      closeModal(e){
        if(e.target.id == "modalProduct" || e.target.id == "closeModal"){
          this.$store.state.existCurrentProduct = false;
        }
      },
      selectedPhoto(f){
        this.selectPhotoUrl = `${this.$urlHttp}/tumb/${f}`;
      },
      addShoppingCart(){
        if(!this.data.cantidad){
          this.data.cantidad = this.quantityValue;
        }
        let product = {
          id: this.data.detalle.id,
          precio: this.data.detalle.precio,
          cantidad: this.data.cantidad,
          foto: this.data.detalle.foto,
          nombre: this.data.detalle.nombre,
          combinacion: this.salesData.combinacion,
        }
        if(typeof this.productIndexCart == 'number'){
          let mutableProduct = this.$store.state.productsCart[this.productIndexCart];
          mutableProduct.cantidad += this.data.cantidad;
          this.$store.state.productsCart.splice(this.productIndexCart, 1, mutableProduct);
        }else{
          this.$store.state.productsCart.push(product);
        }
        this.$store.commit('updateContentCart');
        this.$router.push('/pedido');
        this.$store.state.existCurrentProduct = false;
      }
    },
    filters: {
      capitalize(value){
        if(value){
          value = value.toLowerCase();
          return value.replace(/^\w|\s\w/g, l => l.toUpperCase())
        }
      },
    }
  }
</script>
<style scoped>
  #modalProduct{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    z-index: 4;
  }
  .product{
    width: 750px;
    height: 550px;
    display: flex;
    background-color: #FFF;
    padding: 30px;
    border-radius: 10px;
  }
  .photos{
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .photo_main{
    max-width: 90%;
    max-height: 70%;
    box-shadow: 0 1px 5px 0px rgba(0,0,0,0.3);
    border-radius: 12px;
    margin-bottom: 10px;
  }
  .photos_selected{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .photos_selected img{
    width: 23%;
    box-shadow: 0 0px 5px 0px rgba(0,0,0,0.1);
    border-radius: 4px;
    cursor: pointer;
  }
  .content{
    width: calc(100% - 250px);
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  i.close{
    color: black;
    align-self: flex-end;
    cursor: pointer;
  }
  .content_name{
    font-weight: normal;
    color: black;
    margin: 7px 0;
    margin-top: 25px;
  }
  .content_buy{
    display: flex;
    flex: none;
    justify-content: space-between;
    margin: 7px 0;
  }
  .content_buy_price{
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 10px;
    color: var(--color_texto);
  }
  .content_buy_action{
    display: flex;
    padding: 0 15px;
    align-items: center;
    color: #FFF;
    border-style: none;
    border-radius: 12px;
    box-shadow: 0 1px 7px 0 rgba(155, 155, 155, 0.6);
    font-size: 13px;
    cursor: pointer;
    outline: none;
    background-color: var(--color_principal);
    transition: .3s;
  }
  .content_buy_action.spent{
    background-color: #b0b0b0;
    pointer-events: none;
  }
  .content_buy_action:hover{
    transform: scale(0.9);
  }
  .content_buy_action i{
    font-size: 19px;
    margin-left: 10px;
    border-left: 1px solid #FFF;
    padding: 4px 0px;
    padding-left: 10px;
  }
  .content_desc{
    color: black;
    margin: 7px 0;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
    margin-bottom: 20px;
  }
  .content_variant{
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }
  .content_variant_item{
    display: flex;
    align-items: center;
  }
  .content_variant_item label{
    margin-right: 10px;
    color: #333;
  }
@media(max-width: 710px){
  .product{
    position: relative;
    width: 95%;
    min-height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .photos{
    width: 70%;
    height: initial;
  }
  .content{
    width: 100%;
    height: initial;
  }
  i.close{
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
