const naverService = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "xo1knK4MoTJOuWkbnS5C",
        callbackUrl: "http://localhost:8080",
        isPopup: true /* 팝업을 통한 연동처리 여부 */,
        loginButton: {
            color: "green",
            type: 3,
            height: 60,
        } /* 로그인 버튼의 타입을 지정 */,
    });
    const setNaver = () => {
        naverLogin.init();
    };
    const getUserInfo = () => {
        setNaver();
        naverLogin.getLoginStatus((status) => {
            if (status) {
                const email = naverLogin.user.email;
                const name = naverLogin.user.name;
                console.log(email, name);
            } else {
                console.log("AccessToken이 올바르지 않습니다.");
            }
        });
    };
    return {
        setNaver,
        getUserInfo,
    };
};