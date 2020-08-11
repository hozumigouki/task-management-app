<template>
  <div>
    <a v-on:click="windowOpen = !windowOpen"><font-awesome-icon icon="tag" size="sm" class="modal-side-icon" />ラベル</a>
    <div v-if="windowOpen" class="labels-modal">
      <a v-on:click="windowOpen = false" class="modal-close-btn"><font-awesome-icon icon="times" size="sm" /></a>
      <LabelsWindowLabels v-on:labelHash="toggleLabel($event)" />
    </div>
  </div>
</template>
<script>
  import LabelsWindowLabels from './LabelsWindowLabels.vue';
  export default {
    props: [
      'cardHash'
    ],
    components: {
      LabelsWindowLabels
    },
    data: function() {
      return {
        windowOpen: false
      }
    },
    methods: {
      toggleLabel(labelHash) {
        this.$store.dispatch('toggleCardLabel', {
          cardHash: this.cardHash,
          labelHash: labelHash
        });
      }
    }
  }
</script>
<style>
  .labels-modal {
    width: 304px;
    position: absolute;
    border-radius: 3px;
    background-color: #fff;
    padding: 0 12px 12px;
    overflow-y: scroll;
    max-height: 70vh;
  }
</style>