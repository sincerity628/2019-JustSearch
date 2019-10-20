<template>
<div class="about">
  <div class="about-first text-center">
    <h1 class="bg-heading">Hello</h1>
    <p class="first-text">你想看到什么样的信息？</p>
    <v-row class="mg-auto mt-10">
      <v-col cols="12" sm="4">
        <v-btn tile class="first-btn-1" large width="250" @click="toAward">大赛奖品</v-btn>
      </v-col>
      <v-col cols="12" sm="4">
        <p class="first-text mx-4 mt-2">or</p>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn tile class="first-btn-2" large width="250" @click="toRules">比赛须知</v-btn>
      </v-col>
    </v-row>
  </div>

  <div class="about-container">
    <div class="about-second">
      <div class="about-heading text-center change-title">活动背景</div>
      <v-row>
        <v-col cols="3">
          <img src="../assets/logos/just-soso-logo.png" alt="just-soso-logo" class="pc-nav just-soso-logo" />
        </v-col>
        <v-col cols="9">
          <div class="first-text info-text pc-nav">
            如今网络信息资源异常丰富，但是大多数学生只有简单的信息检索能力，对专业的信息检索方法、技巧以及检索得到的数据库都不甚了解，当需要更专业、准确的信息时，导致出现了学生不会利用学校的数字资源、搜索引擎和开放性资源，不知如何进行信息筛选、信息鉴别而得不到所要的精确信息。而在这个信息时代，信息广泛渗透到科技、文化、经济各个学科，因此快速、有效、经济地获取与自身需求相关的有用信息，已经成为当代大学生的一项不可或缺的基本技能。为了使大学生了解信息发展的最新动态，培养对信息知识的兴趣，计算机学院学生会和图书馆联合推出信息搜索大赛，让大家学会如何有效地检索所需的信息与资源。
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="phone-nav change-text first-text info-text">举办 Just 搜搜信息检索能力大赛是为了让同学们在竞赛中学会有效地利用检索系统和技巧，提高对信息的鉴别能力，培养信息创新能力，通过有趣的比赛形式，培养对信息检索知识的兴趣。</div>
    <div class="about-third" id="award">
      <div class="about-heading change-title text-center">奖项设定</div>
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item class="text-center">
          <img src="../assets/images/balance-car.png" alt="balance-car" class="award-img" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/kindle.png" alt="kindle" class="award-img" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/gugu.png" alt="typewriter" class="award-img" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/xiaomi-bracelet.png" alt="xiaomi-bracelet" class="award-img" />
        </v-carousel-item>
        <v-carousel-item class="text-center">
          <img src="../assets/images/xiaomi-sound.png" alt="xiaomi-sound" class="award-img" />
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="about-forth" id="rules">
      <div class="about-heading change-title text-center">比赛须知</div>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-card max-width="344" class="mx-auto" height="290">
            <v-card-title class="card-title">
              <img src="../assets/icons/circle-slice-1.png" alt="circle-slice-1" class="mr-5" />预选赛
            </v-card-title>
            <v-card-text>
              <ul>
                <li>预选赛是以线上答题的形式，以小组3人为单位，进行参赛队伍的筛选环节；</li>
                <li>线上答题共计一周时间，有不同难度等级的题目不予显示难度，每道题目有且仅有两次机会进行作答，共150题，每小题分值为2分；</li>
                <li>预选赛的优胜队伍是答题排名前50组的队伍，最终名单会在10月17日于比赛网站公示。</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-card max-width="344" class="mx-auto" height="290">
            <v-card-title class="card-title">
              <img src="../assets/icons/circle-slice-2.png" alt="circle-slice-2" class="mr-5" />
              团队赛
              <br />
              <div class="body-1">(第一环节：团队答题)</div>
            </v-card-title>
            <v-card-text>
              <ul>
                <li>以团体为单位进行答题，共30题【简单:中等:困难=12:12:6】，每道题应有两次提交机会；</li>
                <li>从第一题的第一次提交开始计时，提交错误则罚时2分钟，最终以答题得分和时间得分计算总分数和排名；</li>
                <li>排名前25名的队伍全员直接进入个人赛；</li>
                <li>比赛时间45分钟，得分比例为【简单:中等:困难=1:3:5】。</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-card max-width="344" class="mx-auto" height="290">
            <v-card-title class="card-title">
              <img src="../assets/icons/circle-slice-3.png" alt="circle-slice-3" class="mr-5" />
              团队赛
              <br />
              <div class="body-1">(第二环节：复活赛)</div>
            </v-card-title>
            <v-card-text>
              <ul>
                <li>本环节为未进入决赛的团体中成员以个人身份参加，角逐个人赛的参赛名额；</li>
                <li>本环节为个人答题，每人共10道题【中等题】，每道题有两次提交机会；</li>
                <li>从复活赛开始计时，提交错误罚时2分钟，限时20分钟；</li>
                <li>排名规则为：在限定时间内比较各位选手答对题目的数量，数量多者胜，相同答对数比较用时，用时短者胜；</li>
                <li>复活赛最多复活20名选手。</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-card max-width="344" class="mx-auto" color="#c9d99e" height="290">
            <v-card-title class="card-title">
              <img src="../assets/icons/coffee.png" alt="coffee" class="mr-5" />
              茶歇
            </v-card-title>
            <v-card-text class="black--text">
              <ul>
                <li>本环节为进入决赛的20组同学参加，可以稍作休息并为个人赛做准备；</li>
                <li>在团体赛结束后，晋级个人赛的同学可以在指定房间内休息，房间内有免费茶水提供。</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-card max-width="344" class="mx-auto" height="440">
            <v-card-title class="card-title">
              <img src="../assets/icons/circle-slice-5.png" alt="circle-slice-5" class="mr-5" />
              个人赛
            </v-card-title>
            <v-card-text>
              <ul>
                <li>个人赛是由团队赛晋级的60人加上复活成功的20人组成的；</li>
                <li>
                  团体赛的得分决定了个人赛的初始积分，团体赛排名前五名的队伍每人初始积分为
                  <strong>15</strong> 分，第六到第十名的队伍每人初始积分为
                  <strong>10</strong> 分，第十一到第二十的队伍每人初始积分为
                  <strong>5</strong> 分，成功复活的选手没有积分；
                </li>
                <li>个人赛时长为40分钟，共25道题目【简单:中等:困难=8:10:7】；</li>
                <li>从第一次提交开始计时，每道题有且只有两次答题机会，提交错误会有罚时；</li>
                <li>个人赛过程中，选手可以自主选择题目难度，积分比例按照【简单:中等:困难=2:5:8】分配，个人赛的成绩由积分和时间共同决定；</li>
                <li>积分为第一参考，时间为第二参考。</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-card max-width="344" class="mx-auto" height="440">
            <v-card-title class="card-title">
              <img src="../assets/icons/circle-slice-7.png" alt="circle-slice-7" class="mr-5" />
              决赛
            </v-card-title>
            <v-card-text>
              <ul>
                <li>个人赛中排名前20的人晋级决赛，并且保留个人赛的积分，决赛为三轮淘汰；</li>
                <li>第一轮为20进10，20名选手有十道必答题，十道抢答题，必答题时间为15分钟，15分钟过后必答环节结束；</li>
                <li>进入抢答环节，共有10道题，每题最多一分钟，选手抢到题目后，需在5秒内作答，否则算回答错误；</li>
                <li>本题结束后立即进入下题抢答，若一分钟内无人抢答，则进入下一题；</li>
                <li>第一轮结束后，排名前10的选手晋级下一轮；</li>
                <li>第二轮：10名选手共有十五道抢答题，最多15分钟，规则和上轮相同；</li>
                <li>第三轮：排名前5的选手进行最后决战，决战共有10道抢答题10分钟，规则同第一轮，结束后，得出总排名。</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
  <Footer />
</div>
</template>

<style>
.about {
  background-color: #fff;
  padding: 0;
  margin: 0;
}

.about-first {
  background-color: #003f81;
  padding: 10%;
  height: 550px;
}

.about-heading {
  margin: 3% 0;
  text-align: center;
}

.bg-heading {
  color: #fff;
  font-size: 7rem;
}

.first-text {
  color: rgb(228, 222, 222);
  font-size: 1.3rem;
}

.info-text {
  text-indent: 2em;
  color: #333333;
  line-height: 2;
  font-size: 1.2rem;
  margin: 5% 0 10%;
}

.just-soso-logo {
  height: 250px;
  margin-top: 15%;
}

@media only screen and (min-width: 600px) {
  .first-btn-1 {
    left: 40%;
  }

  .first-btn-2 {
    right: 40%;
  }

  .about-first {
    height: 750px;
  }
}

@media only screen and (max-width: 600px) {
  .award-img {
    height: 290px;
  }

  .card-title {
    font-size: 1.1rem;
  }
}

.about-container {
  width: 85%;
  /* border: #000 solid 1px; */
  margin: auto;
}

.mg-auto {
  margin: auto;
}

.icon-left {
  position: absolute;
  margin-left: 16%;
}
</style>

<script>
import Footer from "@/components/Footer";
export default {
  data() {
    return {};
  },
  components: {
    Footer
  },
  methods: {
    toAward() {
      document.querySelector("#award").scrollIntoView();
    },
    toRules() {
      document.querySelector("#rules").scrollIntoView();
    }
  },
  created: function() {
    if (!localStorage.hasOwnProperty("apology")) {
      // console.log("the apology is null!");
      localStorage.setItem("apology", "0");
    }
    if (localStorage.getItem("apology") === "0") {
      this.$router.push("apology");
      return;
    }
  }
};
</script>
