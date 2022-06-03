<template>
  <div class="Home">
    <HomePage />
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "@/components/HomePage.vue";

export default {
  name: "Home",
  components: {
    HomePage,
  },
};
</script>
<style scoped lang="scss">
.Home {
  width: 100%;
  height: 100%;
}
</style>

