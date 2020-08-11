<template>
  <div class="list-addbutton">
    <div v-if="!openListAddForm" class="list-addbutton-text">
      <a v-on:click="openListAddForm = !openListAddForm"><font-awesome-icon icon="plus" size="sm" />もう1つリストを追加</a>
    </div>
    <div v-else class="list-addbutton-form">
      <input type="text" v-model="listName" placeholder="リストのタイトルを入力..." class="list-name-input">
      <a v-on:click="addList()" class="list-add-btn">リストを追加</a>
      <a v-on:click="openListAddForm = false" class="close-btn"><font-awesome-icon icon="times" size="lg" /></a>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
        return{
          openListAddForm: false,
          listName: ''
        }
      },
    methods: {
      addList() {
        if (this.listName === '') return;
        this.$store.dispatch('addList', this.listName);
        this.listName = '';
        this.openListAddForm = false;
      }
    }
  }
</script>
<style scoped>
  .list-addbutton {
    width: 270px;
    flex: 0 0 auto;
    color: #fff;
    text-align: left;
  }
  .list-addbutton-text {
    background-color: rgba(255, 255, 255, 0.24);
    padding: 10px 12px;
    border-radius: 3px;
  }
  .list-addbutton-form {
    background-color: #ebecf0;
    padding: 3px;
    border-radius: 3px;
  }
  .list-name-input {
    width: 100%;
    box-shadow: inset 0 0 0 2px #0079bf;
    border: none;
    padding: 8px 12px;
    margin-bottom: 4px;
  }
</style>