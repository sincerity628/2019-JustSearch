<template>
<div id="wrong-time">
  <v-card class="wrong-card">
    <v-row>
      <v-col cols="12" sm="6">
        <div class="text-box">
          <h1 class="big-title">OOPS！</h1>
          <h3 class="second-title">现在不是比赛时间噢！</h3>
          <h4 class="">(或者您的队伍不足三人，不能参加比赛)</h4>
          <p class="last-text">你可以看看其他的页面，或者去了解了解大赛规则！</p>
          <v-btn color="error" class="mt-3" dark @click="toHome">回到首页</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="wrong-img">
          <img src="../assets/images/cat.jpg" />
        </div>
      </v-col>
    </v-row>
  </v-card>
</div>
</template>

<style scoped>
#wrong-time {
  background-color: #fff;
  padding: 5%;
}

.wrong-card {
  margin: 0 auto;
  width: 85%;
  padding: 2% 0;
}

.text-box {
  width: 80%;
  margin: 8% auto 0;
  padding-left: 10%;
}

.big-title {
  padding-top: 10%;
  font-size: 5rem;
  font-weight: 500;
  color: #333;
}

.second-title {
  color: #444;
  margin-top: 15%;
}

.last-text {
  color: grey;
}

.wrong-img {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.wrong-img img {
  width: 80%;
}

@media only screen and (max-width: 1120px) {
  .big-title {
    font-size: 4rem;
  }
}

@media only screen and (max-width: 900px) {
  .big-title {
    font-size: 3rem;
  }
}

@media only screen and (max-width: 680px) {
  .big-title {
    font-size: 2.5rem;
  }

  .text-box {
    padding-left: 10%;
  }
}
</style>

<script>
export default {
  data: function() {
    return {}
  },
  methods: {
    toHome: function() {
      this.$router.push("/");
    }

  },
  computed: {

  }
}
</script>
