<template>
  <div class="list">
    <div class="list-header">
      <input type="text" v-model="bindListname" class="list-name">
      <ListOperationWindow v-bind:list-hash="listHash" />
    </div>
    <cards v-bind:list-hash="listHash" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import ListOperationWindow from './ListOperationWindow.vue';
  import Cards from './Cards.vue';
  export default {
    props: ['listHash'],
    components: {
      ListOperationWindow,
      Cards
    },
    computed: {
      ...mapGetters(['getList']),
      bindListname: {
        get() {
          return this.getList(this.listHash).name;
        },
        set(value) {
          this.$store.dispatch('changeListname', {listHash: this.listHash, newListname: value});
        }
      }
    }
  }
</script>
<style scoped>
  .list {
    background-color: #ebecf0;
    border: solid 1px #f5f5f5;
    margin: 0 5px;
    padding: 0 5px;
    flex: 0 0 auto;
    width: 270px;
    border-radius: 3px;
    text-align: left;
  }
  .list-header {
    display: flex;
  }
  .list-name {
    background-color: #ebecf0;
    border: none;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    width: calc(100% - 32px); /* ボタンの分32px引いた */
  }
  .list-name:focus {
    background-color: #fff;
  }
</style>