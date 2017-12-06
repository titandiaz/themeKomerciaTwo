<template>
	<div class="product" :id="data.id">
		<div  v-if="data.placeholder" class="product_image placeholder">
			<img :src="setImagePLaceholder()">
		</div>
		<div v-else class="product_image" v-on:click="redirectToProduct">
			<img :src="`${$urlHttp}/tumb/${data.foto}`">
		</div>
		<div class="product_content">
			<h2 class="text" v-on:click="redirectToProduct">{{ data.nombre | capitalize }}</h2>
			<div class="product_content_info">
				<!--<p>&#9733 &#9733 &#9733 &#9733 &#9734;</p>-->
				<p v-show="precio">{{ precio | currency }}</p>
			</div>
			<div class="actions">
				<button id="preview" v-on:click="previewProduct">Vista rápida <i class="material-icons">remove_red_eye</i></button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['data'],
		mounted(){
			for(let productCart of this.$store.state.productsCart){
				if(this.data.id == productCart.id){
					this.quantity(productCart)
				}
			}
		},
		data(){
			return {
				quantityValue: 1,
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
			previewProduct(){
				this.$store.state.currentProduct = this.data;
				this.$store.state.existCurrentProduct = true;
				this.$store.commit('getDataProduct');
			},
			quantity(productCart){
				this.quantityValue = productCart.cantidad;
			},
			addQuantity(product){
				for(let productCart of this.$store.state.productsCart){
					if(product.id == productCart.id){
							 productCart.cantidad++;
							 this.quantity(productCart)
							 this.$store.commit('updateContentCart');
					}
				}
			},
			removeQuantity(product){
				for(let productCart of this.$store.state.productsCart){
					if(product.id == productCart.id){
						if(productCart.cantidad >= 2){
							 productCart.cantidad--;
							 this.quantity(productCart)
							 this.$store.commit('updateContentCart');
						}
					}
				}
			},
			setImagePLaceholder(){
				return require(`../assets/${this.data.foto}`);
			},
			redirectToProduct(e) {
				if(e.target.id != "preview" & e.target.className != 'quantity_remove' & e.target.className != 'quantity_add'){
					if(this.data.placeholder){
						window.location.href = `${this.$urlHttp}/panel/inventario/productos`;
					}else{
						this.$router.push(`/catalogo/${this.data.id}`);
					}
				}
			},
			addShoppingCart(product){
					let productExist = false;
					for(let productCart of this.$store.state.productsCart){
						if(product.id == productCart.id){
								 productCart.cantidad++;
								 product = productCart;
								 productExist = true;
						}
					}
					if(!productExist){
						product.cantidad = 1;
						this.$store.state.productsCart.push(product);
					}
				this.$store.commit('updateContentCart');
				this.$store.commit('productsPurchased');
			}
		},
		filters: {
			currency(value) {
	      if(value){
	        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
	      }
	    },
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
	.product{
		position: relative;
		width: 290px;
		background-color: #FFF;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
		border: solid 1px #e8e9ed;
		margin: 12px 12px;
		cursor: pointer;
		transition: all .3s;
	}
	.product.bought{
		border-style: solid;
		border-width: 2px;
	}
	.product:hover {
		transform: scale(0.98);
	}
	.product_image{
		height: 240px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.product_image.placeholder{
		background-color: #e8e9ed;
	}
	.product_image img{
		max-width: 288px;
		max-height: 240px;
	}
	.product_image.placeholder img{
		width: 100%;
	}
	.product_content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 15px;
	}
	.product_content_info{
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin: 10px 0;
	}
	.actions{
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.product_content #preview{
		position: absolute;
		top: 100%;
		width: 100%;
		border-style: none;
		background-color: transparent;
		color: #FFF;
		padding: 15px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
		cursor: pointer;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.7);
		transition: .5s;
	}
	.product_content #preview i{
		margin-left: 5px;
		font-size: 18px;
		color: #FFF;
	}
	.product:hover #preview{
		top: calc(50% - 20px);
	}
</style>
