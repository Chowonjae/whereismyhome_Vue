<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="userid-group"
          label="작성자:"
          label-for="userid"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userid"
            disabled
            v-model="notice.userId"
            type="text"
            required
            placeholder="작성자 입력..."
            ref="userId"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="notice.subject"
            type="text"
            required
            placeholder="제목 입력..."
            ref="subject"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="notice.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            ref="content"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  name: "BoardInputItem",
  data() {
    return {
      isUserid: true,
      notice: {
        userId: "",
        subject: "",
        content: "",
        aritcleNo: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    console.log(this.type);
    if (this.type != "modify") {
      console.log(this.userInfo.userId);
      this.notice.userId = this.userInfo.userId;
    } else {
      this.notice.articleNo = this.article.articleNo;
      this.notice.userId = this.article.userId;
      this.notice.subject = this.article.subject;
      this.notice.content = this.article.content;
    }
  },
  computed: {
    ...mapState(["ok", "article"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  watch: {
    ok: function () {
      if (this.ok == true) {
        this.CLEAR_OK();
        this.moveList();
      }
    },
  },
  methods: {
    ...mapActions(["updateArticle", "addArticle"]),
    ...mapMutations(["CLEAR_OK"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.notice.userId &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userId.focus());
      err &&
        !this.notice.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.notice.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) this.makeToast(msg);
      else this.type === "register" ? this.regist() : this.modify();
    },
    makeToast(msg) {
      this.$bvToast.toast(msg, {
        title: "알림",
        autoHideDelay: 1000,
        appendToast: true,
        variant: "warning",
      });
    },
    onReset(event) {
      event.preventDefault();
      this.notice.articleNo = 0;
      this.notice.subject = "";
      this.notice.content = "";
    },
    regist() {
      let param = {
        userId: this.notice.userId,
        subject: this.notice.subject,
        content: this.notice.content,
      };
      // this.addArticle(param);
      this.$swal({
          title: "글을 작성 하시겠습니까?",
          icon: "warning",
          buttons: true,
        })
          .then((value) => {
            if (value) {
              this.addArticle(param);
              this.$swal("등록완료!", "등록이 완료되었습니다.", "success");
              this.moveList();
            }
          })
          .catch((error) => {
            this.$swal("서버에 문제가 발생했습니다. 죄송합니다.", { icon: "error" });
            console.log(error);
          });
    },
    modify() {
      let param = {
        articleNo: this.article.articleNo,
        userId: this.notice.userId,
        subject: this.notice.subject,
        content: this.notice.content,
      };
      // this.updateArticle(param);
      this.$swal({
          title: "정말 수정 하시겠습니까?",
          icon: "warning",
          buttons: true,
        })
          .then((value) => {
            if (value) {
              this.updateArticle(param);
              this.$swal("수정완료!", "수정이 완료되었습니다.", "success");
              this.moveList();
            }
          })
          .catch((error) => {
            this.$swal("서버에 문제가 발생했습니다. 죄송합니다.", { icon: "error" });
            console.log(error);
          });
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
