<template>
  
  <div class="background" :class="{show}" @click="$emit('close-modal')">
      <div class="modal" :class="{show}" @click.stop>
           <slot /> 
      </div>
  </div>

</template>

<script>
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="scss" scoped>

.background{
    position:fixed;
    z-index:3;
    background-color:rgba(123,123,123,0.5);
    top:0;
    left:0;
    height:100vh;
    width:100%;
    display: none;
    .modal{
        z-index: 5;
        position: absolute;
        top:50%;
        left:50%;
        width: 90vw;
        transform: translate(-50%,-50%);
        padding:10px 20px;
        background: white; 
        box-shadow: 0px 0px 5px rgba(123,123,123,0.8),0px 0px 5px 5px rgba(123,123,123,0.6);   
        display:none;
        @media screen and (min-width: 992px){
              width:40%;  
        }
    }
    
    .modal.show{
        display: block;
        animation: slidein 0.5s;
        animation-fill-mode: forwards;

        @keyframes slidein {
            0%{
                transform: translate(-50%,-50%) scale(0.4,0.4);
                visibility: hidden;
            }
            100%{
                transform: translate(-50%,-50%) scale(1,1);
                visibility: visible;
            }
        }
    }

    &.show{
        display: block;
    }
}
</style>