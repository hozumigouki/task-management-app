import Vue from 'vue';
import Router from 'vue-router';
import Board from './views/Board.vue'
import CardModal from './views/CardModal.vue';

Vue.use(Router);

export default new Router({
  base: '/task-management-app/',
  mode: 'history',
  routes: [
    {
      path: '/',
       component: Board,
       children: [
         {
           path: 'cardmodal/:cardHash',
           component: CardModal,
           props: true
         }
       ]
    }
  ]
});