<template>
<div>
  <div>
      <div class="videoheader">
        <div v-for="(video,id) in videoList" :key="id"
         :class="video.path==$route.path?'musictabsactive':''"
         @click="jump(video.path)"
        >{{video.name}}</div>
      </div>
      <keep-alive>
         <router-view></router-view>  
      </keep-alive>
     
  </div>
  </div>
</template>

<script>
import {commentalbum} from '../../network/app'
export default {
  name:'videoindex',
  data(){
    return{
          videoList: [
        { name: "视频", path: "/home/video/videos" },
        { name: "MV", path: "/home/video/videoMV" },
      ],
    }
  },
  methods:{
    jump(path){
    this.$router.push(path);
    }
  },
  created(){
    
  },
  components:{

}
}
 
</script>
<style>
.videoheader{
  display: flex;
  gap: 24px;
  align-content: center;
  align-items: center;
}
.musictabsactive{
  font-weight: 1000;
  font-size: 24PX;
  border-bottom: 3PX solid red;
}
</style>