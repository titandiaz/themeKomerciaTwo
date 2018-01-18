<template>
  <div v-if="notifyProduct" :class="{message: true, openMessage: notifyProduct}">
    <div class="photo">
      <img :src="`${$urlHttp}/mini/${notifyProduct.foto}`" alt="">
    </div>
    <div class="info">
      <p><strong>{{ notifyProduct.nombre }}</strong></p>
      <p>
        <template v-for="opcion in notifyProduct.combinacion">
          {{opcion}} -
        </template>
      </p>
      <p>${{ notifyProduct.precio }} x {{ notifyProduct.cantidad }}</p>
    </div>
    <i class="material-icons">done_all</i>
  </div>
</template>

<script>
export default {
  computed: {
    notifyProduct() {
      return this.$store.state.notifyProduct;
    }
  }
};
</script>

<style scoped>
.message {
  position: fixed;
  right: 20px;
  max-width: 350px;
  width: 100%;
  max-height: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border-radius: 5px; */
  overflow: hidden;
  transform: translateY(0px);
  opacity: 0;
  transition: 0.3s;
}
.message .photo {
  padding: 10px;
  color: #fff;
}
.message .photo img {
  max-width: 80px;
  max-height: 80px;
}
.message .info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.message p {
  margin: 0 10px;
  text-align: center;
  font-size: 15px;
  color: var(--color_texto);
}
.message i {
  margin: 0 15px;
  color: #00c853;
}
.openMessage {
  height: initial;
  opacity: 1;
  transform: translateY(20px);
}
</style>
