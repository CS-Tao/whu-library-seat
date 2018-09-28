import Mock from 'mockjs'
import gitcontentsApi from './gitcontents.api'
import usageApi from './usage.api'
import libraryApi from './library.api'
import urls from '../urls'

// 用户验证
Mock.mock(urls.gitcontents.validateUser.regular, gitcontentsApi.validateUser.method, gitcontentsApi.validateUser)

// 登录状态
Mock.mock(urls.usage.loginState.regular, usageApi.loginState.method, usageApi.loginState)

// 抢座状态
Mock.mock(urls.gitcontents.grabState.regular, usageApi.grabState.method, usageApi.grabState)

// 登录
Mock.mock(urls.library.Login.regular, libraryApi.Login.method, libraryApi.Login)

// 得到可以使用的房间信息
Mock.mock(urls.library.FreeFilters.regular, libraryApi.FreeFilters.method, libraryApi.FreeFilters)

// 得到房间详细信息
Mock.mock(urls.library.RoomStats.regular, libraryApi.RoomStats.method, libraryApi.RoomStats)

// 验证 token 是否可用
Mock.mock(urls.library.ValidateToken.regular, libraryApi.ValidateToken.method, libraryApi.ValidateToken)

// 得到位置详细信息
Mock.mock(urls.library.LayoutByDate.regular, libraryApi.LayoutByDate.method, libraryApi.LayoutByDate)

// 按时间搜索位置
Mock.mock(urls.library.SearchSeat.regular, libraryApi.SearchSeat.method, libraryApi.SearchSeat)

// 预约位置
Mock.mock(urls.library.Book.regular, libraryApi.Book.method, libraryApi.Book)

// 取消预约
Mock.mock(urls.library.Cancel.regular, libraryApi.Cancel.method, libraryApi.Cancel)

// 得到用户信息
Mock.mock(urls.library.User.regular, libraryApi.User.method, libraryApi.User)

// 得到预约历史
Mock.mock(urls.library.History.regular, libraryApi.History.method, libraryApi.History)
