<template>
  <div id="nosotros">
    <section class="abouts">
      <div class="about_item" v-show="info.mision">
        <div class="title">
          <h2>Misión</h2>
        </div>
        <div v-html="info.mision" class="about_item_description"></div>
      </div>
      <div class="about_item">
        <div class="title">
          <h2>Visión</h2>
        </div>
        <div v-html="info.vision" class="about_item_description"></div>
      </div>
      <div class="about_item">
        <div class="title">
          <h2>Nosotros</h2>
        </div>
        <div v-html="info.nosotros" class="about_item_description"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.state.tienda;
    },
  },
};
</script>

<style scoped>
#nosotros {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  width: 100%;
  height: 90px;
  background-color: #9b9b9b;
  padding: 0 20px;
}
.abouts {
  max-width: 1200px;
  width: 100%;
  min-height: calc(100vh - 306px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.about_item {
  min-width: 330px;
  width: calc(33% - 20px);
  margin: 10px 0;
  position: relative;
  /* align-self: center; */
  border-radius: 3px;
  text-align: center;
  transition: all 0.5s;
  z-index: 2;
}
.about_item .title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  background-color: var(--color_secundario);
  padding: 10px 20px;
}
.about_item h2 {
  font-weight: lighter;
  margin: 0 auto;
  color: #fff;
}
.about_item h2::before,
.about_item h2::after {
  content: '-';
  margin: 0 5px;
}
.about_item div {
  max-width: 1200px;
  width: 95%;
  margin: 10px auto;
}
.about_item_description {
  /* color: gray; */
  padding: 20px 10px;
  background-color: var(--color_principal);
  line-height: 1;
}

@media (max-width: 1010px) {
  .about_item:last-child {
    width: 100%;
  }
}
@media (max-width: 680px) {
  .about_item {
    width: 100%;
  }
}
</style>
