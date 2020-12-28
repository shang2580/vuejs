<template>
  <div>
    <!-- 面包屑区域 -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图区域 -->

    <el-card class="box-card">
      <!-- 搜索框区域 -->
      <el-row :gutter="50">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model = "queryInfo.query" clearable v-on:clear = "getuserList">
             <!--button按钮 用于发送 -->
            <el-button slot="append" icon="el-icon-search" v-on:click = "getuserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
         
          <el-button  type = "primary" v-on:click = "addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>

        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="岗位"> </el-table-column>

        <el-table-column prop="mg_state" label="状态">
          <!--  作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"   v-on:change = "userstatechange(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot:default="slotProps">
            <!-- 作用域插槽 -->
            <!-- 修改按钮 -->
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <!-- 分配角色按钮 -->

            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              v-bind:enterable="false"
            >
              <el-button
                size="small"
                type="warning"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页条 --> 
        <!--  分页事件 处理  handleSizeChange  handleCurrentChange -->
      <el-pagination 
        @size-change="handleSizeChange"  
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tatol"
      >
      </el-pagination>

          
          <!--  添加用户的  对话框 组件  -->  
          <!-- :visible.sync="addDialogVisible"  addDialogVisible值 用于控制对话框的显示与隐藏 -->
          <el-dialog
            title="提示"
            :visible.sync="addDialogVisible"
            width="30%"
            > 
            <!-- 内容主体区域 -->
                <el-form :model="addfrom" :rules="addfromrules" ref="addfrom" label-width="70px" >
                     <el-form-item label="用户名" prop="username">
                        <el-input v-model="addfrom.username"> </el-input>
                      </el-form-item>
                      
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="addfrom.password"> </el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addfrom.email"> </el-input>
                      </el-form-item>
                      <el-form-item label="手机" prop="phone">
                        <el-input v-model="addfrom.phone"> </el-input>
                      </el-form-item>
            </el-form>
              
             <!-- 这个是底部区域 -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
              
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      queryInfo: {
        //  搜索内容 
        query: "",
        //  当前页
        pagenum: 1,
        //  当前每页显示多少条 内容
        pagesize: 2,
      },
      //  获取服务器列表 内容 暂存
      userlist: [],
      //  总记录条数
      tatol:0,
      //  当前页数
      pagenum:0,
      //   添加用户 按钮对话框 显示隐藏属性
      addDialogVisible :false,
      //  定义 添加用户按钮 验证数据
      addfrom:{
       username:"",
       password:"",
       email:" ",
       phone:" "


      },
      // 添加用户 验证规则
      addfromrules:{
        username:[
         { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 3, max: 13, message: '长度在 3 到 13个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getuserList();
  },
  methods: {
    async getuserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
    
      if (res.meta.status !== 200) {
        console.log("获取失败");
      } else {
        (this.userlist = res.data.users), (this.tatol=res.data.total), (this.pagenum = res.data.pagenum);
      }
    },
    //  监听  pagesize 改变的自定义 事件
    handleSizeChange(newsize) {
     this.queryInfo.pagesize = newsize 
     this.getuserList()
    },
    //  监听页码的改变
    handleCurrentChange(pagenum) {
     this.queryInfo.pagenum = pagenum
     this.getuserList()
    },
    //  监听 swithch 状态改变
     async userstatechange(userinfo){
           
    const {data:res} = await  this.$http.put(`users/ +${userinfo.id}/state/ +${userinfo.mg_state}`)
      if(res.meta.status!==200){
            userinfo.mg_state = !userinfo.mg_state    
              this.$message.error("更新状态失败");
      }
      this.$message.success("更新成功了")
    }
  },
};
</script>

<style lang = "less" scoped>
.el-card {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
}
.el-table {
  margin-top: 25px;
  font-size: 12px;
}
.el-pagination{
  margin-top: 20px;
}
</style>