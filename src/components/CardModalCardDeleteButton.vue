<template>
  <div>
    <router-link to="/" v-on:click.native="deleteCard()">
      <font-awesome-icon icon="trash" size="sm" class="modal-side-icon" />
      削除
    </router-link>
  </div>
</template>
<script>
  export default {
    props: ['cardHash'],
    methods: {
      deleteCard() {
        this.$store.dispatch('deleteCard', this.cardHash);
      }
    }
  }
</script>
<style>
</style>