<template>
  <div>
    <div v-if="!openCardAddForm" class="card-add-text">
      <a v-on:click="openCardAddForm = true"><font-awesome-icon icon="plus" size="sm" />カードを追加</a>
    </div>
    <div v-if="openCardAddForm" class="card-add-form">
      <input type="text" v-model="cardName" placeholder="カードのタイトルを入力..." class="cardname-input">
      <a v-on:click="addCard()" class="card-add-btn">カードを追加</a>
      <a v-on:click="openCardAddForm = false" class="close-btn">
        <font-awesome-icon icon="times" size="lg" class="modalclose-icon" />
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['listHash'],
    data: function() {
      return {
        openCardAddForm: false,
        cardName: ''
      }
    },
    methods: {
      addCard() {
        if (this.cardName === '') return;
        this.$store.dispatch('addCard', {
          listHash: this.listHash,
          cardName: this.cardName,
        }
        );
        this.cardName = '';
        this.openCardAddForm = false;
      }
    }
  }
</script>
<style scoped>
  .card-add-text {
    color: #5e6c84;
    padding: 6px 8px 12px;
    text-align: left;
  }
  .cardname-input {
    width: 100%;
    margin-bottom: 8px;
    border-radius: 3px;
    border: none;
    padding: 6px 8px;
  }
  .card-add-form {
    text-align: left;
    margin-bottom: 8px;
  }
</style>