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
    //登陆状态
    loginuser:false,
    //创建的歌单
    createdMusicList:[],
    //收藏的歌单
    collectedMusicList:[],
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
    currentIndex:0,
    //musicurl
    musicurl:'',
    //当前播放音乐的id
    currentMusicIndex:0,
    //tab切换状态
    tabke:'个性推荐',
    //歌手id
    singerId:0,
    //歌手专辑 
    singerAlbum:[],
    //搜索的参数
   theQuery:'',
    //专辑id
    albumId:0,
    //音乐卡片的显示隐藏
    IssongCard:false,
    //选择的视频分类
    videocategroy:58100,
    //视频类型
    videotype:'mv'
  },
  getters: {
  },
  mutations: {
    updatacreatedMusicList(state,py){
      state.createdMusicList=py;
    },
    updatacollectedMusicList(state,py){
      state.collectedMusicList=py;
    },
    videotype(state,play){
      state.videotype=play;
    },
    updatavideocategroy(state,py){
     state.videocategroy=py;
    },
    updataIssongCard(state){
      state.IssongCard=!state.IssongCard;
    },
    updataalbumId(state,py){
      state.albumId=py;
    },
    updatatheQuery(state,py){
      state.theQuery=py;
    },
    updatatabke(state,py){
      state.tabke=py;
    },
    //更改歌手专辑
    updatasingerAlbum(state,py){
      state.singerAlbum=py;
    },
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
    },
    updataclassicSongSing(state,ploay){
      state.classicSong=ploay
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
 },
 updatamusicList(state,py){
  state.musicList=py;
 },
 //更新歌曲id
 updatemusicId(state,py){
  state.musicId=py;
 },
 updatemusicurl(state,py){
  state.musicurl=py;
 },
 updatacurrentMusicIndex(state,py){
  state.currentIndex=py;
 },
 updatasingerId(state,py){
  state.singerId=py;
 }

  },
  actions: {
  },
  modules: {
  }
})
