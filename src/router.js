import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Myteam from './views/Myteam.vue'
import Ranking from './views/Ranking.vue'
import Answer from './views/Answer.vue'
import Logout from './views/Logout.vue'
import Wrongtime from './views/Wrongtime.vue'
import Apology from './views/Apology.vue'
import RaceAnswer from './views/RaceAnswer.vue'
import NewRank from './views/NewRank.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: Myteam
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/answer',
      name: 'answer',
      component: Answer
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/wrong-time',
      name: 'wrong-time',
      component: Wrongtime
    },
    {
      path: '/apology',
      name: 'apology',
      component: Apology
    },
    {
      path: '/race-answer',
      name: 'race-answer',
      component: RaceAnswer
    },
    {
      path: '/new-rank',
      name: 'new-rank',
      component: NewRank
    }
  ]
})
