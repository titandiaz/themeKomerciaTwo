<template>
  <div id="modalProduct" v-on:click="closeModal">
    <div class="product">
      <div class="photos">
        <img :src="`http://www.komercia.co/tumb/${data.foto}`" :alt="data.nombre" class="photo_main">
      </div>
      <div class="content">
        <i id="closeModal" class="material-icons close">close</i>
        <h2 class="content_name">{{data.nombre}}</h2>
        <div class="content_buy">
          <h3 class="content_buy_price">{{precio}}</h3>
          <button class="content_buy_action">AGREGAR<i class="material-icons">add_shopping_cart</i></button>
        </div>
        <p class="content_desc">{{data.descripcion}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
    created() {
      let data = this.$store.state.productos.filter((product) => { if(product.id == this.$route.params.id){ return product}});
      this.data = data[0];
      axios.get(`http://komercia.la/api/front/producto/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.data = Object.assign(response.data, this.data);
      }).catch((error) => {

      });
    },
    data() {
      return {
        data: {},
      }
    },
    computed: {
      precio() {
				if(this.data.precio){
					return `$${this.data.precio}`;
				}
			}
    },
    methods: {
      closeModal(e){
        if(e.target.id == "modalProduct" || e.target.id == "closeModal"){
          this.$router.push('/productos');
        }
      }
    }
  }
</script>
<style scoped>
  #modalProduct{
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.82);
    z-index: 2;
  }
  .product{
    width: 650px;
    height: 380px;
    display: flex;
    background-color: #FFF;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0 0 31px 7px rgba(121, 121, 121, 0.29);
  }
  .photos{
    width: 40%;
    height: 100%;
  }
  .photo_main{
    width: 90%;
  }
  .content{
    width: 60%;
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
  }
  .content_buy{
    display: flex;
    flex: none;
    justify-content: space-between;
    margin: 7px 0;
  }
  .content_buy_price{
    font-weight: normal;
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
  }
</style>
