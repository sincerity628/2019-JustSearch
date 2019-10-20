<template>
  <div>
    <div class="userinfo-container">
      <v-card color="basil" height="100%">
        <v-card-title class="text-center justify-center">
          <h1 class="font-weight-light display-1 basil--text">欢迎你！{{userInfo.name}}</h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="transparent" color="grey darken-2" grow>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat color="basil">
              <v-row class="pa-0 ma-0">
                <v-col cols="12" md="6" sm="6" xs="12" class="pa-0 pt-2">
                  <img
                    src="../assets/images/info.jpg"
                    alt="Photo by Mads Schmidt Rasmussen on Unsplash"
                    width="100%"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="12" v-if="this.userInfo.maj != ''">
                  <div class="user-info">
                    <div>学号：{{userInfo.num}}</div>
                    <div>联系方式：{{userInfo.tel}}</div>
                    <div>qq： {{userInfo.qq}}</div>
                    <div>专业： {{userInfo.maj}}</div>
                  </div>
                  <div class="mt-10 text-center">
                    <v-btn outlined color="grey" @click="dialog = true">修改信息</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="12" v-else>
                  <div class="log-info">先报名参赛去完善你的信息哦！</div>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat color="basil">
              <v-row class="pa-0 ma-0">
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="6"
                  class="pa-0 mx-auto"
                  v-if="this.userInfo.team.id != ''"
                >
                  <p
                    class="headline text-center mt-3"
                  >{{userInfo.team.teamName}}（ID：{{userInfo.team.id}}）</p>
                  <v-list subheader>
                    <v-subheader>小组成员</v-subheader>

                    <v-list-item v-for="(mem, index) in userInfo.team.teamMem" :key="index">
                      <v-list-item-avatar>
                        <v-img src="../assets/icons/people-black.png"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{mem}}
                          <span v-if="mem === userInfo.team.leader">（队长）</span>
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-icon
                        v-if="userInfo.name === userInfo.team.leader && mem != userInfo.team.leader"
                      >
                        <v-row justify="center">
                          <v-dialog v-model="dialog3" persistent max-width="290">
                            <template v-slot:activator="{ on }">
                              <v-tooltip left>
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    class="mx-2 mem-del"
                                    height="20"
                                    width="20"
                                    fab
                                    dark
                                    x-small
                                    color="red lighten-1"
                                    v-on="on"
                                    @click="dialog3 = true"
                                  >
                                    <v-icon dark>mdi-minus</v-icon>
                                  </v-btn>
                                </template>
                                <span>移除队友</span>
                              </v-tooltip>
                            </template>
                            <v-card>
                              <v-card-title class="headline">确定要移除此队员吗？</v-card-title>
                              <v-card-text>移除队友后，将不可恢复</v-card-text>
                              <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn color="green darken-1" text @click="dialog3 = false">算了</v-btn>
                                <v-btn color="red darken-1" text @click="removeMem(index)">移除</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-row>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                  <div class="text-center">
                    <v-row justify="center">
                      <v-dialog v-model="dialog4" persistent max-width="290">
                        <template v-slot:activator="{ on }">
                          <v-btn outlined class="my-5" color="red lighten-1" v-on="on">
                            <span v-if="userInfo.name === userInfo.team.leader">解散</span>
                            <span v-else>退出</span>队伍
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="headline">
                            确定要
                            <span v-if="userInfo.name === userInfo.team.leader">解散</span>
                            <span v-else>退出</span>队伍吗？
                          </v-card-title>
                          <v-card-text>
                            <div v-if="userInfo.name === userInfo.team.leader">解散队伍后，你的队友们将无家可归！</div>
                            <div v-else>确定要走吗？不再想想？</div>
                          </v-card-text>
                          <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="green darken-1" text @click="dialog4 = false">我再想想</v-btn>
                            <v-btn
                              color="red darken-1"
                              text
                              @click="removeTeam"
                              v-if="userInfo.name === userInfo.team.leader"
                            >解散！</v-btn>
                            <v-btn color="red darken-1" text @click="quitTeam" v-else>退出！</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  xs="12"
                  sm="12"
                  md="6"
                  class="pa-0 mx-auto team-info"
                  v-else
                >先加入一个队伍吧！</v-col>
                <v-col cols="12" md="6" sm="12" xs="12" class="pa-0 pt-2">
                  <img
                    src="../assets/images/group.jpg"
                    alt="Photo by Anthony Martino on Unsplash"
                    width="100%"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
    <div class="time-container">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item color="green">
          <template v-slot:opposite>
            <span>报名参赛</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">ARE YOU READY ??</v-card-title>
            <v-card-text>报名参加大赛需要完善一些你的信息哦！</v-card-text>
            <v-card-actions>
              <v-row>
                <v-dialog v-model="dialog" persistent max-width="400px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      right
                      outlined
                      class="ml-6 mb-3"
                      color="grey"
                      v-on="on"
                      v-show="stageOne"
                    >点我报名</v-btn>
                  </template>
                  <v-form ref="form" v-model="valid">
                    <v-card>
                      <v-card-title>
                        <span class="headline">完善信息</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="6">
                              <v-text-field
                                loading
                                label="姓名*"
                                required
                                color="green"
                                v-model="userInfo.name"
                                :rules="nameRules"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                :items="['男', '女']"
                                label="性别*"
                                required
                                color="green"
                                v-model="userInfo.sex"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="联系方式*"
                                loading
                                persistent-hint
                                required
                                color="green"
                                v-model="userInfo.tel"
                                :rules="telRules"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                              <v-text-field
                                label="QQ*"
                                required
                                loading
                                color="green"
                                v-model="userInfo.qq"
                                :rules="qqRules"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="专业*"
                                required
                                loading
                                color="green"
                                v-model="userInfo.maj"
                                :rules="majRules"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="red lighten-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="green lighten-1" text @click="submitInfo" :disabled="!valid">
                          更新信息
                          <span v-if="!userInfo. isEnroll">（确定报名）</span>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </v-dialog>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
        <v-timeline-item color="green">
          <template v-slot:opposite>
            <span>组建队伍</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">建立/加入队伍</v-card-title>
            <v-card-text>
              参加比赛的小可爱们，恭喜你们报名成功啦。现在你们可以选择
              <strong>创建</strong>属于自己的队伍（你将成为队长），或者选择
              <strong>加入</strong>别人的队伍~
              <br />Ps.每个队伍为3人哟~
            </v-card-text>
            <v-card-actions v-show="stageTwo">
              <div class="flex-grow-1"></div>
              <v-btn color="grey" outlined class="mr-2 mb-3" @click="dialog1 = true">建立队伍</v-btn>
              <v-btn color="grey" outlined class="mr-5 mb-3" @click="dialog2 = true">加入队伍</v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
        <v-row justify="center">
          <v-dialog v-model="dialog1" persistent max-width="600px">
            <v-form ref="form" v-model="valid1">
              <v-card>
                <v-card-title>
                  <span class="headline">给你的队伍起个好听的名字吧！</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="队伍名称*"
                          required
                          loading
                          color="grey"
                          v-model="userInfo.team.teamName"
                          :rules="teamRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="red lighten-1" text @click="dialog1 = false">Close</v-btn>
                  <v-btn color="green lighten-1" text @click="newTeam" :disabled="!valid1">创建队伍</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="dialog2" persistent max-width="600px">
            <!-- 找到合适的队伍vaild2才变成有效 -->
            <v-form ref="form">
              <v-card>
                <v-card-title>
                  <span class="headline">加入一个队伍吧！</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="队伍ID/队长名字/队伍名称"
                          required
                          loading
                          color="grey"
                          v-model="findTeamName"
                          :rules="teamRules"
                        ></v-text-field>
                        <small>{{answer}}</small>
                        <div>
                          <small>队伍ID优先匹配哦！</small>
                        </div>
                      </v-col>
                    </v-row>
                    <div v-if="this.foundTeam.name != ''">
                      队名：{{this.foundTeam.name}}
                      <br />
                      队长：{{this.foundTeam.leader}}
                      <br />
                      人数：{{this.foundTeam.people}}
                    </div>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="red lighten-1" text @click="dialog2 = false">Close</v-btn>
                  <v-btn color="green lighten-1" text @click="joinTeam" :disabled="!valid2">加入队伍</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-row>
        <v-timeline-item color="green">
          <template v-slot:opposite>
            <span>准备参赛</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">调整队伍</v-card-title>
            <v-card-text>
              恭喜你找到了自己合适的队友，现在可以对队伍进行调整，一旦开始答题，小组成员将
              <span class="red--text">不可变更</span> ！
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-bind:color="color4">
          <template v-slot:opposite>
            <span>10.12-10.16</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">预选赛</v-card-title>
            <v-card-text>
              1.以团队线上答题的形式，在预选赛期间在网站上答题，共179道，每道题只有两次答题机会，每小题分值相同，按照答题得分进行排名。
              <br />2.前50组最终进入决赛。
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-bind:color="color5">
          <template v-slot:opposite>
            <span>10.20</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">团队赛</v-card-title>
            <v-card-text>
              1.以团体为单位进行答题，比赛时间45分钟，共30题，每道题应有两次提交机会，提交错误则罚时2分钟，最终以答题得分和时间得分计算总分数和排名。
              <br />2.排名前25 名的队伍全员直接进入个人赛。
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-bind:color="color6">
          <template v-slot:opposite>
            <span>10.20</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">复活赛</v-card-title>
            <v-card-text>
              1.本环节为未进入决赛的团体中成员以个人身份参加，角逐个人赛的参赛名额。
              <br />2.本环节为个人答题，每人共10道题，每道题有两次提交机会，从复活赛开始计时，提交错误罚时2分钟，限时20分钟。
              <br />3.复活赛复活排名前15名选手。
              <br />
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-bind:color="color7">
          <template v-slot:opposite>
            <span>10.20</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">个人赛</v-card-title>
            <v-card-text>
              1.个人赛是由团队赛晋级的75人加复活成功的15人组成。个人赛时长为1个小时，共30题，每道题有且只有两次答题机会，提交错误会有罚时，罚时依照y = 2^n，【简单：中等：困难 n = 0：1：2】。
              <br />2.个人赛过程中，选手可以自主选择题目难度，最终以答题得分和时间得分计算总分数和排名。
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-bind:color="color8">
          <template v-slot:opposite>
            <span>10.20</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="card-title">决赛</v-card-title>
            <v-card-text>
              个人赛中排名前20的人晋级决赛，并且保留个人赛的积分，决赛为三轮淘汰；
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
    <!-- 跳出的提示 -->
    <v-snackbar :color="infoColor" v-model="snackbar" top>
      {{infoText}}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <Footer />
  </div>
</template>

<style>
.userinfo-container {
  width: 85%;
  margin: auto;
  margin-top: 5%;
}
.user-info {
  width: 70%;
  margin: auto;
  color: grey;
  font-size: 1.3rem;
  margin-top: 20%;
}
.log-info {
  color: grey;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 28%;
}
.team-info {
  color: grey;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 15%;
}
@media only screen and (max-width: 960px) {
  .user-info {
    font-size: 1.1rem;
    margin-top: 10%;
  }
  .team-info {
    font-size: 1.1rem;
    margin-top: 8%;
  }
  .log-info {
    font-size: 1.1rem;
    margin-top: 5%;
  }
}
@media only screen and (max-width: 600px) {
  .user-info {
    font-size: 1rem;
    margin-top: 10px;
  }
}
.team-name {
  text-align: center;
  margin: auto;
  margin-top: 10%;
  font-size: 1.2rem;
}
.update-btn {
  margin-top: 5%;
}

.basil {
  background-color: #fff !important;
}
.basil--text {
  color: #464646 !important;
}
.time-container {
  width: 85%;
  margin: auto;
}
</style>

<script>
import Footer from "@/components/Footer";
// import { loadavg } from "os";
// import { userInfo } from "os";
let debounce = require("lodash.debounce");
const qs = require("qs");
export default {
  data() {
    return {
      url: "http://101.132.44.32:8080/justsoso/",
      // 服务器返回的userInfo格式，包含是否报名等信息
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

      stage: 0,
      // 寻找队伍输入
      findTeamName: "",
      // 找到的队伍名称
      foundTeam: {
        id: "",
        name: "",
        leader: "",
        people: ""
      },

      // 用户信息和队友信息卡片
      tab: null,
      items: ["个人信息", "队伍信息"],
      // 弹出框
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      answer: "",
      // 弹出提示使用接口
      snackbar: false,
      infoText: "",
      infoColor: "",
      // 组件的条件
      valid: false,
      valid1: false,
      valid2: false,
      // 表格填写规则
      nameRules: [
        val =>
          (val.length >= 2 &&
            val.length <= 10 &&
            !/[1234567890`~@#$%^&*()+<>:"{},.;'·！#￥（——）：；“”‘、，|《。》、【】[\]]/.test(
              val
            )) ||
          "好好写名字"
      ],
      telRules: [
        val =>
          /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
            val
          ) || "手机号码有误，请确认输入是否正确"
      ],
      qqRules: [
        val => (val.length >= 6 && val.length <= 12) || "qq号码长度不正确"
      ],
      majRules: [
        val =>
          (val.length >= 2 &&
            val.length <= 20 &&
            !/[1234567890`~@#$%^&*()+<>:"{},.;'·！#￥（——）：；“”‘、，|《。》、【】[\]]/.test(
              val
            )) ||
          "好好写专业"
      ],
      teamRules: [
        val =>
          (val.length >= 1 && val.length <= 10) || "队名在1到10个字之间哦！"
      ]
    };
  },
  components: {
    Footer
  },
  created() {
    let that = this;
    if(!localStorage.hasOwnProperty("apology")) {
      // console.log("the apology is null!");
      localStorage.setItem("apology", "0");
    }
    if(localStorage.getItem("apology") === "0") {
      this.$router.push("apology");
      return;
    }
    // console.log(localStorage.removeItem("apology"));

    this.debouncedGetTeam = debounce(this.findTeam, 2000);

    if (localStorage.getItem("isLogin") != "1") {
      this.$router.push("login");
      return;
    }
    // 获取本地用户登陆信息
    this.userInfo.num = localStorage.getItem("stu_num");

    // 请求服务器刷新页面数据
    // userInfo
    let num = {
      num: this.userInfo.num
    };
    this.axios
      .post(this.url + "getuserinfo", qs.stringify(num))
      .then(function(res) {
        // console.log(res.data);
        // 设置返回信息
        // 如果传回来的某项数数据不为空，则this.userInfo.isEnroll = true
        if (res.data.sex) {
          that.userInfo.isEnroll = true;
        }
        that.userInfo.stage = res.data.stage;
        that.stage = res.data.stage1 + 2;
        localStorage.setItem("stage", res.data.stage);
        that.userInfo.sex = res.data.sex;
        that.userInfo.maj = res.data.maj;
        that.userInfo.tel = res.data.tel;
        that.userInfo.qq = res.data.qq;
        that.userInfo.name = res.data.name;
        //console.log(that.userInfo);
        // 如果返回的teamid为空则队伍信息全部置空
        if (!res.data.teamid) {
          that.userInfo.team.id = "";
          that.userInfo.team.leader = "";
          that.userInfo.team.teamName = "";
          that.userInfo.team.teamMem = [];
        } else {
          // 获取队伍信息
          that.userInfo.stage = 2;
          localStorage.setItem("stage", 2);
          that.userInfo.team.id = res.data.teamid;
          that.userInfo.team.leader = res.data.leader;
          that.userInfo.team.teamName = res.data.teamName;
          for (let i = 0; i < res.data.mems.length; i++) {
            that.userInfo.team.teamMem[i] = res.data.mems[i][0];
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  watch: {
    findTeamName: function(newTeamFind) {
      if (newTeamFind === "") {
        this.answer = "";
        return;
      }
      this.answer = "查找中...";
      this.debouncedGetTeam();
    }
  },
  computed: {
    color1: function() {
      return this.userInfo.stage >= 0 ? "green" : "red lighten-2";
    },
    color2: function() {
      return this.userInfo.stage >= 1 ? "green" : "red lighten-2";
    },
    color3: function() {
      return this.userInfo.stage >= 2 && this.userInfo.team.teamMem.length === 3
        ? "green"
        : "red lighten-2";
    },
    color4: function() {
      return this.stage >= 3 ? "green" : "red lighten-2";
    },
    color5: function() {
      return this.stage >= 4 ? "green" : "red lighten-2";
    },
    color6: function() {
      return this.stage >= 5 ? "green" : "red lighten-2";
    },
    color7: function() {
      return this.stage >= 6 ? "green" : "red lighten-2";
    },
    color8: function() {
      return this.stage >= 7 ? "green" : "red lighten-2";
    },
    stageOne: function() {
      return this.userInfo.stage == 0;
    },
    stageTwo: function() {
      return this.userInfo.stage == 1;
    }
  },
  methods: {
    // 确定报名，完善信息
    submitInfo() {
      let that = this;
      // 要发送的表格
      // console.log(userInfo);
      // 关闭信息表
      this.dialog = false;
      if (!this.userInfo.isEnroll) {
        this.userInfo.isEnroll = true;
        this.userInfo.stage = 1;
        localStorage.setItem("stage", 1);
      }
      // 调用服务器补充信息API
      this.axios
        .post(this.url + "register", qs.stringify(this.userInfo))
        .then(function(res) {
          // console.log(res.data.userInfo.stage);// useless
          // localStorage.setItem("stu_name", that.userInfo.name);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 建立新的队伍
    newTeam() {
      // 要发给服务器的数据
      let that = this;
      let newTeamForm = {
        stu_num: this.userInfo.num,
        teamName: this.userInfo.team.teamName
      };
      // console.log(newTeamForm);
      // 看看要不要发整个user的数据，因为要更新所有的状态
      // console.log(qs.stringify(newTeamForm));
      this.axios
        .post(this.url + "new_team", qs.stringify(newTeamForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            that.userInfo.stage = 2;
            localStorage.setItem("stage", 2);
            // 建立队伍成功
            that.userInfo.team.id = res.data.userInfo.team.id;
            that.userInfo.team.name = res.data.userInfo.team.name;
            that.userInfo.team.leader = res.data.userInfo.team.leader;
            for (let i = 0; i < res.data.userInfo.team.mems.length; i++) {
              that.userInfo.team.teamMem[i] =
                res.data.userInfo.team.mems[i].name;
            }
            // 出现提示
            that.infoColor = "success";
            that.infoText = "创建队伍成功";
            that.snackbar = true;
            // 关闭表格
            that.dialog1 = false;
          } else {
            // 建立队伍失败
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 加入队伍
    joinTeam() {
      let that = this;
      let joinTeamForm = {
        stu_num: this.userInfo.num,
        id: this.foundTeam.id
      };
      // this.userInfo.team.teamName = "The Best";
      // this.userInfo.team.leader = "Rebecca";
      // this.userInfo.team.id = "121";
      // this.userInfo.team.teamMem = ["Rebecca", "Jack", "徐霜玉"];
      // this.userInfo.stage = 2;
      this.axios
        .post(this.url + "join_team", qs.stringify(joinTeamForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            that.userInfo.team.teamName = res.data.userInfo.team.name;
            that.userInfo.team.leader = res.data.userInfo.team.leader;
            that.userInfo.team.id = res.data.userInfo.team.id;
            for (let i = 0; i < res.data.userInfo.team.mems.length; i++) {
              that.userInfo.team.teamMem[i] =
                res.data.userInfo.team.mems[i].name;
            }
            that.infoText = "加入成功";
            that.infoColor = "success";
            that.snackbar = true;
            that.dialog2 = false;
            that.userInfo.stage = 2;
            localStorage.setItem("stage", 2);
          } else {
            that.infoText = "加入失败";
            that.infoColor = "error";
            that.snackbar = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    findTeam() {
      let that = this;
      // 要发送的表单
      //console.log(this.findTeamName);
      let findTeamForm = {
        findTeamName: this.findTeamName,
        stu_id: this.userInfo.num
      };
      this.axios
        .post(this.url + "find_team", qs.stringify(findTeamForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            // 查找队伍成功
            that.answer = "找了啦！";
            // 返回队伍信息
            that.foundTeam.id = res.data.team.id;
            that.foundTeam.name = res.data.team.name;
            that.foundTeam.leader = res.data.team.leader;
            that.foundTeam.people = res.data.team.people;
            if (res.data.team.people < 3) {
              that.valid2 = true; // 表单按钮有效
            }
          } else {
            // 查找队伍失败
            that.foundTeam = {
              name: "没有找到这样的队伍呢...",
              leader: "不知道",
              num: "0"
            };
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 移除队友
    removeMem(index) {
      // console.log(this.userInfo.team.teamMem[index]);
      // 没连服务器的测试
      let that = this;
      let removeMemForm = {
        stu_num: this.userInfo.num,
        mem_name: this.userInfo.team.teamMem[index]
      };
      //this.userInfo.team.teamMem.splice(index, 1);
      this.axios
        .post(this.url + "remove_mem", qs.stringify(removeMemForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            // console.log("remove_mem_right");
            // 移除队友成功
            that.userInfo.team.teamMem = [];
            for (let i = 0; i < res.data.userInfo.team.mems.length; i++) {
              that.userInfo.team.teamMem[i] =
                res.data.userInfo.team.mems[i].name;
            }
            // 出现提示
            that.infoColor = "success";
            that.infoText = "移除成功";
            that.snackbar = true;
            // 关闭表格
            that.dialog3 = false;
          } else {
            // 建立队伍失败
            // console.log("remove_mem_wrong");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    removeTeam() {
      let that = this;
      let removeTeamForm = {
        stu_num: this.userInfo.num,
        team_id: this.userInfo.team.id
      };
      this.axios
        .post(this.url + "del_team", qs.stringify(removeTeamForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            // 成功
            that.userInfo.team.id = "";
            that.userInfo.team.leader = "";
            that.userInfo.team.teamName = "";
            that.userInfo.team.teamMem = [];
            that.userInfo.stage = 1;
            localStorage.setItem("stage", 1);
            // 出现提示
            that.infoColor = "success";
            that.infoText = "解散成功";
            that.snackbar = true;
            // 关闭表格
            that.dialog4 = false;
          } else {
            that.infoColor = "error";
            that.infoText = "解散失败";
            that.snackbar = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    quitTeam() {
      let that = this;
      let quitTeamForm = {
        stu_num: this.userInfo.num
      };
      this.axios
        .post(this.url + "out_team", qs.stringify(quitTeamForm))
        .then(function(res) {
          // console.log(res.data);
          if (res.data.isOk) {
            // 成功
            that.userInfo.stage = 1;
            localStorage.setItem("stage", 1);
            that.userInfo.team.id = "";
            that.userInfo.team.leader = "";
            that.userInfo.teamName = "";
            that.userInfo.teamMem = [];
            // 出现提示
            that.infoColor = "success";
            that.infoText = "退出成功";
            that.snackbar = true;
            // 关闭表格
            that.dialog4 = false;
          } else {
            that.infoColor = "error";
            that.infoText = "退出失败";
            that.snackbar = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
