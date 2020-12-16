<template>
  <el-container>
    <!-- // 头部区域 -->
    <el-header>
      <div class="logo">
        <img src="../assets/55368255.jpg" alt="" />
        <span> 电商后台管理系统 </span>
      </div>

      <el-button type="info" v-on:click="logout">退出</el-button></el-header
    >

    <!-- 内容主体区域 -->
    <el-container>
      <!-- // 左侧菜单栏区域 -->

      <el-aside :width="isCollpse? '64px' : '200px'">
   
       <div class = "menu_button" v-on:click="toppleCollapse">|||</div>

        <!-- 侧边栏菜单区域 -->   
            <!--  设置 菜单栏展示单独展示 设置菜单栏 特性  -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409Bff"
          unique-opened
          :collapse = isCollpse
          :collapse-transition = 'false'
          router
         :default-active = activePath
          
          
          
        >  
         <!-- 一级菜单模板区域 -->  
            <!--  因为UI组件  index 需要接受一个字符串的唯一值  通过  item.id 来赋值 -->
          <el-submenu   :index="item.id + '' "  v-for="item in getmenuList" :key= "item.id">
           
            <template slot="title">
              <!-- 图标 -->
              <i v-bind:class="iconObj[item.id]"></i>
              <!-- 文本
               -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <!--  开启路由跳转地址后 index 属性作为跳转链接 -->
               <el-menu-item  :index="'/'+ items.path" v-for = "items in item.children"  v-bind:key = "items.id" v-on:click="alickPath('/'+ items.path)">
                  
                   <i class="el-icon-menu"></i>
                   <span>{{items.authName}}</span>
               </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容展示区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    //   定义左侧 菜单栏 数据 
      menuList:[],
      iconObj:{
        "125":'iconfont icon-user',
        "103":"iconfont icon-tijikongjian",
        "101":"iconfont icon-shangpin",
        "102":"iconfont icon-danju",
        "145":"iconfont icon-baobiao"

      },
      isCollpse:false,
      activePath:""
    };
  },
  created(){
         this.getmenuList()
        //   先保留
         this.activePath = window.sessionStorage.getItem("active")
    },
  methods: {
    
    logout() {
      // 清空sessionStorage 存储的token
      window.sessionStorage.clear();
      this.$router.push("/login");
    }, 
    //  获取左侧菜单栏 请求  
   async getmenuList(){

    const {data:res} = await this.$http.get("menus") 
      console.log(res)
      if(res.meta.status!==200){
         return this.$message.err(res.meta.meg)
      }else{
       this.getmenuList = res.data
      }

    },
    // 点击按钮切换菜单折叠效果
    toppleCollapse(){
        this.isCollpse = !this.isCollpse
    },
    alickPath(active){
       
       window.sessionStorage.setItem("active",active)
       this.activePath = active
    }
    
  },
};
</script>

<style lang = "less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: grid;
  grid-template-columns: 18vw 3.6vw;
  grid-template-rows: 100%;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
}
.logo {
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 8fr;
  grid-template-rows: 100%;
  /* 设置单元 两端对齐 */
  justify-content: start;
  /* 内容上下居中 左右居中 */
  align-items: center;
  justify-items: center;
}
.logo img {
  height: 100%;
  border-radius: 25%;
}
.logo span {
  /* margin-left:0.5vw; */
  font-size: 1.3vw;
  color: rgb(245, 238, 238);
}

.el-aside {
  background-color: #333744;
  
}
.iconfont{
  margin-right: 10px;
}
.el-menu{
  border-right: none;
}
.menu_button{
  background-color: #4a5064;
  color: aliceblue;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>