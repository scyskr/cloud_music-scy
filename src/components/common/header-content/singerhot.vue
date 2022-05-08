<template>
  <div class="singersea">
    <div class="singerseainfo" v-for="(singerhot,index) in singerhotlist" :key="index" @click="singerinfok(singerhot.id)">
      <div class="singerseainfoitme"><img :src="singerhot.picUrl" alt=""></div>
      <div>{{singerhot.name}}</div>
  </div>
    </div>
</template>

<script>
import {cloudsearch,searchcloudsearch,musicUrl} from '../../../network/app'
export default {
 name:'singerhot',
 data(){
   return{
     singerhotlist:[],

   }
 },
 methods:{
singerinfok(id){
   this.$store.commit('updatasingerId',id);
    this.$router.push('/home/singerView/singerab/'+id);
}
 },
 created(){
   cloudsearch({keywords:this.$store.state.theQuery,type:100}).then(res=>{
         this.singerhotlist=res.data.result.artists;
   })
 }
}

</script>
<style>
.singersea{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 20px;
   align-items: center;
  align-content: center;
  justify-items:center;
  gap: 2px;
}
.singerseainfoitme img{
  width: 210px;
  height: 210px;
  border-radius: 10px;
}
</style>
