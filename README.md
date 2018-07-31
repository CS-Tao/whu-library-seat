[![Build status](https://ci.appveyor.com/api/projects/status/qq2adqaxv6vfj7di/branch/master?svg=true)](https://ci.appveyor.com/project/CS-Tao/whu-library-seat/branch/master)
[![Build Status](https://travis-ci.com/CS-Tao/whu-library-seat.svg?branch=master)](https://travis-ci.com/CS-Tao/whu-library-seat)
[![license](https://img.shields.io/badge/license-none-yellow.svg)](https://home.cs-tao.cc/whu-library-seat/copyright/)
[![feedback](https://img.shields.io/badge/feedback-issues-blue.svg)](https://github.com/CS-Tao/whu-library-seat/issues/new)

# whu-library-seat

>武汉大学图书馆抢座软件

## 下载和安装

下载链接：[https://github.com/CS-Tao/whu-library-seat/releases/latest](https://github.com/CS-Tao/whu-library-seat/releases/latest)

### 下载说明

- Windows
    - 安装包: `whu-library-seat-setup-<version>.exe`
    - 最新版本: [v1.0.2](https://github.com/CS-Tao/whu-library-seat/releases/download/v1.0.2/whu-library-seat-setup-1.0.2.exe)

- Mac OS
    - 安装包: `whu-library-seat-<version>.dmg`
    - 在新版本：[v1.0.2](https://github.com/CS-Tao/whu-library-seat/releases/download/v1.0.2/whu-library-seat-1.0.2.dmg)

- Linux
    - 安装包: `whu-library-seat-<version>-x86_64.AppImage`
    - 在新版本：[v1.0.2](https://github.com/CS-Tao/whu-library-seat/releases/download/v1.0.2/whu-library-seat-1.0.2-x86_64.AppImage)

### 安装软件

下载了安装版的用户请直接执行文件夹中的安装文件安装本软件，下载了免安装绿色版的用户请将解压后的文件夹放到您方便找到的目录下

### 申请软件使用权

在您登录之前，软件会检查您的学号是否被记录在[这个文件](https://github.com/CS-Tao/whu-library-seat/blob/user-validation/validation.json)中，只有被记录在这个文件中的学号才能使用本软件，如果您的学号没有被记录，您可以通过邮件[联系我](http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=whucstao@qq.com)(请在邮件中注明学号、院系和姓名)

当然，因为本软件为开源软件，您可以在遵守本软件[#版权声明](#版权声明)的前提下，自己构建软件并删除其中的认证代码，具体请查看[#面向开发者](#面向开发者)

## 使用说明

### 文档地址

[https://home.cs-tao.cc/whu-library-seat/](https://home.cs-tao.cc/whu-library-seat/)

### 软件演示

![软件演示](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/full.gif)

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

本软件开源，但没有向开发者提供任何源码`许可证`，作者本人保留源代码的所有权利，任何组织和个人不得将本软件的全部或部分源码用于商业活动

Copyright © 2018 CS-Tao
