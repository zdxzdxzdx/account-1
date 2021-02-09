
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [] as RecordItem[],

    clone(data: RecordItem[] | RecordItem){
        return JSON.parse(JSON.stringify(data));
    },
    fetch(){
        return JSON.parse( window.localStorage.getItem('recordList')||'[]') as RecordItem[];
    },
    save(){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }

}
export default  recordListModel;