<template>

    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
        <div class="notes">
        <FormItem @update:value="onUpdateNotes"
                  field-name="备注"
                  :value="record.notes"
                  placeholder="请输入备注名"

        />
        </div>
        <Tags @update:value="record.tags = $event"/>
    </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';


  @Component({
    components: {Tabs, Tags,  FormItem,  NumberPad},
  })
  export default class Money extends Vue {

    get recordList(){
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    record: RecordItem = {
      tags: [],
      notes:'',
      type:'-',
      amount: 0,
    };

    created(){
      this.$store.commit('fetchRecords')
    }

    onUpdateNumberPad(value: string) {
     this.record.amount = parseFloat(value) ;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord(){
      if (!this.record.tags || this.record.tags.length === 0){
        window.alert('请至少选择一个标签');
        return;
      }
       this.$store.commit('createRecord',this.record);

        if ( this.$store.state.createRecordError === null){
          window.alert("已保存")
        }
    }
  }
</script>
<style lang="scss" scoped>
   ::v-deep .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }

</style>

<style scoped lang="scss">


</style>