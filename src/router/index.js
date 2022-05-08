import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const home=()=>import('../components/index')
const fout=()=>import('../components/foundThatMusicHomePage/musicindex')
const recomm=()=>import('../components/foundThatMusicHomePage/recommendation')
const playlist=()=>import('../components/content/playlist')
const video=()=>import('../views/video/videoIndex')
const exclus=()=>import('../components/foundThatMusicHomePage/exclusiveCustom')
const seethe=()=>import('../components/foundThatMusicHomePage/seeThePlaylist')
const listofladder=()=>import('../components/foundThatMusicHomePage/listOfLadder')
const singer=()=>import('../components/foundThatMusicHomePage/singer')
const singerView=()=>import('../views/singerView/singerview')
const singerab=()=>import('../views/singerView/singertheAlbum')
const singMV=()=>import('../views/singerView/singMV')
const singerdetails=()=>import('../views/singerView/singerdetails')
const similarToSinger=()=>import('../views/singerView/similarToSinger')
const hotsearch=()=>import('../components/common/header-content/hotsearch')
const singlehot=()=>import('../components/common/header-content/singlehot')
const singerhot=()=>import('../components/common/header-content/singerhot')
const theAlbumhot=()=>import('../components/common/header-content/theAlbumhot')
const videohot=()=>import('../components/common/header-content/videohot')
const playlisthot=()=>import('../components/common/header-content/playlisthot')
const albumList=()=>import('../components/content/albumList')
const albumListson=()=>import('../components/content/albumListson')
const albumReviews=()=>import('../components/content/albumReviews')
const albumDetails=()=>import('../components/content/albumDetails')
const videoson=()=>import('../views/video/video');
const videoMV=()=>import('../views/video/videoMV');
const videodetail=()=>import('../views/video/videodetail');
const collection=()=>import('../views/collectionOfSongs/collection')
const oneday=()=>import('../views/recommendedDaily/oneday')
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component:home,  
    children:[
      {
        path: '/',
        redirect: '/home/foutthat/recomm'
      },
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
        },
        {
        path:'/home/foutthat/exclus',
        component:exclus
        },
        {
          path:'/home/foutthat/seethe',
          component:seethe
          },
          {
            path:'/home/foutthat/listofladder',
            component:listofladder
            },
            {
              path:'/home/foutthat/singer',
              component:singer
              },
      ]
       }, 
       {
        path:'/home/playlist/:id',
        component:playlist
      },
      {
        path:'/home/video',
        component:video,
        children:[
          {
            path: '/',
            redirect: '/home/video/videos'
          },
          {
            path:'/home/video/videos',
            component:videoson
          },
          {
            path:'/home/video/videoMV',
            component:videoMV
          },
        ]
      },
      {
        path:'/home/singerView',
        component:singerView,
        children:[
          {
            path: '/',
            redirect: '/home/singerView/singerab/:id'
          },
          {
            path:'/home/singerView/singerab/:id',
            component:singerab,
          },
          {
            path:'/home/singerView/singMV',
            component:singMV,
          },
          {
            path:'/home/singerView/singerdetails',
            component:singerdetails,
          },
          {
            path:'/home/singerView/similarToSinger',
            component:similarToSinger, 
          }
        ]
      },
      {
        path:'/home/hotsearch',
        component:hotsearch,
        children:[
          {
            path: '/',
            redirect: '/home/hotsearch/singlehot/:id'
          }, 
          {
            path:'/home/hotsearch/singlehot/:id',
            component:singlehot, 
          },
          {
            path:'/home/hotsearch/singerhot',
            component:singerhot, 
          },
          {
            path:'/home/hotsearch/theAlbumhot',
            component:theAlbumhot, 
          },
          {
            path:'/home/hotsearch/videohot',
            component:videohot, 
          },
          {
            path:'/home/hotsearch/playlisthot',
            component:playlisthot, 
          },
        ]
      }, 
      {
        path:'/home/albumList',
        component:albumList, 
        children:[
          {
            path: '/',
            redirect: '/home/albumList/albumListson/:id'
          }, 
          {
            path:'/home/albumList/albumListson/:id',
            component:albumListson, 
          },
          {
            path:'/home/albumList/albumReviews',
            component:albumReviews, 
          },
          {
            path:'/home/albumList/albumDetails',
            component:albumDetails, 
          },

        ]
      },
      {
        path:'/home/videodetail/:id',
        component:videodetail, 
      },
      {
        path:'/home/collection',
        component:collection, 
      },
      {
        path:'/home/oneday',
        component:oneday, 
      },
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
