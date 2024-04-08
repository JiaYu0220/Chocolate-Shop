import { defineStore } from 'pinia';

export default defineStore('helperStore', {
  actions: {
    timestampToDate(time) {
      return new Date(time * 1000).toLocaleDateString();
    },
    removeDuplicateArray(dataArray, arrayName) {
      const result = new Set(); // 使用 Set 重複的元素不會被加進去
      if (arrayName === 'tag') {
        dataArray.forEach((dataItem) => {
          if (Array.isArray(dataItem[arrayName])) {
            dataItem[arrayName].forEach((item) => {
              result.add(item);
            });
          }
        });
      } else if (arrayName === 'category') {
        dataArray.forEach((dataItem) => {
          result.add(dataItem[arrayName]);
        });
      }
      return Array.from(result); // 將 Set 轉換為陣列
    },
  },
});
