<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
    </div>
    <div class="background-box">
      <h1 class ="title">Timesheet Management System</h1>  
      <form @submit.prevent="loginUser">  
        <div class="input-group">
          <label class="input-label" for="Useranme">Username</label>
          <input type="username" class="input-btn" id="Username" placeholder="Enter Username" name="username" v-model="login.uname">
        </div>
        <div class="input-group">
          <label class="input-label" for="Password">Password</label>
          <input type="password" class="input-btn" id="Password" placeholder="Enter Password" name="password" v-model="login.password">
        </div>
        <button type="submit" class="submit-btn">Login</button>
      </form>
    </div>
    <div class="error-message">
      <p v-if="error == true">Invalid Credentials</p>
    </div>
    <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: 'App',
  data () {
    return {
      login: {
        uname: "",
        password: ""
      },
      error: false
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/system/login", this.login);
        let token = response.data.userInfo.token;
        if (token) {
          let decoded = VueJwtDecode.decode(token);
          let userRole = decoded.role;
          localStorage.setItem("userinfo", token);
          this.error = false;
          if(userRole == "student")
          {
            this.$router.push("/sdisplay");
          }
          else if(userRole == "staff")
          {
            localStorage.setItem("keyinfo", this.login.password);
            this.$router.push("/stdisplay");
          }
          else if(userRole == "admin")
          {
            localStorage.setItem("keyinfo", this.login.password);
            this.$router.push("/amdisplay");
          }
        }
      } catch (err) {
        this.error = true;
        console.log(err.response);
      }
    }
  }
};
</script>

<style scoped>
.nav-bar {
  margin: -8px;
  margin-top: -90px;
  background-color: #4365e2;
  display: flex;
}

.background-box {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  width: 560px;
  padding: 25px 85px 55px 75px;
  background-color: #fffaf4;
}

.title {
  font-size: 30px;
  color: #000000;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-label {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 100%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.submit-btn {
  margin-top: 1rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 106.5%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

.down-bar {
  background-color: #4365e2;
  margin: -8px;
  margin-top: 591px;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}

.error-message {
  position: absolute;
  top: 77.7%;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 560px;
  text-align: center;
  font-size: 1.5rem;
  color: red;
}
</style>