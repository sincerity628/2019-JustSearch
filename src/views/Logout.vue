<template>
  <v-card class="logout">
    <h1 class="display-3 logout-title">
      Are you sure you want to go?
    </h1>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          class="logout-btn"
          fab
          dark
          x-large
          v-on="on"
          elevation="5"
          @click="userLogout"
          :loading="btnLoading"
          color="#242424"
        >
          <img src="../assets/icons/logout.png" alt="logout-icon" />
        </v-btn>
      </template>
      <span>退出登陆</span>
    </v-tooltip>

    <div class="snackbar text-center ma-2">
      <v-snackbar v-model="snackbar" top :color="snackbarColor">
        {{ showText }}
        <v-btn color="white" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </v-card>
</template>
<style>
.logout {
  background-image: url("../assets/images/exit.jpg");
  text-align: center;
  width: 1000px;
  height: 600px;
  margin: 5% auto;
}
.logout-title {
  position: absolute;
  top: 40%;
  right: 5%;
}
.logout-btn {
  position: absolute;
  bottom: 20%;
  right: 23%;
}
</style>

<script>
export default {
  data() {
    return {
      url: "http://101.132.44.32:8080/justsoso/",
      // 按钮加载样式
      btnLoading: false,
      // 消息弹框
      snackbarColor: "warning",
      showText: "",
      snackbar: false
    };
  },
  methods: {
    userLogout() {
      let that = this;
      this.btnLoading = true;
      this.axios
        .get(this.url + "logout")
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk === true) {
            that.btnLoading = false;
            // 显示消息弹框
            localStorage.setItem("isLogin", "0");
            that.snackbarColor = "success";
            that.showText = "退出登陆成功";
            that.snackbar = true;
            // settimeout
            let this_ = that;
            setTimeout(function() {
              this_.$router.push("/");
            }, 2000);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>