<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
    </div>
    <div>  
      <p class="title">Optional page to notify the student or staff regarding deadline. Write your message in the respective box and submit it.</p>
      <form @submit.prevent="sendStudentEmail">  
        <div class="form-group">
          <label class="size-label-top" for="studentmessage">Message For Student</label>
          <textarea class="form-control-lg-top" id="studentmessage" placeholder="Please enter your message" name="studentmessage" v-model="studentdetails.studentmessage"></textarea>
        </div>
        <button type="submit" class="btn-group-lg-student">Submit Student Message</button>
      </form>
      <form @submit.prevent="sendStaffEmail">  
        <div class="form-group">
          <label class="size-label-bottom" for="staffmessage">Message For Staff</label>
          <textarea class="form-control-lg-bottom" id="staffmessage" name="staffmessage" placeholder="Please enter your message" v-model="staffdetails.staffmessage"></textarea>
        </div>
        <button type="submit" class="btn-group-lg-staff">Submit Staff Message</button>
      </form>
    </div>
    <p class="success-message-student" v-if="success == true">Succesfully sent message</p>
    <p class="missing-message-student" v-if="missing == true">Missing user input</p>
    <p class="error-message-student" v-if="error == true">Fail to send message</p>
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
      success: false,
      missing: false,
      error: false
    };
  },
  methods: {
    async sendStudentEmail() {
      let token = localStorage.getItem("jwt")
      let decoded = VueJwtDecode.decode(token);
      let userEmail = decoded.uname;
      this.studentdetails.senderemail = userEmail;
      this.staffdetails.senderemail = userEmail;
      console.log(this.studentdetails.senderemail);
      let userPassword = localStorage.getItem("keyinfo")
      this.studentdetails.password = userPassword;
      this.staffdetails.password = userPassword;
      try {
        let emailresponse = await this.$http.post("/user/sendstudentm", this.studentdetails);
        console.log(emailresponse);
        if (emailresponse) {
          console.log("Success in sending mail");
          this.missing = false;
          this.error = false;
          this.success = true;
        }
      } catch(err) {
        if(err.response.data.error == "Missing user input")
        {
          console.log("Missing user input");
          this.success = false;
          this.error = false;
          this.missing = true;
        }
        else
        {
          console.log("Error in sending mail");
          this.success = false;
          this.messing = false;
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

.title{
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1.1rem;
}

.form-group {
  margin-bottom: 2rem;
}

.size-label {
  position: absolute;
  top: 12%;
  left: 87%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.size-label-top {
  display: block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 1.1rem;
}

.size-label-bottom {
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

.form-control-lg {
  position: absolute;
  top: 18%;
  left: 87%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1;
  border-radius: .3rem;
  width: 20%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.form-control-lg-top {
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

.form-control-lg-bottom {
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

.btn-group-lg-student {
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

.btn-group-lg-student {
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

.btn-group-lg-staff {
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

.down-bar {
  background-color: #4365e2;
  margin: -8px;
  margin-top: 246px;
  /* old value is 587 px */
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}

.success-message-student {
  position: absolute;
  top: 33%;
  left: 87.5%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: black;
  white-space: nowrap;
}

.missing-message-student {
  position: absolute;
  top: 33%;
  left: 87%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: red;
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
</style>
