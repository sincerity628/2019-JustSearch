<template>
  <div class="navbar">
    <v-toolbar elevation="3" fixed>
      <v-toolbar-title>
        <router-link to="/">
          <span class="font-weight-light gray--text">Just </span>
          <span>搜搜</span>
        </router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>
      
      <!-- pc端菜单 -->
      <div class="pc-nav">
        <v-toolbar-items>
          <v-btn text to="/about">About</v-btn>
          <v-btn text to="/answer">Answer</v-btn>
          <v-btn text to="/ranking">Ranking</v-btn>
          <v-btn text to="/myteam">MyTeam</v-btn>
          <v-btn text to="/login">登录/登出</v-btn>
        </v-toolbar-items>
      </div>
      <!-- 手机端菜单 -->
      <div class="phone-nav .d-md-none">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
    </v-toolbar>

    <!-- 手机端菜单 -->
    <v-navigation-drawer
          v-model="drawer"
          absolute
          left
          temporary
        >
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item>
              <v-btn text to="/about" width="100%">About</v-btn>
            </v-list-item>

            <v-list-item>
                <v-btn text to="/answer" width="100%">Answer</v-btn>
            </v-list-item>

            <v-list-item>
                <v-btn text to="/ranking" width="100%">Ranking</v-btn>
            </v-list-item>

            <v-list-item>
                <v-btn text to="/myteam" width="100%">Myteam</v-btn>
            </v-list-item>

            <v-list-item>
                <v-btn text to="/login" width="100%">登录/登出</v-btn>
            </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    
  </div>
</template>

<style>
.navbar {
  margin: 0;
  padding: 0;
}
.v-application a {
  color: gray;
}
a {
  text-decoration: none;
  color: gray;
}
.router-link-active {
  text-decoration: none;
  color: gray;
}
.pc-nav {
  height: 100%;
}
@media only screen and (max-width: 600px) {
  .pc-nav {
    display: none;
  }
}
@media only screen and (min-width: 600px) {
  .phone-nav {
    display: none;
  }
}

</style>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,

      logText: "Login",
      // navBar是否被触发
      active: false
    }
  },
  watch: {
    group () {
    this.drawer = false
    }
  }
}
</script>