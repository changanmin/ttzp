<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="loginForm">
    <h4>天天选购</h4>
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
.loginForm {
  width: 300px;
  margin: 100px auto;
}
</style>
