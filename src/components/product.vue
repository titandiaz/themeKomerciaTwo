<template>
	<div class="product" :id="data.id" v-on:click="openModal">
		<div  v-if="data.placeholder" class="product_image placeholder">
			<img :src="setImagePLaceholder()">
		</div>
		<div v-else class="product_image">
			<img :src="`https://komercia.co/tumb/${data.foto}`">
		</div>
		<div class="product_content">
			<h2 class="text">{{ data.nombre | capitalize }}</h2>
			<div class="product_content_info">
				<!--<p>&#9733 &#9733 &#9733 &#9733 &#9734;</p>-->
				<p v-show="precio">{{ precio | currency }}</p>
			</div>
			<button id="actionAddCart" class="detail" v-on:click="addShoppingCart(data)">AGREGAR<i class="material-icons">add_shopping_cart</i></button>
			<div class="quantity">
				<em>cantidad del producto</em>
				<button class="quantity_remove" v-on:click="removeQuantity(data)"><i class="material-icons">remove</i></button>
				<p class="quantity_value"><strong>{{ quantityValue }} und</strong></p>
				<button class="quantity_add" v-on:click="addQuantity(data)"><i class="material-icons">add</i></button>
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
			openModal(e) {
				if(e.target.id != "actionAddCart" & e.target.className != 'quantity_remove' & e.target.className != 'quantity_add'){
					if(this.data.placeholder){
						window.location.href = 'https://komercia.co/panel/inventario/productos';
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
	        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
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
		width: 290px;
		background-color: #FFF;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
		border: solid 0.5px #e8e9ed;
		margin: 16px 16px;
		cursor: pointer;
		transition: all .3s;
	}
	.product.bought{
		border: solid 0.5px green;
	}
	.product:hover {
		transform: scale(1.05);
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
		max-width: 300px;
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
	.product_content #actionAddCart{
		border-style: none;
		background-color: transparent;
		border: solid 1px #e9e9e9;
		border-radius: 19px;
		color: #4c4c4c;
		padding: 5px 20px;
		display: flex;
		align-items: center;
		outline: none;
		cursor: pointer;
		transition: .5s;
	}
	.product.bought .product_content #actionAddCart{
		color: green;
		border: 1px solid green;
	}
	.product_content #actionAddCart i{
		height: 100%;
		font-size: 15px;
		border-left: solid 1px #e9e9e9;
		margin-left: 10px;
		padding-left: 10px;
		pointer-events: none;
	}
	.product.bought .product_content #actionAddCart i{
		border-left: solid 1px green;
	}
	.product.bought #actionAddCart{
		display: none;
	}
	.quantity{
    display: none;
		flex-wrap: wrap;
		justify-content: center;
    align-items: center;
  }
	.quantity em{
		width: 100%;
		text-align: center;
		margin-bottom: 10px;
	}
	.product.bought .quantity{
		display: flex;
	}
	.quantity_remove, .quantity_add{
		border-style: none;
		background-color: transparent;
		border-radius: 19px;
		color: green;
		border: 1px solid green;
		padding: 5px 20px;
		display: flex;
		align-items: center;
		outline: none;
		cursor: pointer;
		transition: .3s;
	}
	.quantity_value{
		margin: 0 10px;
	}
	.quantity_remove:hover, .quantity_add:hover, #actionAddCart:hover{
		transform: scale(1.1);
	}
	.quantity_remove i, .quantity_add i{
		font-size: 14px;
		pointer-events: none;
	}
</style>
