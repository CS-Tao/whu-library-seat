import Mock from 'mockjs'
import libraryApi from './library.api'

// 登录
Mock.mock(/\/rest\/auth/, 'get', libraryApi.Login)

// 得到可以使用的房间信息
Mock.mock(/\/rest\/v2\/free\/filters/, 'get', libraryApi.FreeFilters)

// 得到房间详细信息
Mock.mock(/\/rest\/v2\/room\/stats2\//, 'get', libraryApi.RoomStats)

// 验证 token 是否可用
Mock.mock(/\/rest\/v2\/violations/, 'get', libraryApi.ValidateToken)

// 得到位置详细信息
Mock.mock(/\/rest\/v2\/room\/layoutByDate\//, 'get', libraryApi.LayoutByDate)

// 预约位置
Mock.mock(/\/rest\/v2\/freeBook/, 'post', libraryApi.Book)

// 取消预约
Mock.mock(/\/rest\/v2\/cancel\//, 'get', libraryApi.Cancel)

// 得到用户信息
Mock.mock(/\/rest\/v2\/user/, 'get', libraryApi.User)

// 得到预约历史
Mock.mock(/\/rest\/v2\/history\//, 'get', libraryApi.History)
