<template>
  <div>
      <div class="videoclassification">
           <el-popover
  placement="bottom-start"
  width="600"
  trigger="click">
  <div class="classificationBounced">
     <div class="allvideo ">
         <div class=" allvideoson " 
         :class="$store.state.videocategroy==allvideos.id?'activevideo':''"
         @click="allvideosons"
         >全部视频</div>
     </div>
     <div class="alltypeing">
         <div class="alltypeingson" v-for="(videocategory,index) in videoCategory"
          :key="index"
          @click="videocategorykey(videocategory.id,videocategory.name)"
          :class="$store.state.videocategroy==videocategory.id?'activevideo':''">{{videocategory.name}}</div>
     </div>
  </div>
  <div class="textVideo" slot="reference" @click="allvideoclick"> {{categoryname}} <i class="icon-arrow-right-bold iconfont "></i></div>
  </el-popover>
         <div class="multipleColumns">
               <div v-for="(videoinfo,index) in videoclass" :key="index" class="multipleColumnsinfo" 
                 :class="$store.state.videocategroy==videoinfo.id?'activevideo':''"
                 @click="categorylist(videoinfo.id,videoinfo.name)"
               >{{videoinfo.name}}</div>
         </div>
          </div>
             <!-- 视频页 -->
   <div class="reallyVideo">
     <div class="reallyVideoitem" v-for="(videoskr,index) in videoList" :key="index"
     v-infinite-scroll="getvideo"
     @click="theVideoDetails(videoskr.data.vid)">
         <div>
         <div><img :src="videoskr.data.coverUrl" alt=""></div>
          <div class="max-widthtxt">{{videoskr.data.title}}</div>
          </div>
     </div>

   </div>
  </div>
</template>

<script>
import {videocategory,videogroup,videocategorylist} from '../../network/app'
export default {
 name:'video',
 data(){
     return{
         videoclass:['现场','翻唱','舞蹈','听BGM','MV','生活','游戏','ACG音乐','最佳饭制'],
          visible: false,
        // 视频分类
      videoCategory: [],
      allvideos:[{id:10086,name:'全部视频'}],
      categoryname:'现场',
      videoList:[],
      offset:8,
          // 是否还有更多视频数据
      hasMore: true,
       // 当前视频页数
      videoPage: 1,
     }
 },
 methods:{
     allvideoclick(){
          //点击获取视频分类
         videocategory({}).then(res=>{
          this.videoCategory=res.data.data;
         });
         this.getvideo();
     },
      //点击切换分类
     videocategorykey(id,name){
         this.categoryname=name;
     this.$store.commit('updatavideocategroy',id);
     this.getvideo();
     },
      //点击切换分类
     categorylist(id,name){
          this.categoryname=name;
      this.$store.commit('updatavideocategroy',id);
      this.getvideo();
     },
     //点击切换分类
     allvideosons(){
          this.categoryname=this.allvideos.name;
          this.$store.commit('updatavideocategroy',this.allvideos.id);
          this.getvideo();
     },
     //获取视频数据信息
     getvideo()
         {
            videogroup({id:this.$store.state.videocategroy}).then(res=>{
                  this.videoList=res.data.datas;
                  this.hasMore = res.data.hasmore; 
           })
 
         },
    theVideoDetails(id){
       this.$store.commit('videotype','video');
          this.$router.push('/home/videodetail/'+id)
         }
 },
 created(){
     //获取视频分类
   videocategorylist({}).then(res=>{
       this.videoclass=res.data.data
   });
   //获取视频
   this.getvideo();
 }
}

</script>
<style>
.classificationBounced{
    height: 450px;
    overflow: hidden;
    overflow-y: scroll;
}
.videoclassification{
    display: flex;
    align-items: center;
     margin-top: 20px;
     gap: 24px;
    justify-content: space-between;
}
.textVideo{
  width: 100px;
  padding: 5px 5px 5px 10px;
  border-radius: 30px;
  border: 1px solid #ccc;
  text-align: center;
}
.multipleColumns{
display: flex;
align-items: center;
justify-content: space-between;
  gap: 24px;
}
.multipleColumnsinfo{
    padding: 5px 10px 5px 10px;
    }
.allvideo{
  border-bottom: 1px solid #ccc;
  /* box-sizing: border-box; */
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 5px;
}
.allvideoson{
   width: 100px;
   padding: 5px;
   text-align: center;
}
.activevideo{
    border-radius: 20px;
  background-color: #fdf5f5;
    color: #ec4747;
}
.alltypeing{
    display: flex;
    justify-content: center;
    padding: 10px;
    align-content: center;
    flex-wrap: wrap;
}
.alltypeingson{
    width: 15%;
    text-align: center;
    padding: 10px;
}
.reallyVideo{
width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: center;
    margin-top: 20px;
}
.reallyVideoitem{
     display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px;
}
.reallyVideoitem img{
   width: 17.3vw;
    border-radius: 15px;
}
.max-widthtxt{
    max-width: 17.3vw;
    overflow: hidden;
}
</style>