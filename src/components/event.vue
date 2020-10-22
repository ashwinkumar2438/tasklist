<template>
  <div class="mainblock">
      <div class="dropdown" :class="{focused:dropdown,urgent:task.flag,editopen:editflag}">
            <div class="header" @click="toggledrop('dropdown')">{{task.name}}</div>
            <button class="edit" @click="toggledrop('editflag')">{{editbutton}}</button>
            <button class="delete" @click="$emit('remove-item')">Delete</button>
      </div>
      
      <div class="description" :contenteditable="editflag" @input="$emit('change-detect',task.name,'desc',$event.target.innerText)">{{task.desc}}</div>

      <div class="editter">
          
          <button @click="$emit('complete',task.name)">Complete</button>
          <button @click="$emit('important-toggle',task.name)">{{impbutton}}</button>  
          <span>You can edit description...</span>
      </div>
    
   
  </div>
</template>

<script>
import EvBus from "@/main.js";
export default {
name:"currentTask",    
props:["task"],
data(){return {
            dropdown:false,
            editflag:false
            }
    },
methods:{
    toggledrop(key){
        this[key]=!this[key];
        EvBus.$emit("drop-activated",this.task.name);
    }
},
computed:{
    impbutton(){
        return this.task.flag?"Not important":"important";
    },
    editbutton(){
        return this.editflag?"Close":"Edit";
    }
},
mounted(){
    EvBus.$on("drop-activated",(name)=>{
        if(this.task.name!==name){
            this.dropdown=false;
            this.editflag=false;
        }
    })
}
}
</script>

<style lang="scss" scoped>
        $dimension:22px; 
        $checkbox-color:#f6830f;
        $font-color: #1f3c88;

        @mixin focusdrop($addedstyle,$childclass){
                   &#{$addedstyle}{
                border-radius:5px 5px 0px 0px;
                &~#{$childclass}{
                      transform:scaleY(1);
                      opacity: 1;
                      height:max-content;
                      padding:10px 5px;
                  }
                }
        }  
        .dropdown{
            display: flex;
            flex-flow: row wrap;
            outline:none;
            align-items: center;
            background:rgb(247, 246, 243);
            padding:10px 15px;
            border-bottom:2px solid rgb(123,123,123);
            // border-radius: 5px;

              .header{
                  height: $dimension;
                  line-height: $dimension;
                  font-weight: 600;
                  vertical-align: middle;
                  outline: none;
                  text-transform: capitalize;
                  cursor: pointer;
              } 

                button{
                    outline: none;
                    border:2px solid $checkbox-color;
                    padding: 3px 10px;
                    background-color:rgb(247, 246, 243);
                    margin:2px 10px;
                    color: $font-color;
                    cursor: pointer;
                    transition: all 0.2s ease-in;
                    &:hover{
                        box-shadow: 0px 0px 3px $checkbox-color, 0px 0px 6px $checkbox-color;
                         background: white;  
                         font-weight: 700; 
                    }
                      &:active{
                        box-shadow: 0px 0px 1px $checkbox-color;
                    }
                }

                .edit{
                    margin-left:auto;
                }

          

             @include focusdrop(".focused",".description");
             @include focusdrop(".editopen",".editter");
             @include focusdrop(".editopen",".description");



                &.urgent{
                    color: maroon;
                    border-left: 8px solid maroon;
                    border-right: 8px solid maroon;
                    background:rgba(128,0,0,0.2)
                }

        }

         

             .description, .editter{
                  transform:scaleY(0);
                  transform-origin: top;
                  opacity: 0;
                  background: cadetblue;
                  transition:all 0.5s;
                  border-radius: 0px 0px 5px 5px;
                  height:0px;
              }
            .description{
                  outline:none;
                  white-space: pre;
                  &[contenteditable=true]{
                      color:maroon;
                  }  
            }
            .editter{
                background-color:mediumseagreen;

                button{
                    outline: none;
                    border:2px solid purple;
                    color:purple;
                    font-weight: 500;
                    padding: 3px 10px;
                    background-color:rgb(247, 246, 243);
                    margin:2px 10px;
                    cursor: pointer;
                    transition: all 0.2s ease-in;
                    &:hover{
                        box-shadow: 0px 0px 3px purple, 0px 0px 6px purple;
                        background: white; 
                        font-weight: 700;    
                    }
                    &:active{
                        box-shadow: 0px 0px 1px purple;
                    }
                }
            }

</style>