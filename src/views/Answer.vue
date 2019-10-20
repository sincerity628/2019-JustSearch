<template>
<div>
  <v-card class="answer">
    <v-card elevation="0">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-light display-1">工具栏</h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="mx-auto">
            <v-stepper alt-labels :value="stepText">
              <v-stepper-header class="step-header">
                <v-stepper-step step="预" :complete="isComplete1" color="#a0c334">预选赛</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="团" :complete="isComplete2" color="#a0c334">团体赛</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="复" :complete="isComplete3" color="#a0c334">复活赛</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="个" :complete="isComplete4" color="#a0c334">个人赛</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="决" :complete="isComplete5" color="#a0c334">决赛</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </div>
        </v-tab-item>
        <v-tab-item>
          <v-card elevation="1" class="tool-container">
            <v-row>
              <v-col cols="12" sm="4" class="grey--text tip-container">
                <v-row class="body-1 tip">
                  <img src="../assets/icons/tip.png" class="tip-img" alt="tip-icon" />
                  <div>Tips</div>
                </v-row>
                <v-row>
                  <div class="red-circle circle circle-margin"></div>
                  <div>本题尚未提交</div>
                </v-row>
                <v-row>
                  <div class="green-circle circle circle-margin"></div>
                  <span>本题提交过一次</span>
                </v-row>
                <v-row>
                  <div class="orange-circle circle circle-margin"></div>
                  <span>本题提交了两次</span>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h1 class="count-down">
                  <div v-if="isEnd">您已结束作答</div>
                  <div v-else>
                    <div>比赛结束还有：</div>
                    <br />
                    <div class="font-weight-light">{{ timer }}</div>
                  </div>
                </h1>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <v-row class="btn-group">
                  <v-col cols="6" sm="12">
                    <v-btn color="#543864" class="mt-0" dark @click="all">展开所有题目</v-btn>
                  </v-col>
                  <v-col cols="6" sm="12">
                    <v-btn color="#504658" class="mb-5" dark @click="none">收起所有题目</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-light display-1">答题区域</h1>
    </v-card-title>
    <div class="text-center">
      <p class="mx-auto">您已完成了： {{ answeredNum }} / {{ problemsNum }}</p>
    </div>
    <v-row justify="center">
      <div class="problems">
        <v-expansion-panels accordion multiple v-model="pannel">
          <v-expansion-panel v-for="problem in problems" :key="problem.id">
            <v-card class="color-circle circle" :color="answeredColor(problem.id)" absolute left></v-card>
            <v-expansion-panel-header>
              <div>Problem {{ (problem.id + 1) + 10 * (page - 1) }} (<span v-if="problem.difficulty=== 0">简单</span><span v-if="problem.difficulty=== 1">中等</span><span v-if="problem.difficulty=== 2">困难</span>)</div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-card-text>{{ problem.content }}</v-card-text>
              <v-card-actions>
                <v-form ref="form">
                  <v-radio-group v-model="problem.userChoosing">
                    <v-radio v-for="(answer, i) in problem.answers" :key="i" :label="answer" :value="i" color="#202060"></v-radio>
                  </v-radio-group>
                </v-form>
              </v-card-actions>
              <v-row>
                <v-col cols="6">
                  <small>本题已提交过 {{problem.answeredTimes}} 次</small>
                  <br />
                  <small>最后一次提交答案: {{answer[problem.lastSubmit]}}</small>
                </v-col>
                <v-col cols="6">
                  <v-btn @click="submitAnswer(problem.pk, problem.id, problem.userChoosing)" :disabled="problem.answeredTimes >= 2 || isEnd" :loading="btnLoading" tile color="indigo" dark absolute right>{{ (problem.answeredTimes === 0 ? "提交" : "再提交一次") }}</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-row>
    <div class="text-center">
      <div>
        <v-btn color="#504658" class="mb-5" dark @click="dialog = true" :disabled="isEnd">结束作答</v-btn>
      </div>
      <v-pagination v-model="page" :length="pageLength" :total-visible="8" circle class="mb-12 page" color="#504658"></v-pagination>
      <!-- 543864 -->
    </div>
  </v-card>
  <div class="text-center ma-2">
    <v-snackbar top :color="snackbarColor" v-model="snackbar">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">结束作答</v-card-title>
        <v-card-text>结束作答意味着你选择主动放弃某些题目的第二次提交机会，提交后你的比赛时间将会停止，较少的比赛时间会使你在同等分数的前提下排名靠前！</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="dialog = false">算了</v-btn>
          <v-btn color="red darken-1" text @click="endAnswer">结束</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-row justify="center">
    <v-dialog v-model="dialog1" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">你已经答完所有的题目啦</v-card-title>
        <v-card-text>
          现在你可以做两件事情：
          <ul>
            <li>继续修改一些题目的答案（每道题目有两次作答机会）</li>
            <li>到题目的最下方点击“结束作答”按钮结束作答（提交后你的比赛时间将会停止，较少的比赛时间会使你在同等分数的前提下排名靠前！）</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="dialog1 = false">我知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</div>
</template>

<style>
.answer {
  width: 85%;
  margin: 5% auto 10%;
}

.problems {
  margin: 5% auto;
  width: 85%;
}

.color-circle {
  margin: 10px 0 0 10px;
  background-color: #000;
}

.v-pagination__item--active {
  outline: none;
}

.v-pagination__navigation {
  outline: none;
}

.tool-container {
  height: 140px;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.green-circle {
  background-color: #00b746;
}

.red-circle {
  background-color: #ff2104;
}

.orange-circle {
  background-color: #ffc200;
}

.circle-margin {
  margin: 5px 10px 0 25%;
}

.count-down {
  font-size: 1.4rem;
  font-weight: 400;
  color: #333;
}

@media only screen and (max-width: 680px) {
  .count-down {
    font-size: 1.2rem;
  }
}

@media only screen and (max-width: 600px) {
  .tool-container {
    height: 300px;
  }

  .circle-margin {
    margin: 5px 10px 0 32%;
  }

  .tip-container {
    margin-top: 0;
  }

  .tip {
    padding-left: 4%;
  }

  .btn-group {
    position: relative;
    bottom: 20px;
  }
}

@media only screen and (max-width: 400px) {
  .step-header {
    position: relative;
    padding-right: 20%;
  }
}

.tip-container {
  margin-top: 0.7%;
}

.tip {
  margin-left: 35%;
  margin-bottom: 5px;
}

.tip-img {
  position: absolute;
  margin-bottom: 15px;
  margin-left: -30px;
  width: 25px;
  height: 25px;
}
</style>

<script>
const qs = require("qs");
export default {
  data() {
    return {
      url: "http://101.132.44.32:8080/justsoso/",
      userInfo: {
        num: "",
        name: "",
        sex: "",
        tel: "",
        qq: "",
        maj: "",
        isEnroll: false,
        team: {
          id: "",
          leader: "",
          teamName: "",
          teamMem: []
        },
        // 步骤完成情况
        stage: 0
      },
      // 消息提示
      snackbar: false,
      text: "Hello, I'm a snackbar",
      snackbarColor: "red",

      dialog: false,
      dialog1: false,
      pannel: [],
      overlay: false,
      btnLoading: false,

      // 目前比赛阶段
      stage: -1,
      stepText: "",
      page: 1,
      pageLength: 7,
      // 总的比赛阶段 1 2 3 4
      tab: null,
      items: ["比赛进度", "功能"],

      // 比赛时间点
      timeNodes: [],
      // 比赛开始时间
      nowTime: 0,
      // 比赛结束时间
      endTime: 0,
      // 比赛是否已经结束
      isEnd: false,
      // 看看返回的数据isFinished是不是这个意思，每个用户都有一个吗？
      // countdown
      timer: "",

      answer: ["A", "B", "C", "D"],
      // 总问题数
      problemsNum: 10,
      // 用户回答了的问题数
      answeredNum: 0,

      // 渲染在页面上的题目
      problems: [],
      // {
      //   id: 0,
      //   pk: 0,
      //   content: "lll 是 xxx",
      //   answers: ["A", "B", "C", "D"],
      //   userChoosing: -1,
      //   answeredTimes: 0,
      //   lastSubmit: -1
      // }
    };
  },
  created: function() {
    let that = this;
    if (!localStorage.hasOwnProperty("apology")) {
      // console.log("the apology is null!");
      localStorage.setItem("apology", "0");
    }
    if (localStorage.getItem("apology") === "0") {
      this.$router.push("apology");
      return;
    }
    this.userInfo.name = localStorage.getItem("stu_name");
    this.userInfo.num = localStorage.getItem("stu_num");
    if (localStorage.getItem("isLogin") != "1") {
      this.$router.push("login");
      return;
    }
    // 未连通服务器的测试
    /////////////////////////////////////////////////////////
    // that.stage = 0;
    /////////////////////////////////////////////////////////
    // if (that.stage === 1) {
    //   that.$router.push("wrong-time");
    // }
    // countdown
    this.axios
      .post(this.url + "get_stages")
      .then(function(res) {
        console.log(res.data);
        if (res.data.isOk) {
          /////////////////////////////////////////////////////////
          that.stage = res.data.stage;
          // console.log("stage: " + that.stage);

          if (that.stage === 1) {
            that.stepText = "预";
          } else if (that.stage === 2) {
            that.stepText = "团";
          } else if (that.stage === 3) {
            that.stepText = "复";
          } else if (that.stage === 4) {
            that.stepText = "个";
          } else if (that.stage === 5) {
            that.stepText = "决";
          }
          /////////////////////////////////////////////////////////
          // 判断现在是否在比赛时间内
          if (that.stage <= 0) {
            that.snackbar = true;
            that.text = "不在比赛时间！";
            that.snackbarColor = "warning";
            that.$router.push("wrong-time");
            return;
          }
          /////////////////////////////////////////////////////////
          // 判断是否为抢答赛，还有一个是否晋级的变量
          // that.stage = 6;
          if (that.stage >= 5) {
            that.$router.push("race-answer");
            return;
          }
          // console.log(that.stage);
          // console.log(that.timeNow);
          that.timeNodes = [];
          for (let i = 0; i < res.data.stages.length; i++) {
            let timeNode = {
              name: "",
              timeStart: 0,
              timeEnd: 0,
            };
            timeNode.name = res.data.stages[i].fields.name;
            timeNode.timeStart = res.data.stages[i].fields.timeStart;
            timeNode.timeEnd = res.data.stages[i].fields.timeEnd;
            // console.log(timeNode);
            that.timeNodes.push(timeNode);
          }
          // console.log(that.timeNodes);
          // 判断比赛处于什么阶段(利用stage即可)
          that.endTime = that.timeNodes[that.stage - 1].timeEnd;
          let timer = setInterval(that.countDown, 1000);
        } else {
          // 失败
          that.snackbar = true;
          that.text = "获取比赛时间失败，请检查网络连接";
          that.snackbarColor = "red"
        }
      })
      .catch(function(error) {
        console.log(error);
        // 失败
        that.snackbar = true;
        that.text = "获取比赛时间失败，请检查网络连接";
        that.snackbarColor = "red"
      });

    let getProblemForm = {
      stu_num: this.userInfo.num
    };
    this.axios
      .post(this.url + "get_questions/0", qs.stringify(getProblemForm))
      .then(function(res) {
        console.log(res.data);
        let teamMem = res.data.userInfo.team.mems.length;
        /////////////////////////////////////////////////////////
        if (teamMem < 3) {
          that.isEnd = true;
          that.$router.push('wrong-time');
        }
        /////////////////////////////////////////////////////////
        if (res.data.isOk) {
          that.problems = [];
          // 设置返回信息
          that.pageLength = res.data.page_count;
          that.page = res.data.page_num;
          that.problemsNum = res.data.problem_count;
          /////////////////////////////////////////////////////////
          that.isEnd = res.data.isFinished;
          // console.log(that.isEnd);
          that.answeredNum = res.data.answered_num_all;
          // console.log(that.answeredNum);
          /////////////////////////////////////////////////////////
          // for循环设置问题数组
          for (let i = 0; i < res.data.questions.length; i++) {
            let problem = {
              id: 0,
              pk: 0,
              content: "lll 是 xxx",
              answers: ["A", "B", "C", "D"],
              userChoosing: -1,
              answeredTimes: 0,
              lastSubmit: -1,
              difficulty: -1
            };
            let resQuestion = res.data.questions[i];
            // console.log(resQuestion);
            problem.id = i;
            problem.pk = resQuestion.pk;
            problem.content = resQuestion.fields.question_text;
            let answers = resQuestion.fields.choices.split(",");
            problem.answers = answers;
            problem.answeredTimes = resQuestion.answeredTimes;
            problem.lastSubmit = resQuestion.lastSubmit;
            problem.difficulty = resQuestion.fields.difficulty;
            // console.log(problem);
            that.problems.push(problem);
          }
          // console.log(that.problems);
        } else {
          that.text = "获取题目失败！请检查网络连接";
          that.snackbarColor = "error";
          that.snackbar = true;
        }
      })
      .catch(function(error) {
        console.log(error);
        that.text = "获取题目失败！请检查网络连接";
        that.snackbarColor = "error";
        that.snackbar = true;
      });
  },
  beforeMount: function() {

  },
  computed: {
    isComplete1: function() {
      return this.stage > 1;
    },
    isComplete2: function() {
      return this.stage > 2;
    },
    isComplete3: function() {
      return this.stage > 3;
    },
    isComplete4: function() {
      return this.stage > 4;
    },
    isComplete5: function() {
      return this.stage > 5;
    }
  },
  methods: {
    submitAnswer(pk, index, userChoosing) {
      let that = this;
      this.btnLoading = true;
      if (userChoosing == -1) {
        this.snackbar = true;
        this.text = "请选择一个答案！";
        this.snackbarColor = "error";
        this.btnLoading = false;
        return;
      }
      let form = {
        stu_num: this.userInfo.num,
        pk: pk,
        choice: userChoosing
      }
      // console.log(form);
      this.axios.post(this.url + "submit_answer", qs.stringify(form))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            that.btnLoading = false;
            that.text = "提交成功";
            that.snackbarColor = "success";
            that.snackbar = true;
            if (that.problems[index].answeredTimes < 1) {
              that.answeredNum++;
              // console.log(this.answeredNum);
            }
            if (that.problems[index].answeredTimes < 2) {
              that.problems[index].answeredTimes++;
            }
            that.problems[index].lastSubmit = userChoosing;
            if (that.answeredNum === that.problemsNum) {
              that.dialog1 = true;
            }
          } else {
            that.btnLoading = false;
            that.text = "提交失败";
            that.snackbarColor = "error";
            that.snackbar = true;
          }
        })
        .catch(function(error) {
          console.log(error);
          that.btnLoading = false;
          that.text = "提交失败";
          that.snackbarColor = "error";
          that.snackbar = true;
        })

      // 没有连接互联网的测试
    },
    endAnswer: function() {
      let that = this;
      // console.log("End");
      let form = {
        allOk: true,
        stu_num: this.userInfo.num,
      }
      this.$axios
        .post(this.url + "submit_answer", qs.stringify(form))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            // console.log("结束作答成功", res);
            that.snackbarColor = "success";
            that.text = "结束作答成功"
            that.snackbar = true;

            that.isEnd = true;
          } else {
            // console.log("还有题目未答完噢！");
            that.snackbarColor = "error";
            that.text = "还有题目未答完噢！"
            that.snackbar = true;

            // 测试！！！！
            /////////////////////////////////////////////////////////
            // that.isEnd = true;
            // console.log(that.isEnd);
            /////////////////////////////////////////////////////////
          }
          that.dialog = false;

        })
        .catch(function(error) {
          console.log(error);
          that.snackbarColor = "error";
          that.text = "服务器出错，结束作答失败";
          that.snackbar = true;
          that.dialog = false;
        });
    },
    answeredColor: function(index) {
      let times = this.problems[index].answeredTimes;
      if (times === 0) return "red";
      else if (times === 1) return "green";
      else return "yellow darken-2";
    },
    all: function() {
      this.pannel = [...Array(this.problemsNum).keys()].map((k, i) => i);
    },
    none: function() {
      this.pannel = [];
    },
    countDown: function() {
      this.nowTime = Math.round(new Date().getTime() / 1000);
      let leftTime = this.endTime - this.nowTime;
      // console.log(leftTime);
      let hour = Math.floor(leftTime / 3600).toString();
      let minute = Math.floor(leftTime / 60 % 60).toString();
      let second = Math.floor(leftTime % 60).toString();

      this.timer = hour + " h " + minute + " min " + second + " s";
      // console.log(this.timer);
    }
  },
  // 改变页码
  watch: {
    page: function() {
      let that = this;
      // console.log(that.page);
      let getProblemForm = {
        stu_num: this.userInfo.num
      };
      this.overlay = true;
      this.axios
        .post(this.url + "get_questions/" + that.page.toString(), qs.stringify(getProblemForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            that.overlay = false;
            that.problems = [];
            // 设置返回信息
            that.pageLength = res.data.page_count;
            that.page = res.data.page_num;
            that.problemsNum = res.data.problem_count;
            /////////////////////////////////////////////////////////
            that.isEnd = res.data.isFinished;
            // console.log(that.isEnd);
            that.answeredNum = res.data.answered_num_all;
            // console.log(that.answeredNum);
            /////////////////////////////////////////////////////////
            // for循环设置问题数组
            for (let i = 0; i < res.data.questions.length; i++) {
              let problem = {
                id: 0,
                pk: 0,
                content: "lll 是 xxx",
                answers: ["A", "B", "C", "D"],
                userChoosing: -1,
                answeredTimes: 0,
                lastSubmit: -1
              };
              let resQuestion = res.data.questions[i];
              // console.log(resQuestion);
              problem.id = i;
              problem.pk = resQuestion.pk;
              problem.content = resQuestion.fields.question_text;
              let answers = resQuestion.fields.choices.split(",");
              problem.answers = answers;
              problem.answeredTimes = resQuestion.answeredTimes;
              problem.lastSubmit = resQuestion.lastSubmit;
              problem.difficulty = resQuestion.fields.difficulty;
              // console.log(problem);
              that.problems.push(problem);
            }
            // console.log(that.problems);
          } else {
            // 失败
            that.overlay = false;
            that.snackbarColor = "error";
            that.text = "服务器出错，获取题目失败";
            that.snackbar = true;
          }
        })
        .catch(function(error) {
          console.log(error);
          that.overlay = false;
          that.snackbarColor = "error";
          that.text = "服务器出错，获取题目失败";
          that.snackbar = true;
        });
    }
  }
}
</script>
