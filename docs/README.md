---
home: true
heroImage: /hero.png
actionText: 快速开始
actionLink: /#快速开始
features:
- title: 定时抢座
  details: 软件提供了定时抢座的功能，用户可以指定时间开始抢座，也可以通过勾选"√使用当前时间"立即抢座
- title: 座位筛选
  details: 用户除了可以根据场馆和房间选择筛选座位之外，还可以根据是否靠窗和是否有电源筛选座位
- title: 错误处理
  details: 当位置已经被别人预约之后，软件会根据用户提供的时间段和房间信息，自动预约距离该位置较近的座位
footer: Copyright © 2018 CS-Tao
---

### 快速开始

::: tip
您可以通过以下步骤快速使用本软件预约座位，查看详细使用说明请移步[用户手册](/specification/)

如果您想了解本软件的架构或者您希望在它的基础上添加新的功能，请移步[程序框架](/framework/)
:::

#### 登录

启动软件，输入用户名和密码(点击小锁图标可以记住用户名和密码)，点击`登录`按钮登录到图书馆，如下图所示

![登录演示](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/login.gif)

#### 快速预约

登录成功后，在主界面选择要预约的`日期`、`时间`、`场馆`、`房间`、`位置`等参数(点击电源图标和太阳图标可以对座位进行预筛选)，点击`定时抢座`按钮，在弹出的`定时器`界面选择定时抢座的`日期`和`时间`(点击`使用当前时间`按钮可以在**当前时间**和**设置的图书馆开始预约的时间**之间切换)，点击`定时抢座`按钮开始定时抢座，倒计时结束软件便会开始抢座，如下图所示

::: warning 注意
在点击`定时抢座`按钮前请务必确认`日期`参数和`时间`参数无误
:::

![快速预约演示](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/reserve.gif)

#### 取消预约

登录成功后，点击主界面下方的`预约历史`按钮可以查看预约历史，如果有处于预约状态的条目，点击`取消预约`按钮即可取消预约，如下图所示

![取消预约演示](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/cancel.gif)

::: warning Copyright © 2018 CS-Tao
本软件开源，但没有向开发者提供任何源码许可证，作者本人保留源代码的所有权利，任何组织和个人不得将本软件的全部或部分源码用于商业用途
:::
