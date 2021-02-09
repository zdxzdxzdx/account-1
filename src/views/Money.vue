<template>

    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <Notes @update:value="onUpdateNotes"/>
        <Tags :data-source.sync="tags" @update:value="onUpdateTag"/>
    </Layout>
</template>


<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';
  import {Component, Watch} from 'vue-property-decorator';

  const recordList = recordListModel.fetch()

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })

  export default class Money extends Vue {
    tags = tagListModel.fetch;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
      tags: [],
      notes:'',
      type:'-',
      amount: 0,
    };

    onUpdateNumberPad(value: string) {
     this.record.amount = parseFloat(value) ;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateTag(value: string[]) {
      this.record.tags = value;
    }
    saveRecord(){
       const record2: RecordItem = recordListModel.clone(this.record);
      record2.createdAt = new Date();
       this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChange(){
       // window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
      recordListModel.save(this.recordList);
    }

  }
</script>
<style lang="scss" >
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

</style>

<style scoped lang="scss">


</style>