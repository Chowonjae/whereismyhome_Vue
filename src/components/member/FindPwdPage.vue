<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <b-form id="form-findpw">
          <div class="mb-3">
            <label for="userid" class="form-label">아이디</label>
            <input type="text" class="form-control" id="userid" name="userid" v-model="info.userId" />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">이름</label>
            <input type="text" class="form-control" id="username" name="username" v-model="info.userName" />
          </div>
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일</label>
            <div class="input-group">
              <input type="text" class="form-control" id="emailid" name="emailid" v-model="info.emailId" />
              <span class="input-group-text">@</span>
              <b-select
                :options="domain"
                class="form-control"
                id="emaildomain"
                name="emaildomain"
                v-model="info.emailDomain"
              />
            </div>
          </div>
          <b-container class="col-auto text-center">
            <b-button pill variant="outline-primary" @click.prevent="findpw"> 비밀번호 찾기 </b-button>
          </b-container>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  name: "FindPwdPage",
  computed: {
    ...mapState(memberStore, ["isPostMail", "modalName"]),
  },
data() {
  return {
    checkEmail: null,
    info: {
        userId: null,
        userName: null,
        emailId: null,
        emailDomain: null,
    },
    domain: [
        { value: null, text: "선택" },
        { value: "ssafy.com", text: "ssafy.com" },
        { value: "naver.com", text: "naver.com" },
        { value: "gmail.com", text: "gmail.com" },
      ],
    }
  },
  methods: {
    ...mapActions(memberStore, ["findPw"]),
    ...mapMutations(memberStore, ["CLEAR_POST_MAIL", "SET_MODAL_NAME"]),
    findpw() {
      if (this.userid === null || this.userid === "") {
        alert("아이디를 입력해 주세요!");
        return;
      }
      else if (this.info.userName === "") {
        alert("이름을 입력해 주세요!");
        return;
      }
      else if (this.info.emailId === "" || this.info.emailDomain === null) {
        this.checkEmail = false;
        alert("이메일을 확인해 주세요.");
        return;
      } else {
        this.checkEmail = true;
      }
      if (this.checkEmail) {
        this.findPw(this.info);
      }
    },
    changeModal(name) {
      this.SET_MODAL_NAME(name);
    },
  },
  watch: {
    isPostMail: function () {
      if (this.isPostMail != null) {
        if (!this.isPostMail) {
          alert("고객님의 정보가 없습니다. 정보를 다시 한번 확인해 주세요.");
          this.CLEAR_POST_MAIL();
        } else {
          alert("회원님의 임시 비밀번호를 회원님의 이메일로 보내드렸어요!!");
          this.CLEAR_POST_MAIL();
          this.changeModal("login");
          }        
      }
    }
  }
}
</script>

<style>

</style>