<template>
  <div>
    <a v-on:click="windowOpen = !windowOpen"><font-awesome-icon icon="arrow-right" size="sm" class="modal-side-icon" />移動</a>
    <div v-if="windowOpen" class="card-move-window">
      <h3 class="operation-window-title">カードを移動</h3>
      <a v-on:click="windowOpen = false" class="modal-close-btn"><font-awesome-icon icon="times" size="sm" /></a>
      <div class="move-select-wrapper">
      <p class="move-select-name">リスト</p>
        <select v-model="selectListIndex" class="move-select">
          <option v-for="(list, index) in $store.state.lists"
                  v-bind:key="index"
                  v-bind:value="index">
            {{ list.name }}
            <p v-if="list.hash === getCard(cardHash).listHash">(現在のリスト)</p>
          </option>
        </select>
      </div>
      <div class="move-select-wrapper">
        <p class="move-select-name">位置</p>
        <select v-model="cardOrder" class="move-select">
          <option v-if="cardOrderOptions < 1" value="1">
            1
            {{ indexLocation(0) }}
          </option>
          <option v-else v-for="index in cardOrderOptions"
                  v-bind:key="index"
                  v-bind:value="index">
            {{ index }}
            {{ indexLocation(index - 1) }}
          </option>
        </select>
      </div>
      <a v-on:click="moveCard()" class="green-btn">移動</a>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    props: ['cardHash'],
    data: function() {
      return {
        windowOpen: false,
        toListIndex: 0,
        cardOrder: 0,
        cardOrderOptions: 0,
        
      }
    },
    computed: {
      ...mapGetters(['getListIndex', 'getCard', 'getListOfCardsAsc']),
      selectListIndex: {
        get() {
          return this.toListIndex;
        },
        set(value) {
          this.toListIndex = value;
          this.cardOrderOptionsUpdate(this.$store.state.lists[this.toListIndex].hash);
        }
      }
    },
    methods: {
      cardOrderOptionsUpdate(selectListHash) {
        const selectListOfCardsLength = this.getListOfCardsAsc(selectListHash).length;
        // 末尾を選択した状態にしておく
        this.cardOrderOptions = selectListOfCardsLength + 1;
        this.cardOrder = selectListOfCardsLength + 1;
        
        if (selectListHash === this.getCard(this.cardHash).listHash) {
          this.cardOrderOptions = selectListOfCardsLength;
          this.cardOrder = this.getCard(this.cardHash).order + 1;
        }
      },
      indexLocation(index) {
        if (this.$store.state.lists[this.toListIndex].hash === this.getCard(this.cardHash).listHash
            && this.getCard(this.cardHash).order === index) {
          return '現在の位置'
        }
      },
      moveCard() {
        if (this.listIndex === this.toListIndex  && this.cardIndex === this.toCardIndex - 1) return;
        this.$store.dispatch('moveCard', {
          cardHash: this.cardHash,
          fromListHash: this.$store.state.lists[this.toListIndex].hash,
          order: this.cardOrder - 1
        });
        // windowを閉じるために/に移動させる
        this.$router.push('/');
      }
    },
    mounted() {
      this.toListIndex = this.getListIndex(this.getCard(this.cardHash).listHash),
      this.cardOrder = this.getCard(this.cardHash).order + 1,
      this.cardOrderOptions = this.getListOfCardsAsc(this.$store.state.lists[this.toListIndex].hash).length
    }
  }
</script>
<style scoped>
  .card-move-window {
    position: absolute;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    width: 304px;
    padding: 0 12px 12px;
  }
</style>