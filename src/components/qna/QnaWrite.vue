<template>
  <b-container class="bv-example-row mt-3">
    <board-input-item type="register" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/qna/item/QnaInputItem";

export default {
  name: "QnaWrite",
  components: {
    BoardInputItem,
  },
};
</script>

<style></style>
