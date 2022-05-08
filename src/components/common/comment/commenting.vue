<template>
  <div class="comments">
     <div class="songCommentBox" @click="dialogVisible = true"  
      v-if="commentType != '' && commentType != 'music' && isHotComment">
       <div><i class="iconfont icon-ziyuan"></i> 发表我的音乐评论</div>
     </div>
     <el-dialog
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
   <div>
     <div class="intermediateInputBox">歌曲:删了吧</div>
<el-input
  type="textarea"
   class="commentArea"
  placeholder="发表评论"
  v-model="textarea"
  maxlength="140"
  show-word-limit
  :autofocus="true"
>
</el-input>
   </div>
   <!-- 歌曲提交评论按钮  -->
    <div class="submitCommentButton">
         <el-button
          size="mini"
          round
          class="submitComment"
          >评论</el-button
        >
    </div>
</el-dialog>
<!-- 歌单、专辑、视频统一评论样式 -->
<div  v-if="commentType != '' && commentType == 'album'&&displaysCommentBox" class="commentBoxs">
<el-input
  type="textarea"
  placeholder="请输入内容"
  v-model="textarea"
  maxlength="150"
  show-word-limit
>
</el-input>
</div>
<div class="commentbtn"  v-if="commentType != '' && commentType == 'album'&&displaysCommentBox">
   <input type="button" class="buttons" value="评论">
</div>
<!-- 精彩评论 -->
 <div>
     <div class="commentHeader"><slot name="commntsTitle"></slot></div>
 <div class="commentItem" v-for="(item, index) in comments" :key="index">
      <div class="commentCreatorAvatar">
        <img
          :src="item.user.avatarUrl + '?param=100y100'"
          alt=""
          @click="goToPersonal(item.user.userId)"
        />
      </div>
      <div class="commentMain">
        <div class="commentContent">
          <span
            class="commentUserNickName"
            @click="goToPersonal(item.user.userId)"
            >{{ item.user.nickname }}:&nbsp;</span
          >
          <span>{{ item.content }}</span>
        </div>
        <div class="replied">
          <div
            class="repliedItem"
            v-for="(item1, index1) in item.beReplied"
            :key="index1"
          >
            <span class="repliedUser" @click="goToPersonal(item.user.userId)"
              >@{{ item1.user.nickname }}:&nbsp;</span
            >
            <span class="repliedContent">{{ item1.content }}</span>
          </div>
        </div>
        <div class="commentBottom">
          <div class="commentCreatedTime">
            {{ item.time | showDate }}
          </div>
          <div class="commentButtons">
            <div
              @click="likeCurrentComment(item.liked, item.commentId)"
              :class="item.liked ? 'likeCurrentComment' : ''"
            >
              <i class="iconfont icon-good"></i> {{ item.likedCount }}
            </div>
            <div><i class="iconfont icon-zhuanfa"></i></div>
            <div>
              <i
                class="iconfont icon-pinglun"
                @click="floorComment(item.commentId, item.user.nickname)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 回复的评论 -->
    <!-- <div class="replyToComment">
       <div class="headPortrait">
         <img src="http://p4.music.126.net/tsnbfBaequ-nbsNyold3WQ==/109951165715217071.jpg?" alt="">
       </div>
       <div class="commentcontentfather">
       <div class="commentcontent">
         <div>  
           <span class="nicknameOh">炸香芋: </span>
        <span>淦，我刚在b站看完那个视频</span>
           </div>
            <div class="replied">
              <div class="repliedItem">
                 <span class="nicknameOh">@Ailmmm:  </span>
                 <span>谁说住在白宫的才算总统</span>
              </div>
            </div>
       </div>
       </div>
    </div> -->
 </div>
  </div>
</template>

<script>
import {formatDate} from '../../../plugins/ulits'
export default {
 name:'commenting',
 props: {
    // 评论数据
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    // 评论的类型
    commentType: {
      type: String,
      default() {
        return "";
      },
    },
    // 评论对象的id
    commentId: {
      type: String,
      default() {
        return "";
      },
    },
    // 歌曲评论需要歌曲名称
    musicTitle: {
      type: String,
      default() {
        return "";
      },
    },
    // 是否是热门评论
    isHotComment: {
      type: Boolean,
      default() {
        return true;
      },
    },
    //是否显示评论框
    displaysCommentBox:{
      type: Boolean,
      default() {
        return true;
      },
    }
  },
   data() {
    return {
        dialogVisible: false,
      text: '',
      textarea: '',
       commentInput: "",
      // 是否显示评论dialog
      isCommentDialogShow: false,
      // 评论模式   true是常规评论   false是楼层评论
      commentMode: true,
      // 楼层回复前面几个字的长度
      floorCommentInputLength: 0,
      // 用于暂存楼层评论id
      floorCommentId: "",  
    }
  },
  methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }  
    },
    filters:{
  showDate(value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
    }
  
  
}

</script>
<style>
.commentBoxs{
  margin-top: 15px;
}
.songCommentBox{
     position: fixed;
    left: 50%;
    top: calc(80vh - -5px);
    transform: translateX(-50%) scale(0.9);
    border: none;
    background-color: #f1f1f1;
    line-height: 15px;
    border-radius: 20px;
}
.songCommentBox div{
 padding: 10px 10px 10px 10px;
    text-align: center;
}
.commentbtn{
  text-align: right;
  margin-top: 10px;
}
.comments .buttons{
  display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 35px;
}
.comments .buttons:hover{
  background-color: #ccc;
}
.goodcommntsTitle{
font-size: 14px;
    color: rgb(26, 26, 26);
    font-weight: 600;
    padding: 10px 0;
}
.goodCommentsbody{
  display: flex;
  gap: 10px;
padding: 10px 0 20px;
    border-bottom: 1px solid #eee;
}
.headPortrait img{
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.commentdate{
    margin-top: 2px;
    color: rgb(172, 172, 172);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.commentdaterigth{
  display: flex;
  align-items: center;
  gap: 15px;
}
.replyToComment{
  display: flex;
  gap: 10px;
  padding: 14px 0 20px;
    border-bottom: 1px solid #eee;
}
.nicknameOh{
      color: #5a8ab9;
    cursor: pointer;
}
.replied{
  background-color: #f4f4f4;
    margin: 7px 0;
    border-radius: 5px;
    text-align: left;
}
.repliedItem{
  padding: 15px 10px;
    line-height: 20px;
}
.commentcontentfather{
  width: calc(100% - 50px);
}
.intermediateInputBox{
      width: 100%;
    font-weight: bold;
    color: #333333;
    text-align: center;
    margin-bottom: 10px;
}
.commentArea .el-textarea__inner{
    height: 110px !important;
}
.submitCommentButton {
  width: 100%;
  text-align: right;
  margin: 10px 0;
}
.submitComment:focus {
  background-color: #fff;
}
.submitComment {
  background-color: #eb2e2e;
  color: white;
}

</style>
<style scoped>
.hotComments {
  margin-bottom: 20px;
  width: 100%;
}

.commentHeader {
  font-size: 14px;
  color: rgb(26, 26, 26);
  font-weight: 600;
  padding: 10px 0;
  text-align: left;
}
.commentItem {
  display: flex;
  margin: 5px 0;
  padding: 10px 0 20px;
  border-bottom: 1px solid #eee;
  font-size: 12px;
}

.commentCreatorAvatar {
  width: 35px;
  height: 35px;
  margin: 0px 10px 0 0;
}

.commentCreatorAvatar img {
  width: 100%;
  border-radius: 50%;
  cursor: pointer;
}

.commentMain {
  width: calc(100% - 50px);
}

.commentUserNickName {
  color: #5a8ab9;
  cursor: pointer;
}

.commentBottom {
  margin-top: 2px;
  color: rgb(172, 172, 172);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.commentButtons {
  display: flex;
  align-items: center;
}
.commentButtons div {
  margin-top: -3px;
  padding: 0 8px;
  transform: scale(0.85);
}

.commentButtons div:nth-child(1) {
  font-size: 14px;
}

.replied {
  background-color: #f4f4f4;
  margin: 7px 0;
  border-radius: 5px;
}

.repliedItem {
  padding: 7px 10px;
  line-height: 20px;
}

.repliedUser {
  color: #5a8ab9;
  cursor: pointer;
}

.page {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
}

.commentContent > span {
  line-height: 20px;
}
.commentContent{
  text-align: left;
}
.el-textarea /deep/ .el-textarea__inner {
  height: 65px !important;
  font-size: 12px;
  resize: none;
}

.el-textarea /deep/ .el-textarea__inner:focus {
  border-color: #aaa;
}

.el-textarea /deep/ .el-input__count {
  transform: scale(0.9);
}

.submitCommentButton {
  width: 100%;
  text-align: right;
  margin: 10px 0;
}

.el-button:hover {
  background-color: #f2f2f2;
}

.el-button {
  transform: scale(0.9) translateX(5%);
}

.submitComment:focus {
  background-color: #fff;
}

.commentCardSwitch {
  position: fixed;
  left: 50%;
  top: calc(80vh - 105px);
  transform: translateX(-50%) scale(0.9);
  border: none;
  background-color: #f1f1f1;
  line-height: 15px;
  padding: 10px 10px 10px 30px;
}

.commentCardSwitch:hover {
  background-color: #e1e1e1;
}

.commentCardSwitch i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.musicTitle {
  width: 100%;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;
}

.musicCommentArea /deep/ .el-textarea__inner {
  height: 110px !important;
}

.musicSubmitComment {
  padding: 8px 20px;
  font-size: 13px;
  background-color: #ec4141;
  color: white;
  border: none;
}

.musicSubmitComment:hover {
  background-color: #eb2e2e;
  color: white;
}

.musicSubmitComment:focus {
  color: white;
  background-color: #ec4141;
}

.commentDialog /deep/ .el-dialog__body {
  padding-bottom: 5px !important;
}

.likeCurrentComment,
.likeCurrentComment i {
  color: #ec4141 !important;
}
</style>