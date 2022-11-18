<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BoardDelete",
  methods: {
    ...mapActions(["removeArticle"]),
  },
  created() {
    this.removeArticle();
  },
};
</script>

<style></style>
