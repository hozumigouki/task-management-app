<template>
  <div class="board-main">
    <draggable class="lists-wrapper"
               group="list"
               v-model="draggableList">
      <List v-for="(list, index) in $store.state.lists" v-bind:key=index v-bind:list-hash="list.hash" />
    </draggable>
    <ListAddButton />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import List from './List.vue';
  import ListAddButton from './ListAddButton.vue';
  import draggable from 'vuedraggable';
  export default {
    components: {
      List,
      ListAddButton,
      draggable
    },
    computed: {
      ...mapGetters(['getLists']),
      draggableList: {
        get() {
          return this.getLists;
        },
        set(e) {
          this.$store.commit('updateList', e);
        }
      }
    }
  }
</script>
<style>
  .board-main {
    overflow-x: auto;
    height: calc(100vh - 32px);
  }
  .board-main,
  .lists-wrapper {
    display: flex;
    align-items: flex-start;
  }
</style>