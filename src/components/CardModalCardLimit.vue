<template>
  <div class="limit-date" v-if="limitDate !== ''">
    <p class="card-option-title">期限</p>
    <input type="checkbox"
           v-model="updateFinish"
           class="limit-checkbox-input"
           id="limit-checkbox-input">
    <label class="limit-checkbox"
           for="limit-checkbox-input">
      {{ dateText }}
    </label>
    <p class="warning-text"
       v-bind:class="warningTextClass">
      {{ warningText }}
    </p>
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
        color: 'transparent',
        warningText: '',
        warningTextClass: ''        
      }
    },
    computed: {
      ...mapGetters(['getCard']),
      limitDate() {
        return this.getCard(this.cardHash).limit.date;
      },
      updateFinish: {
        get() {
          return this.getCard(this.cardHash).limit.finish;
        },
        set(value) {
          this.$store.dispatch('toggleFinish', {
            cardHash: this.cardHash,
            finish: value
          });
          this.updateDateText();
        }
      }
    },
    methods: {
      updateWarningText(limitDate) {
        const nowDate = this.$moment();
        if (nowDate.isAfter(limitDate)) {
          this.warningText = '期限切れ';
          this.warningTextClass = 'expired';
        } else if(this.$moment(limitDate).add(1, 'day').isSameOrAfter(nowDate)) {
          this.warningText = 'まもなく締め切り';
          this.warningTextClass = 'nearby';
        } else {
          this.warningText = '';
          this.warningTextClass = '';
        } 
      },
      finishWarningText() {
        this.warningText = '完了済み';
        this.warningTextClass = 'finish';
      },
      updateDateText() {
        if (this.limitDate !== '') {
          this.dateText = this.$moment(this.limitDate).format('MM月DD日 HH:mm');
          if (this.getCard(this.cardHash).limit.finish) {
            this.finishWarningText();
          } else {
            this.updateWarningText(this.limitDate);
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
      }
    }
  }
</script>
<style scoped>
  .limit-date {
    
  }
  .warning-text {
    display: inline-block;
    font-size: 12px;
    line-height: 16px;
    margin: auto 0 auto 8px;
    border-radius: 2px;
    padding: 0 4px;
  }
  .nearby {
    background-color: #f2d600;
    color: #fff;
  }
  .expired {
    background-color: #EB5A46;
    color: #fff;
  }
  .finish {
    background-color: #5aac44;
    color: #fff;
  }
  .limit-checkbox-input {
    display: none;
  }
  .limit-checkbox {
    position: relative;
    margin-left: 22px;
  }
  .limit-checkbox::before {
    position: absolute;
    left: -22px;
    top: 2px;
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: #fafbfc;
    box-shadow: inset 0 0 0 2px #dfe1e6;
  }
  .limit-checkbox-input:checked + .limit-checkbox::before {
    background-color: #5ba4cf;
    box-shadow: inset 0 0 0 2px #5ba4cf;
  }
  .limit-checkbox-input:checked + .limit-checkbox::after {
    position: absolute;
    left: -17px;
    top: 5px;
    content: "";
    display: block;
    width: 5px;
    height: 8px;
    transform: rotate(40deg);
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
  }
</style>