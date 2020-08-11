<template>
  <div>
    <div v-if="pageSwitch === LABELS_WINDOW_PAGE_SWITCH_VALUE.LABELS">
      <h3 class="operation-window-title">ラベル</h3>
      <div v-for="(label, index) in $store.state.labels" 
           v-bind:key="index" 
           class="card-label"
           >
        <p class="label-name"
           v-on:click="labelClick(label.hash)"
           v-bind:style="{backgroundColor:label.color}">
          {{ label.name }}
        </p>
        <a v-on:click="transitionLabelPage(label.hash)" class="label-change-btn">
          <font-awesome-icon icon="pen" size="xs" class="label-change-btn-icon" />
        </a>
      </div>
      <a v-on:click="pageSwitch = LABELS_WINDOW_PAGE_SWITCH_VALUE.ADD_LABEL" class="add-label-btn">新しいラベルを作成</a>
    </div>
    <LabelsWindowLabelsChangeWindow v-if="pageSwitch === LABELS_WINDOW_PAGE_SWITCH_VALUE.CHANGE_LABEL"
                                         v-bind:label-hash="labelChangeHash"
                                         v-on:returnPage="pageSwitch = $event" />
    <LabelsWindowLabelAddWindow v-if="pageSwitch === LABELS_WINDOW_PAGE_SWITCH_VALUE.ADD_LABEL"
                                v-on:returnPage="pageSwitch = $event" />
  </div>
</template>
<script>
  import {LABELS_WINDOW_PAGE_SWITCH_VALUE } from './LabelsWindowPageSwitchValue.js';
  import LabelsWindowLabelsChangeWindow from './LabelsWindowLabelsChangeWindow.vue';
  import LabelsWindowLabelAddWindow from './LabelsWindowLabelAddWindow.vue';

  export default {
    components: {
      LabelsWindowLabelsChangeWindow,
      LabelsWindowLabelAddWindow
    },
    data: function() {
      return {
        pageSwitch: LABELS_WINDOW_PAGE_SWITCH_VALUE.LABELS,
        labelChangeHash: ''
      }
    },
    computed: {
      // template内で定数を使用するために必要
      LABELS_WINDOW_PAGE_SWITCH_VALUE() {
        return LABELS_WINDOW_PAGE_SWITCH_VALUE;
      }
    },
    methods: {
      labelClick(labelHash) {
        this.$emit('labelHash',labelHash);
      },
      transitionLabelPage(labelHash) {
        this.labelChangeHash = labelHash;
        this.pageSwitch = LABELS_WINDOW_PAGE_SWITCH_VALUE.CHANGE_LABEL;
      }
    }
  }
</script>
<style scoped>
  .card-label {
    position: relative;
    margin-bottom: 5px;
  }
  .label-name {
    margin: 0;
    color: #fff;
    height: 32px;
    padding: 10px;
    margin-right: 36px;
    border-radius: 3px;
  }
  .label-change-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 32px;
    width: 32px;
  }
  .label-change-btn-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    
  }
</style>