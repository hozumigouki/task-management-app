<template>
  <div>
    <h3 class="operation-window-title">リストの移動</h3>
    <a v-on:click=" backOperationWindow()" class="modal-return-btn">
      <font-awesome-icon icon="chevron-left" size="sm" />
    </a>
    <div class="move-select-wrapper">
      <p class="move-select-name">位置</p>
      <select v-model="selected" class="move-select">
        <option v-for="index in $store.state.lists.length" v-bind:key="index" v-bind:value="index">
          {{ index }}
          <p v-if="index === getListIndex(listHash) + 1">(現在の位置)</p>
        </option>
      </select>
    </div>
    <a v-on:click="moveList()" class="green-btn">移動</a>
  </div>
</template>
<script>
  import {
    LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE
  } from './ListOperationWindowPageSwitchValue.js';
  import {
    mapGetters
  } from 'vuex';
  export default {
    props: ['listHash'],
    data: function() {
      return {
        selected: 0
      }
    },
    computed: {
      ...mapGetters(['getListIndex'])
    },
    methods: {
      moveList() {
        if (this.selected - 1 === this.listIndex) return;
        this.$store.dispatch('moveList', {
          fromIndex: this.getListIndex(this.listHash),
          toIndex: this.selected - 1
        });
        this.closeWindow();
      },
      backOperationWindow() {
        this.$emit('returnPage', LIST_OPERATION_WINDOW_PAGE_SWITCH_VALUE.OPERATION);
      },
      closeWindow() {
        this.$emit('windowOpen', false);
      }
    },
    mounted() {
      this.selected = this.getListIndex(this.listHash) + 1;
    }
  }

</script>
<style>
  .move-select-wrapper {
    background-color: rgba(9, 30, 66, .08);
    padding: 6px 12px;
    border-radius: 3px;
    margin-bottom: 8px;
  }

  .move-select-name {
    color: #5e6c84;
    display: block;
    font-size: 12px;
    line-height: 16px;
    margin: 0;
  }

  .move-select {
    font-size: 14px;
    width: 100%;
    appearance: none;
    border: none;
    background-color: transparent;
  }

  .move-select:focus {
    outline: none;
  }

</style>
