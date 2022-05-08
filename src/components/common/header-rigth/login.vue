<template>
<div class="loginindex">
    <div class="nologin">
      <el-popover
    placement="bottom-start"
    title=""
    width="500"
    trigger="click"
    v-if="$store.state.loginuser==false"
    >
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  >
  <el-form-item label="账号" prop="pass">
    <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button >注册</el-button>   <!--  @click="dialogVisible = true" -->
  </el-form-item>
</el-form>
<div  class="login" slot="reference"  v-if="$store.state.loginuser==false">
       <div >
      <img src="../../../assets/img/test.jpg" alt=""> 
      </div>
      <div class="bntlog"> 点击头像登陆网易云</div> 
      </div>
  </el-popover>
 </div>
   <div class="isLoggedIn" v-if="$store.state.loginuser">
       <el-popover
  placement="bottom"
  width="200"
  trigger="click"
  >   
  <div  class="logmaxhei"><button @click="logouts">退出登录</button>
  <button @click="logst">查看登陆状态</button>
  </div>
       <div slot="reference" class="isLoggedIn" >
         <div >
      <img :src="userInfo.avatarUrl" alt=""  > 
      </div>
        <div class="bntlog"> {{userInfo.nickname}}</div>
    </div>
</el-popover>
  
   </div>
  
<div >

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  class="regj" >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
 </div>
    </div>
</template>

<script>
import {loginskr,loginstatus,logout,useraccount} from '../../../network/app'
export default {
  components: {  },
   name:'login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
         else {
          callback();
        };

      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
   dialogVisible: false,
     userLogo:'',
     username:'',
      useraccounts:'',
      userInfo:''
       }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            const date=(new Date()).getTime();
            loginskr({phone:this.ruleForm.pass,password:this.ruleForm.checkPass,timestamp:date, withCredentials: true,}).then(res=>{
                if(res.data.code==200){   
                console.log(res);
               window.localStorage.setItem("userId", res.data.profile.userId);
               window.localStorage.setItem("useracatarurl", res.data.profile.avatarUrl);
               window.localStorage.setItem("nickname", res.data.profile.nickname);
                let ekkk=window.localStorage.getItem('userId');
                    console.log(ekkk,'eeee');
                //更改vuex的userid
                this.$store.commit('updatyesuserid',res.data.profile.userId);
                this.$store.commit('updatauserid',res.data.profile);
                //更改 登陆状态
                this.$store.commit('updataloginuser',true);
                this.$message({
               message: '欢迎登录网易云音乐',
               type: 'success'
                 });
                //存到浏览器内存里 比sesionStorage 会话更久 不会自动删除
                 // 将userInfo传回父组件
                //  this.$emit("getUserInfo", res.data.profile);
                 this.userLogo=res.data.profile.avatarUrl;
                 this.username=res.data.profile.nickname;
                // this.$message.message("手机号错误!");
                  // 清空输入框的内容
               this.ruleForm.pass = "";
                this.ruleForm.checkPass = "";
                  return;
                  }
                else if (res.data.code == 400) {
                  // 手机号错误
                    this.$message.error("手机号错误!");
                      return;
                  } 
                else if (res.data.code == 502) {
        // 密码错误
        this.$message.error("密码错误!");
        return;
                  }
                else {
          // 登录失败，请稍后重试
           this.$message.error("登录失败，请稍后重试!");
        return;
                }
               }).catch(err=>{
            console.log(err);
          })
           
                 } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      logst(){
        loginstatus({id:1977595259}).then(res=>{
          console.log(res+"登陆状态");
        })
      },
     logouts(){
        logout({id:1977595259}).then(res=>{
          console.log(res+"退出登录");
       this.$message({
          message: '你好，退出成功',
          type: 'success'
        });
          //更改 登陆状态
       this.$store.commit('updataloginuser',false);
        })
     },
        // 获取当前用户信息
      getCurrentUserInfo () {
      var timestamp = Date.parse(new Date());
      useraccount({timestamp}).then(res=>{
        this.useraccounts=res.data;
       if (this.useraccounts.profile != null) {
        this.userInfo = this.useraccounts.profile;
        console.log(this.userInfo,'this.userInfo');
        // 更新登录状态
        this.$store.commit("updataloginuser", true);
        // 更新当前用户id
        // this.$store.commit("updateCurrentUserId", res.data.profile.userId);
        // 将请求到的用户id存入localstorage
         window.localStorage.setItem("userId", this.useraccounts.profile.userId);
      } else {
        // 未登录
        this.$store.commit("updataloginuser", false);
        // 如果localstorage存有userId就清除
        if (window.localStorage.getItem("userId")) {
          window.localStorage.removeItem("userId");
        }
      }
      })
    }, 
    },
    created(){
      this.getCurrentUserInfo();
        if (document.cookie.search("MUSIC_U=") != -1) {
      // 如果本地存有cookie，则先暂时判定为已登录，
      // 以解决登录状态下在视频页等需要登录的页面刷新因为登录状态默认为false，
      // 需要等待获取用户信息请求结束后更新用户状态才有进入视频页的权限，导致被返回到发现音乐页面，体验很差
      // 后面获取用户信息将再次确认用户是否登录
      this.$store.commit("updataLoginState", true);
    }
    }
   
}
</script>

<style>
.loginindex{
      display: grid;
    align-items: center;
    height: 100%;
    grid-template-columns: 1fr 1fr;
}
.login{
    display: grid;
    align-items: center;
    height: 100%;
    grid-template-columns: 1fr 4fr;
}
.login img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    vertical-align: middle;
}
.bntlog{
    color: #fff;
    padding-left: 3px;
}
.regj{
    z-index: 10000;
}
.isLoggedIn{
     display: grid;
    align-items: center;
    height: 100%;
    grid-template-columns: 1fr 2fr;
    }
     
.isLoggedIn img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    vertical-align: middle;
}
.logmaxhei{
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  text-align: center;
}
.logmaxhei button{
   border: none;
   padding: 10px;
}
</style>