<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/sdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <form @submit.prevent="saveTimesheetInfo">  
      <div class="input-group">
        <label for="weekname" class="input-label">Week</label>
        <select id="weekname" class="input-btn" name="weekname" v-model="timesheetinfo.weekname">
          <option disabled value="">Select Week</option>
          <option>Week 1</option>
          <option>Week 2</option>
          <option>Week 3</option>
          <option>Week 4</option>
          <option>Week 5</option>
        </select>
      </div>
      <div class="input-group">
        <label for="weekdate" class="input-label">Week Date</label>
        <input type="date" id="weekdate" class="input-btn-date" name="weekdate" v-model="timesheetinfo.weekdate">
      </div>
      <div class="input-group">
        <label for="weekday" class="input-label">Week Day</label>
        <select id="weekday" class="input-btn" name="weekday" v-model="timesheetinfo.weekday">
          <option disabled value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>
      <div class="input-group">
        <label for="workhours" class="input-label">Work Hours</label>
          <select id="workhours" class="input-btn" name="workhours" v-model="timesheetinfo.workhours">
            <option disabled value="">Select Hour</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
      </div>
      <div class="input-group">
        <label class="input-label-submission" for="submissiondate">Today's Date</label>
          <input type="date" id="submissiondate" class="input-btn-submission" name="submissiondate" v-model="submissiondate">
      </div>
      <div class="input-group">
        <label for="jobrole" class="input-label-role">Job Role</label>
          <select id="jobrole" class="input-btn-role" name="jobrole" v-model="studentinfo.jobrole">
            <option disabled value="">Select Role</option>
            <option v-for="jr in jobrole" :key="jr">{{jr}}</option>
          </select>
      </div>
       <div class="input-group">
        <label for="jobmodule" class="input-label-module">Job Module</label>
          <select id="jobmodule" class="input-btn-module" name="jobmodule" v-model="studentinfo.jobmodule">
            <option disabled value="">Select Module</option>
            <option v-for="jm in jobmodule" :key="jm">{{jm}}</option>
          </select>
      </div>
      <button type="submit" class="add-btn">{{btndisplayname}}</button>
    </form>
    <p v-if="isHourDisplayed==true" class="title">Total Hours : {{totalhours}}</p>
    <table>
      <thead>
        <tr>
          <th v-for="col in coloumnList" v-bind:key="col">{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sd, index) in studentinfo.tabledata" v-bind:key="index">
          <td>{{index+1}}</td>
          <td>{{sd.weekname}}</td>
          <td>{{sd.weekdate}}</td>
          <td>{{sd.weekday}}</td>
          <td>{{sd.workhours}}</td>
        </tr>
      </tbody>
    </table>
    <div class="checkbox">
      <label for="signbox" v-if="success==true">I agree</label>
      <input type="checkbox" id="signbox" v-model="signbox" v-if="success==true">
    </div>
    <button @click="storeTimesheetInfo" v-if="signbox == true" class="submit-btn">Submit</button>
    <p v-if="error == true" class="error-message">Missing week or date or day or hours</p>
    <p v-if="isDataStored == true" class="success-message">Submitted succesfully</p>
    <p v-if="isTopRowMissing == true" class="error-message">Missing today's date or role or module</p>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import moment from 'moment'
export default {
  name: 'SubmitTimesheeet',
  data() {
    return{
      coloumnList: "",
      timesheetinfo: {
        weekname: "",
        weekdate: "",
        weekday: "",
        workhours: ""
      },
      studentinfo: {
        jobrole: "",
        jobmodule: "",
        submissiondate: "",
        tabledata: [],
        emailaddress: ""
      },
      submissiondate: "",
      jobmodule: [],
      jobrole: [],
      totalhours: 0,
      signbox: false,
      error: false,
      success: false,
      isColInitialized: false,
      isHourDisplayed: false,
      isDataStored: false,
      isTopRowMissing: false,
      btndisplayname: ""
    }
  },
  methods: {
    saveTimesheetInfo() {
      this.error = false;
      this.isDataStored = false;
      this.isTopRowMissing = false;
      if(this.btndisplayname == "Reset Table") {
        this.studentinfo.tabledata = [];
        this.totalhours = 0;
        this.isHourDisplayed = false;
        this.isColInitialized = false;
        this.coloumnList = [];
        this.btndisplayname = "Add More Records";
      }
      else if(this.timesheetinfo.weekname == "" || this.timesheetinfo.weekdate == "" || this.timesheetinfo.weekday == "" || this.timesheetinfo.workhours == "") {
        this.error = true;
      }
      else {
        if(!this.isColInitialized) {
          this.coloumnList = ['Number', 'Week', 'Week Date', 'Week Day', 'Work Hours'];
          this.success = true;
          this.isColInitialized = true;
          this.isHourDisplayed = true;
        }
        this.timesheetinfo.weekdate = moment(this.timesheetinfo.weekdate).format("DD-MM-YYYY");
        this.studentinfo.tabledata.push({weekname:this.timesheetinfo.weekname, weekdate:this.timesheetinfo.weekdate, weekday:this.timesheetinfo.weekday, workhours:this.timesheetinfo.workhours});
        this.totalhours = Number(this.totalhours) + Number(this.timesheetinfo.workhours);
        this.timesheetinfo = {weekname:"", weekdate:"", weekday: "", workhours:""};
        this.studentinfo.tabledata.sort((a, b) => a.weekdate.localeCompare(b.weekdate));
      }
    },
    async storeTimesheetInfo() {
      this.error = false;
      this.isDataStored = false;
      this.isTopRowMissing = false;
      try {
        this.studentinfo.submissiondate = moment(this.submissiondate).format("DD-MM-YYYY");
        let timesheetresponse = await this.$http.post("/system/storeinfo", this.studentinfo);
        if (timesheetresponse) {
          this.isDataStored = true;
          this.success = false;
          this.signbox= false;
          this.btndisplayname = "Reset Table"
          this.studentinfo.jobrole = "";
          this.studentinfo.jobmodule = "";
          this.submissiondate = "";
          this.timesheetinfo = {weekname: "", weekdate: "", weekday: "", workhours: ""};
        }
      }
      catch(err) {
        this.isTopRowMissing = true;
        console.log(err.response);
      }
    }
  },
  async mounted() {
    this.btndisplayname = "Add More Records"
    try{
      let token = localStorage.getItem("userinfo")
      let decoded = VueJwtDecode.decode(token);
      this.studentinfo.emailaddress = decoded.uname;
      let optionresponse = await this.$http.get("/system/getinfo/" + this.studentinfo.emailaddress);
      if(optionresponse) {
        this.jobrole = optionresponse.data.mjInfo[0].jobrole;
        this.jobmodule = optionresponse.data.mjInfo[0].jobmodule;
      }
    } catch (err) {
      console.log(err.response);
    }
  },
};
</script>

<style scoped>
.nav-bar {
  margin: -8px;
  margin-top: 0px;
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
  position: absolute;
  top: 30%;
  left: 29%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: bold;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-label {
  display: block;
  margin-bottom: 1rem;
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 20%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.input-btn-date {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: .3rem;
  width: 17.7%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.input-label-submission {
  display: block;
  position: absolute;
  top: 18%;
  left: 28.3%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn-submission {
  position: absolute;
  top: 24%;
  left: 34.5%;
  transform: translate(-50%, -50%);
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: .3rem;
  width: 17.7%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.input-label-role {
  display: block;
  position: absolute;
  top: 18%;
  left: 55%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn-role {
  position: absolute;
  top: 24.3%;
  left: 62%;
  transform: translate(-50%, -50%);
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 19.8%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.input-label-module {
  display: block;
  position: absolute;
  top: 18%;
  left: 83.4%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn-module {
  display: block;
  position: absolute;
  top: 24.3%;
  left: 89.6%;
  transform: translate(-50%, -50%);
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 19.8%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.add-btn {
  margin-top: 2rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.25;
  border-radius: .3rem;
  width: 20%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

.submit-btn {
  margin-top: 2.75rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.25;
  border-radius: .3rem;
  width: 20%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

table {
  position: absolute;
  top: 36.3%;
  left: 24.5%;
  border-collapse: collapse;
  width: 75%;
  color: black;
  background-color: #fffaf4;
  table-layout: fixed;
}

td, th {
  border: 1px solid black;
  text-align: left;
  padding: 8px;
}

td {
  font-size: 1.5rem;
}

th {
  background-color:#ddd9d6;
  font-size: 2rem;
}

.checkbox {
  position: absolute;
  top: 88.2%;
  left: 10.3%;
  transform: translate(-50%, -50%);
}

.checkbox label {
  vertical-align: middle;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
}

.checkbox input {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

.success-message {
  position: absolute;
  top: 72%;
  left: 4.7%;
  font-size: 1.3rem;
  color: black;
}

.error-message {
  position: absolute;
  top: 72%;
  left: 0.5%;
  font-size: 1.3rem;
  color: red;
}
</style>