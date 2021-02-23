<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <p @click="logUserOut" class="logout-btn">Logout</p>
    </div>
    <h1 class="title">Deadline : {{date}}</h1>
    <div class="background-box">
      <button type="submit" class="option-btn">Verify Timesheets</button>
      <button type="submit" class="option-btn">View Timesheet Records</button>
      <button type="submit" class="option-btn">View Statistics</button>
    </div>
    <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default { 
  name: 'StaffDisplay',
  data () {
    return {
      date: ""
    };
  },
  methods: {
    logUserOut() {
      localStorage.removeItem("userinfo");
      localStorage.clear();
      this.$router.push("/app");
      // this.$router.replace();
      console.log("We have signed out of the system");
    }
  },
  async mounted() {
    console.log("We have come here");
    try{
      let dateresponse = await this.$http.get("/user/getstaffd");
      console.log(dateresponse.data.tcDeadline[0].staffdeadline);
      let unformatDate = dateresponse.data.tcDeadline[0].staffdeadline;
      this.date = moment(unformatDate).format("DD-MM-YYYY");
      // console.log(test[0].Deadline);
      console.log("We have got the date from the database");
    } catch (err) {
      console.log("Error in showing deadline");
    }
  },
}
</script>

<style scoped>
.nav-bar {
  margin: -8px;
  margin-top: -90px;
  background-color: #4365e2;
  display: flex;
}

.logout-btn {
  color: white;
  font-size: 2.25rem;
  position: absolute;
  right: 0;
  margin-right: 1.5rem;
  margin-top: 2rem;
  cursor: pointer;
}

.routerLink {
  text-decoration: none;
}

.background-box{
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  padding: 3px 115px 53px 80px;
  border: 1px solid;
  background-color: white;
}

.title {
  text-align: center;
  font-size: 3rem;
  color: #4365e2;
  text-transform: capitalize;
  margin-top: 2rem;
}

.option-btn {
  margin-top: 3rem;
  padding: .5rem 1rem;
  font-size: 2.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 106.5%;
  text-align: center;
  background-color: #fffaf4;
  border-color: #000000;
  cursor: pointer;
  color: #000000;
  display: block;
  font-family: "Times New Roman", Times, serif;
}

.down-bar {
  background-color: #4365e2;
  margin: -8px;
  margin-top: 504px;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}
</style>