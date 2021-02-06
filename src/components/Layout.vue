<template>

        <div class="nav-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
            <div class="content" :class="classPrefix && `${classPrefix}-content`">
                <slot/>
            </div>
            <Nav/>
    </div>
</template>

<script lang="ts">
  export default {
    props:['classPrefix'],
    name: 'Layout.vue'
  };
</script>

<style scoped lang="scss">
    .nav-wrapper {
        /*border: 1px solid green;*/
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content {
        /*border: 1px solid blue;*/
        overflow: auto;
        flex-grow: 1;
    }

</style>