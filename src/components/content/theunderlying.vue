<template>
  <div class="flexbotton">
     <audio 
     ref="audioPlayer"
        class="theaudio" 
        src="http://m7.music.126.net/20220427071217/c0ebab1f243ccb00c4d1752f7b7f14d3/ymusic/9b00/76e3/c1ff/e33288eba4579f9c62a71c1b4c863c56.mp3" 
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
      @loadedmetadata="onLoadedmetadata"
      ></audio>
   <div class="footbtn">
     <!-- 左边 -->
     <div class="footbntleft">
        <div>
          <img src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg" alt="">
        </div>
        <div>
           <div class="maxshow">就现在  <i class="icon-xihuan iconfont "></i></div> 
           <div class="maxshow">jz329 / InnerSa / SSr就现在</div>
        </div>
     </div>
       <!-- 中间 -->
      <div class="footbntcontent"> 
         <div class="foottopbtn">
           <span><i class="iconfont icon-xunhuan" v-if="playType" ></i
          ><i class="iconfont icon-suiji1" v-else></i
        ></span>
        <span><i class="iconfont icon-shangyishou" ></i ></span>
        <span @click="musicList.length != 0 ? changePlayState() : ''"> <i class="iconfont icon-zantingtingzhi" v-if="$store.state.stateOfPlay" ></i
        > <i class="iconfont icon-icon_play" v-else></i></span>
        <span> <i class="iconfont icon-xiayishou"></i
        ></span>
       <span><i class="iconfont icon-yifu"></i
        ></span>
         </div>
        <!-- 进度条 -->
        <div class="theProgressBar">
        <div class="currentTime timeoutout">{{ currentTime | handleMusicTime }}</div>
        <el-slider v-model="timeProgress"
         :show-tooltip="false" 
          @change="changeProgress" 
         :disabled="musicList.length == 0"></el-slider>
        <div class="currentTime timeoutin"> {{ duration }} </div>
        </div>
      </div>
      <div>
        <div class="footbntright">
          <div class="right1"> <i class="iconfont icon-yinliang"></i> </div>
          <div><el-slider v-model="timeProgress" :show-tooltip="false"></el-slider></div>
          <div > <i class="iconfont icon-bofangliebiao"></i></div>
        </div>
      </div>
   </div>
   </div>
</template>
<script>
import { handleMusicTime, returnSecond } from '../../plugins/ulits'
let lastSecond = 0;
// 总时长的秒数
let durationNum = 0;
// 保存当前音量
let volumeSave = 0;
export default {
  name:"theunderlying",
  data(){
    return {
      //播放类型
      playType:false,
      //是否播放
      whetherToPlay:false,
      percentage: 0,
      // 音乐总时长
      duration: "00:00",
      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
      // 音量
      volume: 30,
       musicUrl: "",
      musicList: [1],
      //音乐的索引
      currentMusicIndex: 0,
    }
  },
  methods:{
      // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play();
    },
        // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
    },
    //播放音乐
     changePlayState(){
       !this.$store.state.stateOfPlay?this.playMusic() : this.pauseMusic();
     },
    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit("changePlayState", state);
        this.whetherToPlay=true
    },
    onLoadedmetadata(res) {
  console.log('loadedmetadata')
  console.log(res)
  let timeStamp=res.target.duration/60;
  this.duration = timeStamp.toFixed(2);
   this.$store.commit("updatasongsPlayedOverTime", this.duration);
},
     // 当前播放时间位置
    timeupdate() {
      // console.log(e);
      // console.log(this.$refs.audioPlayer.currentTime);
      // 节流
      let time = this.$refs.audioPlayer.currentTime;
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      this.$store.commit("updateCurrentTime", time);

      time = Math.floor(time);
      if (time !== lastSecond) {
        // console.log(time);
        lastSecond = time;
        this.currentTime = time;
        // 计算进度条的位置
      this.timeProgress = Math.floor((time / durationNum) * 100);
        console.log(durationNum);
      }
    },
    // 拖动进度条的回调
    changeProgress(e) {
           this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },


    //   getMusicDetailFromMusicList() {
    //   let index = this.musicList.findIndex(
    //     (item) => item.id == this.$store.state.musicId
    //   );
    //   console.log(index);
    //   if (index != -1) {
    //     // 记录当前音乐的index
    //     this.currentMusicIndex = index;
    //     // 将索引传至vuex
    //     this.$store.commit("updateCurrentIndex", index);
    //     this.musicDetail = this.musicList[index];
    //     // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
    //     // this.duration = this.musicList[index].dt;
    //   }
    // },
  },
  watch:{
    //监听vue中的值是否发生变化
    "$store.state.musicId"(id) {
         console.log("vuex中的id发生了变化");
       }
  },
  filters: {
    handleMusicTime,
    }
}
</script>
 
<style>
.flexbotton{
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   height: 70px;
    }
.footbtn{
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
      height: 70px;
}
.footbntleft img{
   width: 50px;
   height: 50px;
   display: block;
   margin: 0 auto;
   border-radius: 5px;
}
.footbntleft{
     display: grid;
    grid-template-columns: 1fr 3fr;
       justify-content: center;
         align-items: center;
  }
  .maxshow{
    width: 200px;
     white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
  }
  .foottiobtn{
    height: 13px;
  }
  .footbtn span{
      padding: 10px;
  }
  .foottiobtn i{
  font-size: 32px;
  color: #313131;
  }
  .footbntcontent{
    text-align: center;
  }
  .foottopbtn{
    padding-bottom: 5px;
  }
  .foottopbtn :nth-child(3) {
    background-color: #E4E7ED;
    border-radius: 50%;
  }
  .el-progress-bar__outer{
    width: 100%;
  }
  .theProgressBar{
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-content: space-between;
  }
  .timeoutin{
    text-align: left;
    padding-left: 8px;
  }
  .timeoutout{
    text-align: right;
    padding-right: 8px;
  }
  .el-progress__text{
    display: none;
  }
  .footbntright{
     display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  .footbntright .right1{
    text-align: right;
    padding-right: 5px;
  }
</style>  