<template>

    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateNumberPad" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <div class="notes">
        <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="请输入备注名"/>
        </div>
        <Tags />
    </Layout>
</template>


<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';



  @Component({
    components: {Tags,  FormItem, Types, NumberPad},
  })

  export default class Money extends Vue {
    // tags = store.tagList;
    // recordList = store.recordList;
    get recordList(){
      return this.$store.state.recordList;
    }

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
       this.$store.commit('createRecord',this.record);
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