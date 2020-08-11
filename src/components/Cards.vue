<template>
  <div>
    <draggable group="card"
               v-model="draggableCard">
      <Card 
            v-for="card in getListOfCardsAsc(listHash)"
            v-bind:key="card.hash"
            v-bind:card-hash="card.hash">
      </Card>
    </draggable>
  <CardAddButton v-bind:list-hash="listHash" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Card from './Card.vue';
  import CardAddButton from './CardAddButton.vue';
  import draggable from 'vuedraggable';
  export default {
    props: ['listHash'],
    components: {
      Card,
      CardAddButton,
      draggable
    },
    computed: {
      ...mapGetters(['getCard','getListOfCardsAsc']),
      draggableCard: {
        get() {
          return this.getListOfCardsAsc(this.listHash);
        },
        set(e) {
          const cardList = this.getListOfCardsAsc(this.listHash);
          
          // 引数でとった配列と今の状態の配列が同じだった時その時点でreturnする
          if (JSON.stringify(cardList) === JSON.stringify(e)) return;
          
          this.$store.dispatch('renewCardListCardOrder', {
            listHash: this.listHash,
            newCardList: e
          });
          
        }
      }
    }
  }
</script>
<style>
</style>