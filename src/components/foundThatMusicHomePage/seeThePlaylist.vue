<template>
    <div class="musicListIndex">
    <!-- 精选歌单入口展示 -->
    <div class="highqualityEntry">
      <img
        :src="theFirstOfHighquality.coverImgUrl"
        alt=""
        class="backgroundImg"
      />
      <div class="cover">
        <img :src="theFirstOfHighquality.coverImgUrl" alt="" />
      </div>
      <div class="EntryInfo">
        <div class="tag"><i class="iconfont icon-good"></i> 精品歌单</div>
        <div class="name">{{theFirstOfHighquality.name}}</div>
         <div class="desc">{{ theFirstOfHighquality.copywriter }}</div>
      </div>
    </div>
    <!-- 分类 -->
     <div class="musicClassification">
        <mcf @mcfclick="mcfclassification">
        </mcf>
     </div>
      <!-- 推荐歌单 -->
      <boutique :name="mcbot" :key="timer" ></boutique>
    </div>
</template>

<script>
import {exclusive} from '../../network/app'
import mcf from './musicClassification.vue'
import boutique from './boutiquePlaylist.vue'
export default {
  name:'seethe',
   data(){
       return{
           theFirstOfHighquality:[],
           //存储子组件传来的数据
           mcfnames:'',
           mcbot:'华语',
            timer: '',
         
       }
   },
   methods:{
       getTheFirstOfHighquality(){
           
       },
       //子组件传来自定义的方法
       mcfclassification(name){
        //    console.log(name);
        this.mcfnames=name;
        this.mcbot=name;
         exclusive({limit: 1,cat:this.mcfnames}).then(res=>{
             this.theFirstOfHighquality = res.data.playlists[0];
            //  console.log(res);
           });
        this.timer = new Date().getTime();
       }
   },
   created(){
       exclusive({limit: 1,cat:'华语'}).then(res=>{
             this.theFirstOfHighquality = res.data.playlists[0];
            //  console.log(res);
           })
   },
   components:{
       mcf,
        boutique
   }
}
</script>

<style>
.highqualityEntry {
  position: relative;
  width: 100%;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
}
.backgroundImg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  transform: translateY(-80px);
  filter: blur(30px) brightness(70%);
}

.cover {
  width: 120px;
  height: 120px;
  margin: 10px;
}

.cover img {
  border-radius: 10px;
  width: 100%;
}

.tag {
  color: #d59e54;
  border: 1px solid #d59e54;
  padding: 5px 10px;
  width: 88px;
  font-size: 12px;
  margin: 20px 10px 15px;
  border-radius: 15px;
}

.tag i {
  font-size: 14px;
}

.name {
  color: white;
  font-size: 14px;
  margin: 10px 0;
}
.desc {
  color: rgba(255, 255, 255, 0.5);
  /* 字体直接写小于12没有效果 */
  font-size: 12px;
  transform: scale(0.9, 0.9);
}
</style>