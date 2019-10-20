<template>
  <v-app>
    <!-- NavBar -->
    <NavBar/>
    <v-content>
      <router-view></router-view>
      <Upbtn/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import Upbtn from'@/components/Upbtn'
export default {
  name: 'App',
  components: {
    NavBar,
    Upbtn
  },
  data: () => ({
    //
  }),
};
</script>

<style>

</style>
