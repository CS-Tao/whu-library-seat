---
next: false
---
:::tip
本页面针对开发者
:::

### 桌面端(Windows/MacOS/Linux)

>项目工程：[whu-library-seat](https://github.com/CS-Tao/whu-library-seat)，使用 Electron + Vue 搭建

#### 分支使用说明

- master

  主分支，每次提交都标记一个 tag，对应一个新版本，并更新本文档

- develop

  开发分支，开发的新功能都汇总到本分支

- gh-pages

  存放本文档

- usage-records

  存放后台项目源码，使用 express.js 搭建，用于记录软件使用数据

- user-validation

  存放用户白名单、发布新公告、发布移动端新版本

- 其他

  开发新功能(最终会策略合并到`develop`分支)、解决刚发布版本的 bug(最终会策略合并到`master`分支和`develop`分支)

### 移动端(Android)

>项目工程：[whu-library-seat-mobile](https://github.com/CS-Tao/whu-library-seat-mobile)，使用 Cordova + Vue 搭建

#### 分支使用说明

- master

  主分支，所有标记 tag 的提交一定在此分支上，每一个 tag 对应一个版本。

  本分支是一个 cordova 工程，利用 Travis CI 对它的每次提交进行持续集成，并将生成的安装包部署到[GitHub Release](https://github.com/CS-Tao/whu-library-seat-mobile/releases)

- source

  网页源工程，由桌面端项目工程转化而成。每次提交都会被 Travis CI 持续集成，并将生成的网页部署到`gh-pages`分支

- gh-pages

  由`source`分支生成的网页会被存放到本分支，当`master`分支被集成的时候，会下载本分支的资源，将其打包为`apk`安装包
  