<template>
  <b-tr style="height: 50px; border-bottom: 1px solid whitesmoke" v-if="isShow">
    <b-td colspan="2" class="align-middle">{{ reply.user_id }}</b-td>
    <b-td colspan="5" class="align-middle" v-html="enterToBr(reply.comment)"></b-td>
    <b-td colspan="3" class="align-middle">{{ reply.memo_time }}</b-td>
    <b-td
      colspan="2"
      class="align-middle"
      v-if="userInfo.userId == reply.user_id || userInfo.userId === 'admin'"
    >
      <b-button
        size="sm"
        pill
        variant="outline-warning"
        class="me-2"
        @click="mvModify"
        v-if="userInfo.userId == reply.user_id"
        >수정</b-button
      >
      <b-button size="sm" pill variant="outline-danger" @click="deleteReply">삭제</b-button>
    </b-td>
    <b-td cols="2" v-else> </b-td>
  </b-tr>
  <b-tr style="height: 50px; border-bottom: 1px solid whitesmoke" v-else>
    <b-td colspan="2" class="align-middle">{{ reply.user_id }}</b-td>
    <b-td colspan="5" class="align-middle text-left"
      ><b-form-textarea v-model="modifyReply.comment"></b-form-textarea
    ></b-td>
    <b-td colspan="3" class="align-middle">{{ reply.memo_time }}</b-td>
    <b-td colspan="2" class="align-middle" v-if="userInfo.userId == reply.user_id">
      <b-button size="sm" pill variant="outline-warning" class="me-2" @click="replyModify"
        >수정</b-button
      >
      <b-button size="sm" pill variant="outline-danger" @click="cancel">취소</b-button>
    </b-td>
    <b-td cols="2" v-else> </b-td>
  </b-tr>
</template>

<script>
// import moment from "moment";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "QnaReplyItem",
  data() {
    return {
      isShow: true,
      modifyReply: {
        comment: "",
        memo_no: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  props: {
    reply: Object,
  },
  filters: {
    dateFormat(regtime) {
      return regtime;
      // return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  created() {},
  methods: {
    ...mapActions(["updateReply", "removeReply"]),
    enterToBr(str) {
      return str.replace(/(\n|\r\n)/g, "<br>");
    },
    mvModify() {
      this.isShow = false;
      this.modifyReply.memo_no = this.reply.memo_no;
      this.modifyReply.comment = this.reply.comment;
    },

    deleteReply() {
      let param = {
          QnAno: this.reply.article_no,
          Replyno: this.reply.memo_no,
        };
      this.$swal({
        title: "댓글을 삭제하시겠습니까?",
        icon: "error",
        dangerMode: true,
        buttons: true,
      })
        .then((value) => {
          if (value) {
            this.removeReply(param);
          }
        })
        .catch((error) => {
          this.$swal("서버에 문제가 발생했습니다. 죄송합니다.", { icon: "error" });
          console.log(error);
        });
    },
    cancel() {
      this.isShow = true;
    },
    replyModify() {
      let param = {
        memo_no: this.modifyReply.memo_no,
        comment: this.modifyReply.comment,
        article_no: this.reply.article_no,
      };
      this.updateReply(param);
      this.isShow = true;
      this.$swal("수정완료!", "수정했습니다!", "success");
    },
  },
};
</script>

<style>
.show {
  display: none;
}
</style>
