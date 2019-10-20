<template>
<div id="new-rank">
  <!-- <button @click="shuffle" dark>Shuffle.</button> -->
  <v-card>
    <v-tabs v-model="tab" centered color="#000">
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <transition-group name="flip-list" tag="ul" class="ul-list">
            <li v-for="(team, index) in teams" :key="team.name" class="list-item">
              {{ team.name }} - {{team.point}}
            </li>
          </transition-group>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <transition-group name="flip-list" tag="ul" class="ul-list">
            <li v-for="(item, index) in people" :key="item.name" class="list-item">
              {{ item.name }} - {{item.point}}
            </li>
          </transition-group>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#new-rank {
  width: 85%;
  margin: 2% auto;
}

.flip-list-move {
  transition: transform 1s;
}

.list-item {
  height: 50px;
  padding-left: 20px;
  margin: 30px;
  margin-right: 54px;
  font-size: 1.6rem;
  list-style-type: decimal;
  list-style-position: inside;
  border-bottom: #d4d0d0 1px solid;
}

.ul-list {
  padding: 0;
}
</style>

<script>
const qs = require('qs');
export default {
  data: function() {
    return {
      url: "http://101.132.44.32:8080/justsoso/",
      num: "",
      teams: [],
      people: [],

      tab: null,
      items: ['团队排名', '个人排名']
    }
  },
  created: function() {
    this.num = localStorage.getItem('stu_num');
    this.refresh();
    let refreshIt = setInterval(this.refresh, 4000);
  },
  methods: {
    refresh: function() {
      let that = this;
      let form = {
        stu_id: this.num
      }
      this.axios.post(this.url + "get_rank", qs.stringify(form))
        .then(function(res) {
          console.log(res.data);
          if (res.data.isOk) {
            that.teams = [];
            that.people = [];
            let teamLength = res.data.teams.length;
            for (let i = 0; i < teamLength; i++) {
              let team = {
                name: res.data.teams[i][1],
                point: res.data.teams[i][2]
              }
              that.teams.push(team);
            }

            let peopleLength = res.data.users.length;
            for (let i = 0; i < peopleLength; i++) {
              let people = {
                name: res.data.users[i][1],
                point: res.data.users[i][2]
              }
              that.people.push(people);
            }
          } else {
            alert("SomeThing wrong! Refresh again!");
          }

        })
        .catch(function(error) {
          console.log(error);
        })
    },
    // shuffle: function() {
    //   this.teams = _.shuffle(this.teams);
    //   this.people = _.shuffle(this.people);
    // }

  },
  computed: {

  }
}
</script>
