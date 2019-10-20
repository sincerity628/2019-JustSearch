<template>
  <div class="login">
    <v-card class="ma-auto pa-11 login-card">
      <v-form ref="form" v-model="valid">
        <v-text-field
          color="light-green darken-4"
          v-model="stu_number"
          :rules="stu_numberRules"
          label="学号"
          required
          loading
          outlined
        ></v-text-field>
        <v-text-field
          color="light-green darken-4"
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="密码"
          required
          hint="记得看看大赛规则哦！"
          loading
          outlined
        ></v-text-field>

        <div class="rules">
          <v-row>
            <v-dialog v-model="dialog" width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="light-green darken-4" outlined dark v-on="on" big text class>大赛规则</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">大赛需知</span>
                </v-card-title>
                <v-card-text>
                  <ul>
                    <li>第一次登录请用本人学号注册</li>
                    <li>比赛需提前30分钟进场，比赛开始后不得入场。</li>
                    <li>比赛过程中出现设备问题，请立即与现场工作人员联系。工作人员需随时处理突发问题并与相应负责人交接。</li>
                    <li>比赛过程中发现有讨论问题、场外援助等作弊行为，立即终止比赛、取消成绩。</li>
                    <li>若比赛中出现多个答案正确的情况，仍按照单选处理，等比赛结束后向工作人员提出，最终结果会进行校验，如若成立多个答案正确，那么此题只要选择正确选项皆可得分。</li>
                    <li>参赛选手若出现身体不适，及时与现场工作人员联系进行处理。</li>
                    <li>团队赛若缺少成员仍然可以进行比赛，但规则不会改变，只有通过预选赛的选手才有资格进行团队赛。</li>
                  </ul>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <div class="mr-5">
                    <v-btn @click="dialog = false" class="ma-2">继续</v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Agree to continue']"
          label="同意以上规则"
          required
        ></v-checkbox>
        <div class="login-btns">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="userLogin"
            :loading="btnLoading"
          >登录</v-btn>
          <v-btn
            :disabled="!valid"
            color="blue"
            class="mr-4"
            @click="userRegister"
            :loading="btnLoading"
          >注册</v-btn>
          <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
        </div>
      </v-form>
    </v-card>

    <div class="snackbar text-center ma-2">
      <v-snackbar v-model="snackbar" top :color="snackbarColor">
        {{ showText }}
        <v-btn color="white" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<style>
.login {
  margin-top: 8%;
}

.login-card {
  width: 30%;
}
@media only screen and (max-width: 980px) {
  .login-card {
    width: 45%;
  }
}
@media only screen and (max-width: 750px) {
  .login-card {
    width: 55%;
  }
}
@media only screen and (max-width: 600px) {
  .login-card {
    width: 93%;
  }
}

.login-btns {
  margin-top: 10%;
}
</style>

<script>
import { setTimeout } from "timers";

const qs = require("qs");

export default {
  data() {
    return {
      // 用户是否登陆成功（全局!!!）
      isLogin: "false",

      loginUrl: "http://101.132.44.32:8080/justsoso/login",
      // 用户是否同意大赛规则
      checkbox: false,
      // 组件的条件
      valid: true,
      // 是否显示按钮loading
      btnLoading: false,
      stu_number: "",
      stu_numberRules: [
        v => /^[1][123456789][0-9]{6}$/.test(v) || "学号格式不正确"
      ],

      password: "",
      passwordRules: [
        v => (v.length >= 3 && v.length <= 12) || "密码长度不正确"
      ],

      // 是否显示大赛规则
      dialog: false,
      // 是否显示消息弹框
      snackbar: false,
      snackbarColor: "",
      showText: "Hi ,there!"
    };
  },
  created() {
    // console.log("created!");
    // console.log(localStorage.getItem("isLogin"));
    // 一旦登陆后，跳转到logout页面

    if (localStorage.getItem("isLogin") === "1") {
      this.$router.push("logout");
      return;
    }
  },
  methods: {
    userLogin() {
      let that = this;
      // btn Loading
      this.btnLoading = true;
      // 调用登陆API
      if (this.$refs.form.validate()) {
        // 其实上面这一句我也不知道有什么用？？？
        // 好像没有用。。。
        let userdata = {
          num: this.stu_number,
          pwd: this.password
        };
        // console.log(qs.stringify(userdata));
        this.axios
          .post(this.loginUrl, qs.stringify(userdata))
          .then(function(res) {
            // console.log(res.data);
            if (res.data.isOk) {
              that.btnLoading = false;
              // 显示消息弹框
              that.snackbarColor = "success";
              that.showText = "登陆成功！3秒后跳转";
              that.snackbar = true;
              // 再间隔一段时间跳转页面
              let this_ = that;
              setTimeout(function() {
                this_.$router.push("myteam");
              }, 2000);
              // 设置localStorage
              localStorage.setItem("isLogin", "1");
              localStorage.setItem("stu_num", res.data.std_id);
              // localStorage.setItem("stu_name", res.data.name);
            } else {
              if (!res.data.isOk) {
                that.snackbarColor = "error";
                that.showText = res.data.errmsg;
                that.snackbar = true;
                that.checkbox = false;
                // btn Loading
                that.btnLoading = false;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
            that.snackbarColor = "error";
            that.showText = "服务器错误";
            that.snackbar = true;
            // 只清空password和checkbox
            that.checkbox = false;
            that.password = "";
            // btn Loading
            that.btnLoading = false;
          });
      }
    },
    userRegister(){
       let that = this;
      // btn Loading
      this.btnLoading = true;
      // 调用登陆API
      if (this.$refs.form.validate()) {
        // 其实上面这一句我也不知道有什么用？？？
        // 好像没有用。。。
        let userdata = {
          num: this.stu_number,
          pwd: this.password
        };
        // console.log(qs.stringify(userdata));
        this.axios
          .post('http://www.shuces.com:8080/justsoso/Register', qs.stringify(userdata))
          .then(function(res) {
            // console.log(res.data);
            if (res.data.isOk) {
              that.btnLoading = false;
              // 显示消息弹框
              that.snackbarColor = "success";
              that.showText = "注册成功！请继续登录";
              that.snackbar = true;
              // 再间隔一段时间跳转页面
              let this_ = that;
              setTimeout(function() {
                this_.$router.push("login");
              }, 1000);
              // 设置localStorage
              // localStorage.setItem("stu_name", res.data.name);
            } else {
              if (res.data.errmsg === "学号已存在") {
                that.snackbarColor = "error";
                that.showText = "如您已注册过此学号，请直接登录；如您未注册过您的学号且确认您的学号输入无误，请联系QQ:932637981";
                that.snackbar = true;
                that.checkbox = false;
                // btn Loading
                that.btnLoading = false;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
            that.snackbarColor = "error";
            that.showText = "服务器错误";
            that.snackbar = true;
            // 只清空password和checkbox
            that.checkbox = false;
            that.password = "";
            // btn Loading
            that.btnLoading = false;
          });
      }

    },
    reset() {
      this.stu_number = "";
      this.password = "";
      this.checkbox = false;
    }
  }
};
</script>