<template>
  <div>
    <div class="nav-bar">
      <img src="./assets/logo-white.png">
      <router-link to='/amdisplay'><p class="back-btn">Back</p></router-link>
    </div>
    <div class="background-box">  
      <form @submit.prevent="setDeadline">  
        <div class="input-group">
          <label class="input-label" for="studentdeadline">Deadline Date For Student</label>
          <input type="date" class="input-btn" id="studentdeadline" name="studentdeadline" v-model="details.studentdeadline">
        </div>
        <div class="input-group">
          <label class="input-label" for="staffdeadline">Deadline Date For Staff</label>
          <input type="date" class="input-btn" id="staffdeadline" name="staffdeadline" v-model="details.staffdeadline">
        </div>
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
    <div class="error-message">
      <p v-if="missing== true">Missing Input</p>
    </div>
    <div class="down-bar">
      <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingDeadline',
  data () {
    return {
      details: {
        studentdeadline: "",
        staffdeadline: ""
      },
      missing: false
    };
  },
  methods: {
    async setDeadline() {
      try {
        let deadlineresponse = await this.$http.post("/system/setd", this.details);
        if (deadlineresponse) {
          this.missing = false;
          this.$router.push("/dlemail");
        }
      } catch (err) {
        this.missing = true;
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

.back-btn {
  color: white;
  font-size: 2.25rem;
  position: absolute;
  right: 0;
  margin-right: 1.5rem;
  margin-top: 2rem; 
  cursor: pointer;
}

.background-box {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  width: 560px;
  padding: 25px 85px 55px 75px;
  background-color: #fffaf4;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.input-btn {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 100%;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  border: 1px solid;
}

.submit-btn {
  margin-top: 1rem;
  padding: .5rem 1rem;
  font-size: 1.5rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 106.5%;
  text-align: center;
  background-color: #4365e2;
  border-color: #4365e2;
  cursor: pointer;
  color: white;
}

.down-bar {
  background-color: #4365e2;
  margin: -8px;
  margin-top: 591px;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}

.error-message {
  position: absolute;
  top: 73.3%;
  left: 51%;
  transform: translate(-50%, -50%);
  width: 560px;
  text-align: center;
  font-size: 1.5rem;
  color: red;
}
</style>