# 可_可 黑巧克力專賣店 | [前台](https://jiayu0220.github.io/Chocolate-Shop/)、[後台](https://jiayu0220.github.io/Chocolate-Shop/#/login)

(![image](https://github.com/JiaYu0220/Chocolate-Shop/assets/134919211/f73a2b4b-cecf-446a-bc78-985c53ac5bf2)

- [作品說明](#作品說明)
- 
  - [發想](#發想)

- [功能](#功能)

  - [測試帳號密碼](#測試帳號密碼)

  - [使用者故事](#使用者故事)

    - [使用者端(學生)](#使用者端學生)

- [安裝](#安裝)

  - [取得專案](#取得專案)

  - [移動到專案內](#移動到專案內)

  - [安裝套件](#安裝套件)

  - [運行專案](#運行專案)

  - [開啟專案](#開啟專案)

- [資料夾說明](#資料夾說明)

- [專案技術](#專案技術)

- [聯絡方式](#聯絡方式)

  - [jia yu](#jia-yu)

## 作品說明

- 資料庫串接電商 RESTful API
  
- 具有完整前台與後台功能
  
- 本作品僅作業練習，無任何商業用途，作品中圖片均來自於 [unsplash](https://unsplash.com/) 和 [pexels](https://www.pexels.com/zh-tw/)

### 發想

- 這是一個專為那些渴望享受點心卻不想感到內疚的人所設立的黑巧克力專賣電商網站。這個網站擁有完整的前後台架構，提供使用者方便的購物體驗與後台管理功能。

## 功能

### 測試帳號密碼

- 前台無須登入即可操作

- 後台有設定**一鍵登入**按鈕，或者也可以輸入帳號密碼登入
  - 帳號：alice49885@gmail.com
  - 密碼：a12345

### 使用者故事

#### 使用者端(前台)

- 我能夠從首頁了解優惠產品、產品分類、優惠資訊(跑馬燈、倒數計時)

  ![image](https://github.com/JiaYu0220/Chocolate-Shop/assets/134919211/7c91e963-ae2b-403e-9b9d-b59e64a64ce6)

- 我是使用者，我想要選購商品

  ![image](https://github.com/JiaYu0220/Chocolate-Shop/assets/134919211/cb89eaaa-502a-4a14-aa20-cade0390c296)

- 我是使用者，我想要查看產品相關資訊

  ![image](https://github.com/Peg-L/project-code/assets/134919211/ded7a7ee-eab7-4956-8721-4c4be7c3f9d2)

- 我是使用者，我想要查看店家相關文章

![image](https://github.com/JiaYu0220/Chocolate-Shop/assets/134919211/a64523ea-1a76-41d7-8cd1-7d8f4049b3ec)

- 我是使用者，我想要購買課程

  - 我能夠將課程加入或刪除購物車
  - 我能夠使用優惠券
  - 我能夠付款完成訂單
  - 我能夠看到訂購的資訊

  ![image](https://github.com/JiaYu0220/Chocolate-Shop/assets/134919211/ed683ccd-d3df-48fa-8dff-10a90cf3d30a)

#### 賣家端(後台)

- 我是賣家，我想要編輯和新增產品、優惠券、文章，且能夠裁剪並上傳圖片

  ![image](https://github.com/JiaYu0220/Chocolate-Shop/assets/134919211/06fa735a-8dd5-469b-8998-b33600173cae)

- 我是賣家，我想要管理訂單

## 安裝

- Node.js 版本建議為：`18.16.0` 以上

### 取得專案

```bash
git clone git@github.com:JiaYu0220/Chocolate-Shop.git
```

### 移動到專案內

```bash
cd project-code
```

### 安裝套件

```bash
npm install
```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:5173/
```

## 資料夾說明

```
|- public - 靜態檔案
|- src
  |- asset - 圖片
  |- components - 元件
    |- adminPages - 後台
    |- icons
    |- shared - 共用元件
    |- userPages - 前台
  |- router
  |- stores - 狀態管理
  |- views - 頁面
    |- admin - 後台
    |- user - 前台
```

## 專案技術

- Node.js `v18.16.0`
- Vite `v5.0.11`
- vue-router: `v4.2.5`
- pinia: `v2.1.7`
- axios: `v1.6.7`
- vue-axios:: `v3.5.2`
- tailwindcss: `v3.4.1`
- vee-validate: `v4.12.5`
- swiper: `v11.0.7`
- sweetalert2: `v11.10.5`
- vue-sweetalert2: `v5.0.5`
- vue-loading-overlay: `v6.0`
- animate.css: `v4.1.1`
- aos: `v3.0.0-beta.6`
- bootstrap-icons: `v1.11.3`


## 聯絡方式

### jia yu

- alice49885@gmail.com
