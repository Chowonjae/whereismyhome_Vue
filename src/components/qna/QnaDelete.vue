<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { deleteQnA } from "@/api/qna";

export default {
  name: "QnaDelete",
  created() {
    deleteQnA(
      this.$route.params.articleNo,
      ({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
      if (data === "success") {
        msg = "삭제가 완료되었습니다.";
      }
        alert(msg);
        this.$router.push({ name: "boardlist" });
      },
      (error) => {
        console.log(error);
    });
  },
};
</script>

<style></style>
