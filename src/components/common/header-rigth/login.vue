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
      <el-button  @click="logst">注册</el-button>   <!--  @click="dialogVisible = true" -->
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
  <div  class="logmaxhei"><button @click="logouts">退出登录</button></div>
       <div slot="reference" class="isLoggedIn" >
         <div >
      <img :src="$store.state.userid.avatarUrl" alt=""  > 
      </div>
        <div class="bntlog"> {{$store.state.userid.nickname}}</div>
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
import {loginskr,loginstatus,logout} from '../../../network/app'
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
        }
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
     username:''
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
                //  window.localStorage.setItem("userId", result.data.profile.userId);
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