<template>
  <div class="mainblock">
      <span class="header">{{task.name}}</span>
      <button @click="$emit('remove-item',task.name)">Remove</button>
  </div>
</template>

<script>
export default {
    name:"completedTasks",
    props:["task"]
}
</script>

<style lang="scss" scoped>
    $color:limegreen;
    .mainblock{
        background: lighten($color,25%);
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;
        padding:10px 15px;

              .header{
                  font-weight: 700;
              }      

              button{
                outline: none;
                border:2px solid $color;
                padding: 3px 10px;
                background-color:rgb(247, 246, 243);
                margin:2px 10px;
                color: darkmagenta;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease-in;
                &:hover{
                    box-shadow: 0px 0px 3px $color, 0px 0px 6px $color;
                        background: white;  
                }
                    &:active{
                    box-shadow: 0px 0px 1px $color;
                }
        }
    }
</style>