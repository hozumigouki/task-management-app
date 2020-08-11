<template>
  <div class="list-operation-wrapper">
    <a v-on:click="windowOpen = !windowOpen" class="list-operation-btn">
      <font-awesome-icon icon="ellipsis-h" size="sm" class="list-operation-icon" />
    </a>
    <div class="list-operation-modal" v-if="windowOpen">
      <a v-on:click="windowOpen = false" class="modal-close-btn"><font-awesome-icon icon="times" size="sm" /></a>
      <div v-if="pageSwitch === LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE.OPERATION">
        <h3 class="operation-window-title">リスト操作</h3>
        <a class="list-operation-item" v-on:click="pageSwitch = LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE.MOVE">リストの移動</a>
        <a v-on:click="deleteList()" class="list-operation-item">リストを削除</a>
      </div>
      <ListOperationWindowListMoveWindow v-if="pageSwitch === LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE.MOVE"
                                         v-bind:list-hash="listHash"
                                         v-on:returnPage="pageSwitch = $event"
                                         v-on:windowOpen="windowOpen = $event"/>
    </div>
  </div>
</template>
<script>
  import { LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE } from './ListOperationWindowPageSwitchValue.js';
  import ListOperationWindowListMoveWindow from './ListOperationWindowListMoveWindow.vue';
  export default {
    props: ['listHash'],
    components: {
      ListOperationWindowListMoveWindow
    },
    data: function() {
      return {
        windowOpen: false,
        pageSwitch: LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE.OPERATION
      }
    },
    computed: {
      LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE() {
        return LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE;
      }
    },
    methods: {
     deleteList() {
       this.$store.dispatch('deleteList', this.listHash);
       this.windowOpen = false;
      }
    }
  }
</script>
<style scoped>
  .list-operation-wrapper {
    display: inline-block;
    position: relative;
  }
  .list-operation-modal {
    width: 280px;
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 3px;
    background-color: #fff;
    padding: 5px 10px;
  }
  .list-operation-item {
    display: block;
    padding: 6px 12px;
  }
  .list-operation-btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
  }
  .list-operation-btn:hover {
    background-color: rgba(9,30,66,.08);
  }
  .list-operation-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>