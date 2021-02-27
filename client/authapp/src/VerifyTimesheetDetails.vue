<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <p class="back-btn">Back</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Week</th>
          <th>Week Date</th>
          <th>Week Day</th>
          <th>Work Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ht, index) in hourstable" v-bind:key="index">
          <td>{{index+1}}</td>
          <td>{{ht.weekname}}</td>
          <td>{{ht.weekdate}}</td>
          <td>{{ht.weekday}}</td>
          <td>{{ht.workhours}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VerifyTimesheetDetails',
  data () {
    return{ 
      displaydata: [],
      hourstable: []
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

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 3rem;
  color: black;
  background-color: #fffaf4;
  table-layout: fixed;
  /* margin-bottom: 110px; */
  /* Old value is this */
  margin-bottom: 5rem; 
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
</style>