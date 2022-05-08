<template>
  <div  v-loading="loading">
    <!-- 精彩评论 -->
<commenting :comments="comments.hotComments" 
    :commentType="'album'"
    :commentId="this.$store.state.albumId"
    :isHotComment="comments.hotComments ? false : true"
    :musicTitle="'我是你的眼'"
    :displaysCommentBox="true"
    ><div slot="commntsTitle">精彩评论</div></commenting>
   <!-- 热门评论 -->
    <commenting :comments="comments.comments" 
    :commentType="'album'"
    :commentId="$store.state.albumId"
    :isHotComment="comments.hotComments ? false : true"
    :musicTitle="'我是你的眼'"
    :displaysCommentBox="false"
    ><div slot="commntsTitle">热门评论</div></commenting>
<div>1111</div>
  </div>
</template>

<script>
import commenting from '../common/comment/commenting.vue'
import {commentalbum} from '../../network/app'
export default {
name:'albumReviews',
data(){
  return{
    loading:true,
    comments:[]
  }
},
methods:{
      contentOfTheAlbum()
       {
          // 获取时间戳
        var timestamp = Date.parse(new Date());
        commentalbum({id:this.$store.state.albumId,timestamp}).then(res=>{
        if(res.data.code==200){
         this.loading=false;
       }
         this.comments=res.data;
     })
       }
     
},
created(){
   this.contentOfTheAlbum();
},
   watch:{
"$store.state.albumId"(current, last) {
   this.contentOfTheAlbum();
    },
   },
 created(){
      //    album({id:128666473}).then(res=>{
      //   this.albumlist=res.data;
      // })


  },
components:{
  commenting
},
}

</script>
<style>
</style> 