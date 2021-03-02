<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/amdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <div>  
      <p class="title">Optional page to notify the student or staff regarding deadline. Write your message in the respective box and submit it.</p>
      <form @submit.prevent="sendStudentEmail">  
        <div class="input-group">
          <label class="input-label-top" for="studentmessage">Message For Student</label>
          <textarea class="input-btn-top" id="studentmessage" placeholder="Please enter your message" name="studentmessage" v-model="studentdetails.studentmessage"></textarea>
        </div>
        <button type="submit" class="submit-btn-student">Submit Student Message</button>
      </form>
      <form @submit.prevent="sendStaffEmail">  
        <div class="input-group">
          <label class="input-label-bottom" for="staffmessage">Message For Staff</label>
          <textarea class="input-btn-bottom" id="staffmessage" name="staffmessage" placeholder="Please enter your message" v-model="staffdetails.staffmessage"></textarea>
        </div>
        <button type="submit" class="submit-btn-staff">Submit Staff Message</button>
      </form>
    </div>
    <p class="message-student" v-if="isInProgress == true">In progress</p>
    <p class="message-student" v-if="success == true">Succesfully sent message</p>
    <p class="error-message-student" v-if="missing == true">Missing user input</p>
    <p class="error-message-student" v-if="error == true">Fail to send message</p>
    <p class="message-staff" v-if="isInProgressStaff == true">In progress</p>
    <p class="message-staff" v-if="sfsuccess == true">Succesfully sent message</p>
    <p class="error-message-staff" v-if="sfmissing == true">Missing user input</p>
    <p class="error-message-staff" v-if="sferror == true">Fail to send message</p>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: 'DeadlineEmail',
  data () {
    return {
      studentdetails: {
        senderemail: "",
        studentmessage: "",
        password: ""
      },
      staffdetails: {
        senderemail: "",
        staffmessage: "",
        password: ""
      },
      isInProgress: false,
      success: false,
      missing: false,
      error: false,
      isInProgressStaff: false,
      sfsuccess: false,
      sfmissing: false,
      sferror: false,
    };
  },
  methods: {
    async sendStudentEmail() {
      this.success = false;
      this.missing = false;
      this.error = false;
      this.isInProgress = true;
      let token = localStorage.getItem("userinfo");
      let decoded = VueJwtDecode.decode(token);
      let userEmail = decoded.uname;
      this.studentdetails.senderemail = userEmail;
      console.log(this.studentdetails.senderemail);
      let userPassword = localStorage.getItem("keyinfo")
      this.studentdetails.password = userPassword;
      try {
        let emailresponse = await this.$http.post("/user/sendstudentm", this.studentdetails);
        console.log(emailresponse);
        if (emailresponse) {
          console.log("Success in sending mail");
          this.isInProgress = false;
          this.success = true;
        }
      } catch(err) {
        console.log(err.response);
        this.isInProgress = false;
        if(err.response.data.error == "Missing user input")
        {
          console.log("Missing user input");
          this.missing = true;
        }
        else
        {
          console.log("Error in sending mail");
          this.error = true;
        }
      }
    },
    async sendStaffEmail() {
      this.sfsuccess = false;
      this.sfmissing = false;
      this.sferror = false;
      this.isInProgressStaff = true;
      let token = localStorage.getItem("userinfo")
      let decoded = VueJwtDecode.decode(token);
      let userEmail = decoded.uname;
      this.staffdetails.senderemail = userEmail;
      console.log(this.staffdetails.senderemail);
      let userPassword = localStorage.getItem("keyinfo")
      this.staffdetails.password = userPassword;
      try {
        let sfemailresponse = await this.$http.post("/user/sendstaffm", this.staffdetails);
        console.log(sfemailresponse);
        if (sfemailresponse) {
          console.log("Success in sending mail");
          this.isInProgressStaff = false;
          this.sfsuccess = true;
        }
      } catch(err) {
        console.log(err.response);
        this.isInProgressStaff = false;
        if(err.response.data.error == "Missing user input")
        {
          console.log("Missing user input");
          this.sfmissing = true;
        }
        else
        {
          console.log("Error in sending mail");
          this.sferror = true;
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

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1.1rem;
}

.input-group {
  margin-bottom: 2rem;
}

.input-label-top {
  display: block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1.1rem;
}

.input-label-bottom {
  position: absolute;
  top: 60%;
  left: 5.5%;
  transform: translate(-50%, -50%);
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1.1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn-top {
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

.input-btn-bottom {
  position: absolute;
  top: 80.5%;
  left: 36.5%;
  transform: translate(-50%, -50%);
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 69.5%;
  height: 200px;
  margin: 0 auto;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  border: 1px solid;
}

.submit-btn-student {
  position: absolute;
  top: 38%;
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

.submit-btn-staff {
  position: absolute;
  top: 76%;
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
  top: 33%;
  left: 87.5%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: black;
  white-space: nowrap;
}

.error-message-student {
  position: absolute;
  top: 33%;
  left: 87%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: red;
  white-space: nowrap;
}

.message-staff {
  position: absolute;
  top: 71%;
  left: 87%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: black;
  white-space: nowrap;
}

.error-message-staff {
  position: absolute;
  top: 71%;
  left: 87.5%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: red;
  white-space: nowrap;
}
</style>
