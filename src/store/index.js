import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        // 当前播放的歌单
        musicList: [],
        // 当前播放歌单的id
        musicListId: '',
    //userid
    userid:'',
    musicId:'',
    loginuser:false,
    //精品歌单分类
    classicSong:'华语',
    yesuserid:'',
    //播放状态
    stateOfPlay:false,
    //歌曲播放时间
    songPlayingTime:0,
    //歌曲播放结束时间
    songsPlayedOverTime:0,
      // 实时播放时长
      currentTime: 0,
      currentIndex:0
  },
  getters: {
  },
  mutations: {
    //更改userid
    updatauserid(state,ploay){
      state.userid=ploay
    },
    updatyesuserid(state,ploay){
      state.yesuserid=ploay
    },
    //更改登陆状态
    updataloginuser(state,logs){
      state.loginuser=logs
      console.log(logs);
    },
    updataclassicSongSing(state,ploay){
      state.classicSong=ploay
      console.log(ploay);
    },
    //修改播放状态
    changePlayState(state, isPlay) {
      state.stateOfPlay = isPlay;
  },
  //实时更新播放时间
  updateCurrentTime(state, play) {
    state.currentTime = play;
},
  // 更改当前播放音乐的索引
  updateCurrentIndex(state, url) {
    state.currentIndex = url;
},
//保存歌曲的总播放时间
 updatasongsPlayedOverTime(state,py){
  state.songsPlayedOverTime=py;
 },
 //更新歌单id
 updatamusicListId(state,py){
  state.musicListId=py;
 }
  },
  actions: {
  },
  modules: {
  }
})
