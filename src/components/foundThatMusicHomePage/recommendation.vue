<template>
<div class="recommenindex">
<el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in banners" :key="item.id">
      <h3 class="medium"><img :src="item.imageUrl" alt=""></h3>
    </el-carousel-item>
  </el-carousel>
   <!-- 推荐歌单 -->
   <div class="recommendThePlaylist">
   <div class="recommendThePlaylistheader">推荐歌单 <i class="icon-arrow-right-bold iconfont "></i></div> 
    <div class="recommendedHome" >
        <div class="recommendedItme" >
        <div class="iteminfo" v-for="(items,id) in reslut" :key="id" @click="btnplaylist(items.id)">
          <div><img :src="items.picUrl" alt=""></div>
          <div><span>{{items.name}}</span></div></div>
      
        </div>
    </div>
</div>  
   <!-- 热门播客 -->
   <div class="popularPodcasts">
         <div class="recommendThePlaylistheader">热门播客 <i class="icon-arrow-right-bold iconfont "></i></div> 
         <div class="popularPodcastsItem">
             <div class="popularPodcastsIteminfo" v-for="(item,id) in resluting " :key="id" >
                 <div class="lazyimg" > 
                      <img  v-lazy="item.picUrl" alt="">
                  </div>
                  <div class="lazyright">
                     <div class="lazytitle">{{item.category}}</div>
                     <div class="lazycontent">{{item.playCount}}</div>
                     <div class="lazybotton"><span>{{item.rcmdtext}}</span>
                     <i class="icon-bofang iconfont ">
                         </i><span>{{item.id}}</span>  <!--toFixed -->
                         <i class="icon-shipin iconfont"></i> 
                         <span>0.18</span>
                         </div>
                 </div>
              </div>
         </div>
   </div>
</div>
</template>

<script>
import {djhot,personalized,banner,thePlaylist} from '../../network/app'
export default {
   name:"recomm",
    data() {
    return {
        reslut:[{}],
        banners:[{}],
        resluting:[]
    }
  },
  methods:{
      btnplaylist(id){
          this.$router.push('/home/playlist/'+id);
         this.$store.commit("updatamusicListId", id);
              thePlaylist({id:id}).then(res=>{
          this.$store.commit("updatamusicList",res.data.playlist.tracks);
        })
         
      }
  }, //mounted 
  created(){
          banner({}).then(res=>{
            // console.log(res);
            this.banners=res.data.banners;
            // console.log( this.banners);
          })
             personalized({limit:10}).then(res=>{
            this.reslut=res.data.result;
          })
            djhot({limit:10}).then(res=>{
                  console.log(res.data.djRadios[0].picUrl);
                   console.log(res.data.djRadios[0].dj.nickname);
                     console.log(res.data.djRadios[0].playCount);
             console.log(res.data.djRadios[0].category);
         this.resluting=res.data.djRadios;
          })
  },
}

</script>
<style>
.recommenindex{
  height: 800px;
  overflow-y: scroll;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
    .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .recommendedHome{
      width: 100%;
  }
 .recommendedItme {
     display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
 } 

 .iteminfo img{
    width: 200px;
 }
 .recommendThePlaylistheader{
     color: black;
        font-weight: 850;
        font-size: 18px;
        padding: 20px 20px 10px 0px;
     }
     .popularPodcasts{
       margin-bottom: 100px;
     }
    .popularPodcastsItem{
        display: grid;
        grid-template-columns: 1fr 1fr;
             
    }
    .popularPodcastsItem img{
        width: 150px;
        height: 150px;
    }
    .popularPodcastsIteminfo{
         display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
    }
    .lazyimg{
        border-radius: 5px;
        width: 100px;
        height: 100px;
        overflow: hidden;
        padding: 10px;
    }
    .lazyimg img{
        border-radius: 5px;
        vertical-align: middle;
    }
    .lazytitle,.lazybotton,.lazycontent{
       padding: 0px 10px 10px 0;
    }
    .lazybotton,.lazycontent{
        font-size: 12px;
        color: #ccc;
    }
    .medium img{
      width: 100%;
      height: 100%;
    }
</style>