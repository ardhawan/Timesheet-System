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
          <!-- <input type="checkbox" v-model="isAllSelected" class="checkbox"> -->
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
      <label for="signbox" v-if="isVerify==true">I agree</label>
      <input type="checkbox" id="signbox" v-model="isSigned" v-if="isVerify==true">
    </div>
    <button v-if="isSigned == true" class="submit-btn">Submit</button>
    <button v-if="isIncomplete== true" class="submit-btn">Email Student</button>
    <p v-if="isRefresh == true" class="error-message">Please press the back button</p>
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
      isRefresh: false
    }
  },
  methods: {
    displaySubmit(index) {
      this.isIncomplete = true;
      this.isVerify = false;
      this.isSigned = false;
      if(this.rowSelected.includes(index)) {
        let position = this.rowSelected.indexOf(index);
        this.rowSelected.splice(position, 1);
      }
      else {
        this.rowSelected.push(index);
        if(this.rowSelected.length == this.hourstable.length) {
          this.isIncomplete = false;
          this.isVerify = true;
          console.log("We will show the display button");
        }
      }
    }
  },
  async mounted() {
    this.displaydata.push(this.$route.params.displaydata);
    console.log(this.displaydata)
    try {
      let tableresponse = await this.$http.get("/user/gettable/" + this.displaydata[0].employeename + "/" + this.displaydata[0].jobmodule + "/" + this.displaydata[0].jobrole + "/" + this.displaydata[0].submissiondate);
      this.hourstable = tableresponse.data.tableInfo[0].tabledata;
      if(tableresponse) {
        console.log("We got the table data")
      }
    } 
    catch(err) {
      this.isIncomplete = false;
      this.isRefresh = true;
      console.log("We did not get the table data");
      console.log(err.response);
    }
  }
}
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
 margin-left: 46.5%;
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

.submit-btn {
  display: block;
  margin:auto;
  margin-top: 3rem;
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
  /* margin-bottom: 110px; */
  /* Old value is this  -- Check the new value */
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