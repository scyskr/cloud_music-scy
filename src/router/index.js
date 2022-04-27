import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const home=()=>import('../components/index')
const fout=()=>import('../components/foundThatMusicHomePage/musicindex')
const recomm=()=>import('../components/foundThatMusicHomePage/recommendation')
const playlist=()=>import('../components/content/playlist')
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component:home,
    children:[
      // {
      //   path: '/',
      //   redirect: '/home/foutthat/recomm'
      // },
      {
      path:'/foutthat',
      component:fout,
      children:[
        // {
        //   path: '/',
        //   redirect: '/home/foutthat/recomm'
        // },
        {
        path:'/home/foutthat/recomm',
        component:recomm
      }
      ]
       }, {
        path:'/home/playlist/:id',
        component:playlist
      }
    ]
  },
 
  // {
  //   // path: '/about',
  //   // name: 'about',
  //   // // route level code-splitting
  //   // // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
