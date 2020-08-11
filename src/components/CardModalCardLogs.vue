<template>
  <div class="modal-item-wrapper">
    <p class="modal-item-title">
      <font-awesome-icon icon="list-ul" size="lg" class="modal-item-title-icon" />
      アクティビティログ
    </p>
    <div class="log-text-input-wrapper">
      <textarea placeholder="コメントを入力してください"
                v-model="logText"
                class="log-text-input"
                v-bind:style="{ height: logTextInputHeight() + 'px' }">
      </textarea>
      <a v-if="logText !== ''" v-on:click="addLogText()" class="green-btn log-text-input-btn">保存</a>
    </div>
    <div v-for="(log, index) in getCard(cardHash).log"
         v-bind:key="index"
         class="log-wrapper">
      <p class="log-explan">
        コメントしました。
        <span class="log-date">{{ log.logDate }}</span>
      </p>
      <div v-if="!editLogText.isOpen || editLogText.index !== index">
        <p class="log-text">{{ log.logText }}</p>
      </div>
      <div v-if="editLogText.isOpen && editLogText.index === index" class="log-text-input-wrapper">
        <textarea placeholder="コメントを入力してください"
                  v-model="log.logText"
                  class="log-text-input"
                  v-bind:style="{ height: logTextInputHeight() + 'px' }">
        </textarea>
        <a class="green-btn log-text-input-btn" v-on:click="changeCardlog(log.logText, index)">保存</a>
         <font-awesome-icon icon="times" size="lg" v-on:click="closeEditLogtText()" />
      </div>
      <a class="log-operation-name" v-on:click="OpenEditLogText(index)">編集</a>
      <a v-on:click="deleteCardlog(index)" class="log-operation-name">削除</a>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    props: ['cardHash'],
    data: function() {
      return {
        logText: '',
        editLogText: {
          isOpen: false,
          index: ''
        }
      }
    },
    methods: {
      addLogText() {
        this.$store.dispatch('addCardlog', {
          cardHash: this.cardHash,
          text: this.logText
        });
        this.logText = '';
      },
      changeCardlog(text, logIndex) {
        this.$store.dispatch('changeCardlog', {
          cardHash: this.cardHash,
          text: text,
          logIndex: logIndex
        });
        this.closeEditLogtText();
      },
      deleteCardlog(logIndex) {
        this.$store.dispatch('deleteCardlog', {
          cardHash: this.cardHash,
          logIndex: logIndex
        });
      },
      logTextInputHeight() {
        return (this.logText.split('\n').length) * 20;
      },
      OpenEditLogText(index) {
        this.editLogText.isOpen = true;
        this.editLogText.index = index;
      },
      closeEditLogtText() {
        this.editLogText.isOpen = false;
        this.editLogText.index = '';
      }
    },
    computed: {
      ...mapGetters(['getCard'])
    }
  }
</script>
<style>
  .log-wrapper {
    margin: 8px 0;
  }
  .log-explan {
    font-size: 14px;
    margin: 0;
  }
  .log-text-input-wrapper {
    background-color: #fff;
    padding: 8px 12px;
  }
  .log-text-input {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    height: 20px;
    padding: 0;
  }
  .log-text-input-btn {
    padding: 6px 12px;
    margin: 10px 10px 0 0;
    font-weight: normal;
  }
  .log-date {
    color: #5e6c84;
    font-size: 12px;
  }
  .log-text {
    background-color: #fff;
    padding: 8px 12px;
    border-radius: 3px;
    box-shadow: 0 1px 2px -1px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    display: inline-block;
    margin: 5px auto 10px;
    white-space: pre-wrap;
  }
  .log-operation-name {
    font-size: 12px;
    color: #5e6c84;
  }
  .log-operation-name::before {
    content: ' - ';
  }
</style>