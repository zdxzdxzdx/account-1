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
  import {Component, Watch} from 'vue-property-decorator';

  const recordList: Record[]= JSON.parse( window.localStorage.getItem('recordList')||'[]');
  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
  }

  @Component({
    components: {Tags, Notes, Types, NumberPad}
  })

  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行', '彩票'];
    recordList: Record[] = recordList;
    record: Record = {
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
       const record2: Record = JSON.parse(JSON.stringify(this.record));
      record2.createdAt = new Date();
       this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChange(){
       window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
    }

  }
</script>
<style lang="scss">
    .layout-content {
        border: 3px solid red;
        display: flex;
        flex-direction: column-reverse;
    }

</style>

<style scoped lang="scss">


</style>