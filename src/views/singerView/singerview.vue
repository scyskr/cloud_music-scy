<template>
  <div class="singerHomePage">
     <div class="singertop">
         <div class="singerimg">
             <img :src="singerAlbum.artist.picUrl" alt="">
             </div>
         <div class="singertop-rigth">
              <div class="singername">{{singerAlbum.artist.name}}</div>
              <div class="englishname">{{singerAlbum.hotAlbums[0].artist.alias[0]}}</div>
               <div class="collection"><i class="iconfont  icon-gedan"></i> 收藏</div>
               <div class="singnum">
                   <div>单曲数:{{singerAlbum.artist.musicSize}}</div>
                   <div>专辑数:{{singerAlbum.artist.albumSize}}</div>
                   <div>MV数:388</div>
               </div>
         </div>
     </div>
     <div class="singerNav">
         <div v-for="SNav in singNavData" :key="SNav.name"
         @click="singerNavkiss(SNav.path)"
         :class="SNav.path==$route.path?'singeractivnav':''"
         >
             {{SNav.name}}
         </div>
     </div>
     <keep-alive>
         <router-view></router-view>
     </keep-alive>
  </div>
</template>

<script>
import {singerAlbum} from '../../network/app'
export default {
name:"singerView",
data(){
    return{
        singNavData:[
            {name:'专辑',path:'/home/singerView/singerab/'+this.$store.state.singerId},
            {name:'MV',path:'/home/singerView/singMV'},
            // {name:'相似歌手',path:'/home/singerView/singerdetails'},
            {name:'歌手详情',path:'/home/singerView/similarToSinger'}
            ],
        singerAlbum:[],
    }
},
created(){
       singerAlbum({id:this.$store.state.singerId}).then(res=>{
        this.singerAlbum=res.data;
        // this.$store.commit('updatasingerAlbum',res.data.hotAlbums);
   })
},
methods:{
    singerNavkiss(path){
   this.$router.push(path);
    }
},
}

</script>
<style scopend>
.singertop{
 display: grid;
 grid-template-columns: 1fr 4fr;
 padding-bottom: 20px;
}
.singertop .singerimg img{
    width: 220px;
    height: 210px;
    border-radius: 10px;
}
.singername{
    font-size: 24px;
    font-weight: 600;
}
.singertop-rigth .collection{
    padding: 8px 15px;
    border:1px solid #dee0e6;
    width: 66px;
    border-radius: 20px;
    
}
.singnum{
    display: flex;
    gap: 24px;
    padding: 10px 10px 10px 0;
}
.singerNav{
    display: flex;
    gap: 24px;
    align-content: center;
    align-items: center;
}
.singeractivnav{
    font-size: 18px;
    border-bottom:2px solid red;
}
.englishname{
    padding: 10px 10px 10px 0px;
}
</style>