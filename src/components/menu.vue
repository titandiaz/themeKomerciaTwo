<template>
	<div class="menu">
		<ul>
			<li>Inicio</li>
			<li>Catalogo</li>
			<figure class="logo">
				<img src="">
			</figure>
			<li>Nosotros</li>
			<li>Contacto</li>
		</ul>
	</div>
</template>
<style scoped>
	.menu{
		width: 100%;
		padding: 20px;
	}
	ul{
		width: 100%;
		list-style: none;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	li{
		padding: 10px 20px;
		color: #FFF;
	}
	.logo{
		border-radius: 50%;
		width: 120px;
		height: 120px;
		background-color: #FFF;
		border: 5PX solid rgba(255,255,255,0.5);
	}
</style>