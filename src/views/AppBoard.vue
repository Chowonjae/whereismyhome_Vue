<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink">공지사항</h3>
    <router-view></router-view>
  </b-container>
</template>
<script>
export default {
  name: "AppBoard",
};
</script>
<style scoped>
/* .underline-hotpink {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 27, 139, 0.3) 30%);
} */
h3 {
  font-weight: 400;
  font-size: 3.125em;
  line-height: 1em;
  font-family: "Nanum Square";
  text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  padding: 20px 0 20px 0;
}
</style>
