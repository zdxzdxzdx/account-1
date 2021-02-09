<template>
        <button class="button" ><slot/></button>
<!--    @click="$emit('click',$event)"-->
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Vue from 'vue';

  @Component
  export default class Button extends Vue {

  }
</script>

<style scoped lang="scss">
    .button {
        background: #F0DE38;
        color: #000000;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;
        &-wrapper{
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }

    }

</style>