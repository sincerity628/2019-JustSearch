<template>
<div>
  <v-card class="">
    <v-tabs v-model="tab" background-color="transparent" centered color="grey darken-1">
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item class="pb-10">
        <v-card class="mx-auto ranking-container">
          <div class="ranking-title text-center">
            <p class="black--text title-change title-padding">团队名次</p>
          </div>
          <v-simple-table fixed-header height="100%">
            <thead>
              <tr>
                <th class="text-left">名次</th>
                <th class="text-left">队伍名称</th>
                <th class="text-left">总积分</th>
                <th class="text-left">题目完成情况</th>
              </tr>
            </thead>
            <tbody is="transition-group" name="fade">
              <tr v-for=" (item, index) in teams" :key="index">
                <td>{{index + 1}}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.point }}</td>
                <td>
                  <div>
                    <v-progress-linear color="#347474" :buffer-value="item.completed" stream></v-progress-linear>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-tab-item>
      <v-tab-item class="pb-10">
        <v-card class="mx-auto ranking-container">
          <div class="ranking-title text-center">
            <p class="title-change people-ranking-title title-padding">个人名次</p>
          </div>
          <v-simple-table fixed-header height="100%">
            <thead>
              <tr>
                <th class="text-left">名次</th>
                <th class="text-left">姓名</th>
                <th class="text-left">总积分</th>
                <th class="text-left">题目完成情况</th>
              </tr>
            </thead>
            <tbody is="transition-group" name="fade">
              <tr v-for=" (item, index) in person" :key="index">
                <td>{{index + 1}}</td>
                <td>{{ item.name }}</td>
                <td><span v-if="stage === 1 || stage === 2">(团队赛)</span><span v-else>{{ item.point }}</span></td>
                <td>
                  <div>
                    <v-progress-linear color="#f07b3f" :buffer-value="item.completed" stream></v-progress-linear>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  <div class="text-center ma-2">
    <v-snackbar top :color="snackbarColor" v-model="snackbar">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</div>
</template>

<style>
.ranking-container {
  width: 85%;
  margin: 1% auto 5%;
}

.title-padding {
  padding: 4%;
}

.ranking-title {
  background-color: #c9d99e;
}

.people-ranking-title {
  background-color: #f6d365;
}

.title-change {
  font-size: 3.5rem;
  font-weight: 300;
}

@media only screen and (max-width: 600px) {
  .title-padding {
    padding: 10%;
  }

  .title-change {
    font-size: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>

<script>
const qs = require("qs");
export default {
  data() {
    return {
      url: "http://101.132.44.32:8080/justsoso/",
      tab: null,
      items: [
        "团队排名", "个人排名"
      ],
      // 比赛阶段
      stage: 0,
      // 用户学号
      num: "",
      // 队伍排名
      teams: [],
      // 个人排名
      person: [],

      snackbar: false,
      snackbarColor: "",
      text: ""
    };
  },
  created() {
    let that = this;
    if (!localStorage.hasOwnProperty("apology")) {
      // console.log("the apology is null!");
      localStorage.setItem("apology", "0");
    }
    if (localStorage.getItem("apology") === "0") {
      this.$router.push("apology");
      return;
    }

    this.num = localStorage.getItem("stu_num");
    if (localStorage.getItem("isLogin") != "1") {
      this.$router.push("login");
      return;
    }

    let askForm = {
      stu_id: this.num
    };
    this.axios
      .post(this.url + "get_rank", qs.stringify(askForm))
      .then(function(res) {
        // console.log(res.data);
        that.stage = res.data.stage;
        that.teams = [];
        that.person = [];
        if (res.data.isOk) {
          let totalNum = res.data.total_questions;
          for (let i = 0; i < res.data.teams.length; i++) {
            let resTeam = res.data.teams[i];
            let completed = resTeam[3] / totalNum;
            let team = {
              id: resTeam[0],
              name: resTeam[1],
              point: resTeam[2],
              completed: completed * 100
            }
            that.teams.push(team);
          }
          for (let i = 0; i < res.data.users.length; i++) {
            let resPerson = res.data.users[i];
            let completed = resPerson[3] / totalNum;
            let user = {
              id: resPerson[0],
              name: resPerson[1],
              point: resPerson[2],
              completed: completed * 100
            }
            // console.log(user);
            that.person.push(user);
          }
        } else {
          // 失败
          that.snackbar = true;
          that.text = "获取排名失败，请检查网络连接",
            that.snackbarColor = "red"
        }
      })
      .catch(function(error) {
        console.log(error);
        // 失败
        that.snackbar = true;
        that.text = "获取比赛排名失败，请检查网络连接",
          that.snackbarColor = "red"
      });
    let refreshIt = setInterval(that.refresh, 4000);
  },
  methods: {
    shuffle: function() {
      this.teams = _.shuffle(this.teams);
    },
    refresh: function() {
      let that = this;
      let form = {
        stu_id: this.num,
      };
      this.teams = [];
      this.person = [];
      // console.log("Refreshing the ranking...");
      this.axios.post(this.url + "get_rank", qs.stringify(form))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            let totalNum = res.data.total_questions;
            for (let i = 0; i < res.data.teams.length; i++) {
              let resTeam = res.data.teams[i];
              let completed = resTeam[3] / totalNum;
              // console.log(completed);
              let team = {
                id: resTeam[0],
                name: resTeam[1],
                point: resTeam[2],
                completed: completed * 100
              }
              that.teams.push(team);
            }
            for (let i = 0; i < res.data.users.length; i++) {
              let resPerson = res.data.users[i];
              let user = {
                id: resPerson[0],
                name: resPerson[1],
                point: resPerson[2],
                completed: 0
              }
              that.person.push(user);
            }
          } else {
            // 失败
            that.snackbar = true;
            that.text = "获取排名失败，请检查网络连接",
              that.snackbarColor = "red"
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
