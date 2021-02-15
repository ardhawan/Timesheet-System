<template>
    <div>
        <div class="nav-bar">
            <img src="./assets/logo-white.png">
            <p @click="logUserOut" class="logout-btn">Logout</p>
        </div>
        <div class="wrap">
            <button type="submit" class="btn-group-lg">Exporting Timesheets</button>
            <router-link to='/setdeadline' class="routerLink"><button type="submit" class="btn-group-lg">Set Timesheet Deadline</button></router-link>
            <button type="submit" class="btn-group-lg">View Timesheet Records</button>
        </div>
        <div class="down-bar">
            <p>The University of Dundee is a Scottish Registered Charity, No. SC015096 © University of Dundee</p>
        </div>
    </div>
</template>

<script>
export default { 
    name: 'AdminDisplay',
    methods: {
      logUserOut() {
        localStorage.removeItem("jwt");
        localStorage.clear();
        this.$router.push("/app");
        // this.$router.replace();
        console.log("We have signed out of the system");
      }
    }
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

.wrap {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 560px;
    padding: 3px 115px 53px 80px;
    border: 1px solid;
    background-color: white;
}

.btn-group-lg {
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
    margin-top: 591px;
    padding: .5rem 1rem;
    line-height: 0.25;
    text-align: center;
    color: white;
    font-size: 1.5rem;
}
</style>