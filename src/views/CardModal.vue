<template>
<!--カードがなかったとき用にifで分けた方がいい-->
  <div>
    <router-link to="/" tag="div" class="modalmask" />
    <div class="modalwindow">
      <div class="modalwindow-header">
        <h2 class="modal-title"><font-awesome-icon icon="credit-card" size="sm" class="modal-title-icon" />{{ getCard(cardHash).name }}</h2>
        <p class="modal-list-name">リスト:{{ getList(getCard(cardHash).listHash).name }}</p>
        <router-link to="/" class="modalclose">
          <font-awesome-icon icon="times" size="lg" class="modalclose-icon" />
        </router-link>
      </div>
      <div class="modal-main">
        <div class="modal-item-wrapper">
          <p class="card-option-title">ラベル</p>
          <div v-for="(labelHash, index) in getCard(cardHash).labelHashes"
               v-bind:key="index"
               v-bind:style="{backgroundColor:getLabel(labelHash).color}"
               class="card-label">
            <p class="label-name">{{ getLabel(labelHash).name }}</p>
          </div>
        </div>
        <CardModalCardLimit v-bind:card-hash="cardHash"
                            class="modal-item-wrapper" />
        <div class="modal-item-wrapper">
          <p class="modal-item-title">
            <font-awesome-icon icon="stream" size="lg" class="modal-item-title-icon" />
            説明
          </p>
          <textarea v-model="bindCardDescription" placeholder="詳しい説明を追加してください" class="card-desc"></textarea>
        </div>
        <CardModalCardLogs v-bind:cardHash="cardHash" />
      </div>
      <div class="modal-side">
        <CardModalLabelsWindow v-bind:card-hash="cardHash" class="modal-side-item" />
        <CardModalLimitWindow v-bind:card-hash="cardHash" class="modal-side-item" />
        <CardModalCardMoveWindow v-bind:card-hash="cardHash" class="modal-side-item" />
        <CardModalCardDeleteButton v-bind:card-hash="cardHash" class="modal-side-item" />
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import CardModalCardDeleteButton from '@/components/CardModalCardDeleteButton.vue';
  import CardModalCardLogs from '@/components/CardModalCardLogs.vue';
  import CardModalLabelsWindow from '@/components/CardModalLabelsWindow.vue'
  import CardModalLimitWindow from '@/components/CardModalLimitWindow.vue';
  import CardModalCardLimit from '@/components/CardModalCardLimit.vue';
  import CardModalCardMoveWindow from '@/components/CardModalCardMoveWindow.vue';
  export default {
    props: ['cardHash'],
    components: {
      CardModalCardDeleteButton,
      CardModalCardLogs,
      CardModalLabelsWindow,
      CardModalLimitWindow,
      CardModalCardLimit,
      CardModalCardMoveWindow
    },
    computed: {
      ...mapGetters(['getList', 'getCard', 'getLabel']),
      bindCardDescription: {
        get() {
          return this.getCard(this.cardHash).description;
        },
        set(text) {
          this.$store.dispatch('changeCardDescription', {
            cardHash: this.cardHash,
            text: text
          });
        }
      }
    }
  }
</script>
<style scoped>
  .modalmask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, .5);
  }
  .modalwindow {
    position: fixed;
    z-index: 2;
    background-color: #f4f5f7;
    width: 80%;
    max-width: 768px;
    top: 48px;
    left: calc(50% - 768px/2);
    display: flex;
    flex-wrap: wrap;
    text-align: left;
  }
  .modalwindow-header {
    width: 100%;
    text-align: left;
    margin: 12px 40px 8px 56px;
  }
  .modal-title {
    font-size: 20px;
    position: relative;
    margin: 4px 0 0;
    padding: 8px 0 0;
  }
  .modal-title-icon {
    position: absolute;
    left: -40px;
    top: 12px;
  }
  .modal-list-name {
    color: #5e6c84;
    font-size: 14px;
    margin: 4px 8px 4px 2px;
  }
  .modalclose {
    position: absolute;
    top: 0;
    right: 0;
    color: #42526e;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 4px;
  }
  .modalclose:hover {
    background-color: rgba(9,30,66,.08);
  }
  .modalclose-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .modal-main {
    width: 75%;
    padding: 0 8px 8px 16px;
  }
  .modal-side {
    width: 25%;
    padding: 0 16px 8px 8px;
  }
  .modal-side-item {
    background-color: rgba(9,30,66,.04);
    padding: 6px 12px;
    margin-top: 8px;
  }
  .card-desc {
    background-color: rgba(9,30,66,.04);
    border: none;
    width: 100%;
    resize: none;
    padding: 8px 12px;
    border-radius: 3px;
  }
  .card-label {
    display: inline-block;
    height: 32px;
    min-width: 40px;
    border-radius: 3px;
    margin: 0 4px 4px 0;
    line-height: 32px;
  }
  .label-name {
    margin: 0;
    padding: 0 12px;
    display: inline-block;
    color: #fff;
  }
</style>