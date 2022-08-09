# bilisearch

潜在bug：
1. 搜索偏移到无数据的时候，可能并不会显示无数据提示，因为判断数据总量用的是 total 字段，可以改用 data.length
2. 友链在 router-view 没加载出来时会在页面最顶端
3. PE 端 tags 上下间距异常


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
