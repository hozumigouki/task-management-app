<template>
  <div class="card">
    <router-link :to="'/cardmodal/' + cardHash" class="card-link">
      <div class="label-wrapper">
        <div v-for="(labelHash) in getCard(cardHash).labelHashes"
             v-bind:key="labelHash"
             v-bind:style="{backgroundColor:getLabel(labelHash).color}"
             class="card-label">
        </div>
      </div>
      <h2 class="card-title">{{ getCard(cardHash).name }}</h2>
      {{ getCard(cardHash).order }}
      <div>
        <CardLimit v-bind:card-hash='cardHash' />
        <div v-if="getCard(cardHash).log.length > 0" class="card-log">
          <font-awesome-icon icon="comment" size="1x" />
          {{getCard(cardHash).log.length }}
        </div>
      </div>

    </router-link>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import CardLimit from './CardLimit.vue';
  export default {
    components: {
      CardLimit
    },
    props: ['cardHash'],
    computed: {
      ...mapGetters(['getCard', 'getLabel'])
    }
  }
</script>
<style scoped>
  .card {
    background-color: #fff;
    margin: 5px 0;
    width: 100%;
    font-size: 14px;
    padding: 6px 8px 8px;
    border-radius: 3px;
  }
  .card-link {
    text-decoration: none;
    display: block;
  }
  .card-title {
    font-size: 14px;
    font-weight: normal;
    margin: 0 0 4px;
  }
  .label-wrapper {
    text-align: left;
  }
  .card-label {
    padding: 4px 20px;
    margin: 0 4px 4px 0;
    display: inline-block;
    border-radius: 6px;
  }
  .card-log {
    display: inline-block;
    margin: 0 4px 4px 0;
  }
</style>