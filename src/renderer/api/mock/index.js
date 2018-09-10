import Mock from 'mockjs'
import gitcontentsApi from './gitcontents.api'
import libraryApi from './library.api'
import urls from '../urls'

// 用户验证
Mock.mock(urls.gitcontents.validateUser.regular, 'get', gitcontentsApi.validateUser)

// 登录
Mock.mock(urls.library.Login.regular, 'get', libraryApi.Login)

// 得到可以使用的房间信息
Mock.mock(urls.library.FreeFilters.regular, 'get', libraryApi.FreeFilters)

// 得到房间详细信息
Mock.mock(urls.library.RoomStats.regular, 'get', libraryApi.RoomStats)

// 验证 token 是否可用
Mock.mock(urls.library.ValidateToken.regular, 'get', libraryApi.ValidateToken)

// 得到位置详细信息
Mock.mock(urls.library.LayoutByDate.regular, 'get', libraryApi.LayoutByDate)

// 按时间搜索位置
Mock.mock(urls.library.SearchSeat.regular, 'post', libraryApi.SearchSeat)

// 预约位置
Mock.mock(urls.library.Book.regular, 'post', libraryApi.Book)

// 取消预约
Mock.mock(urls.library.Cancel.regular, 'get', libraryApi.Cancel)

// 得到用户信息
Mock.mock(urls.library.User.regular, 'get', libraryApi.User)

// 得到预约历史
Mock.mock(urls.library.History.regular, 'get', libraryApi.History)
