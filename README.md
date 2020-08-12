# Trelloを真似たタスク管理アプリ  

Trelloを真似たタスク管理アプリを作成しました。  
データの保存はvuexをlocalStorageに保存できる[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)を使用しました。

## 機能
- ボード名の変更  
- リストの生成、削除  
- リスト名の変更  
- カードの生成、削除  
- カード名の変更  
- カードに説明のテキストの追加、アクティビティログの追加  
- カードに期限の設定  
  - 使用したライブラリ  
    - vue-moment  
    - v-calendar
- カードにラベルの追加、変更  
- 移動 
  - 使用したライブラリ
    - vuedraggable
  
こちらが[実際のアプリケーション](https://hozumigouki.github.io/task-management-app/)のリンクです
  
[
![taskmanagementapp-demo](https://user-images.githubusercontent.com/69531558/90001828-e0bad080-dccc-11ea-954a-102ff1486620.gif)
](url)
  
# taskmanagementapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
