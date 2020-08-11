import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import { createHash } from '@/createHash.js';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    defaultDataCreate: true,
    boardname: '未タイトルボード',
    lists: [],
    cards: [],
    labels: [],
  },
  getters: {
    getLists: (state) => {
      return state.lists;
    },
    // listHashに一致するlistを返す
    getList: (state) => (listHash) => {
      return state.lists.find(list => list.hash === listHash);
    },
    // listHashに一致するlistのindexを返す
    getListIndex: (state) => (listHash) => {
      return state.lists.findIndex(list => list.hash === listHash);
    },
    // cardHashに一致するcardを返す
    getCard: (state) => (cardHash) => {
      return state.cards.find(card => card.hash === cardHash);
    },
    // listHashに一致するlistHashを持ったカードの配列を昇順で返す
    getListOfCardsAsc: (state) => (listHash) => {
      let listOfCards = [];
      listOfCards = state.cards.filter(card => {
        return card.listHash === listHash;
      });
      return listOfCards.sort((a, b) => a.order - b.order);
    },
    getLabel: (state) => (labelHash) => {
      return state.labels.find(label => label.hash === labelHash);
    }
  },
  mutations: {
    defaultDataCreateDone(state) {
      state.defaultDataCreate = false;
    },
    //ボード関連
    changeBoardname(state, newBoardname) {
      state.boardname = newBoardname;
    },
    //リスト関連
    addList(state, name) {
      state.lists.push({
        name: name,
        hash: createHash(),
      });
    },
    deleteList(state, listHash) {
      state.lists.splice(state.lists.findIndex(list => list.hash === listHash), 1);
    },
    moveList(state, {fromIndex, toIndex}) {
      const temp = state.lists[fromIndex];
      state.lists.splice(fromIndex, 1);
      if (toIndex > state.lists.length) {
        state.lists.push(temp);
      } else {
        state.lists.splice(toIndex, 0, temp);
      }
    },
    updateList(state, newList) {
      Vue.set(state, 'lists', newList);
    },
    changeListname(state, {listHash, newListname}) {
      Vue.set(state.lists.find(list => list.hash === listHash), 'name', newListname);
    },
    //カード関連
    addCard(state, {listHash, cardName, order}) {
      state.cards.push({
        name: cardName,
        hash: createHash(),
        listHash: listHash,
        order: order,
        description: '',
        log: [],
        labelHashes: [],
        limit: {
          date: '',
          finish: false
        }
      });
    },
    deleteCard(state, cardHash) {
      state.cards.splice(state.cards.findIndex(card => card.hash === cardHash), 1);
    },
    changeCardListAndCardOrder(state, {cardHash, fromListHash, order}) {
      const changeCard = state.cards.find(card => card.hash === cardHash);
      Vue.set(changeCard, 'listHash', fromListHash);
      Vue.set(changeCard, 'order', order);
    },
    addCardlog(state, {cardHash, text}) {
      const logDate = Vue.moment().format('MM月DD日');
      state.cards.find(card => card.hash === cardHash).log.unshift({logText: text, logDate: logDate});
    },
    changeCardlog(state, {cardHash, text, logIndex}) {
      state.cards.find(card => card.hash === cardHash).log[logIndex].logText = text;
    },
    deleteCardlog(state, {cardHash, logIndex}) {
      state.cards.find(card => card.hash === cardHash).log.splice(logIndex, 1);
    },
    addCardLabel(state, {cardHash, labelHash}) {
      const cardLabalHashes = state.cards.find((card) => card.hash === cardHash).labelHashes;
      cardLabalHashes.push(labelHash);
    },
    deleteCardLabel(state, {cardHash, labelHash}) {
      const cardLabalHashes = state.cards.find((card) => card.hash === cardHash).labelHashes;
      cardLabalHashes.splice(
        cardLabalHashes.findIndex(cardLabalHash => cardLabalHash === labelHash),
        1
      );
    },
    addLabel(state, {name, color}) {
      state.labels.push({
        name: name,
        color: color,
        hash: createHash()
      });
    },
    changeLabel(state, {labelHash, name, color}) {
      const changeLabelHash = state.labels.find(label => label.hash === labelHash);
      Vue.set(changeLabelHash, 'name', name);
      Vue.set(changeLabelHash, 'color', color);
    },
    deleteLabel(state, labelHash) {
      const deleteLabelIndex = state.labels.findIndex(label => label.hash === labelHash);
      state.labels.splice(deleteLabelIndex, 1);
      
      state.cards.map(card => {
        const deleteCardLabelIndex = card.labelHashes.findIndex(cardLabelHash => cardLabelHash === labelHash);
        if (deleteCardLabelIndex) {
          card.labelHashes.splice(deleteCardLabelIndex, 1);
        } 
      });
    },
    addLimit(state, {cardHash, date}) {
      Vue.set(state.cards.find(card => card.hash === cardHash).limit, 'date', date);
    },
    deleteLimit(state, cardHash) {
      Vue.set(state.cards.find(card => card.hash === cardHash).limit, 'date', '');
    },
    toggleFinish(state, {cardHash, finish}) {
      Vue.set(state.cards.find(card => card.hash === cardHash).limit, 'finish', finish); 
    }
  },
  actions: {
    //デフォルトのデータ生成
    createDefaultData({commit}) {
      const listNames = ['ToDo', '作業中', '完了'];
      const labelColors = ['#61bd4f',
                           '#f2d600',
                           '#ff9f1a',
                           '#eb5a46',
                           '#c377e0',
                           '#0079bf',
                           '#00c2e0'
                          ];
      listNames.map(listName => {
        commit('addList', listName);
      });
      labelColors.map(labelColor => {
        commit('addLabel', {
          name: '',
          color: labelColor
        });
      });
      commit('defaultDataCreateDone');
    },
    //ボード関連
    changeBoardname({ commit }, newBoardname) {
      commit('changeBoardname', newBoardname);
    },
    //リスト関連
    addList({ commit }, listName) {
      commit('addList', listName);
    },
    deleteList({ commit }, listHash) {
      commit('deleteList', listHash);
    },
    moveList({ commit }, {fromIndex, toIndex}) {
      commit('moveList', {fromIndex: fromIndex, toIndex: toIndex});
    },
    updateList({ commit }, newList) {
      commit('updateList', newList);
    },
    changeListname({ commit }, {listHash, newListname}) {
      commit('changeListname', {listHash: listHash, newListname: newListname});
    },
    //カード関連
    addCard({ commit, getters }, {listHash, cardName}) {
      commit('addCard', {
        listHash: listHash,
        cardName: cardName,
        order: getters.getListOfCardsAsc(listHash).length
      });
    },
    deleteCard({ commit, state }, cardHash) {
      const deleteCard = state.cards.find(card => card.hash === cardHash);
      state.cards.map((card) => {
        if (card.listHash === deleteCard.listHash && card.order > deleteCard.order) {
           commit('changeCardListAndCardOrder', {
              cardHash: card.hash,
              fromListHash: card.listHash,
              order: card.order - 1
           });
        }
      });
      commit('deleteCard', cardHash);
    },
    //一つのカードを動かす場合に使用
    moveCard({ dispatch, commit, state }, {cardHash, fromListHash, order}) {
      const moveCard = state.cards.find(card => card.hash === cardHash);
      const formerListHash = moveCard.listHash;
      
      // cardの移動
      commit('changeCardListAndCardOrder', {
        cardHash: cardHash,
        fromListHash: fromListHash,
        order: order
      });
      // 移動先でorderがかぶってしまうので調整
      dispatch('fixSameCardOrder', {
        listHash: fromListHash,
        priorityCardHash: cardHash
      });
      
      // 別のリストに移動した場合
      // 元のリストに穴が開かないようにする
      if (fromListHash !== formerListHash) {
        dispatch('closeSpaceUpCardOrder', formerListHash);
      }
    },
    // orderに穴が開かないようにするaction
    closeSpaceUpCardOrder({ commit, getters }, listHash) {
      const cardList = getters.getListOfCardsAsc(listHash);
      cardList.map((card, index) => {
        if(card.order !== index) {
           commit('changeCardListAndCardOrder', {
              cardHash: card.hash,
              fromListHash: card.listHash,
              order: index
            });
        }
      }); 
    },
    // 同じorderが二つあるときに順番を並べ直すaction
    fixSameCardOrder({ commit, getters }, {listHash, priorityCardHash}) {
      const cardList = getters.getListOfCardsAsc(listHash);
      const priorityCard = getters.getCard(priorityCardHash);
      const priorityCardIndex = cardList.findIndex(card => card.hash === priorityCardHash);
      
      cardList.map((card, index) => {
        if(card.hash === priorityCardHash) return;
        
        if(card.order === priorityCard.order && card.order === index) {
          commit('changeCardListAndCardOrder', {
            cardHash: card.hash,
            fromListHash: card.listHash,
            order: priorityCardIndex
          });
        } else if(card.order !== index) {
           commit('changeCardListAndCardOrder', {
            cardHash: card.hash,
            fromListHash: card.listHash,
            order: index
          });
        }
      });
    },
    renewCardListCardOrder({ commit, getters }, {listHash, newCardList}) {
      const cardList = getters.getListOfCardsAsc(listHash);
      newCardList.map((card, index) => {
        // cardListが存在する and 同じカード and 同じorderだったらreturn
        if(index < cardList.length && 
           card.hash === cardList[index].hash &&
           card.order === cardList[index].order) {
          return;
        }
        commit('changeCardListAndCardOrder', {
          cardHash: card.hash,
          fromListHash: listHash,
          order: index
        });
      });
    },
    changeCardDescription({ commit }, {cardHash, text}) {
      commit('changeCardDescription', {
        cardHash: cardHash,
        text: text
      });
    },
    addCardlog({ commit }, {cardHash, text}) {
      commit('addCardlog', {
        cardHash: cardHash, 
        text: text
      });
    },
    changeCardlog({ commit }, {cardHash, text, logIndex}) {
       commit('changeCardlog', {
         cardHash: cardHash, 
         text: text,
         logIndex: logIndex
       });
    },
    deleteCardlog({ commit }, {cardHash, logIndex}) {
      commit('deleteCardlog', {
        cardHash: cardHash,
        logIndex: logIndex
      });
    },
    toggleCardLabel({ commit, state }, {cardHash, labelHash}) {
      const cardLabalHashes = state.cards.find((card) => card.hash === cardHash).labelHashes;
      if (cardLabalHashes.some(cardLabalHash => cardLabalHash == labelHash)) {
         commit('deleteCardLabel', {
          cardHash: cardHash,
          labelHash: labelHash
        });
      } else {
        commit('addCardLabel', {
          cardHash: cardHash,
          labelHash: labelHash
        });
      }
    },
    addLabel({ commit }, {name, color}) {
      commit('addLabel', {
        name: name,
        color: color
      });
    },
    changeLabel({ commit }, {labelHash, name, color}) {
      commit('changeLabel', {
        labelHash: labelHash,
        name: name,
        color: color
      });
    },
    deleteLabel({ commit }, labelIndex) {
      commit('deleteLabel', labelIndex);
    },
    addLimit({ commit }, {cardHash, date}) {
      commit('addLimit', {
        cardHash: cardHash,
        date: date
      });
    },
    deleteLimit({ commit }, cardHash) {
      // 次期限を設定したときに最初から完了済みにならないようにする
      commit('toggleFinish', {
        cardHash: cardHash,
        finish: false
      });
      commit('deleteLimit', cardHash);
    },
    toggleFinish({ commit }, {cardHash, finish}) {
      commit('toggleFinish', {
        cardHash: cardHash,
        finish: finish
      });
    }
  }
});