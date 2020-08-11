<template>
  <div>
    <a v-on:click="windowOpen = !windowOpen"><font-awesome-icon icon="clock" size="sm" class="modal-side-icon" />期限</a>
    <div v-if="windowOpen" class="limit-modal">
      <h3 class="operation-window-title">期限を変更</h3>
      <a v-on:click="windowOpen = !windowOpen" class="modal-close-btn"><font-awesome-icon icon="times" size="sm" /></a>
      <div class="date-time-input">
        <div class="date-input-wrapper">
          <p class="date-input-title">日付</p>
          <v-date-picker v-model="date"
                         v-bind:input-props='{class: "date-input"}'
                         v-bind:popover="{visibility:'hidden'}"/>
        </div>
        <div class="time-input-wrapper">
          <p class="time-input-title">時刻</p>
          <input class="time-input" v-model="time" v-on:change="timeChange()">
        </div>
      </div>
      <v-date-picker v-model="date"
                     v-bind:min-date='new Date()'
                     is-inline
                     is-required />
      <div class="btns-wrapper">
        <a v-on:click="addLimit()" class="green-btn">保存</a>
        <a v-on:click="deleteLimit()" class="red-btn">削除</a>
      </div>
    </div>
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
        windowOpen: false,
        date: this.$moment().toDate(),
        time: this.$moment().format('HH:mm')
      }
    },
    computed: {
      ...mapGetters(['getCard'])
    },
    methods: {
      addLimit() {
        //日付と時刻を結合
        let addLimitDate = this.$moment(this.date);
        addLimitDate.set('hour', this.time.slice(0, 2));
        addLimitDate.set('minute', this.time.slice(3));        
        this.$store.dispatch('addLimit', {
          cardHash: this.cardHash,
          date: addLimitDate
        });
        this.windowOpen = false;
      },
      deleteLimit() {
        this.$store.dispatch('deleteLimit', this.cardHash);
        this.windowOpen = false;
      },
      timeChange() {
        if(!this.$moment(this.time, 'HH:mm', true).isValid()) {
          this.time = '00:00';
        }
      }
    },
    mounted: function() {
      const cardLimitDate = this.getCard(this.cardHash).limit.date;
      if (cardLimitDate !== '') {
        this.date = this.$moment(cardLimitDate).toDate();
        this.time = this.$moment(cardLimitDate).format('HH:mm');
      }
    },
    watch: {
      date: function() {
        this.time = `${('0' + this.date.getHours()).slice(-2)}:${('0' + this.date.getMinutes()).slice(-2)}`;
      }
    }
  }
</script>
<style scoped>
  .limit-modal {
    width: 280px;
    position: absolute;
    border-radius: 3px;
    background-color: #fff;
    padding: 5px 10px;
    overflow-y: scroll;
  }
  .date-time-input {
    display: flex;
    justify-content: space-between;
  }
  .date-input-wrapper,
  .time-input-wrapper {
    width: 48%;
    font-size: 14px;
  }
  .date-input-title,
  .time-input-title {
    font-size: 12px;
    margin: 0;
  }
  .time-input {
    border-radius: 3px;
    font-size: 14px;
    margin: 4px 0 12px;
    padding: 8px 12px;
    width: 100%;
    box-shadow: inset 0 0 0 2px #dfe1e6;
  }
</style>
<style>
  /* v-calendarにはscopedのcssが効かないのでここに追加 */
  .date-input {
    border-radius: 3px;
    font-size: 14px;
    margin: 4px 0 12px;
    padding: 8px 12px;
    width: 100%;
    box-shadow: inset 0 0 0 2px #dfe1e6;
  }
</style>