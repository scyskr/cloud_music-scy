<template>
  <div class="cotents">
      <div class="btn">  <!-- 上一步按钮和下一步按钮 -->
            <i class="iconfont icon-arrow-left-bold back" @click="$router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold forward" @click="$router.go(1)"></i>
      </div>
      <div class="search" @mousedown="lose"> <!-- 输入框  -->
          <el-input
    placeholder="请输入内容"
    v-model="searchInput" @blur="disappear"  @input="inputSearch" @keyup.enter.native="onSubmit">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  <!-- 热搜榜 -->  
   <div class="hotSearchList init" :class="dispiayac?'displyaactiv':''" v-show="actived&elen==false" ref="theBiggest" >
       <div class="hotSearchTitle">热搜榜</div>
       <div class="hotSearchListItme" v-for="(itmes,index) in hotSearchList" :key="index" @click="hotSearch(itmes.searchWord)">
           <div class="hotSearchRankings" :class="index+1<=3?'activeheader':''" >{{index+1}}</div>
           <div class="hotSinglesTitle">
               <div class="info">
                   <div>{{itmes.searchWord}}</div>
                  <div class="num">{{itmes.score}}</div>
               </div>
            <div class="comments">{{itmes.content}}</div>
           </div>
       </div>
   </div>
   <!-- 猜你喜欢 -->
   <div class="guessYouLike inito" v-show="elen">
       <el-card class="box-card">
    <!-- <div class="guessYou"> <i slot="prefix" class="el-input__icon el-icon-search"></i>搜索建议</div>
     <div v-for="(items,index) in guessYouName.songs" :key="index" class="text item node">
            <div class="guessYouName"> {{ items.name + " - " + items.artists[0].name }}</div>
           </div> -->
         <div class="guessYou"> <i  class=" iconfont  icon-yinle"></i>  单曲</div>
           <div v-for="(items) in guessYouName.songs" :key="items.id" class="text item node"  @click="supposeYouWantToSearch(items.id)">
            <div class="guessYouName">  {{ items.name + " - " + items.artists[0].name }}</div>
           </div>
            <div class="guessYou">   <i class="iconfont icon-mic"></i> 歌手</div>
           <div v-for="(items) in guessYouName.artists" :key="items.name" class="text item node" @click="singersearch(items.id)">
            <div class="guessYouName">   {{ items.name }}</div>
           </div>
                <div class="guessYou">  <i class="iconfont icon-more"></i> 专辑</div>
           <div v-for="(items) in guessYouName.albums" :key="items.id" class="text item node" @click="albumLists(items.id)">
            <div class="guessYouName"> {{ items.name + " - " + items.artist.name }}</div>
           </div>
              <div class="guessYou"> <i class="iconfont icon-gedan"></i>  歌单</div>
           <div v-for="(items) in guessYouName.playlists" :key="items.id" class="text item node" @click="singerplay(items.id)">
            <div class="guessYouName">{{items.name}}</div>
           </div>
       </el-card>
   </div>
    </div>
      <!-- 麦克风2 -->
   <div class="theMicrophone"><i class="iconfont icon-mic"></i></div>
  </div>
</template>

<script>
import '../../../assets/css/elementUI.css'
import {searchhot,suggest,detail} from '../../../network/app'
import { handleMusicTime } from "../../../plugins/ulits";
export default {
 name:'inmofct',
 data(){
     return {
     input4: '',
     actived:false,//判断是否要显示热搜榜
     maxhegth:false,//高度
     elen:false,//输入框value的长度
     hotSearchList:[],
     guessYouName:[],
     //绑定input
     searchInput:'',
     dispiayac:false,
     urllist:[]
     }
 },
       methods:{
       lose(){
           //获取热搜元素的高度
            // let Height= this.$refs.theBiggest.offsetHeight; 
            // if(Height>400){
            //     this.maxhegth=true
            // }
            searchhot({}).then(res=>{
                    this.hotSearchList = res.data.data;
            })
         setTimeout(()=>{
              this.actived=true
                },500)     
                },
        disappear(){
            setTimeout(()=>{
                            this.actived=false;   
            },500)

            },  
            inputSearch(e){
               
                let es=e.length;
                  this.dispiayac=false;
                if(es>0){
                    this.elen=true
                     suggest({keywords:e}).then(res=>{
                     this.guessYouName=res.data.result;
                })
                }
                else{
                     this.elen=false
                }
            },
            //提取公共方法
            getsearch(keywords){
           this.$router.push('/home/hotsearch/singlehot/'+keywords);
            },
            //点击跳转
            hotSearch(name){
            this.searchInput = name;
            this.getsearch(name);
            this.actived=false;
            this.elen=false;
            this.dispiayac=true;
            },
            //按下回车跳转
            onSubmit(e){
                if (e.keyCode == 13 && this.searchInput != "") {
                this.goSearch(this.searchInput);
               }
            },
            //搜索单曲
            getmusicId(id){
               detail({ids:id}).then(res=>{
                 res.data.songs[0].dt = handleMusicTime(res.data.songs[0].dt);
                 this.urllist=res.data.songs;
                 let mulist=this.$store.state.musicList;
                 let mucurrindex=this.$store.state.currentIndex;
                let index=mulist.find((item)=>item.id==this.urllist[0].id);
                // alert(index);
                console.log(index,'indexindexindexsksksk');
                    if(index==null){
                      this.$store.commit('updatemusicId',this.urllist[0].id);
                 
                    this.$store.commit('updateCurrentIndex',mucurrindex + 1)
                   mulist.splice(mucurrindex + 1, 0,  this.urllist[0]);
                     this.$store.commit('updatamusicList',mulist); 
                     return;
                   }
                   
                       this.$store.commit('updatemusicId',  this.urllist[0].id);
                    //    this.$store.commit('updatamusicList',this.urllist[0]); 
                
                })
            },
            supposeYouWantToSearch(ids){
                  this.elen=false;  
                 this.getmusicId(ids)
             },
             //搜索歌手
             singersearch(id){
                   this.elen=false;
                 this.$router.push('/home/singerView/singerab/'+id);
                 this.$store.commit('updatasingerId',id);
             },
             //搜索歌单
             singerplay(id){
                   this.elen=false;
                   this.$router.push('/home/playlist/'+id);
             },
             //albumLists 查询专辑
             albumLists(id){
                  this.elen=false;
                  setTimeout(() => {
                    this.$store.commit('updataalbumId',id)
                     this.$router.push('/home/albumList/albumListson/'+id);
                  }, 200);
                 

                //   this.$store.commit()
             }
       }
} 
</script>

<style>
.cotents{
      display: flex;
     align-items: center;
}
.btn {
  color: rgb(235, 235, 235);
  /* display: flex; */
   height: 22px; 
 border-radius: 50%;
  margin-right: 5PX;

}
.btn i{
        height: 22px;
        width: 22px;
       border-radius: 50%;
        font-size: 14px;
        background-color: #e13e3e;
        padding: 5px;
        margin: 0 3px;
    }
.el-input__inner{
 border-radius: 40px;
     border-radius: 30px;
    background-color: #e13e3e !important;
    color: white !important;
    border: none;
    }
.search{
    position: relative;
}
.hotSearchList{
    position: absolute;
    background: #ffff;
  width: 350px;
    left: -75px;
    top: 45px;
box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 10px;
  z-index: 3000;
}
.hotSearchTitle{
    padding: 5px 5px 5px 10px;
    font-size: 18px;
    color: #6f6f6f;
}
.hotSearchListItme,.info{
    display: flex;
    align-items: center;
}
.hotSearchListItme{
    padding: 10px;
}
.hotSearchRankings{
    color: #ccc;
     padding: 5px 5px 5px 10px;
     font-size: 18px;
}
.hotSinglesTitle{
    padding-left: 20px;
    padding-right: 20px;
}
.num{
    padding-left: 5px;
    color: #6f6f6f;
    font-size: 10px;
}
.comments{
  color: #6f6f6f;
    font-size: 12px;
}
.activeheader{
 color: #e13e3e;
}
.theMicrophone{
     height: 22px;
        width: 22px;
       border-radius: 50%;
        font-size: 14px;
        background-color: #e13e3e;
        padding: 5px;
        margin: 0 3px;
        text-align: center;
        margin-left: 8px;
}
.theMicrophone i{
    color: #ccc;
}
.init{
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 10px;
    height: 5px;
    border-radius: 10px;
    background-color: #ffff;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
   box-shadow: inset 0 0 6px rgba(241, 240, 240, 0.3);
    border-radius: 10px;
    background-color: #ffff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(249, 248, 248, 0.3);
    background-color: #ccc;
    border-radius: 10px;
}
.guessYouLike{
        position: absolute;
    background: #ffff;
  width: 350px;
    left: -76px;
    top: 45px;
  box-shadow: 1px 2px 4px #ccc; 
  border-radius: 10px;
  z-index: 100;
   
    }
    .guessYou{
        padding: 0 20px;
    }
    .node{
        padding: 8px 20px;
    }
    .inito{
          min-width: 480px;
        max-height: 480px;
        overflow: hidden;
        overflow-y: scroll;
       
    }
   .hotSearchListItme:hover{
        background-color: #cdcccc;
    }
    .displyaactiv{
        display: none;
    }
</style>