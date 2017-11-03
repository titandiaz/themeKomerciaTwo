<template>
  <div id="garantias">
    <div class="container" v-html="politicas.garantia"></div>
  </div>
</template>

<script>
export default {
  computed: {
    politicas() {
      return this.$store.state.politicas;
    }
  }
}
</script>

<style scoped>
  #garantias{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.6);
  }
  header{
    width: 100%;
    background-color: #9b9b9b;
    padding: 0 20px;
  }
  .container{
    max-width: 1200px;
    margin: 30px 0;
    text-align: justify;
  }
  ul{
    margin: 40px;
  }
</style>
