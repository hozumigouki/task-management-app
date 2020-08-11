<template>
  <div>
    <h3 class="operation-window-title">ラベルを変更</h3>
    <a v-on:click="$emit('returnPage', LABELS_WINDOW_PAGE_SWITCH_VALUE.LABELS)" class="modal-return-btn">
      <font-awesome-icon icon="chevron-left" size="sm" />
    </a>
    <p class="label-name">名前</p>
    <input type="text" v-model="name" class="label-name-input">
    <p class="label-name">色を選択</p>
    <label v-for="(color, index) in colors"
           v-bind:key="index"
           v-bind:style="{backgroundColor:color}"
           class="color-block"
           v-bind:class="{ 'checked': selectColor === color }">
      <input type="radio"
             v-bind:value="color"
             v-model="selectColor"
             name="color-radio"
             class="color-block-radio">
    </label>
    <div class="btns-wrapper">
      <a v-on:click="changeLabel()" class="green-btn">保存</a>
      <a v-on:click="deleteLabel()" class="red-btn">削除</a>
    </div>
  </div>
</template>
<script>
  import { LABELS_WINDOW_PAGE_SWITCH_VALUE } from './LabelsWindowPageSwitchValue.js';
  import { mapGetters } from 'vuex';
  export default {
    props: ['labelHash'],
    data: function() {
      return {
        name: '',
        colors: [
          '#61bd4f',
          '#f2d600',
          '#ff9f1a',
          '#eb5a46',
          '#c377e0',
          '#0079bf',
          '#00c2e0',
          '#51e898',
          '#ff78cb',
          '#344563'
        ],
        selectColor: '',
      }
    },
    methods: {
      changeLabel() {
        this.$store.dispatch('changeLabel', {
          labelHash: this.labelHash,
          name: this.name,
          color: this.selectColor
        });
        this.$emit('returnPage', LABELS_WINDOW_PAGE_SWITCH_VALUE.LABELS);
      },
      deleteLabel() {
        this.$store.dispatch('deleteLabel', this.labelHash);
        this.$emit('returnPage', LABELS_WINDOW_PAGE_SWITCH_VALUE.LABELS);
      }
    },
    computed: {
      ...mapGetters(['getLabel']),
      LABELS_WINDOW_PAGE_SWITCH_VALUE() {
        return LABELS_WINDOW_PAGE_SWITCH_VALUE;
      }
    },
    mounted() {
      const label = this.getLabel(this.labelHash);
      this.name = label.name;
      this.selectColor = label.color;
    }
  }
</script>
<style scoped>
  .color-block {
    display: inline-block;
    width: 48px;
    height: 32px;
    border-radius: 4px;
    margin: 0 8px 8px 0;
    position: relative;
  }
  .color-block-radio {
    display: none;
  }
  .checked::after {
    content: "";
    display: block;
    position: absolute;
    top: 8px;
    left: 21px;
    width: 7px;
    height: 10px;
    transform: rotate(40deg);
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
  }
</style>