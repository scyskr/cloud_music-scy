<template>
<div> 
  <div class="theTexttop">专辑介绍</div>
  <div class="theText">
     {{comments.album.description}}
  </div>
  </div>
</template>

<script>
import {album} from '../../network/app'
export default {
name:'albumDetails',
data(){
  return{
    comments:[]
  }
},
methods:{
  contentOfTheAlbum(){
      // 获取时间戳
      var timestamp = Date.parse(new Date());
     album({id:this.$store.state.albumId,timestamp}).then(res=>{
         this.comments=res.data;
     })
  }
},
 created(){
   this.contentOfTheAlbum();
  },
   watch:{
"$store.state.albumId"(current, last){
    this.contentOfTheAlbum();
    }
   },
}

</script>
<style>
.theText{
  font-size: 16px;
  color: #373737;
  line-height: 25px;
  letter-spacing: 0.5px;
  text-indent: 2em;
}
.theTexttop{
      font-weight: 900;
    font-size: 18px;
}
</style>