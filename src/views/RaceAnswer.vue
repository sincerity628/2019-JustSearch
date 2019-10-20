<template>
<div id="race-answer">
  <v-card class="race-card">
    <h1 class="race-title">抢答赛!</h1>
    <small>当前积分：{{ point }}</small>
    <div id="problem" v-if="Answering">
      <div class="number">#{{ round }}</div>
      <div class="time">- {{ time }} -</div>
      <small v-if="hint">这道题有同学答对了: ) 将在 {{ hintCountDown }} 秒后进入下一题倒计时</small>
      <small v-if="hint1">本题答题时间结束，没有同学答出来噢！: ) 将在 {{ hintCountDown }} 秒后进入下一题倒计时</small>
      <v-card-text>{{ problem.content }}</v-card-text>
      <v-radio-group v-model="problem.userChoosing" class="answers">
        <v-radio v-for="(answer, i) in problem.answers" :key="i" :label="answer" :value="i" color="#f66767"></v-radio>
      </v-radio-group>
      <v-btn color="#f0134d" dark class="mt-10" @click="submitAnswer" :disabled="!buttonAvailable">Submit.</v-btn>
    </div>
    <div id="countdown-box" v-else>
      <small>准备好噢！下一题即将来临...</small>
      <div id="countdown">
        {{ countDownNumber }}
      </div>
    </div>

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :color="snackbarColor" top>
        {{ text }}
        <v-btn color="white" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-card>
</div>
</template>

<style scoped>
#race-answer {
  background-color: #fff;
  padding: 5%;
}

.race-card {
  margin: 0 auto;
  width: 85%;
  padding: 2% 0;
  text-align: center;
}

.race-title {
  font-weight: 400;
}

#problem {
  margin: 5% 0;
}

.answers {
  margin-left: 15%;
}

.number {
  font-family: 'Mansalva', cursive;
  font-size: 3rem;
  position: absolute;
  left: 50px;
  top: 10px;
  color: #333;
}

.time {
  font-family: 'Mansalva', cursive;
  font-size: 1.5rem;
  position: absolute;
  right: 30px;
  top: 20px;
  color: #494ca2;
}

#countdown {
  font-family: 'Mansalva', cursive;
  font-size: 6rem;
  margin: 15% 0;
}

@media only screen and (max-width: 800px) {
  .number {
    font-size: 2.5rem;
    top: 20px;
    left: 15px;
  }
}

@media only screen and (max-width: 600px) {
  .number {
    font-size: 2rem;
    top: 15px;
    left: 10px;
  }
  .time {
    font-size: 1.2rem;
    right: 10px;
  }
}
</style>

<script>
const qs = require('qs');
export default {
  data: function() {
    return {
      url: "http://101.132.44.32:8080/justsoso/",
      problem: {
        pk: 0,
        content: "《基于PCK视角的数学原理的教学设计——以勾股定理为例》一文是基于PCK的什么视角",
        answers: ["3W + 3H", "3W + 3L", "3W + 3K", "3A + 3H"],
        userChoosing: -1,
        lastSubmit: -1
      },
      round: 1,
      point: 2,
      time: '03 : 30',
      endTime: 1571322236,
      leftTime: 10,
      error: true,

      snackbar: false,
      text: "hi, there",
      snackbarColor: "success",
      buttonAvailable: true,

      hint: false,
      hint1: false,
      hintCountDown: 5,

      Answering: true,
      countDownNumber: 10,
      ws: new WebSocket('ws://101.132.44.32:8080/justsoso/race_answer'),
    }

  },
  created: function() {
    this.getProblem();

  },
  methods: {
    getProblem: function() {
      let that = this;
      let form = {
        stu_id: localStorage.getItem('stu_num')
      }
      this.axios.post(this.url + 'race_answer', qs.stringify(form))
        .then(function(res) {
          // console.log(res);
          // 获取题目
          let resProblem = res.data;
          if (resProblem.answered_times == 1) {
            that.buttonAvailable = false;
          }
          that.problem.content = resProblem.question;
          that.problem.answers = resProblem.choices.split(',');
          that.problem.pk = resProblem.pk;
          that.point = resProblem.score;
          that.round = resProblem.round;
          that.endTime = resProblem.endTime;
          // console.log(that.endTime);
          let timer = setInterval(function() {
            let nowTime = Math.round(new Date().getTime() / 1000);
            that.leftTime = that.endTime - nowTime;
            if(that.leftTime === 0) {
              clearInterval(timer);
              that.text = "本题解答时间已到！";
              that.hint1 = true;
              that.snackbarColor = "error";
              that.snackbar = true;
              that.error = false;
              that.ws.close();
              that.buttonAvaliable = false;
              that.countDown();
            }
            let minute = Math.floor(that.leftTime / 60 % 60).toString();
            let second = Math.floor(that.leftTime % 60).toString();
            that.time = minute + " : " + second;
            // console.log(that.time);
          }, 1000);

          // 建立web socket连接
          that.ws = new WebSocket('ws://101.132.44.32:8080/justsoso/race_answer');
          that.ws.onopen = function() {
            console.log("Connection open...");
            that.ws.send(JSON.stringify(form));
          };

          that.ws.onmessage = function(res) {
            // console.log(res.data);
            if (res.data === "done") {
              that.text = "这道题有同学答对了！"
              that.snackbarColor = "success";
              that.snackbar = true;
              that.error = false;
              that.ws.close();
              that.hint = true;
              that.countDown();
            } else if(res.data === "time") {
              // that.ws.close();
              // that.countDown();
            }
          };
          that.ws.onclose = function() {
            console.log("Connection closed.");
            if(that.error) {
              that.text = "与服务器的连接已断开，请刷新页面！";
              that.snackbarColor = "error";
              that.snackbar = true;
            }        
          };
          // 建立好连接后，监听消息

          // 若有题目被完成的消息后断开连接

          // 显示倒计时那些东西（15秒）

          // 再次请求题目

        })
        .catch(function(error) {
          console.log(error);
        })
    },
    submitAnswer: function() {
      let that = this;
      let form = {
        pk: this.problem.pk,
        choice: this.problem.userChoosing
      }
      this.ws.send(JSON.stringify(form));

      this.ws.onmessage = function(res) {
        // console.log(res);
        if (res.data === "right") {
          that.error = false;
          that.ws.close();
          that.point += 20;
          that.text = "恭喜！抢答成功！";
          that.snackbarColor = "success";
          that.snackbar = true;
          that.buttonAvailable = false;
          that.hint = true;
          that.countDown();
        } else if (res.data === "wrong") {
          // that.ws.close();
          that.point -= 20;
          that.text = "哎呀答错了！";
          that.snackbarColor = "error";
          that.snackbar = true;
          that.buttonAvailable = false;
        }
      }
    },
    countDown: function() {
      let that = this;
      // console.log("countdown");
      let five = setInterval(function() {
        that.hintCountDown--;
        if (that.hintCountDown === 0) {
          clearInterval(five);
          that.Answering = false;
          that.hintCountDown = 5;
          that.hint = false;
          that.hint1 = false;
          let ten = setInterval(function() {
            that.countDownNumber--;
            if (that.countDownNumber === 0) {
              clearInterval(ten);
              that.countDownNumber = 10;
              that.Answering = true;
              that.buttonAvailable = true;
              that.round++;
              that.getProblem();
              return;
            }
          }, 1000);
        }
      }, 1000);
    }
  },
  computed: {

  }
}
</script>
