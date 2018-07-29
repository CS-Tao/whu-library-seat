module.exports = {
  base: '/whu-library-seat/',
  dest: 'dist/docs',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '图书馆抢座软件',
      description: 'Wuhan university'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'CS-Tao/whu-library-seat',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '用户手册',
            link: '/specification/',
          },
          {
            text: '程序框架',
            link: '/framework/'
          }
        ],
        sidebar: {
          '/specification/': [
            {
              title: '用户手册',
              children: [
                ['', '概述'],
                ['menu', '菜单'],
                ['tray', '托盘'],
                ['settings', '设置'],
                ['login', '登录'],
                ['main-form', '主界面'],
                ['reservation', '定时预约']
              ]
            }
          ],
          '/framework/': [
            {
              title: '程序框架',
              children: [
                ['', '概述'],
                ['electron-vue', 'Electron-Vue'],
                ['element-ui', 'Element-UI'],
                ['vuex', 'Vuex'],
                ['style', '样式'],
                ['apis', '数据接口'],
                ['mockjs', '数据模拟'],
                ['components', '视图和组件']
              ]
            }
          ]
        }
      }
    }
  }
}
