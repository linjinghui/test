<template>
  <div>
    <button @click="clk1">getUrlParamt</button>,
    <button @click="clk2">dataFormat</button>,
    <button @click="clk3">dataIntelligentFormat</button>,
    <button @click="clk4">strToData</button>,<br>
    <button @click="clk5">ssgSaveData</button>,
    <button @click="clk6">ssgGetData</button>,
    <button @click="clk7">ssgGetDataDel</button>,
    <button @click="clk8">ssgDeleteData</button><br>
    <button @click="clk9">lsgSaveData</button>,
    <button @click="clk10">lsgGetData</button>,
    <button @click="clk11">lsgGetDataDel</button>,
    <button @click="clk12">lsgDeleteData</button>,<br>
    <button @click="clk13">unique</button>,
    <button @click="clk14">debounce</button>,
    <button @click="clk15">once</button>,
    <button @click="clk16">getAbsoluteUrl</button>,
    <button @click="clk17">downloadFile</button>
  </div>
</template>

<script>
import {getUrlParamt, dataFormat, dataIntelligentFormat, strToData, ssgSaveData, ssgGetData, ssgGetDataDel, ssgDeleteData, lsgSaveData, lsgGetData, lsgGetDataDel, lsgDeleteData, unique, debounce, once, getAbsoluteUrl, downloadFile} from '../libs/js/util.js';

export default {
  name: 'demo',
  data: function () {
    return {
      'btnTheme': 'success'
    };
  },
  methods: {
    'clk1': function () {
      alert(getUrlParamt('name'));
    },
    'clk2': function () {
      let fmt = 'yyyy/MM-dd hh:mm:ss';
      let str = dataFormat(new Date(), fmt);

      alert(str);
    },
    'clk3': function () {
      let l = new Date().getTime() + 24 * 60 * 60 * 1000;
      let str = dataIntelligentFormat(new Date(l));

      alert(str);
    },
    'clk4': function () {
      let str = '2017-10-11 14:12:20';
      let date = strToData(str);

      alert(date);
      let fmt = 'yyyy/MM-dd hh:mm:ss';

      str = dataFormat(date, fmt);

      alert(str);
    },
    'clk5': function () {
      let key = 'key1';
      let val = 'hello world';

      ssgSaveData(key, val);
    },
    'clk6': function () {
      let key = 'key1';
      let val = ssgGetData(key);

      alert(val);
    },
    'clk7': function () {
      let key = 'key1';
      let val = ssgGetDataDel(key);

      alert(val);
    },
    'clk8': function () {
      let key = 'key1';

      ssgDeleteData(key);
    },
    'clk9': function () {
      let key = 'key2';
      let val = 'hello man';

      lsgSaveData(key, val);
    },
    'clk10': function () {
      let key = 'key2';
      let val = lsgGetData(key);

      alert(val);
    },
    'clk11': function () {
      let key = 'key2';
      let val = lsgGetDataDel(key, 3000);

      alert(val);
    },
    'clk12': function () {
      let key = 'key2';

      lsgDeleteData(key);
    },
    'clk13': function () {
      let arr = [['a', 'b'], '2', ['a', 'b'], '4', '2', '3'];

      arr = unique(arr);
      alert(arr);
    },
    'clk14': debounce(function () {
      alert('3s内不重复执行');
    }, 3000),
    'clk15': once(function () {
      alert('只执行1次');
    }),
    'clk16': function () {
      let url = './demo.vue';
      let path = getAbsoluteUrl(url);

      alert(path);
    },
    'clk17': function () {
      let url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504606607040&di=6811f36f416f99f4272745bffd377e5a&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120727%2F201995-120HG1030762.jpg';

      downloadFile(url);
    }
  }
};
</script>

<style scoped>

</style>