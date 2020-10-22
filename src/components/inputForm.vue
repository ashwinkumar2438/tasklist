<template>
  <div class="form">
          <button class="closer" @click="$emit('close-modal')">close</button>  
          <div class="form-header">Add a Task</div>
          <label class="label"><span>Name:</span><input class="input" @input="name_error=''" v-model="name" type="text" maxlength="20" /></label>
          <div class="name-error" v-if="name_error">{{name_error}}</div>
          <label class="label"><span>Description:</span><textarea class="input" v-model="desc" maxlength="100" rows="2" cols="10"/></label>
          <div class="checkbox">
              <input type="checkbox" v-model="important" id="impinput"/><label for="impinput">Important?</label>
          </div>
          <button class="submit" @click="createTask">Add Task</button>  
  </div>
</template>

<script>
export default {
    props:["namelist"],
    data(){
        return {name:"",desc:"",important:"",name_error:""}
    },
    methods:{
        createTask(){
            if(!this.name)return this.name_error="Please mention the name";
            if(this.namelist.includes(this.name))return this.name_error="Task already Exists!";
            this.$emit('add-task',this.name,this.desc,this.important)
        }
    }
}
</script>

<style lang="scss" scoped>

                .form{
                    display: flex;
                    flex-flow: column wrap;
                    align-items: flex-start;
                    justify-content: center;
                    padding: 10px 20px;
                    color: peru;
                    .form-header{
                        text-align: center;
                        align-self: center;
                        font-weight: 700;
                        font-size: 20px;
                        color: crimson;
                    }   

                    label,.checkbox{
                        margin:10px 5px;
                    }
                    .label{
                        display: flex;
                        flex-flow: column;
                        width: 90%;
                         span{
                             display: inline-block;
                             padding:5px 0px;
                             width:100%;
                             text-align: left;
                             vertical-align: top;
                             width:200px;
                         }   
                    }
                    .input{
                        border:2px solid lightseagreen;
                        padding:5px 10px;
                        outline:none;
                        min-width: 100%;
                    }

                    .submit{
                        outline: none;
                        align-self: center;
                        border: 2px solid crimson;
                        color:crimson;
                        padding: 8px 24px;
                        background: none;
                        cursor: pointer;
                        &:hover{
                            box-shadow: 0px 0px 3px crimson, 0px 0px 6px crimson;
                            background: white;  
                            font-weight: 700; 
                        }
                        &:active{
                            box-shadow: 0px 0px 1px crimson;
                            background: lightgrey;
                        }
                    }
                }

                .closer{
                    align-self:flex-end;
                    background: none;
                    border:2px solid maroon;
                    padding: 4px;
                    color: maroon;
                    cursor: pointer;
                    outline: none;
                }    
                .checkbox label::before{
                    content:"";
                    display: inline-block;
                    vertical-align: top;
                    height: 1em;
                    width: 1em;
                    border: 3px solid lightseagreen;
                    border-radius: 50%;
                    box-shadow: inset 0px 0px 0px -10px white;
                    transition: all 0.5s;
                    margin-right:15px;
                    cursor: pointer;
                }
                .checkbox input{
                    display: none;

                    &:checked+label::before{
                        background: lightseagreen;
                        box-shadow: inset 0px 0px 0px 3px white;
                    }
                }
                .name-error{
                    color:red;
                    padding:5px;
                }
</style>