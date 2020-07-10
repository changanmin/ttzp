<template>
  <div class="ui-block">
    <div class="ui-block-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="loginForm">
        <h4>天天粥棚</h4>
        <el-form-item label="用户名" prop="ldap">
          <el-input v-model="ruleForm.ldap"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '../api';

const API = new api();
export default {
  data() {
    return {
      ruleForm: {
        ldap: 'ttzp1',
        password: '111111',
      },
      rules: {
        ldap: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          API.login(this.ruleForm).then((res) => {
            if (res) {
              this.$router.push('/index');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style>
.ui-block {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.ui-block-login {
  width: 500px;
  background-color: #fff;
  opacity: 0.8;
  border-radius: 30px;
}
.loginForm {
  margin: 0px 100px;
}
</style>
