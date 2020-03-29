import { LocalStorage } from './lib/LocalStorage';

const st = new LocalStorage();

st.list('/Users/cesar/test_lib', 3).then((res) => console.log(res));
