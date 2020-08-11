<template>
  <div v-if="limitDate !== ''"
       class="limit-date-small"
       v-bind:class="hasClass">
    <font-awesome-icon icon="clock" size="1x" class="clock-icon" />
    {{ dateText }}
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    props: [
      'cardHash'
    ],
    data: function() {
      return {
        dateText: '',
        hasClass: ''
      }
    },
    computed: {
      ...mapGetters(['getCard']),
      limitDate() {
        return this.getCard(this.cardHash).limit.date;
      },
      finish() {
        return this.getCard(this.cardHash).limit.finish;
      }
    },
    methods: {
      compareDate(limitDate) {
        const nowDate = this.$moment();
        if (nowDate.isAfter(limitDate)) return 'expired';
        if (this.$moment(limitDate).add(1, 'day').isSameOrAfter(nowDate)) return 'nearby';
        return '';
      },
      updateDateText() {
        if (this.limitDate !== '') {
          this.dateText = this.$moment(this.limitDate).format('MM月DD日');
          if (this.finish === true ) {
            this.hasClass = 'finish';
          } else {
            this.hasClass = this.compareDate(this.limitDate);
          }
        }
      }
    },
    mounted() {
      this.updateDateText();
    },
    watch: {
      limitDate: function() {
        this.updateDateText();
      },
      finish: function(finish) {
        if (finish === true ) {
          this.hasClass = 'finish';
        } else {
          this.hasClass = this.compareDate(this.limitDate);
        }
      }
    }
  }
</script>
<style scoped>
  .limit-date-small {
    display: inline-block;
    border-radius: 3px;
    padding: 2px;
    background-color: transparent;
    margin: 0 4px 4px 0;
  }
  .finish {
    background-color: #61bd4f;
    color: #fff;
  }
  .nearby {
    background-color: #f2d600;
    color: #fff;
  }
  .expired {
    background-color: #EB5A46;
    color: #fff;
  }
</style>