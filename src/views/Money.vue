<template>

    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <div class="notes">
        <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="请输入备注名"/>
        </div>
            <Tags :data-source.sync="tags" @update:value="onUpdateTag"/>
    </Layout>
</template>


<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import recordListModel from '@/models/recordListModel';
  import {Component, Watch} from 'vue-property-decorator';

  const recordList = recordListModel.fetch()
  @Component({
    components: {Tags,  FormItem, Types, NumberPad}
  })

  export default class Money extends Vue {
    tags = window.tagList;
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
       recordListModel.create(this.record);
    }

    @Watch('recordList')
    onRecordListChange(){
      recordListModel.save();
    }

  }
</script>
<style lang="scss" >
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }

</style>

<style scoped lang="scss">


</style>