<template>
  <div class="modal">
    <div class="modal_content">
      <div class="modal_content_header">
        <i id="closeModal" v-on:click="togglePayment" class="material-icons close">close</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    togglePayment(){
      this.$store.state.togglePayment = !this.$store.state.togglePayment;
    }
  }
}
</script>

<style scoped>
    .modal{
      position: fixed;
      top: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,0.5);
      z-index: 2;
    }
    .modal_content{
      max-width: 800px;
      width: 100%;
      height: 500px;
      border-radius: 10px;
      background-color: #FFF;
    }
    .modal_content_header{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 10px;
    }
    #closeModal{
      cursor: pointer;
    }
</style>
