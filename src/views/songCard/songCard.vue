<template>
 
        <transition name="el-zoom-in-bottom">
          <div>
        <div class="songCard transition-box" v-if="$store.state.IssongCard&&$store.state.musicId!=''"
        :class="fadeOut?'songCardson':''" 
        >
          <!-- 关闭按钮 -->
           <div class="closeButton"   @click="adds">
       <i class="iconfont icon-arrow-down-bold"></i>
      </div>
       <!-- 中间内容 -->
      <div class="songContent">
        <!-- 播放唱片 -->
       <div class="theRecord">
        <div class="theRecordimg">
          <div class="theRecordimgtop" :class="!$store.state.stateOfPlay?'theRecordimgtophover':''">
             <img src="../../assets/img/MusicDetailCard/needle.png" alt="">
          </div>
          <div class="theRecordimgbottom" :class="$store.state.stateOfPlay?'rotedeg':''">
            <img src="../../assets/img/MusicDetailCard/disc.png" alt="">
            <img :src="musicInfo.al.picUrl" alt="">
          </div>
         
        </div>
       </div>
       <!-- 歌词 -->
       <div class="songing">
         <div class="songingTitle">
           <div class="nametit"> {{musicInfo.name}}</div>
           <div class="albumname"> {{musicInfo.al.name }} </div>
           <div class="singername"> {{musicInfo.ar[0].name}} </div>
         </div>
         <!-- 歌词盒子位置 -->
         <div class="theLyrics">
          <div class="placeholder"></div>
           <div
           class="lyricsItem"
      :class="lyricsIndex - 1 == index ? 'currentLyric' : ''"
      v-for="(item, index) in lyric"
      :key="index"
    >
      {{ item[1] }}
    </div>
            <div class="placeholder"></div>
         </div>
       </div>
      </div>
      <!-- 评论 -->
      <div class="bottomCard">
      <commenting
      :comments="hotComments"
      :commentType="'musi'"
      :commentId="'$store.state.musicId'"
      :musicTitle="musicInfo.name"
      :isHotComment="true"
      :displaysCommentBox="false"
      >
      <div slot="commntsTitle">热门评论</div>
      </commenting>
         <commenting
      :comments="comment.comments"
      :commentType="'music'"
      :commentId="'$store.state.musicId'"
      :musicTitle="musicInfo.name"
      :isHotComment="false"
      :displaysCommentBox="false"
      >
      <div slot="commntsTitle">最新评论({{ comment.total }})</div>
      </commenting>
      </div>
         </div>
         <div  class="nomusicfather" v-if="$store.state.IssongCard&&$store.state.musicId==''">
                 <div class="BBT"   @click="adds">
                 <i class="iconfont icon-arrow-down-bold"></i>
                  </div>
                   <div class="nomusic">暂播放无音乐</div>
         </div>
         </div>
        </transition>
      
  
    
 
</template>

<script>
import commenting from '../../components/common/comment/commenting.vue'
import {lyric,commenhot,commenmusic} from '../../network/app'
let placeholderHeight = 0;
export default {
  name:'songCard',
  data() {
      return {
        //显示歌词卡片
        fadeOut:false,
        //歌词数据
        lyric:[[0, "正在加载歌词"]],
        //歌曲信息
        musicInfo:[],
      // 评论数据
      comment: {},
      // 热门评论
      hotComments: [],
        // 当前歌词索引
      lyricsIndex: 0,
      };
    },
    methods: {
      adds(){
        this.fadeOut=!this.fadeOut;
        setTimeout(() => {
          this.$store.commit('updataIssongCard');
           this.fadeOut=!this.fadeOut;
        }, 500);
      },
        //获取歌词
     getlyric(id)
        {
       lyric({id:id}).then(res=>{
       let lyrics = res.data.lrc.lyric;
      // 对获取到的歌词进行处理
      let arr = lyrics.split("\n");
      let array = [];
      // let obj = {};
      let time = "";
      let value = "";
      let result = [];

      //去除空行
      arr.forEach((item) => {
        if (item != "") {
          array.push(item);
        }
       })
          arr = array;
        arr.forEach((item) => {
          time = item.split("]")[0];
          value = item.split("]")[1];
          //去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(":");
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });

        this.lyric = result;
        // console.log( this.lyricName);
         })
        },
    //获取热门评论
   getcommenhot(id){
     commenhot({id:id,type:0}).then(res=>{
       this.hotComments = res.data.hotComments;
     })
   },
   //获取歌曲全部评论
   getcommenmusic(id){
      commenmusic({id:id}).then(res=>{
          this.comment = res.data;
         
     })
   },
       // 实现歌词滚动
    lyricScroll(currentLyric) {
      // 获取歌词item
      let lyricsArr = document.querySelectorAll(".lyricsItem");
      // 获取歌词框
      let lyrics = document.querySelector(".theLyrics");
      // placeholder的高度
      if (placeholderHeight == 0) {
        placeholderHeight = lyricsArr[0].offsetTop - lyrics.offsetTop;
      }
    
        //歌词item在歌词框的高度 = 歌词框的offsetTop - 歌词item的offsetTop
        console.log(currentLyric);
      if (lyricsArr[currentLyric - 1]) {
        let distance = lyricsArr[currentLyric - 1].offsetTop - lyrics.offsetTop;
        //   lyricsArr[currentLyric].scrollIntoView();
        lyrics.scrollTo({
          behavior: "smooth",
          top: distance - placeholderHeight,
        });
      }
    },
   // 获取当前歌词索引
    getCurrentLyricsIndex(currentTime) {
      let lyricsIndex = 0;
      this.lyric.some((item) => {
        if (lyricsIndex < this.lyric.length - 1) {
          if (currentTime > item[0]) {
            lyricsIndex += 1;
          }
          return currentTime <= item[0];
        }
      });
      // console.log(lyricsIndex);
      this.lyricsIndex = lyricsIndex;
    },
    },
    components:{
      commenting
    },
 watch:{
"$store.state.musicId"(current, last) {
  this.getlyric(this.$store.state.musicId);
    this.getcommenhot(this.$store.state.musicId);
  this.getcommenmusic(this.$store.state.musicId);
  this.musicInfo= this.$store.state.musicList[this.$store.state.currentIndex];
  this.lyricsIndex = 0;
},
 // 监听当前播放时间
    "$store.state.currentTime"(currentTime, lastTime) {
      // 如果两个时间间隔有1秒,则可得知进度条被拖动 需要重新校准歌词index
      // 当歌词数量大于1并且索引为零时,可能歌词位置差距较大,走这个if进行快速跳转
      if (
        (lastTime && Math.abs(currentTime - lastTime) >= 1) ||
        (this.lyricsIndex == 0 && this.lyric.length > 1)
      ) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.lyric.length > 1) {
          this.getCurrentLyricsIndex(currentTime);
          // 滑动到当前歌词
          this.lyricScroll(this.lyricsIndex);
        }
      }
      // 根据实时播放时间实现歌词滚动
      if (this.lyricsIndex < this.lyric.length) {
        if (currentTime >= this.lyric[this.lyricsIndex][0]) {
          this.lyricsIndex += 1;
          this.lyricScroll(this.lyricsIndex);
        }
      }
    },
    lyric(current) {
      console.log("获取了歌词");
      // 大于一秒，说明歌词在1秒后才请求成功 歌词可能不能马上跳转到当前时间 这里进行校准
      if (this.$store.state.currentTime > 1) {
        // 处理播放时间跳转时歌词位置的校准
        if (this.lyric.length > 1) {
          this.getCurrentLyricsIndex(this.$store.state.currentTime);
          this.$nextTick(() => {
            // 滑动到当前歌词
            this.lyricScroll(this.lyricsIndex);
          });
        }
      }
    },
 }
}

</script>
<style scoped>
@keyframes fadeOut{
  0%{
    transform: translateY(100px);
  }
  20%{
       transform: translateY(200px);
  }
  40%{
       transform: translateY(300px);
  }
 60%{
       transform: translateY(400px);
  }
 80%{
       transform: translateY(500px);
  }
 100%{
       transform: translateY(600px);
  }
}
@keyframes rotating{
   0%{
    transform:rotate(0deg)
  }
  10%{
       transform:rotate(20deg)
  }
  20%{
      transform:rotate(40deg)
  }
 30%{
       transform:rotate(60deg)
  }
 40%{
       transform:rotate(80deg)
  }
 50%{
      transform:rotate(100deg)
  }
   60%{
    transform:rotate(120deg)
  }
  70%{
       transform:rotate(140deg)
  }
  80%{
      transform:rotate(160deg)
  }
 90%{
       transform:rotate(180deg)
  }
 100%{
       transform:rotate(180deg)
  }
}
.songCardson{
  animation: fadeOut 0.5s linear .1s 1 alternate;
}
 .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 600px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 20px 20px;
    box-sizing: border-box;
    background-color: white;
    background-image: linear-gradient(to bottom, #e3e2e3, white);
  }  .closeButton{
    text-align: left;
    }
 .closeButton i{
  font-size: 25px !important;
  color: #000;
  }
  .songContent{
    display: flex;
    justify-content: center;
  }
  .theRecord{
    display: flex;
    width: 300px;
    margin-top: 50px;
  }
  .theRecordimg{
    width: 100%;
  }
  .theRecordimg img{
    width: 300px;   
  }
  .theRecordimgtop{
 position: relative;
    left: 50%;
    width: 88px;
    height: 44px;
   transition: all 0.7s;
    transform-origin: 5.3px 5.3px;
    z-index: 1;
    transform: rotate(11deg);
  }
   .theRecordimgtophover{
    transform: rotate(-30deg);
   }
  .theRecordimgtop img{
    width: 100px;
  }
  .theRecordimgbottom{
    position: relative;
  }
  .theRecordimgbottom img:nth-child(2){
    position: absolute;
    top: 48px;
    left: 48px;
    width: 206px;
    height: 205px;
    border-radius: 50%;
    z-index: 0;
  }
</style>
<style scoped>
.songing{
 width: 350px
}
.songingTitle{
     width: 100%;
    text-align: center;
    font-size: 12px;
    margin: 30px 0 15px;
    color: #919191;
}
.songingTitle div{
  margin: 7px 0px;
}
.nametit{
      font-size: 23px;
    color: #161616;
}
.albumname,.singername{
  font-size: 14px;
}
.theLyrics::-webkit-scrollbar {
  display: none; 
}
.theLyrics{
  width: 100%;
    height: 275px;
    font-size: 12px;
    text-align: center;
    overflow-y: scroll;
   color: #000;
}
  .theLyrics .placeholder{
    width: 100%;
    height: 40%;
  }
 .theLyrics .placeholder .lyricsItem{
    font-size: 12px;
    /* height: 20px; */
    margin: 25px 20px;
    transition: all 0.5s;
    line-height: 20px;
  }
  .bottomCard{
    margin: 40px auto;
    width: 44vw;
  }
  .currentLyric {
  font-weight: 600;
  font-size: 19px;
  color: black;
}
.lyricsItem{
  font-size: 16px;
  padding: 10px;
}
.rotedeg{
    animation: rotating 30s linear .1s infinite alternate;
}
.nomusic{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 24px;
   
}
.nomusicfather{
 background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
   height: 100vh;
} 
.BBT{
  text-align: left;
  padding: 20px 20px;
}
.BBT i{
  font-size: 24px;
}
</style>