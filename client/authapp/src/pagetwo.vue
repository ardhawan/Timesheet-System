<template>
    <div>
        <div class="nav-bar">
            <img src="./assets/logo-white.png">
        </div>
        <!-- <button type="submit" class="btn-group-lg">Email</button> -->
        <!-- <label>Message</label>
        <div v-if="!editing">
            <span class='text' @click="enableEditing">{{value}}</span>
        </div> -->
        <!-- <textarea name="message" v-model="message" cols="30" rows="5" placeholder="Message"></textarea> -->
        <!-- <div v-if="editing">
            <input v-model="tempValue" class="input"/>
            <button @click="disableEditing"> Cancel </button>
            <button @click="saveEdit"> Save </button>
        </div> -->
        <div class="wrap">  
            <div class="form-group">
                <label class="size-label" for="Sdeadline">Deadline Date For Student</label>
                <input type="date" class="form-control-lg" id="Sdeadline" name="sdeadline" >
            </div>
            <div class="form-group">
                <label class="size-label" for="Tdeadline">Deadline Date For Teacher</label>
                <input type="date" class="form-control-lg" id="Tdeadline" name="tdeadline">
            </div>
      <!-- <router-link to='/studentdisplay'>Login</router-link> -->
      <!-- <form v-on:submit.prevent="loginUser"> -->
            <button type="submit" class="btn-group-lg">Submit</button>
        </div>
        <!-- <div>
            <label class="size-label" for="Date">Deadline Date For Students</label>
            <input type="date" class="form-control-lg" id="Date" name="date">
        </div>
        <div>
            <label class="size-label" for="Date">Deadline Date For Teachers</label>
            <input type="date" class="form-control-lg" id="Date" name="date">
        </div> -->
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
      details: {
        // value: 'Click Me',
        emailpass: ""
      },
        value: 'Click Me!',
        tempValue: null,
        editing: false
    };
  },
   methods: {
      enableEditing: function(){
        this.tempValue = this.value;
        this.editing = true;
    },
      disableEditing: function(){
        this.tempValue = null;
        this.editing = false;
    },
    saveEdit: function(){
      // However we want to save it to the database
        this.value = this.tempValue;
        this.disableEditing();
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

.wrap {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  width: 560px;
  padding: 25px 85px 55px 75px;
  background-color: #fffaf4;
}

.size-label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-control-lg {
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
  width: 100%;
}

.btn-group-lg {
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
  margin-top: 587px;
  padding: .5rem 1rem;
  line-height: 0.25;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}
</style>
