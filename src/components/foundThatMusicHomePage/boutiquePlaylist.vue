<template>
   <div class="bouts">
    <div class="recommendedHome" >
        <div class="boutitme" >
        <div class="iteminfo" v-for="(itembou,id) in boutiquePlaylist" 
        :key="id" @click="recommendedHometui(itembou.id)"><img v-lazy="itembou.coverImgUrl" alt="">
        <span>{{itembou.name}}</span></div>
        </div>
    </div>
</div>  
</template>

<script>
import {boutiquePlaylist} from '../../network/app'
export default {
  name:"boutique",
  props:['name',"currpage"],  
  data(){
      return{
    //接收精品歌单
    boutiquePlaylist:[],
    // sss:$store.state.loginuser
      }
  },
  methods:{
 recommendedHometui(id){
 
      this.$router.push("/home/playlist/"+id);
 }
  },
  created(){
         boutiquePlaylist({cat:this.name,limit:50}).then(res=>{
          this.boutiquePlaylist=res.data.playlists;
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