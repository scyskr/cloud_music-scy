<template>
  <div class="cotents">
      <div class="btn">  <!-- 上一步按钮和下一步按钮 -->
            <i class="iconfont icon-arrow-left-bold back"></i>
        <i class="iconfont icon-arrow-right-bold forward"></i>
      </div>
      <div class="search" @mousedown="lose"> <!-- 输入框  -->
          <el-input
    placeholder="请输入内容"
    v-model="input4" @blur="disappear"  @input="inputSearch">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  <!-- 热搜榜 -->  
   <div class="hotSearchList init" v-show="actived&elen==false" ref="theBiggest" >
       <div class="hotSearchTitle">热搜榜</div>
       <div class="hotSearchListItme" v-for="(itmes,index) in hotSearchList" :key="index" >
           <div class="hotSearchRankings" :class="index+1<=3?'activeheader':''" >{{itmes.id}}</div>
           <div class="hotSinglesTitle">
               <div class="info">
                   <div>{{itmes.value}}</div>
                  <div class="num">{{itmes.num}}</div>
               </div>
            <div class="comments">{{itmes.address}}</div>
           </div>
       </div>
   </div>
   <!-- 猜你喜欢 -->
   <div class="guessYouLike inito" v-show="elen">
       <el-card class="box-card">
    <div class="guessYou"> <i slot="prefix" class="el-input__icon el-icon-search"></i>猜你想搜</div>
     <div v-for="(items,id) in guessYouName" :key="id" class="text item node">
            <div class="guessYouName">{{items}}</div>
           </div>
         <!-- <div class="guessYou"> <i  class=" iconfont  icon-yinle"></i>  单曲</div>
           <div v-for="(items,id) in guessYouName" :key="id" class="text item node">
            <div class="guessYouName">{{items}}</div>
           </div>
            <div class="guessYou"> <i class="iconfont icon-mic"></i>  歌手</div>
           <div v-for="(items,id) in guessYouName" :key="id" class="text item node">
            <div class="guessYouName">{{items}}</div>
           </div>
              <div class="guessYou"> <i class="iconfont icon-gedan"></i>  歌单</div>
           <div v-for="(items,id) in guessYouName" :key="id" class="text item node">
            <div class="guessYouName">{{items}}</div>
           </div> -->
       </el-card>
   </div>
    </div>
      <!-- 麦克风2 -->
   <div class="theMicrophone"><i class="iconfont icon-mic"></i></div>
  </div>
</template>

<script>
import '../../../assets/css/elementUI.css'
export default {
 name:'inmofct',
 data(){
     return {
     input4: '',
     actived:false,//判断是否要显示热搜榜
     maxhegth:false,//高度
     elen:false,//输入框value的长度
     hotSearchList:[{ id:1,value: "Just Another Night ", addres: "Fun Radio Starfloor 2014",num:8888  },
        { id:2,value: "温热蝙蝠日记Acoustic", address: "温热蝙蝠日记",num:54666668  },
        { id:3,value: "三月里的小雨DJ（翻自 王恰恰）", address: "三月里的小雨（甜美DJ版）",num:4532535  },
        { id:4,value: "泡沫（Swang Remix）", address: "Swang多雷",num:1541  },
        { id:5,value: "Older", address: "Sasha Alex Sloan",num:4984  },
        { id:6,value: "七月七日晴(抖音DJ版)", address: "DJ阿航Rmx",num:14854 },
        { id:7,value: "七月七日晴(抖音DJ版)", address: "DJ阿航Rmx",num:14854 },
        { id:8,value: "Older", address: "Sasha Alex Sloan",num:4984  },
        { id:9,value: "七月七日晴(抖音DJ版)", address: "DJ阿航Rmx",num:14854 },
        { id:10,value: "七月七日晴(抖音DJ版)", address: "DJ阿航Rmx",num:14854 }],
    guessYouName:['薛之谦','周杰伦','蔡依林','张学友','林婉儿']
     }
 },
       methods:{
       lose(){
           //获取热搜元素的高度
            // let Height= this.$refs.theBiggest.offsetHeight; 
            // if(Height>400){
            //     this.maxhegth=true
            // }
     setTimeout(()=>{
              this.actived=true
                },500)     
                },
        disappear(){
               this.actived=false; 
            },
            inputSearch(e){
                console.log('输入了')
                console.log(e.length);
                let es=e.length;
                if(es>0){
                    this.elen=true
                }
                else{
                     this.elen=false
                }
            }   
             },
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
  box-shadow: -2px 2px 44px #ccc; 
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
</style>