<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/stdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <div class="input-group">
      <label for="exportdate" class="input-label" v-if="isDisplayDate == true">Today's Date</label>
      <input type="date" id="exportdate" class="input-btn" name="exportdate"  v-if="isDisplayDate == true" v-model="unformatExportDate">
    </div>
    <div class="checkbox">
      <label for="signbox" v-if="unformatExportDate">I agree</label>
      <input type="checkbox" id="signbox" v-model="signbox" v-if="unformatExportDate">
    </div>
    <button @click="pdfDocument" v-if="signbox == true" class="submit-btn">Export</button>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Student Name</th>
          <th>Job Module</th>
          <th>Job Position</th>
          <th>Submission Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(td, index) in timesheetdata" v-bind:key="index">
          <td>{{index+1}}</td>
          <td>{{td.employeename}}</td>
          <td>{{td.jobmodule}}</td>
          <td>{{td.jobrole}}</td>
          <td>{{td.submissiondate}}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="isDataMissing == true" class="error-message">Currently there are no timesheets that need to be verified.</p>
    <!-- <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>  -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ExportTimesheet',
  data() {
    return{
      unformatExportDate: "",
      formatExportDate: "",
      signbox: false,
      timesheetdata: [],
      isDataMissing: false,
      isDisplayDate: false
    }
  },
  methods: {
    async pdfDocument() {
      this.formatExportDate = moment(this.unformatExportDate).format("DD-MM-YYYY");
      console.log(this.formatExportDate);
      let documentresponse = await this.$http.post("/user/pdfdocument", {exportdate: this.formatExportDate});
      console.log(documentresponse.data)
      if(documentresponse.data != "") {
        console.log("Success in getting the document");
      }
    }
  },
  async mounted() {
    this.isDataMissing = false;
    this.isDisplayDate = false;
    let detailsresponse = await this.$http.get("/user/getcompleted");
    console.log(detailsresponse.data);
    if (detailsresponse.data.studentData != "") {
      this.timesheetdata = detailsresponse.data.studentData
      this.timesheetdata.sort((a, b) => a.submissiondate.localeCompare(b.submissiondate));
      console.log(this.timesheetdata);
      this.isDisplayDate = true;
      console.log("Success in getting the information");
    }
    else {
      this.isDataMissing = true;
      console.log("Error in retrieving timesheet");
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

/* .text-message {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: blue;
  margin-top: 0rem;
  height: 2px;
} */

.input-group {
  margin-bottom: 1rem;
  text-align: left;
  margin-left: 0.5rem;
}

.input-label {
  display: block;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: .3rem;
  width: 13%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.checkbox {
  position: absolute;
  top: 20%;
  left: 21%;
}

.checkbox label {
  vertical-align: middle;
  font-size: 2rem;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
}

.checkbox input {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 2rem;
  color: black;
  background-color: #fffaf4;
  table-layout: fixed;
  margin-bottom: 3rem;
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

.submit-btn {
  position: absolute;
  top: 19.5%;
  left: 34.5%;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.1;
  border-radius: .3rem;
  width: 15%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

/* .down-bar 
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
} */
</style>