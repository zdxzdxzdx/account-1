<template>
    <div class="tags">
        <div class="new">
            <button @click="createTag">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id"
                :class="{selected:selectedTag.indexOf(tag)>=0}"
                @click="toggle(tag)">{{tag.name}}
            </li>
        </ul>

    </div>
</template>

<script lang="ts">

  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/TagHelper';

  @Component
  export default class Tags extends mixins(TagHelper) {
    get tagList(){
      return this.$store.state.tagList;
    }
     created(){
       this.$store.commit('fetchTags')
     }

    selectedTag: string[] = [];

    toggle(tag: string) {
      const index = this.selectedTag.indexOf(tag);
      if (index>=0){
        this.selectedTag.splice(index,1);
      }else {
      this.selectedTag.push(tag);
      }
      this.$emit('update:value',this.selectedTag)
    }

  }
</script>

<style scoped lang="scss">
    .tags {
        background: white;
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;

        > .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                background: #d9d9d9;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected{
                    background: #F0DE38;
                }
            }
        }

        > .new {
            padding-top: 16px;

            button {
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }
    }


</style>