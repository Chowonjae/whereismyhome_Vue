<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">마이페이지</mark>
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form id="form-join" method="POST" action="">
          <input type="hidden" name="act" value="join" />
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model="userInfo.userName"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input
              type="text"
              class="form-control"
              id="userid"
              name="userid"
              v-model="userInfo.userId"
              readonly
            />
          </div>
          <div id="idcheck-result"></div>
          <div class="mb-3" v-if="modify == false">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              placeholder="********"
              readonly
            />
          </div>
          <div class="mb-3" v-else>
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              placeholder="********"
              v-model="info.userPwd"
            />
          </div>
          <div class="mb-3" v-if="modify == false">
            <label for="emailid" class="form-label">이메일 : </label>
            <div class="input-group">
              <input
                readonly
                type="text"
                class="form-control"
                id="emailid"
                name="emailid"
                v-model="userInfo.emailId"
              />
              <span class="input-group-text">@</span>
              <input
                readonly
                class="form-control"
                id="emaildomain"
                name="emaildomain"
                v-model="userInfo.emailDomain"
              />
            </div>
          </div>
          <div class="mb-3" v-else>
            <label for="emailid" class="form-label">이메일 : </label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="emailid"
                name="emailid"
                v-model="info.emailId"
              />
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
          <div class="mb-3">
            <label for="userpwd" class="form-label">회원가입일 : </label>
            <input
              type="text"
              class="form-control"
              id="reg_date"
              name="reg_date"
              v-model="userInfo.joinDate"
              readonly
            />
          </div>
          <div class="col-auto text-center" v-if="modify == false">
            <b-button
              pill
              variant="outline-warning"
              v-if="userInfo.type == 'default'"
              class="me-2"
              @click="modify = !modify"
            >
              수정
            </b-button>
            <b-button pill variant="outline-danger" @click="deleteInfo"> 회원탈퇴 </b-button>
          </div>
          <div class="col-auto text-center" v-else>
            <b-button pill variant="outline-primary" class="me-2" @click="modifyUser">
              저장
            </b-button>
            <b-button pill variant="outline-warning" @click="modify = !modify"> 취소 </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  data() {
    return {
      modify: false,
      email: "",
      checkEmail: null,
      checkPwd: null,
      info: {
        userId: "",
        userPwd: "",
        emailId: "",
        emailDomain: null,
      },
      domain: [
        { value: null, text: "선택" },
        { value: "ssafy.com", text: "ssafy.com" },
        { value: "naver.com", text: "naver.com" },
        { value: "gmail.com", text: "gmail.com" },
      ],
    };
  },
  created() {
    this.email = this.userInfo.emailId + "@" + this.userInfo.emailDomail;
  },
  methods: {
    ...mapActions(memberStore, ["modifyMember", "userLogout", "deleteUser"]),
    ...mapMutations(memberStore, ["IS_RELOAD"]),
    modifyUser() {
      if (this.info.userPwd === "" && this.info.userPwd === null) {
        this.checkPwd = false;
        this.makeToast("비밀번호를 입력해 주세요", "warning");
        return;
      } else {
        this.checkPwd = true;
      }
      if (this.info.emailId === "" || this.info.emailDomain === null) {
        this.checkEmail = false;
        this.makeToast("이메일을 확인해 주세요.", "warning");
        return;
      } else {
        this.checkEmail = true;
      }
      if (this.checkEmail && this.checkPwd) {
        this.$swal({
          title: "정말 수정 하시겠습니까?",
          icon: "warning",
          buttons: true,
        })
          .then((value) => {
            if (value) {
              this.info.userId = this.userInfo.userId;
              this.modifyMember(this.info);
              this.userLogout(this.info.userId);
              // sessionStorage.removeItem("access-token");
              // sessionStorage.removeItem("refresh-token");
              // sessionStorage.removeItem("vuex");
              this.$swal("수정완료!", "수정에 성공했습니다.", "success");
              this.$router.push({ path: "/" });
              // window.location.reload();
            }
          })
          .catch((error) => {
            this.$swal("서버에 문제가 발생했습니다. 죄송합니다.", { icon: "error" });
            console.log(error);
          });
        // if (confirm("정말 수정 하시겠습니까?")) {
        //   this.info.userId = this.userInfo.userId;
        //   this.modifyMember(this.info);
        //   this.userLogout(this.info.userId);
        //   sessionStorage.removeItem("vuex");
        //   this.$router.push({ path: "/" });
        //   window.location.reload();
        // }
      }
    },
    makeToast(msg, st) {
      this.$bvToast.toast(msg, {
        title: "알림",
        autoHideDelay: 1000,
        appendToast: true,
        variant: st,
      });
    },
    deleteInfo() {
      this.$swal({
        title: "정말 탈퇴하시겠습니까?",
        icon: "error",
        dangerMode: true,
        buttons: true,
      })
        .then((value) => {
          if (value) {
            if (this.userInfo.type == "kakao") {
              // window.Kakao.Auth.logout();
              window.Kakao.API.request({
                url: "/v1/user/unlink",
                success: function (response) {
                  console.log(response);
                },
                fail: function (error) {
                  this.makeToast(
                    "탈퇴처리가 미완료되었습니다.\n관리자에게 문의하시기 바랍니다.",
                    "danger"
                  );
                  console.log(error);
                },
              });
            }
            this.deleteUser(this.userInfo.userId);
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("refresh-token");
            sessionStorage.removeItem("vuex");
            this.$swal("삭제완료!", "삭제에 성공했습니다.", "success");
            this.$router.push({ path: "/" });
            // window.location.reload();
          }
        })
        .catch((error) => {
          this.$swal("서버에 문제가 발생했습니다. 죄송합니다.", { icon: "error" });
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
