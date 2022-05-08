<template>
  <div class="videoDetailskr ">
      <div class="leftvideo">
           <div class="returnvideo"> {{$store.state.videotype=='mv'?'MV详情':'相关推荐'}} </div>
            <video 
            :src="videoUrl"
            controls="controls"
          width="496px"
          height="284px"
          :poster="$store.state.videotype=='mv'? videoInfo.cover : videoInfo.coverUrl"></video>
          <div class="videoInfo">
              <div class="usename">
                  <div class="avatar"><img :src=" ($store.state.videotype == 'mv'
                  ? videoInfo.artists[0].img1v1Url
                  : videoInfo.avatarUrl) + '?param=100y100'" alt=""></div>
                  <div class="username">  {{
              $store.state.videotype == "mv"
                ? videoInfo.artists[0].name
                : videoInfo.creator.nickname
            }} </div>
              </div>
              <div class="videoTitles">  {{ $store.state.videotype== "mv" ? videoInfo.name : videoInfo.title }} </div>
              <div class="otherInfo">
                  <div> 发布：{{
            $store.state.videotype == "mv"
                ? videoInfo.publishTime
                : videoInfo.publishTime | showDate
            }}    </div>
                  <div> 播放：{{
              ( $store.state.videotype== "mv"
                ? videoInfo.playCount
                : videoInfo.playTime) | handleNum
            }} </div>
              </div>
              <div class="buttonsvideo">
                  <div class="buttonItem"><i class="iconfont icon-good"></i>赞</div>
                  <div class="buttonItem"><i class="iconfont icon-xihuan"></i>收藏</div>
                  <div class="buttonItem"><i class="iconfont icon-zhuanfa"></i>分享</div>
              </div>
              <div>
                  <div class="title commentTitle">评论</div>
                   <commenting
                   :comments="comments.hotComments"
                   :commentId="'$route.params.id'"
                   :commentType="'music'"
                   :displaysCommentBox="true"
                   :isHotComment="comments.hotComments ? false : true"
                   :musicTitle="'sb'"
                   >
                   <div slot="commntsTitle">最新评论</div>
                   </commenting>
              </div>
          </div>
      </div>
      <div class="rightvideo">
          <div class="titlevideo">相关推荐</div>
          <div class="relatedVideoItem"  v-for="(item, index) in relatedVideo"
        :key="index"
        @click="relatedToRecommend(item.vid)">
              <div class="relatedVideoItemCover">
                  <img :src="item.coverUrl + '?param=300y180'" alt="">
                  <div class="relatedVideoItemPlayCount">
                      <i class="iconfont icon-shipin"></i>  {{ item.playTime | handleNum }}
                  </div>
                  <div class="relatedVideoItemTime">   {{ item.durationms | handleMusicTime }}</div>
              </div>
              <div class="relatedVideoItemInfo">
                  <div class="relatedVideoItemTitle">{{ item.title }}</div>
                  <div class="creator">by {{ item.creator[0].userName }}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { handleNum, handleMusicTime, formatDate } from "../../plugins/ulits";
import commenting from '../../components/common/comment/commenting.vue'
import {videodetail,videourl,videocomment,allvideo,mvdetail,mvurl,commentmv} from '../../network/app'
export default {
 name:'videodetail',
 data(){
     return{
         videoInfo:[],
         videoUrl:[],
         comments:[],
           // 相关视频数据
      relatedVideo: [],

     }
 },
 methods:{
     //获取mv详情
     getmvdetail(){
 mvdetail({mvid:this.$route.params.id}).then(res=>{
         this.videoInfo=res.data.data;
     })
     },
         //获取mvurl
     getmvurl(){
 mvurl({id:this.$route.params.id}).then(res=>{
         this.videoUrl = res.data.data.url;
     })
     },
              //获取mv评论
     getcommentmv(){
           var timestamp = Date.parse(new Date());
      commentmv({id:this.$route.params.id,timestamp}).then(res=>{
         this.comments = res.data;
     })
     },
     //获取视频详情
   getvideodetail(){
         videodetail({id:this.$route.params.id}).then(res=>{
         this.videoInfo=res.data.data;
     })
   },
   //获取视频播放地址
     getvideourl(){
         videourl({id:this.$route.params.id}).then(res=>{
          this.videoUrl=res.data.urls[0].url;
     })
   },
   //获取视频url
      getvideocomment(){
         videocomment({id:this.$route.params.id}).then(res=>{
          this.comments=res.data;
     })
   },
   //获取相关视频
   getallvideo(){
     allvideo({id:this.$route.params.id}).then(res=>{
          this.relatedVideo=res.data.data;
     })
   },
   relatedToRecommend(id){
    console.log(id,'id');
    console.log(this.$route.params.id);
     this.$route.params.id=id;
         this.$store.commit('videotype','video');
              if(this.$store.state.videotype!='mv'){
         this.getvideodetail();
      this.getvideourl();
       this.getvideocomment();
     }
       if(this.$store.state.videotype=="mv"){
      this.getmvdetail();
      this.getmvurl();
       this.getcommentmv();
       }
  
      this.getallvideo();
       this.$router.push('/home/videodetail/'+id);
       
   }
 },
 created(){
     if(this.$store.state.videotype!='mv'){
         this.getvideodetail();
      this.getvideourl();
       this.getvideocomment();
     }
       if(this.$store.state.videotype=="mv"){
      this.getmvdetail();
      this.getmvurl();
       this.getcommentmv();
       }
  
      this.getallvideo();
 },
 components:{
     commenting
     },
      filters: {
    handleNum,
    handleMusicTime,
    showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
     watch: { 
        // 监听路由变化，路由变化的时候请求页面数据
// $route(to,from){
//     console.log(to.path);
//     console.log(from);
//   }
     }
  },
}
</script>
<style scoped>
.rightvideo{
    margin-left: 20px;
}
.titlevideo{
        margin: 10px 0;
    color: black;
    font-weight: 600
}
.relatedVideoItem{
    display: flex;
    margin-bottom: 5px;
    cursor: pointer
}
.relatedVideoItemCover{
        position: relative;
    margin-right: 10px
}  
.relatedVideoItemCover img{
 width: 150px;
    height: 90px;
    border-radius: 10px;
}
.relatedVideoItemPlayCount{
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 12px;
    color: white;
    transform: scale(0.9);
} 
.relatedVideoItemTime{
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 12px;
    color: white;
    transform: scale(0.9);
}
.relatedVideoItemInfo{
font-size: 12px;
    color: rgb(31, 30, 30);
    margin: 12px 0;
    width: 140px;
}
.relatedVideoItemTitle{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.creator{
    color: rgb(156, 156, 156);
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: scale(0.9) translateX(-5%);
}
</style>
<style scoped>
.videoDetailskr{
     display: flex;
    justify-content: center;
    height: calc(80vh - 105px);
    overflow-y: scroll;
}
.returnvideo{
    margin: 10px 0;
    color: black;
    font-weight: 600;
}
.leftvideo{
    width: 500px;
    }
    .usename{
       display: flex;
    margin: 10px 0;
    align-items: center;
    }
    .avatar{
width: 40px;
    height: 40px;
    }
.avatar img{
        width: 100%;
    border-radius: 50%;
    cursor: pointer;
}
.username{
        font-size: 12px;
    margin-left: 10px;
    color: rgb(36, 36, 36);
    cursor: pointer;
}
.videoTitles{
    color: #1b1b1b;
    font-size: 20px;
    margin: 20px 0 10px;
    font-weight: bold;
}
.otherInfo{
        display: flex;
    color: #aaa;
    font-size: 12px;
    text-align: center;
}
.buttonsvideo{
    display: flex;
    font-size: 12px;
    margin: 20px 0;
    color: #252525;
    align-items: center;
}
.buttonsvideo i{
vertical-align: middle;
margin-right: 3px;
}
.buttonItem{
        padding: 5px 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 10px;
}
.title{
    margin: 10px 0;
    color: black;
    font-weight: 600;
}
</style>