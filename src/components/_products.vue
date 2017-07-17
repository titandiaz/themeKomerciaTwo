<template>
	<div class="products">
		<router-view></router-view>
		<aside class="shortcuts">
		</aside>
		<section class="products_list">
			<product v-for="product in products" :data="product" :key="product.id"></product>
		</section>
	</div>
</template>
<script>
  import product from './product.vue';
	export default {
		components: { product },
		computed: {
			products() {
				return this.$store.state.productos;
			}
		}
	}
</script>
<style scoped>
	.products{
		display: flex;
	}
	.shortcuts{
		width: 300px;
		height: 100vh;
		background-color: #EEE;
	}
	.products_list{
		width: calc(100% - 300px);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
