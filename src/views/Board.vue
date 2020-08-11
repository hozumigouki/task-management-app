<template>
  <div class="main-wrapper">
    <input type="text" v-model="boardname" class="board-name" v-bind:style="{ width: boardnameTextWidth() }">
    <Lists />
    <router-view />
  </div>
</template>
<script>
  import Lists from '@/components/Lists.vue';
  export default {
    components: {
      Lists
    },
    computed: {
      boardname: {
        get() {
          return this.$store.state.boardname;
        },
        set(value) {
          this.$store.dispatch('changeBoardname', value);          
        }
      }
    },
    created() {
      if (this.$store.state.defaultDataCreate) {
        this.$store.dispatch('createDefaultData');
      }
    },
    methods: {
      boardnameTextWidth() {
        return 'calc(' + this.boardname.length + 'em + 24px)';
      }
    }
  }
</script>
<style scoped>
  .main-wrapper {
    padding: 8px 4px 4px 8px;
  }
  .board-name {
    display: block;
    font-size: 18px;
    background-color: transparent;
    border: none;
    color: #fff;
    font-weight: bold;
    padding: 8px 12px;
    line-height: 1.2;
  }
  .board-name:focus {
    color: #172b4d;
    background-color: #fff;
  }
</style>
<style>
  * {
    box-sizing: border-box;
  }
  body {
    color: #172b4d;
  }
  a {
    cursor: pointer;
    text-decoration: none;
  }
  a:link, a:visited, a:hover, a:active {
    color: #172b4d;
  }
  input {
    border: none;
    color: #172b4d;
    outline: none;
  }
  /* カードモーダル関連 */
  .modal-item-wrapper {
    margin: 0 0 4px 40px;
  }
  .modal-item-title {
    position: relative;
  }
  .modal-item-title-icon {
    position: absolute;
    left: -40px;
  }
  .modal-side-icon {
    margin-right: 10px;
  }
  /* カードとリストの追加ボタン */
  .card-add-btn,
  .list-add-btn {
    background-color: #5aac44;
    display: inline-block;
    color: #fff;
    border: none;
    padding: 4px 12px;
    border-radius: 3px;
  }
  .close-btn {
    margin: 3px;
    color: #42526e;
  }
  .card-option-title {
    color: #5e6c84;
    font-size: 12px;
    margin: 0 8px 4px 0;
    white-space: nowrap;
    font-weight: 500;
  }
  .operation-window-title {
    color: #5e6c84;
    margin: 0 12px 8px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid rgba(9,30,66,.13);
  }
  /* lebelwindow関連 */
  .label-name {
    color: #5e6c84;
    font-size: 12px;
    line-height: 16px;
    margin: 12px 0 4px;
  }
  .label-name-input {
    width: 100%;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    border: none;
    background-color: #fafbfc;
    padding: 8px 12px;
    border-radius: 3px;
  }
  /* labelwindow内での戻るボタン < と閉じるボタン x  */
  .modal-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .modal-return-btn {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  
  /* 保存と削除ボタン */
  .btns-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 8px auto;
  }
  .green-btn{
    display: inline-block;
    padding: 6px 24px;
    background-color: #5aac44;
    color: #fff;
    font-weight: bold;
    border-radius: 3px;
  }
  .green-btn:hover {
    color: #fff;
    background-color: #61bd4f;
  }
  .red-btn {
    display: inline-block;
    padding: 6px 12px;
    background-color: #cf513d;
    color: #fff;
    font-weight: bold;
    border-radius: 3px;
  }
  .red-btn:hover {
    color: #fff;
    background-color: #eb5a46;
  }
</style>