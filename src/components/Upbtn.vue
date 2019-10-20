<template>
  <v-btn
    fixed
    dark
    fab
    bottom
    right
    color="white"
    v-show="show"
    v-scroll="onScroll"
    @click="$vuetify.goTo(0)">
    <img src="../assets/icons/up-black.png" alt="uo-icon">
  </v-btn>
</template>

<style>
.footer-text {
  margin: 1% auto;
}
</style>

<script>
export default {
  name: "Upbtn",
  data() {
    return {
      show: false,
    }
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.show = top > 20
    }
  }
};
</script>
