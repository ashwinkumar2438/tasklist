<template>
<div class="cover" @click="closeDrops">
  <div id="app" @click.stop>
    <div class="headblock"><span class="title">{{mainheader}}</span> <button class="task-button" @click="formModal=!formModal">Add a Task</button></div>
    <div v-if="eventlist.filter(task=>!task.complete).length" >
        <taskTab v-for="event in eventlist.filter(task=>!task.complete)" :key="event.name.replace(/\s/g,'-')" :task="event" @change-detect="updateVal" 
                  @important-toggle="switchImportant"
                  @complete="complete"  
                  @remove-item="removeTask"
            />
    </div>
    <div class="notaskzone" v-else>
        <span>There are no tasks for now...</span>
    </div>
    
     <div  v-if="eventlist.filter(task=>task.complete).length" class="title" style="margin:20px 10px;">Completed Tasks</div>

    <completedTasks v-for="event in eventlist.filter(task=>task.complete)" @remove-item="removeTask" :key="event.name.replace(/\s/g,'-')" :task="event" />

      
     <modal-block :show="formModal" @close-modal="closeModal"><inputForm :namelist="eventlist.map(task=>task.name)" @add-task="addTask" @close-modal="closeModal" /></modal-block>
  </div>
</div>  
</template>

<script>
import taskTab from "@/components/event"; 
import completedTasks from "@/components/completedTasks"; 
import inputForm from "@/components/inputForm";
import EvBus from "@/main.js";
export default {
  name: 'App',
  data(){
    return {
      formModal:false,
      eventlist:[]
    }
  },
  computed:{
    mainheader(){
     return  this.eventlist.filter(x=>!x.complete).length?"Tasks List":"Add your tasks :)";
    }
  },
  methods:{
    updateVal:((fn,timedelay)=>{
        let timerid=null;
        return function(){
            clearTimeout(timerid);
            timerid=setTimeout(fn.bind(this,...arguments),timedelay);
        }
    })(function(identifier,property,value){
        this.eventlist.find(x=>x.name===identifier)[property]=value;
    },2000),

    switchImportant(name){
        let task=this.eventlist.find(x=>x.name===name);
        task.flag=!task.flag;
    },

    complete(name){
      this.eventlist.find(x=>x.name===name).complete=true;
    },

    removeTask(name){
      this.eventlist.splice(this.eventlist.findIndex(x=>x.name===name),1);
    },

    addTask(name,desc,flag){
      this.eventlist.push({
        name,desc,flag,complete:false
      })
      this.closeModal();
    },

    closeModal(){this.formModal=false;},

    closeDrops(){
      EvBus.$emit("drop-activated");
    }
  },
  components:{taskTab,completedTasks,inputForm}
}



</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap');
*{
  box-sizing: border-box;
  margin:0;
  padding:0;
  font-family: 'Heebo', sans-serif;
  font-weight: 500;
}
.cover{
  width:100%;
  min-height: 100vh;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 90%;
  @media screen and (min-width: 992px) {
      width: 50%;
  }
}

.title{
  font-size: 24px;
  font-weight: 600;
}
.task-button{
  background:white;
  border:3px solid rgba(223,143,123,0.8);
  outline:none;
  padding:8px 18px;
  cursor: pointer;
}
.headblock{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin:10px 5px;
}

.notaskzone{
  height:100px;
}
</style>
