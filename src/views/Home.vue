<template>
  <div class="home">
    <div class="mg-auto">
      <!-- 大赛介绍 -->
      <div class="first">
        <img src="../assets/logos/justsoso-white.png" alt="justsoso-logo" class="justsoso-logo" />
        <div
          class="white--text change-text change-place"
        >“在这个信息时代，信息广泛渗透到科技、文化、经济各个学科，因此快速、有效、经济地获取与自身需求相关的有用信息，已经成为当代大学生的一项不可或缺的基本技能。”</div>
        <router-link to="/about">
          <v-btn class="about-btn" outlined color="white">
            <div>大赛详情与规则</div>
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </router-link>
      </div>

      <!-- 图片延迟效果 -->
      <v-parallax dark src="../assets/images/bg-1.jpg" height="350" class="change-parallax">
        <v-row align="center" justify="center">
          <h1 class="just-search-text font-weight-thin mb-4">Just Search</h1>
          <h4 class="subheading">Build your dream today!</h4>
        </v-row>
      </v-parallax>

      <div class="question-container">
        <div class="question-title text-center change-title">你敢来挑战吗？！</div>
        <v-row>
          <v-col cols="12" sm="8">
            <div class="question change-text mt-0">
              <span class="quotaion-mark">“</span>
              为庆祝建国70周年发行的150克金质纪念币上有下列哪个图案呢？
              <span class="quotaion-mark">”</span>
              <v-form v-model="valid">
                <v-radio-group v-model="answer" row class="mt-10">
                  <v-radio label="太阳" value="0" color="grey darken-2"></v-radio>
                  <v-radio label="人像" value="1" color="grey darken-2"></v-radio>
                  <v-radio label="石榴" value="2" color="grey darken-2"></v-radio>
                  <v-radio label="鸽子" value="3" color="grey darken-2"></v-radio>
                </v-radio-group>
                <v-btn
                  @click="checkAnswer"
                  :disabled="!valid"
                  tile
                  color="grey darken-3"
                  dark
                  absolute
                  class="mt-5"
                >提交</v-btn>
              </v-form>
              <div class="text-center ma-2">
                <v-snackbar v-model="snackbar" :color="snackbarColor" top>
                  {{ text }}
                  <v-btn text @click="snackbar = false" color="white">Close</v-btn>
                </v-snackbar>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="4" class="text-center">
            <a href="https://finance.ifeng.com/c/7pkjo1NpUzA" target="_blank">
              <div class="coin-img"></div>
            </a>
          </v-col>
        </v-row>
      </div>

      <v-carousel
        cycle
        height="600"
        hide-delimiter-background
        show-arrows-on-hover
        class="change-parallax"
      >
        <v-carousel-item class="text-center">
          <img src="../assets/images/slide1.jpg" alt="slide1" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/slide2.jpg" alt="slide2" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/slide3.jpg" alt="slide3" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/slide4.jpg" alt="slide4" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/cat.jpg" alt="cat" />
        </v-carousel-item>
      </v-carousel>

      <!-- 赞助商 -->
      <div class="sponsor">
        <h1 class="align-center sponser-title change-title">主办单位</h1>
        <v-row align="center" justify="center">
          <v-col cols="6" sm="3" class="align-center">
            <a href="http://cs.shu.edu.cn/" target="_blank">
              <!-- <div class="CES-logo mg-auto"></div> -->
              <img src="../assets/logos/CES-logo.png" alt="CES-logo" class="change-logo-size" />
            </a>
          </v-col>
          <v-col cols="6" sm="3" class="align-center">
            <a href="http://www.lib.shu.edu.cn/" target="_blank">
              <!-- <div class="lib-logo mg-auto"></div> -->
              <img src="../assets/logos/lib2-logo.jpg" alt="lib-logo" class="change-logo-size" />
            </a>
          </v-col>
          <v-col cols="6" sm="3" class="align-center">
            <a href="http://residential.shu.edu.cn/" target="_blank">
              <!-- <div class="community-logo mg-auto"></div> -->
              <img
                src="../assets/logos/community-logo.png"
                alt="community-logo"
                class="change-logo-size"
              />
            </a>
          </v-col>
          <v-col cols="6" sm="3" class="align-center">
            <a href="http://www.xgb.shu.edu.cn/" target="_blank">
              <!-- <div class="community-logo mg-auto"></div> -->
              <img src="../assets/logos/xgb-logo.png" alt="xgb-logo" class="change-logo-size1" />
            </a>
          </v-col>
        </v-row>
        <h1 class="align-center sponser-title my-10 change-title">协办单位</h1>
        <v-row>
          <v-col cols="12" class="align-center">
            <a href="https://www.accenture.com/cn-zh" target="_blank">
              <img src="../assets/logos/Acc-logo.png" alt="acc-logo" class="change-logo-size1" />
            </a>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="thanks-container">
      <h1 class="align-center sponser-title change-title">感谢幕后的工作人员们！</h1>
    </div>
    <Footer />
  </div>
</template>

<style>
.v-application a {
  color: #333333 !important;
}
.home {
  background-color: #000;
}
.home-container {
  margin: auto;
}
.question-container {
  background-color: #fff;
  padding: 5% 0;
}
.question-title {
  color: rgb(92, 90, 90);
}
.alert-icon {
  position: absolute;
  margin-left: -40px;
}
.question {
  color: rgb(92, 90, 90);
  padding: 10%;
  padding-top: 5%;
  margin-left: 15%;
}
.quotaion-mark {
  font-weight: bold;
  font-size: 3rem;
  color: rgb(122, 119, 119);
}
.coin-img {
  margin: auto;
  margin-top: 10%;
  background-image: url("../assets/images/coin-back.png");
  height: 213px;
  width: 250px;
}
.coin-img:hover {
  background-image: url("../assets/images/coin-front.png");
}
.first {
  padding: 20% 10% 13%;
}
.thanks-container {
  padding: 5% 5%;
  background-color: #e2e1dc;
}
.justsoso-logo {
  height: 230px;
  position: absolute;
  top: 1%;
  left: 0;
}
.just-search-text {
  font-size: 4rem;
  font-weight: 400;
}
.sponsor {
  background-color: #fff;
  padding: 5% 5%;
  height: 100%;
}
.sponser-title {
  color: #333333;
  margin-bottom: 100px;
}
.change-text {
  font-size: 2rem;
}
.about-btn {
  margin: 10% 0 0 80%;
  /* margin-left: 80%; */
}
.change-title {
  font-size: 2.3rem;
  font-weight: 400;
}
@media only screen and (max-width: 1050px) {
  .justsoso-logo {
    height: 190px;
    top: 5px;
  }
}
@media only screen and (max-width: 930px) {
  .change-text {
  }
  .change-place {
    margin-top: 10%;
  }
  .about-btn {
    width: 150px;
    margin-left: 60%;
  }
  .question {
    margin-left: 5%;
  }
}

@media only screen and (max-width: 600px) {
  .sponser-title {
    margin-bottom: 30px;
  }
  .change-text {
    font-size: 1.2rem;
  }
  .change-place {
    margin: 20% 5% 0 0;
  }
  .justsoso-logo {
    height: 130px;
    top: 0;
  }
  .about-btn {
    height: 50px;
    width: 140px;
    margin-left: 50%;
  }
  .change-parallax {
    height: 250px !important;
  }
  .just-search-text {
    font-size: 3rem;
  }
  .question {
    margin-left: 10px;
    padding: 5%;
  }
  .quotaion-mark {
    font-weight: bold;
    font-size: 1.5rem;
    color: rgb(122, 119, 119);
  }
  .change-title {
    font-size: 1.5rem !important;
  }
  .coin-img {
    margin: 0 auto;
    height: 0;
  }
  .change-logo-size {
    height: 100px;
  }
  .change-logo-size1 {
    height: 35px;
  }
}
.align-center {
  text-align: center;
}
.mg-auto {
  margin: auto;
}
</style>

<script>
import Footer from "@/components/Footer";
const qs = require("qs");
export default {
  components: {
    Footer
  },
  data() {
    return {
      valid: false,
      answer: "",
      // 提示文字
      snackbar: false,
      snackbarColor: "success",
      text: "Hello, I'm a snackbar"
    };
  },
  created() {
    if(!localStorage.hasOwnProperty("apology")) {
      // console.log("the apology is null!");
      localStorage.setItem("apology", "0");
    }
    if(localStorage.getItem("apology") === "0") {
      this.$router.push("apology");
      return;
    }
    // // 打开网页就获取主页轮播图片的信息？？？
    //   this.axios
    //   .post(this.url + "getImgInfo")
    //   .then(function(res) {
    //     console.log(res.data);
    //     // 返回什么轮播图的URL？
    //     // let imgUrl = res.data.imgUrl;

    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  methods: {
    checkAnswer() {
      if (this.answer === "") {
        this.snackbarColor = "warning";
        this.text = "选一个答案再提交噢！";
        this.snackbar = true;
      } else if (this.answer === "2") {
        this.snackbarColor = "success";
        this.text = "哇塞！厉害呀！";
        this.snackbar = true;
      } else {
        this.snackbarColor = "error";
        this.text = "看看给出的图片提示吧！";
        this.snackbar = true;
      }
    }
  }
};
</script>
