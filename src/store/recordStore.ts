import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
 const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(){
    return JSON.parse( window.localStorage.getItem('recordList')||'[]') as RecordItem[];
  },
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.recordList));
  },

  createRecord (record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecords()
  },
};

 recordStore.fetchRecords();

 export default  recordStore;