import axios from "axios";

// axios 객체 생성
// localServer 통신
function localServer() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { localServer };

export default axios.create({
  baseURL: "http://localhost:9999",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
