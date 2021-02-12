<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
    </div>
    <div>  
      <form @submit.prevent="testingApplication">  
        <!-- <div class="form-group">
          <label class="size-label" for="studentdeadline">Email For Notification</label>
          <input type="date" class="form-control-lg" id="studentdeadline" name="studentdeadline" v-model="details.studentdeadline">
        </div> -->
        <div class="form-group">
          <label class="size-label-center" for="password">Account Password</label>
          <input type="password" class="form-control-lg-center" id="password" placeholder="Enter Password" name="password" v-model="emaildetails.password">
        </div>
        <div class="form-group">
          <label class="size-label-left" for="studentmessage">Message For Student</label>
          <textarea class="form-control-lg-left" id="studentmessage" name="studentmessage" v-model="message">The deadline for submission of timesheet is 15th</textarea>
        </div>
        <div class="form-group">
          <label class="size-label-right" for="teachermessage">Message For Teacher</label>
          <textarea class="form-control-lg-right" id="teachermessage" name="teachermessage">The deadline for submission of timesheet is 15th</textarea>
        </div>
        <button type="submit" class="btn-group-lg">Submit</button>
      </form>
    </div>
    <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'testing',
  data () {
    return {
      emaildetails: {
        password: "",
        studentmessage: "",
        teachermessage: ""
      }
    };
  },
  methods: {
    setDeadline() {
      console.log(message);
    }
  }
      // console.log("Are we here");
      // try {
      //   // console.log(this.login);
      //   let deadlineresponse = await this.$http.post("/user/setd", this.details);
      //   // let token = response.data.user.token;
      //   console.log(deadlineresponse.data.userdl.studentdeadline);
      //   console.log(deadlineresponse.data.userdl.teacherdeadline);
      //   if (deadlineresponse) {
      //     console.log("Success in setting deadline");
      //     this.missing = false;
        //   this.$router.push("/sdisplay");
//         }
//       } catch (err) {
//         console.log("Error in setting deadline");
//         this.missing = true;
//         console.log(err.response);
//       }
// //  }
//   }
};
</script>

<style scoped>
.nav-bar {
  margin: -8px;
  margin-top: -90px;
  background-color: #4365e2;
  display: flex;
}

.form-group {
  margin-bottom: 2rem;
}

.size-label-left {
  display: block;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 10rem;
}

.size-label-center {
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  white-space: nowrap;
}

.size-label-right {
  position: absolute;
  top: 14%;
  left: 83%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  white-space: nowrap;
}

.form-control-lg-left {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 30%;
  height: 450px;
  margin-left: .3rem;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  border: 1px solid;
}

.form-control-lg-center {
  position: absolute;
  top: 21%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 23%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.form-control-lg-right{
  position: absolute;
  top: 32%;
  left: 83%;
  transform: translate(-50%, -50%);
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 30%;
  height: 450px;
  margin-top: 10rem;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  border: 1px solid;
}

.btn-group-lg {
  position: absolute;
  top: 76.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 2rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 25%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

.down-bar {
  background-color: #4365e2;
  margin: -8px;
  margin-top: 44px;
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
