<template>
	<div class="product">
		<div class="product_image">
			<img :src="`http://www.komercia.co/tumb/${data.foto}`">
		</div>
		<div class="product_content">
			<h2 class="text">{{data.nombre}}</h2>
			<div class="product_content_info">
				<p>&#9733 &#9733 &#9733 &#9733 &#9734;</p>
				<p v-show="precio">{{precio}}</p>
			</div>
			<button class="detail">ADD CARRITO<i class="material-icons">add_shopping_cart</i></button>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['data'],
		computed: {
			precio() {
				if(this.data.precio){
					return `$${this.data.precio}`;
				}
			}
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
	.product_image img{
		max-width: 300px;
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
	.product_content button{
		border-style: none;
		background-color: transparent;
		border: solid 1px #e9e9e9;
		border-radius: 19px;
		color: #4c4c4c;
		padding: 5px 20px;
		display: flex;
		align-items: center;
	}
	.product_content button i{
		height: 100%;
		font-size: 15px;
		border-left: solid 1px #e9e9e9;
		margin-left: 10px;
		padding-left: 10px;
	}
</style>
