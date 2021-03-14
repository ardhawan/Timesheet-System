<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/stdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Student Name</th>
          <th>Job Module</th>
          <th>Job Position</th>
          <th>Submission Date</th>
          <th>Details Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(td, index) in timesheetdata" v-bind:key="index">
          <td>{{index+1}}</td>
          <td>{{td.employeename}}</td>
          <td>{{td.jobmodule}}</td>
          <td>{{td.jobrole}}</td>
          <td>{{td.submissiondate}}</td>
          <td><p @click="detailsLink(index)" class="text-message">Click here</p></td>
        </tr>
      </tbody>
    </table>
    <p v-if="isDataMissing == true" class="error-message">Currently there are no timesheets that need to be verified.</p>
    <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: 'VerifyTimesheetTable',
  data() {
    return{
      staffemail: "",
      timesheetdata: [],
      isDataMissing: false
    }
  },
  methods: {
    detailsLink(index) {
      this.$router.push({name: 'VerifyTimsheetDetails', params: {displaydata: this.timesheetdata[index]}});
    }  
  },
  async mounted() {
    let token = localStorage.getItem("userinfo")
    let decoded = VueJwtDecode.decode(token);
    this.staffemail = decoded.uname;
    this.isDataMissing = false;
    let detailsresponse = await this.$http.get("/user/getdetails/" + this.staffemail);
    if (detailsresponse.data.empInfo != "") {
      this.timesheetdata = detailsresponse.data.empInfo;
      this.timesheetdata.sort((a, b) => a.submissiondate.localeCompare(b.submissiondate));
    }
    else {
      this.isDataMissing = true;
    }
  }
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

.error-message {
  text-align: center;
  font-size: 2rem;
  color: red;
}

.text-message {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: blue;
  margin-top: 0rem;
  height: 2px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 3rem;
  color: black;
  background-color: #fffaf4;
  table-layout: fixed;
  margin-bottom: 110px;
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

.down-bar 
{
  background-color:#4365e2;
  position: fixed; 
  bottom: 2px;
  left: 0;
  right: 0;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}
</style>