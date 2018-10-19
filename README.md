[![Build status](https://ci.appveyor.com/api/projects/status/qq2adqaxv6vfj7di/branch/master?svg=true)](https://ci.appveyor.com/project/CS-Tao/whu-library-seat/branch/master)
[![Build Status](https://travis-ci.com/CS-Tao/whu-library-seat.svg?branch=master)](https://travis-ci.com/CS-Tao/whu-library-seat)
[![license](https://img.shields.io/badge/license-none-yellow.svg)](#版权声明)
[![feedback](https://img.shields.io/badge/feedback-issues-blue.svg)](https://github.com/CS-Tao/whu-library-seat/issues/new)

# whu-library-seat

> 武汉大学图书馆抢座软件 - 桌面端

> Android 版本：[https://github.com/CS-Tao/whu-library-seat-mobile](https://github.com/CS-Tao/whu-library-seat-mobile)

## 使用说明

### 文档地址

[https://home.cs-tao.cc/whu-library-seat/](https://home.cs-tao.cc/whu-library-seat/)

### 软件演示

![软件演示](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/full.gif)

## 下载和安装

### 最新版本下载

- Windows
    - 链接: [whu-library-seat-setup-1.5.0.exe](https://github.com/CS-Tao/whu-library-seat/releases/download/v1.5.0/whu-library-seat-setup-1.5.0.exe)

- Mac OS
    - 链接: [whu-library-seat-1.5.0.dmg](https://github.com/CS-Tao/whu-library-seat/releases/download/v1.5.0/whu-library-seat-1.5.0.dmg)

- Linux
    - 链接: [whu-library-seat-1.5.0-x86_64.AppImage](https://github.com/CS-Tao/whu-library-seat/releases/download/v1.5.0/whu-library-seat-1.5.0-x86_64.AppImage)

### 安装软件

运行安装包即可

### 申请软件使用权

在您登录之前，软件会检查您的学号是否被记录在[这个文件](https://github.com/CS-Tao/whu-library-seat/blob/user-validation/validation.json)中，只有被记录在这个文件中的学号(经过加密)才能使用本软件，如果您的学号(经过加密)没有被记录，您可以通过邮件[联系我](http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=whucstao@qq.com)(请在邮件中注明学号、院系和姓名)

当然，因为本软件为开源软件，您可以在遵守本软件[版权声明](#版权声明)的前提下，自己构建软件并删除其中的认证代码，具体请查看[面向开发者](#面向开发者)

### 软件更新

软件启动的时候会自动访问[GitHub Release](https://github.com/CS-Tao/whu-library-seat/releases/latest)检查更新，如果有更新，在软件的左下角会出现更新的按钮

# 面向开发者

您可以通过以下步骤自行构建本软件，但请您务必注意，本仓库并未提供任何源码`许可证`，您没有权利将源码更改后继续传播，更没有权利将本软件或源码用于商业活动

如果您是自行构建而不是通过[申请软件使用权](#申请软件使用权)使用本软件，重新构建的软件只能您自己使用

如果您希望在本软件的基础上继续添加新的功能，非常欢迎您向本仓库发送 Pull Request

``` bash
# 安装依赖
yarn

# 以开发模式运行
yarn dev

# 单元测试和端到端测试
yarn test

# 对 src 文件夹下的 Vue/Js 文件进行语法检查
yarn lint

# 生成应用程序
yarn build
```

## 版权声明

本软件开源，但没有向开发者提供任何源码`许可证`，作者本人保留源代码的所有权利，任何组织和个人不得将本软件或源码用于商业活动

Copyright © 2018 CS-Tao
