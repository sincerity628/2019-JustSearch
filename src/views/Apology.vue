<template>
<div id="apology">
  <v-card class="apology-card">
    <h1 class="apology-title">Apology</h1>
    <article class="apology-body">
      致每一个 justSearcher:
      <p>自2009年第一届“just搜搜检索能力大赛”开办以来，“just搜搜”早已经成为我们计算机学院学生会，尤其是我们学术部最最重要的一项活动。我们每一个人都卯足了劲来准备这个活动，希望为大家提供一个良好的比赛平台，让大家通过这个比赛，能切切实实地提升自己计算机检索能力。我们力图将这个比赛做的完美，但是让大家失望的是，我们的预选赛的赛题出现了严重的问题：时效未更新、格式不标准以及问题有歧义等等。尽管我们在发现后第一时间进行完善，但还是给每一位参赛选手带来了诸多不便，影响比赛体验。</p>
      <p>在此，计算机学院学生会学术部全体成员向各位参赛同学道歉，我们为给你们带来的不便感到愧疚，也为我们出现这样的失误感到羞愧，同时也为在出现问题后每一位参赛同学对我们的包容和理解感到感激。谢谢你们在发现问题后还愿意向我们指出错误、谢谢你们在赛题出现问题后还继续积极地参加比赛。</p>
      <p>最后我们一定会保证现场赛赛题的质量，也请没能进入决赛的同学能够继续支持“just搜搜检索能力大赛”，来年再战。无论如何，我们都希望此次本赛能够对您的检索能力产生积极的影响。</p>
      祝好！
    </article>

    <v-btn rounded color="indigo" dark class="my-5" @click="goToMyteam">I accept.</v-btn>
  </v-card>

</div>
</template>

<style scoped>
#apology {
  background-color: #fff;
  padding: 5%;
}

p {
  text-indent: 2em;
  margin-top: 20px;
}

.apology-card {
  margin: 0 auto;
  width: 85%;
  padding: 2% 0;
  text-align: center;
}

.apology-body {
  width: 80%;
  margin: 20px auto;
  text-align: justify;
}
</style>

<script>
export default {
  data: function() {
    return {

    }
  },
  methods: {
    goToMyteam: function() {
      this.$router.push("myteam");
    }

  },
  computed: {

  },
  created: function() {
    if (localStorage.getItem("apology") === "0") {
      localStorage.setItem("apology", "1");
      console.log(localStorage.getItem("apology"));
    }
  }
}
</script>
