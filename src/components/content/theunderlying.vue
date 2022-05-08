<template>
  <div class="flexbotton">
     <audio 
     ref="audioPlayer"
        class="theaudio" 
        :src="musicUrl" 
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
      @loadedmetadata="onLoadedmetadata"
      autoplay
      ></audio>
   <div class="footbtn">
     <!-- 左边 -->
     <div class="footbntleft">
        <div @click="$store.commit('updataIssongCard')">
          <img v-if="musicDetail.al==null" src="../../assets/img/test.jpg" alt="">
          <img v-else :src="musicDetail.al.picUrl" alt="">
        </div>
        <div>
           <div class="maxshow" > {{musicDetail.name}}  <i class="icon-xihuan iconfont " v-if="showLove"></i></div> 
           <div class="maxshow" v-if="musicDetail.name!=null"> {{musicDetail.ar[0].name}}</div>
        </div>
     </div>
       <!-- 中间 -->
      <div class="footbntcontent"> 
         <div class="foottopbtn">
           <span @click="playType = playType == 'order' ? 'random' : 'order'"><i class="iconfont icon-xunhuan" v-if="playType=='order'" ></i
          ><i class="iconfont icon-suiji1" v-else></i
        ></span>
        <span><i class="iconfont icon-shangyishou" @click="musicList.length != 0 ? changeMusic('pre') : ''"></i ></span>
        <span @click="musicList.length != 0 ? changePlayState() : ''"> <i class="iconfont icon-zantingtingzhi" v-if="$store.state.stateOfPlay" ></i
        > <i class="iconfont icon-icon_play" v-else></i></span>
        <span> <i class="iconfont icon-xiayishou" @click="musicList.length != 0 ? changeMusic('next') : ''"></i
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
         :disabled="musicList.length == 0"
         ></el-slider>
        <div class="currentTime timeoutin"> {{ duration }} </div>
        </div>
      </div>
        <div id="boot-z">
        <div id="footbntright">
          <div class="right1"> <i class="iconfont icon-yinliang" @click="changeMutedState"></i> </div>
          <div><el-slider v-model=" volume" :show-tooltip="false"  @input="changeVolume" class="vom"></el-slider></div>
          <div > <i class="iconfont icon-bofangliebiao"  @click="ondrawer"></i></div>
        </div>
        </div>
   </div>
   <div class="z-dar">
   <!-- 抽屉 -->
<el-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false"
  close-on-press-escape
  :modal="false"
   width="300"
 >
   <div class="theDrawerindex">
     <div class="DrawertheCurrentBroadcast"> 当前播放</div>
     <div class="Drawernum">总{{ musicList.length}}首</div>
     <div>
        <el-table
    :data="musicList"
    stripe
    style="width: 100%;padding:5px"
    :show-header="false"
    @cell-dblclick="drawerCutSong"
     @row-dblclick="clickRow">
    <el-table-column
      prop="name"
      label=""
      width="200">
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      label=""
      width="150">
    </el-table-column>
    <el-table-column
      prop="dt"
      label=""
         width="150">
    </el-table-column>
  </el-table></div>
   </div>
</el-drawer>
   </div>
   </div>
</template>
<script>
import { handleMusicTime, returnSecond } from '../../plugins/ulits'
import {musicUrl} from '../../network/app'
let lastSecond = 0;
// 总时长的秒数
let durationNum = 0;
// 保存当前音量
let volumeSave = 0;
export default {
  name:"theunderlying",
 
   data(){
    return {
        drawer: false,
      //是否播放
      whetherToPlay:false,
      percentage: 0,
      showLove:false,
      // 音乐总时长
      duration: "00:00",
      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
      // 音量
      volume: 30,
       musicUrl: "",
      musicList: [],
      //音乐的索引
      currentMusicIndex: 0,
        musicDetail: {},
            // 是否静音
      isMuted: false,
      //是否显示遮罩层
      drawer:false,
      //播放模式
       playType: "order",
       //抽屉默认不打开
       hasDrawerOpend:false,
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
    //获取歌曲总时长
    onLoadedmetadata(res) {
  // console.log(res)
  // let timeStamp=res.target.duration/60;
  // this.duration = timeStamp.toFixed(2);
  //  this.$store.commit("updatasongsPlayedOverTime", this.duration);
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
        // console.log(durationNum);
      }
    },
    // 拖动进度条的回调
   changeProgress(e) {
           this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },
      getMusicDetailFromMusicList() {
        //  console.log(this.$store.state.musicList,'我是musiclist qaq');
      let index = this.musicList.findIndex(
        (item) => item.id == this.$store.state.musicId
      );
      console.log(index,'indexindexindex');
      // console.log(index,"得到musicidxxxxxxxxxxxxxxxxxxxx");
      //  console.log(this.$store.state.musicId,'boooooo');
      if (index != -1) {
        // 记录当前音乐的index
        this.currentMusicIndex = index;
        // 将索引传至vuex
        this.$store.commit("updatacurrentMusicIndex", index);
        // console.log( this.currentMusicIndex,'this.currentMusicIndex');
        this.musicDetail = this.musicList[index];
        // 直接从audio标签中的duration属性拿时长会有请求时差问题，所以直接在musicInfo中拿
         this.duration = this.musicList[index].dt;
      }
    },
        // 拖动音量条的回调
    changeVolume(e) {
      // 改变audio的音量
      // input事件 实时触发
      this.$refs.audioPlayer.volume = e / 100;
      if (this.isMuted && e > 0) {
        this.isMuted = false;
      } else if (e == 0 && this.isMuted == false) {
        this.isMuted = true;
      }
    },
        // 点击小喇叭的回调 （切换静音状态）
    changeMutedState() {
      if (this.isMuted) {
        this.volume = volumeSave;
      } else {
        volumeSave = this.volume;
        this.volume = 0;
      }
      console.log(volumeSave, this.isMuted);
      this.isMuted = !this.isMuted;
    },
    //遮罩层显示隐藏
    ondrawer(){
       this.drawer = !this.drawer;
       this.hasDrawerOpend = true;
      this.handleDrawerListDOM(this.currentMusicIndex);
    },
    // 操作drawerList中DOM的函数
    handleDrawerListDOM(currentIndex, lastIndex) {
      // 目前没什么好思路 直接操作原生DOM
      this.$nextTick(() => {
        let tableRows = document
          .querySelector(".flexbotton")
          .querySelectorAll(".el-table__row");
        // // 直接修改dom样式的颜色无效  可能是因为第三方组件 style scoped的原因
        // // 通过引入全局样式解决
        if (tableRows[currentIndex]) {
          tableRows[currentIndex].children[0]
            .querySelector(".cell")
            .classList.add("currentRow");
          tableRows[currentIndex].children[1]
            .querySelector(".cell")
            .classList.add("currentRow");
        }
        if (
          (lastIndex && lastIndex != -1 && tableRows[lastIndex]) ||
          lastIndex == 0
        ) {
          // 将上一首的类名删掉
          tableRows[lastIndex].children[0]
            .querySelector(".cell")
            .classList.remove("currentRow");
          tableRows[lastIndex].children[1]
            .querySelector(".cell")
            .classList.remove("currentRow");
        }
      });
    },
      // 双击抽屉列表中的row的回调
    clickRow(row) {
      // console.log(row.id);
      this.changeMusic("click", row.id);
    },
       //更新musciid后更新musciurl
    // updataurl(ids){
    // musicUrl({id:ids}).then(res=>{
    //   this.$store.commit('updatemusicurl',res.data.data[0].url);
    //  })
    // },
 
    //切歌函数
        // 切歌函数
    changeMusic(type, id) {
      if (type == "click") {
        // 点击抽屉row进行切歌
        this.$store.commit("updatemusicId", id);
        // alert('qiege')
      } else if (type == "pre") {
        let currentMusicIndex = this.currentMusicIndex;
        // console.log(currentMusicIndex,'当前播放的音乐索引');
        // console.log(this.playType,'当前的播放模式');
        let preIndex;
        if (this.playType == "order") {
          preIndex =
            currentMusicIndex - 1 < 0
              ? this.musicList.length - 1
              : currentMusicIndex - 1;
          //   console.log(this.playType,'当前的播放模式');
          // console.log(preIndex,'当前播放的音乐索引');
          // console.log( this.musicList[preIndex].id,'kkkk');
            // this.$store.commit("updatacurrentMusicIndex", preIndex);
        } else if (this.playType == "random") {
          if (this.musicList.length == 1) {
            preIndex = currentMusicIndex;
          } else {
            // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
            preIndex = currentMusicIndex;
            while (preIndex == currentMusicIndex) {
              preIndex = Math.floor(Math.random() * this.musicList.length);
            }
          }
        }
        console.log(this.musicList[preIndex].id);
        this.$store.commit("updatemusicId", this.musicList[preIndex].id);
      } else if (type == "next") {
        let currentMusicIndex = this.currentMusicIndex;
        let nextIndex;
        if (this.playType == "order") {
          nextIndex =
            currentMusicIndex + 1 == this.musicList.length
              ? 0
              : currentMusicIndex + 1;
        } else if (this.playType == "random") {
          if (this.musicList.length == 1) {
            nextIndex = currentMusicIndex;
          } else {
            // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
            nextIndex = currentMusicIndex;
            while (nextIndex == currentMusicIndex) {
              nextIndex = Math.floor(Math.random() * this.musicList.length);
            }
          }
        }
        // console.log(this.musicList[nextIndex].id);
        console.log(nextIndex,"nextIndex");
        this.$store.commit("updatemusicId", this.musicList[nextIndex].id);
      }
    },
    //抽屉切歌
    drawerCutSong(row){
    
    },
    //请求歌曲url
    getMusicUrl(id){
      musicUrl({id:id}).then(res=>{
        //更新播放状态
      //  this.$store.commit("changePlayState", true);
         // 判断是否能播放此歌曲
         if (res.data.data[0].url == null) {
         this.$message.error("该歌曲暂无版权，将为您播放下一首歌曲");
         this.changeMusic("next");
        return;
        }
      this.musicUrl = res.data.data[0].url;
      //  console.log( this.musicUrl,'得到的url');
      this.$store.commit("updatemusicurl", this.musicUrl);
      this.showLove=true;
      })
    }
  },
  watch:{
    //监听vue中的值是否发生变化
    "$store.state.musicId"(id) {
         console.log("vuex中的id发生了变化");
        this.musicList = this.$store.state.musicList;
           //暂停播放
         this.pauseMusic();
        this.$store.commit("changePlayState", false);
            this.getMusicUrl(this.$store.state.musicId);
          this.getMusicDetailFromMusicList();
     
      

       durationNum = returnSecond(this.duration);
      //  console.log(id,'我是监听变化的8');
      //  console.log(this.duration,'111');
       },
           // 监听播放状态
    "$store.state.stateOfPlay"(isPlay) {
      if (isPlay) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    },
      "$store.state.currentIndex"(currentIndex, lastIndex) {
      if (this.hasDrawerOpend) {
        this.handleDrawerListDOM(currentIndex, lastIndex);
      }
    },
  },
  filters: {
    handleMusicTime,
    },
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
   z-index: 1;
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
  #footbntright{
     display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    z-index: 100;
  }
  #footbntright .right1{
    text-align: right;
    padding-right: 5px;
  }
  .el-tooltip{
    width: 10px;
    height: 10px;
  }
  .el-slider__runway{
    margin: 2px 0;
  }
  .right1 .icon-yinliang{
    font-size: 24px;
  }
  .vom{
    width: 150px;
  }
  .icon-bofangliebiao{
    font-size: 24px;
  }
  #boot-z{
    z-index: 3000;
  }
  .indexflooter{
    z-index: 9999;
    }
    .theDrawerindex{
      margin-top: 65px;
    }
  .DrawertheCurrentBroadcast{
    font-family:"Microsoft YaHei";
    font-size: 24px;
    font-weight: 500;
    padding: 10px;
  }
  .Drawernum{
    color: #C0C4CC;
    font-size: 14px;
    padding: 10px 10px 2px 13px;
  }
 .el-table__row .cell{
  text-align: left;
  /* max-width: 300; */
  overflow: hidden;
  white-space: nowrap;  /* 设置文字在一行显示不能换行） */
  text-overflow: ellipsis; /* （规定当文本溢出时显示省略符号来代表被修剪的文本）*/
}
</style>  