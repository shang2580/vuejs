<template>
  <div class="login_containner">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="javascript" />
      </div>


      <!-- 登录表单区域 -->
      <div class="login_from">
        <el-form
          label-width="0px"
          v-bind:model="form"
          v-bind:rules="rules"
          ref="ruleForm"
        >
          <!-- 用户名 -->
          <el-form-item prop="name">
            <el-input prefix-icon="iconfont icon-user" v-model="form.name"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="region">
            <el-input
              prefix-icon="iconfont icon-3702mima"
              v-model="form.region"
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" v-on:click="Login_From">登录</el-button>
            <el-button type="info" v-on:click="resetLoginFrom">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 表单数据绑定
      form: {
        name: "admin",
        region: "123456",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      //  表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 13,
            message: "长度在 3 到 13 个字符",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 3,
            max: 13,
            message: "长度在 3 到 13 个字符",
            trigger: "blur",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    //  submitForm(formName) {
    //    this.$refs[formName].validate((valid) => {
    //      if (valid) {
    //        alert('submit!');
    //      } else {
    //        console.log('error submit!!');
    //        return false;
    //      }
    //    });
    //  },
    //  resetForm(formName) {
    //    this.$refs[formName].resetFields();
    //  },

    // 点击重置按钮
    resetLoginFrom() {  
       // UI 内部方法  
      this.$refs.ruleForm.resetFields();
      // console.log(this.$refs.ruleForm.resetFields())

    },
    //  表单登录校验
    Login_From() {
      this.$refs.ruleForm.validate(async (valid) => {
        //     value值为一个 布尔值   true 代表验证通过
        if (valid) {
          const {data:result} = await this.$http.post("login", {
            username: this.form.name,
            password: this.form.region,
          });

           if(result.meta.status !==200){  
             // ui组件 失败弹窗提醒 
             return this.$message.error("登录失败");
           }else{
                window.sessionStorage.setItem("token",result.data.token)
                 // ui组件 成功弹窗提醒 
               return this.$message.success('登录成功')
              
           }
        }else{
          console.log("校验失败")
        }
      });

      this.$router.push({
        path:"/home"
      })
    },
  },
};
</script>

<style scoped>
.login_containner {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px soild black;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px#ddd;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-65px);
  background-color: #fff;
}
.avatar_box img {
  transform: translate(14%, 12%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* background-color: burlywood; */
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_from {
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>