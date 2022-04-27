<template>
   <div class="bouts">
    <div class="recommendedHome" >
        <div class="boutitme" >
        <div class="iteminfo" v-for="(globalPlaylistitem,id) in globalPlaylist" 
        :key="id"><img v-lazy="globalPlaylistitem.coverImgUrl" alt="">
        <span>{{globalPlaylistitem.name}}</span></div>
        </div>
    </div>
</div>  
</template>

<script>
import {toplistall} from '../../network/app'
export default {
  name:"globalPlaylist",
  data(){
      return{
    //接收精品歌单
   globalPlaylist:[],
    // sss:$store.state.loginuser
      }
  },
  created(){
       toplistall().then(res=>{
            this.globalPlaylist=res.data.list;
       })
  },
}
</script>

<style>
.bouts{
      width: 100%;
      margin-top:20px;
  }
 .boutitme {
     display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
 } 

 .iteminfo img{
    width: 220px;
    border-radius: 10px;
 }
</style>