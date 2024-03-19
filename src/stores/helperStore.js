import { defineStore } from 'pinia';

export default defineStore('helperStore', {
  actions: {
    timestampToDate(time) {
      return new Date(time * 1000).toLocaleDateString();
    },
    handleArrayInData(dataArray, arrayName) {
      const result = new Set(); // 使用 Set 重複的元素不會被加進去
      if (arrayName === 'tag') {
        dataArray.forEach((dataItem) => {
          dataItem[arrayName].forEach((item) => {
            result.add(item); // 使用 Set 的 add 方法加入元素，Set 會自動處理重複的情況
          });
        });
      } else if (arrayName === 'category') {
        dataArray.forEach((dataItem) => {
          result.add(dataItem[arrayName]); // 使用 Set 的 add 方法加入元素，Set 會自動處理重複的情況
        });
      }
      return Array.from(result); // 將 Set 轉換為陣列
    },
  },
});
