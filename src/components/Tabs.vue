<template>
    <div>
        <ul class="tabs">
            <li v-for="item in dataSource" :key="item.value" class="tab-item"
            :class="liClass(item)" @click="select(item)">{{item.text}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import Vue from 'vue';

  type DataSourceItem = { text: string; value: string }

  @Component
  export default class Tabs extends Vue {
        @Prop ({required:true,type:Array}) dataSource!: DataSourceItem[];
        @Prop(String) readonly value!: string;
        @Prop(String) classPrefix?: string;
        @Prop({type: String,default:'64px'})
        height!: string;

        liClass(item: DataSourceItem){
         return { [this.classPrefix + '-tabs-item']: this.classPrefix,
            selected: item.value === this.value
        }

        }
        select(item: DataSourceItem){
          this.$emit('update:value',item.value)
        }
  }
</script>

<style scoped lang="scss">

    .tabs {
        background: #C4C4C4;

        display: flex;
        text-align: center;
        font-size: 24px;
        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background: #F0DE38;
            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>