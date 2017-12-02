<template>
    <div class="product" v-if="data.detalle">
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
          <div class="content">
            <h2 class="content_name">{{data.detalle.nombre}}</h2>
            <div class="content_buy_price">
              <h3 class="colorTexto" v-show="precio">${{ salesData.precio | currency }}</h3>
              <p class="colorTexto" v-show="precio">COP</p>
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
              <button class="content_buy_action" v-if="bought" :style="styles.backgroundColor" v-on:click="addShoppingCart">VER CARRITO<i class="material-icons">add_shopping_cart</i></button>
              <button class="content_buy_action" v-else :style="styles.backgroundColor" v-on:click="addShoppingCart">Agregar<i class="material-icons">add_shopping_cart</i></button>
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
              <img v-show="false" class="epayco" src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/epayco_pago_seguro_black.png">
              <img v-show="false" class="efecty" src="../assets/efecty.png" alt="">
              <img v-show="false" class="convenir" src="../assets/conversation.png" alt="">
              <img v-show="true" class="tienda" src="../assets/pagos_store.png" alt="">
              <div class="features_item_info">
                <h3>Medios de pago</h3>
                <p>Esta tienda cuenta con</p>
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
  import axios from 'axios';
  import zoomed from './zoomed.vue';
  export default{
    components: { zoomed },
    created() {
      axios.get(`${this.$urlHttp}/api/front/producto/${this.$route.params.id}`).then((response) => {
        this.selectedPhoto(response.data.detalle.foto);
        this.videoYoutube(response.data.info.video);
        this.data = response.data;
        this.salesData = {
          precio: this.data.detalle.precio,
          unidades: this.data.info.inventario,
          sku: this.data.info.sku,
        };
        for(let [index, productCart] of this.$store.state.productsCart.entries()){
          if(this.data.detalle.id == productCart.id){
            this.bought = true;
            this.quantity(productCart)
            this.data.cantidad = productCart.cantidad;
            this.productIndexCart = index;
          }
        }
      })
    },
    mounted(){
      if(Object.keys(this.$store.state.envios).length){
        this.setOptionEnvio();
      }
    },
    data() {
      return {
        data: {},
        selectPhotoUrl: '',
        bought: false,
        idYoutube: '',
        existYoutube: false,
        quantityValue: 1,
        productIndexCart: 0,
        productCart: {},
        salesData: {},
        envio: {
          titulo: '',
          desc: ''
        },
      }
    },
    watch: {
      envios(value){
        this.setOptionEnvio();
      },
      beforeCombination(value){
        let combinationSelected = JSON.stringify(value);
        let combinaciones = JSON.parse(this.data.combinaciones.combinaciones);
        let result = combinaciones.filter((combinacion, index) => JSON.stringify(combinacion.combinacion) == combinationSelected)[0];
        if(result){
          this.salesData = result;
        }
      }
    },
    computed: {
      beforeCombination(){
        return this.$store.state.beforeCombination;
      },
      styles(){
        return {
          backgroundColor:{backgroundColor: this.$store.state.colorPrincipal},
          colorTexto:{colorTexto: this.$store.state.colorTexto},
        }
      },
      envios(){
        return this.$store.state.envios;
      },
      precio() {
				if(this.data.detalle.precio){
          return `$${this.data.detalle.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
				}
			}
    },
    methods: {
      setOptionEnvio(){
        switch (this.envios.valores.envio_metodo) {
          case 'gratis':
            this.envio = {
              titulo: 'Envío gratis',
              desc: 'Disfruta de este obsequio por parte de la tienda.',
            }
          break;
          case 'tarifa_plana':
            this.envio = {
              titulo: 'Tarifa plana',
              desc: 'Este costo de envio no varia',
            }
          break;
          case 'precio':
            this.envio = {
              titulo: 'Tarifa por precio',
              desc: 'Segun la suma del costo de tus productos te cobraran el envio',
            }
          break;
          case 'peso':
            this.envio = {
              titulo: 'Tarifa por peso',
              desc: '',
            }
          break;
          default:

        }
      },
      quantity(productCart){
					this.quantityValue = productCart.cantidad;
			},
      addQuantity(){
        this.quantityValue++;
        this.data.cantidad = this.quantityValue;
			},
			removeQuantity(){
				if(this.data.cantidad >= 2){
          this.quantityValue--;
          this.data.cantidad = this.quantityValue;
				}
			},
      setMiniPhoto(photo){
        if(photo){
          return `${this.$urlHttp}/mini/${photo}`;
        }
      },
      selectedPhoto(photo){
        if(photo){
          this.selectPhotoUrl = `${this.$urlHttp}/productos/${photo}`;
          this.existYoutube = false;
        }
      },
      videoYoutube(video){
        if(video){
          let index = video.indexOf('?v=')+3;
          this.idYoutube = video.substring(index);
        }
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
        }
        this.$store.state.productsCart.push(product);
        this.bought = true;
        this.$store.commit('updateContentCart');
        this.$router.push('/pedido');
      }
    },
    filters: {
      currency(value) {
	      if(value){
	        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
	      }
	    },
    }
  }
</script>
<style scoped>
  .product{
    background-color: #FFF;
  }
  .wrapper{
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 30px;
  }
  .section{
    display: flex;
    justify-content: space-between;
  }
  .photos{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photos_selected{
    width: 80px;
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
  .photos_selected img{
    width: 100%;
    box-shadow: 0 0px 5px 0px rgba(0,0,0,0.1);
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  .photo_main{
    max-width: 450px;
    max-height: 400px;
    height: 100%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    width: 350px;
    height: 400px;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  }
  i.close{
    color: black;
    align-self: flex-end;
    cursor: pointer;
  }
  .content_name{
    font-weight: normal;
    color: #333;
    margin: 7px 0;
  }
  .content_buy{
    flex: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px 0;
  }
  .content_buy_price{
    display: flex;
    align-items: flex-end;
    margin: 10px 0;
  }
  .content_buy_price h3{
    font-weight: normal;
    font-size: 40px;
  }
  .content_buy_price p{
    margin-bottom: 8px;
  }
  .content_buy_action{
    display: flex;
    padding: 5px 20px;
    align-items: center;
    color: #FFF;
    border-style: none;
    border-radius: 12px;
    /*box-shadow: 0 1px 7px 0 rgba(155, 155, 155, 0.6);*/
    font-size: 13px;
    cursor: pointer;
    outline: none;
    transition: .3s;
  }
  .content_buy_action:hover{
    transform: scale(0.9);
  }
  .content_buy_action i{
    font-size: 19px;
    margin-left: 10px;
    padding: 4px 0px;
    padding-left: 10px;
  }
  .content_desc{
    display: flex;
    flex-direction: column;
    color: black;
    padding: 30px 0;
    margin-right: 20px;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
    text-align: justify;
    word-break: break-all;
  }
  .content_desc *{
    color: #333;
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
  .quantity{
		width: 140px;
    display: flex;
		flex-wrap: wrap;
		justify-content: center;
    align-items: center;
  }
	.quantity em{
		width: 100%;
		text-align: center;
		margin-bottom: 10px;
		font-size: 13px;
	}
	.product.bought .quantity{
		display: flex;
	}
	.quantity_remove, .quantity_add{
		border-style: none;
		background-color: #FFF;
		border-radius: 10px;
		box-shadow: 1px 1px 4px 0px rgba(0,0,0,0.1);
		padding: 5px 10px;
		display: flex;
		align-items: center;
		outline: none;
		cursor: pointer;
		transition: .3s;
	}
	.quantity_value{
		margin: 0 10px;
    font-weight: normal;
    color: #333;
	}
	.quantity_remove:hover, .quantity_add:hover, #actionAddCart:hover{
		transform: scale(1.1);
	}
	.quantity_remove i, .quantity_add i{
    color: #333;
		font-size: 14px;
    font-weight: bold;
		pointer-events: none;
	}
  .features{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30px 0px;
    background-color: #FFF;
  }
  .features_item{
    width: 500px;
    min-height: 155px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    margin: 10px 0;
    padding: 0 25px;
  }
  .features_item:nth-child(2) img{
    align-self: flex-end;
  }
  .features_item_info{
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .features_item_info h3{
    font-size: 16px;
    color: #333;
  }
  .features_item_info p{
    font-size: 14px;
    margin: 8px 0;
    color: #333;
  }
  .features_item_info a{
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
  .features_item .epayco{
    width: 85%;
    margin: 8px 0;
  }
  .features_item .efecty{
    max-width: 200px;
    max-height: 200px;
  }
  .features_item .convenir{
    max-width: 100px;
    max-height: 100px;
  }
  .features_item .tienda{
    max-width: 100px;
    max-height: 100px;
  }
@media(max-width: 1150px){
  .section:nth-child(2){
    flex-direction: column;
  }
  .features_item{
    max-width: 500px;
    width: 100%;
  }
}
@media(max-width: 1000px){
  .section:nth-child(1){
    flex-direction: column;
  }
  .content{
    width: 100%;
    height: initial;
  }
}
@media(max-width: 710px){
  .product{
    position: relative;
    width: 100%;
    min-height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.close{
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
