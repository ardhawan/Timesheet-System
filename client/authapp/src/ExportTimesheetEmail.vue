<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/amdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <form @submit.prevent="notifyDepartment">  
      <div class="input-group">
        <label class="input-label" for="message">Message For Human Resource Department</label>
        <textarea class="input-btn" id="message" placeholder="Please enter your message" name="message" v-model="senderdetails.message"></textarea>
      </div>
      <button type="submit" class="submit-btn">Submit HRD Message</button>
    </form>
    <p class="message-department" v-if="isInProgress == true">In progress</p>
    <p class="message-department" v-if="success == true">Succesfully sent message</p>
    <p class="error-message-department" v-if="missing == true">Missing user input</p>
    <p class="error-message-department" v-if="error == true">Fail to send message</p>
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
      senderdetails: {
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
    async notifyDepartment() {
      this.success = false;
      this.missing = false;
      this.error = false;
      this.isInProgress = true;
      let token = localStorage.getItem("userinfo");
      let decoded = VueJwtDecode.decode(token);
      this.senderdetails.senderemail = decoded.uname;
      let userPassword = localStorage.getItem("keyinfo")
      this.senderdetails.senderpassword = userPassword;
      try {
        let submitresponse = await this.$http.post("/system/notifydepartment", this.senderdetails);
        if (submitresponse) {
          this.isInProgress = false;
          this.success = true;
        }
      } catch(err) {
        console.log(err.response);
        this.isInProgress = false;
        if(err.response.data.error == "Missing user input")
        {
          this.missing = true;
        }
        else
        {
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

.input-group {
  margin-bottom: 2rem;
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

.message-department {
  position: absolute;
  top: 27%;
  left: 87.5%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: black;
  white-space: nowrap;
}

.error-message-department {
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
