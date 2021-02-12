<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
    </div>
    <div class="wrap">
      <h1 class ="title">Timesheet Management System</h1>  
      <form @submit.prevent="loginUser">  
        <div class="form-group">
          <label class="size-label" for="Username">Computing Username</label>
          <input type="username" class="form-control-lg" id="Username" placeholder="Enter Username" name="username" v-model="login.uname">
        </div>
        <div class="form-group">
          <label class="size-label" for="Password">Computing Password</label>
          <input type="password" class="form-control-lg" id="Password" placeholder="Enter Password" name="password" v-model="login.password">
        </div>
      <!-- <router-link to='/studentdisplay'>Login</router-link> -->
      <!-- <form v-on:submit.prevent="loginUser"> -->
          <button type="submit" class="btn-group-lg">Login</button>
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
export default {
  // import swal from "sweetalert";
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
      console.log("Hello");
      try {
        // console.log(this.login);
        let response = await this.$http.post("/user/login", this.login);
        // console.log(response);
        let token = response.data.user.token;
        console.log(response.data.user.token);
        localStorage.setItem("jwt", token);
        if (token) {
          console.log("We are in");
          // swal("Success", "Login Successful", "success");
          this.$router.push("/sdisplay");
        }
      } catch (err) {
        console.log("We are out");
        this.error = true;
        // swal("Error", "Something Went Wrong", "error");
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

.wrap {
  position: absolute;
  top: 53%;
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

.size-label {
  display: block;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-control-lg {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 100%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.btn-group-lg {
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
  margin-top: 587px;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}

.error-message {
  position: absolute;
  top: 79%;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 560px;
  text-align: center;
  font-size: 1.5rem;
  color: red;
}
</style>