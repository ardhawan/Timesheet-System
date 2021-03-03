<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/stdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <form @submit.prevent="notifyStudent">  
      <div class="input-group">
        <label class="input-label" for="message">Message For Student</label>
        <textarea class="input-btn" id="message" placeholder="Please enter your message" name="message" v-model="emaildetails.message"></textarea>
      </div>
      <button type="submit" class="submit-btn">Submit Student Message</button>
    </form>
    <p class="message-student" v-if="isInProgress == true">In progress</p>
    <p class="message-student" v-if="success == true">Succesfully sent message</p>
    <p class="error-message-student" v-if="missing == true">Missing user input</p>
    <p class="error-message-student" v-if="error == true">Fail to send message</p>
    <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: 'VerifyTimesheetEmail',
  data () {
    return {
      emaildetails: {
        senderemail: "",
        message: "",
        senderpassword: ""
      },
      isInProgress: false,
      success: false,
      missing: false,
      error: false
    }
  },
  methods: {
    async notifyStudent() {
      this.success = false;
      this.missing = false;
      this.error = false;
      this.isInProgress = true;
      let token = localStorage.getItem("userinfo");
      let decoded = VueJwtDecode.decode(token);
      this.emaildetails.senderemail = decoded.uname;
      console.log(this.emaildetails.senderemail);
      let userPassword = localStorage.getItem("keyinfo")
      this.emaildetails.senderpassword = userPassword;
      try {
        let notifyresponse = await this.$http.post("/user/notifystudent", this.emaildetails);
        console.log(notifyresponse);
        if (notifyresponse) {
          console.log("Success in sending mail");
          this.isInProgress = false;
          this.success = true;
          let deleteresponse = await this.$http.post("/user/deleterecord");
          if(deleteresponse)
          {
            this.$router.push("/vrtable");
          }
        }
      } catch(err) {
        console.log(err.response);
        this.isInProgress = false;
        if(err.response.data.error == "Missing user input")
        {
          console.log("Missing user input");
          this.missing = true;
        }
        else if(err.response.data.error == "Missing data")
        {
          this.$router.push("/vrtable");
        }
        else
        {
          console.log("Error in sending mail");
          this.error = true;
        }
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

.back-btn {
  color: white;
  font-size: 2.25rem;
  position: absolute;
  right: 0;
  margin-right: 1.5rem;
  margin-top: 2rem; 
  cursor: pointer;
}

.input-group {
  margin-bottom: 2rem;
}

.input-label {
  display: block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1.3rem;
}

.input-btn {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 70%;
  height: 200px;
  margin-left: .3rem;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  border: 1px solid;
}

.submit-btn {
  position: absolute;
  top: 32%;
  left: 87%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1;
  height: 48px;
  border-radius: .3rem;
  width: 22.2%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

.message-student {
  position: absolute;
  top: 27%;
  left: 87.5%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: black;
  white-space: nowrap;
}

.error-message-student {
  position: absolute;
  top: 27%;
  left: 87%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: red;
  white-space: nowrap;
}

.down-bar {
  background-color: #4365e2;
  margin: -8px;
  margin-top: 298px;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}
</style>
