<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/vrtable'><p class="back-btn">Back</p></router-link>
    </div>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Week</th>
          <th>Week Date</th>
          <th>Week Day</th>
          <th>Work Hours</th>
          <th>Verify Box</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ht, index) in hourstable" v-bind:key="index">
          <td>{{index+1}}</td>
          <td>{{ht.weekname}}</td>
          <td>{{ht.weekdate}}</td>
          <td>{{ht.weekday}}</td>
          <td>{{ht.workhours}}</td>
          <td><input type="checkbox" @click="displaySubmit(index)" class="checkbox-position"></td>
        </tr>
      </tbody>
    </table>
    <div class="checkbox">
      <label for="signbox" v-if="isVerify == true">I agree</label>
      <input type="checkbox" id="signbox" v-model="isSigned" v-if="isVerify == true">
    </div>
    <p v-if="isSigned == true" class="text-message">Optional to suggest rate of pay</p>
    <div v-if="isSigned == true" class="input-group">
      <label class="input-label" for="payrate">Rate Of Pay:</label>
      <input type="text" class="input-btn" id="payrate" placeholder="Enter Pay" name="payrate" v-model="suggestedrate">
    </div>
    <p v-if="isUpdateError == true && isSigned == true" class="update-message">Submission error. Please try again.</p>
    <button @click="updateTable" v-if="isSigned == true" class="submit-btn">Submit</button>
    <p v-if="isIncomplete == true" class="text-message">If verify box is not ticked click this button to discuss.</p>
    <button @click="emailStudent" v-if="isIncomplete == true" class="submit-btn">Email Student</button>
    <p v-if="isRefresh == true" class="error-message">Error in displaying table. Please press the back button and try again.</p>
  </div>
</template>

<script>
export default {
  name: 'VerifyTimesheetDetails',
  data () {
    return{ 
      displaydata: [],
      hourstable: [],
		  rowSelected: [],
      isVerify: false,
      isSigned: false,
      isIncomplete: true,
      isRefresh: false,
      suggestedrate: "",
      isUpdateError: false
    }
  },
  methods: {
    displaySubmit(index) {
      this.isIncomplete = true;
      this.isVerify = false;
      this.isSigned = false;
      this.isUpdateError = false;
      if(this.rowSelected.includes(index)) {
        let position = this.rowSelected.indexOf(index);
        this.rowSelected.splice(position, 1);
      }
      else {
        this.rowSelected.push(index);
        if(this.rowSelected.length == this.hourstable.length) {
          this.isIncomplete = false;
          this.isVerify = true;
        }
      }
    },
    emailStudent() {
      this.$router.push("/vremail");
    },
    async updateTable() {
      try {
        let updateresponse = await this.$http.post("/user/updatetable", {suggestedrate: this.suggestedrate});
        if(updateresponse) {
          this.$router.push("/vrtable")
        }
      } 
      catch(err) {
        this.isUpdateError = true;
        this.suggestedrate = "";
        console.log(err.response);
      } 
    }
  },
  async mounted() {
    this.displaydata.push(this.$route.params.displaydata);
    try {
      let tableresponse = await this.$http.get("/user/gettable/" + this.displaydata[0].employeename + "/" + this.displaydata[0].jobmodule + "/" + this.displaydata[0].jobrole + "/" + this.displaydata[0].submissiondate);
      if(tableresponse) {
        this.hourstable = tableresponse.data.tableInfo[0].tabledata;
      }
    } 
    catch(err) {
      this.isIncomplete = false;
      this.isRefresh = true;
      console.log("We did not get the table data");
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

.checkbox-position {
  width: 25px;
  height: 25px;
  position: relative;
  top: 2px;
}

.checkbox {
 margin-left: 46%;
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

.text-message {
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  margin-right: 1rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
}

.update-message {
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
  color: red;
}

.input-group {
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
}

.input-label {
  position: relative;
  top: 4px;
  font-size: 2rem;
  font-weight: bold;
  width: 13%;    
}

.input-btn {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 10%;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid;
  cursor: pointer;
}

.submit-btn {
  display: block;
  margin:auto;
  margin-top: 2.5rem;
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
  border-collapse: collapse;
  width: 100%;
  margin-top: 3rem;
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

.error-message {
  text-align: center;
  font-size: 2rem;
  color: red;
}
</style>