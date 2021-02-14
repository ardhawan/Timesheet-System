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
          <textarea class="form-control-lg-top" id="studentmessage" name="studentmessage" placeholder="Please enter your message" v-model="emaildetails.studentmessage"></textarea>
        </div>
        <button type="submit" class="btn-group-lg-student">Submit Student Message</button>
      </form>
      <form @submit.prevent="sendStaffEmail">  
        <div class="form-group">
          <label class="size-label-bottom" for="staffmessage">Message For Staff</label>
          <textarea class="form-control-lg-bottom" id="staffmessage" name="staffmessage" placeholder="Please enter your message" v-model="emaildetails.staffmessage"></textarea>
        </div>
        <button type="submit" class="btn-group-lg-staff">Submit Staff Message</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeadlineEmail',
  data () {
    return {
      emaildetails: {
        studentmessage: "",
        staffmessage: "",
        senderemail: ""
      }
    };
  },
  methods: {
    async sendStudentEmail() {
      let decoded = VueJwtDecode.decode(token);
      let userRole = decoded.role;
      console.log(userRole);
      try {
        // let emailresponse = await this.$http.post("/user/setd", this.details);
        let emailresponse = "";
        if (emailresponse) {
          console.log("Success in sending mail");
        }
      } catch (err) {
        console.log("Error in sending mail");
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

/* .error-message {
  position: absolute;
  top: 73%;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 560px;
  text-align: center;
  font-size: 1.5rem;
  color: red;
} */
</style>
