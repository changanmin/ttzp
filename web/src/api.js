import axios from "axios"
class Ajax {
  login(data) {
    return new Promise((resolve, reject) => {
      axios.post("/login", data).then(res => {
        if (res.data.code === 1) {
          sessionStorage.token = res.data.token;
          sessionStorage.userInfo = res.data.userInfo;
          resolve(true)
        } else {
          sessionStorage.removeItem("token")
          resolve(false)
        }
      });
    })
  }
  query() {
    axios.get("/user").then(res => {

    })
  }
}
export default Ajax;