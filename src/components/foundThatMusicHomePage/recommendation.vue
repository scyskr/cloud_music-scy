<template>
<div>
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
        <div class="iteminfo" v-for="(items,id) in reslut" :key="id" @click="btnplaylist(items.id)"><img :src="items.coverImgUrl" alt=""><span>{{items.name}}</span></div>
        </div>
    </div>
</div>  
   <!-- 热门播客 -->
   <div class="popularPodcasts">
         <div class="recommendThePlaylistheader">热门播客 <i class="icon-arrow-right-bold iconfont "></i></div> 
         <div class="popularPodcastsItem">
             <div class="popularPodcastsIteminfo" v-for="(item,id) in reslut " :key="id" >
                 <div class="lazyimg" > 
                      <img  v-lazy="item.coverImgUrl" alt="">
                  </div>
                  <div class="lazyright">
                     <div class="lazytitle">{{item.name}}</div>
                     <div class="lazycontent">{{item.alg}}</div>
                     <div class="lazybotton"><span>一直好听的歌</span>
                     <i class="icon-bofang iconfont ">
                         </i><span>{{item.commentCount}}</span>  <!--toFixed -->
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
import {api,app,banner} from '../../network/app'
export default {
   name:"recomm",
    data() {
    return {
        reslut:[{}],
        banners:[{}]
    }
  },
  methods:{
      btnplaylist(id){
          this.$router.push('/home/playlist/'+id);
         this.$store.commit("updatamusicListId", id);
         
      }
  }, //mounted 
  created(){
      //  app({type:7}).then(res=>{
      //       console.log(res.data);
      //       this.reslut=res.data
      //       console.log(this.reslut.data[0].name);
      //     })
          api({limit:10}).then(res=>{
          //  console.log(res.data);
            const reslutdata=res.data;
            this.reslut=reslutdata.playlists;
            //  console.log(reslutdata.playlists[0].coverImgUrl);
            // console.log(reslutdata.playlists[0].name);
            // console.log(this.reslut);
          })
          banner({}).then(res=>{
            // console.log(res);
            this.banners=res.data.banners;
            // console.log( this.banners);
          })
  },
}

</script>
<style>
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
    width: 220px;
 }
 .recommendThePlaylistheader{
     color: black;
        font-weight: 850;
        font-size: 18px;
        padding: 20px 20px 10px 0px;
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