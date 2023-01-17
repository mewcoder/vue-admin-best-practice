<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form :model="user" status-icon :rules="rules" ref="userForm">
        <div class="title">登录</div>
        <el-form-item prop="username">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="user.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            placeholder="请输入密码"
            v-model="user.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login">
            登录
          </el-button>
        </el-form-item>
        <div class="toast">
          <span>管理员账号：admin/admin</span>
        </div>
        <div class="toast">
          <span>普通用户账号：user/user</span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const userInfo = await this.$store.dispatch(
            'userInfo',
            this.user.username
          );
          console.log(userInfo);
          if (!userInfo.username) {
            this.$message.warning('用户不存在');
          } else if (userInfo.password !== this.user.password) {
            this.$message.warning('密码错误');
          } else {
            this.$message.success('登录成功');
            this.$router.replace('/');
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100%;
}
.modal {
  width: 360px;
  height: 380px;
  box-shadow: 0 0 10px 5px #ddd;
  padding: 50px;
  border-radius: 5px;
}
.title {
  width: 100%;
  text-align: center;
  line-height: 1.5;
  font-size: 30px;
  margin-bottom: 30px;
}
.btn-login {
  width: 100%;
}
.toast {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
</style>
