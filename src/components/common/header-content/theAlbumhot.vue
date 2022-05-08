<template>
  <div>
      <div class="singersea">
    <div class="singerseainfo" v-for="(singla,index) in singeralnlist" :key="index" @click="singerinfok(singla.id)">
      <div class="singerseainfoitme"><img :src="singla.picUrl" alt=""></div>
      <div>{{singla.name}}</div>
  </div>
    </div>
  </div>
</template>

<script>
import {cloudsearch,searchcloudsearch,musicUrl} from '../../../network/app'
export default {
 name:'theAlbumhot',
  data(){
   return{
     singeralnlist:[],

   }
 }, 
  methods:{
  singerinfok(id){
    this.$router.push('/home/albumList/albumListson/'+id);
}
 },
 created(){
   cloudsearch({keywords:this.$store.state.theQuery,type:10}).then(res=>{
         this.singeralnlist=res.data.result.albums;
   })
 }
}

</script>
<style scoped>
.singersea{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 20px;
  align-items: center;
  align-content: center;
   gap: 2px;
}
.singerseainfoitme img{
  width: 220px;
  height: 220px;
  border-radius: 10px;
}
</style>