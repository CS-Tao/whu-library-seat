const projectList = [
  {
    name: 'whu-library-seat',
    repo: 'whu-library-seat',
    link: 'https://github.com/CS-Tao/whu-library-seat',
    desc: '桌面端软件'
  },
  {
    name: 'whu-library-seat-mobile',
    repo: 'whu-library-seat-mobile',
    link: 'https://github.com/CS-Tao/whu-library-seat-mobile',
    desc: '移动端软件'
  },
  {
    name: 'whu-library-seat-ghauth',
    repo: 'whu-library-seat-ghauth',
    link: 'https://github.com/CS-Tao/whu-library-seat-ghauth',
    desc: 'GitHub 第三方认证'
  },
  {
    name: 'usage-records',
    repo: 'whu-library-seat',
    link: 'https://github.com/CS-Tao/whu-library-seat/tree/usage-records',
    desc: '使用记录'
  },
  {
    name: 'whu-library-seat-docker',
    repo: 'whu-library-seat-docker',
    link: 'https://github.com/CS-Tao/whu-library-seat-docker',
    desc: '后台服务部署方案'
  },
]

new Vue({
  el: '#app',
  data: {
    userCount: null,
    tagPanel: 'desktop-info',
    yearDataPanel: 'year-data-all',
    dayOrDevicePanel: 'day-panel',
    graphs: {},
    graphData: {},
    tableData: [],
    projectList: projectList,
    showDataList: false,
    selectedAccount: 'All',
    selectedEventType: 'All',
    selectedEventCode: 'All',
    selectedStatus: 'All',
    selectedVersion: 'All',
    selectedDevice: 'All',
    selectedGithubId: 'All',
    eventTypeList: ['All'],
    eventCodeList: ['All'],
    accountList: ['All'],
    statusList: ['All'],
    versionList: ['All'],
    deviceList: ['All'],
    githubIdList: ['All']
  },
  watch: {
    dayOrDevicePanel () {
      this.$nextTick(() => {
        if (this.dayOrDevicePanel==='device-panel' && !this.graphs['device-panel']) {
          axios.get('/deviceData').then((response) => {
            response.data.reverse()
            let labels = []
            let labelsForShow = []
            let mobileData = []
            let desktopData = []
            for (let i = 0; i < response.data.length; i++) {
              let dateFormated = `${response.data[i].year}-${response.data[i].month}-${response.data[i].day}`
              if (!labels.includes(dateFormated)) {
                labels.push(dateFormated)
                labelsForShow.push(response.data[i].day)
              }
            }
            for (let i = 0; i < labels.length; i++) {
              let mobileInTheDay = response.data.filter(item => {
                let dateFormated = `${item.year}-${item.month}-${item.day}`
                return dateFormated === labels[i] && item.mobile === 1
              })
              let desktopInTheDay = response.data.filter(item => {
                let dateFormated = `${item.year}-${item.month}-${item.day}`
                return dateFormated === labels[i] && item.mobile !== 1
              })
              if (mobileInTheDay && mobileInTheDay.length !== 0) {
                mobileData.push(mobileInTheDay[0].count)
              } else {
                mobileData.push(0)
              }
              if (desktopInTheDay && desktopInTheDay.length !== 0) {
                desktopData.push(desktopInTheDay[0].count)
              } else {
                desktopData.push(0)
              }
            }
            this.graphs['device-panel'] = new frappe.Chart( "#deviceline", {
              data: {
                labels: labelsForShow,
                datasets: [
                  {
                    name: "桌面端", chartType: 'bar',
                    values: desktopData
                  },
                  {
                    name: "移动端", chartType: 'bar',
                    values: mobileData
                  }
                ]
              },
              height: 250,
              title: "近期不同设备使用情况",
              type: 'bar',
              colors: ['#7cd6fd', '#28a745'],
              tooltipOptions: {
                formatTooltipX: d => labels.filter(l => l.split('-')[2]==d)[0],
                formatTooltipY: d => d === undefined ? 0 : d + ' 次',
              }
            });
          }).catch((error) => {
            console.error(error)
          });
        }
      })
    },
    tagPanel () {
      this.$nextTick(() => {
        if (this.graphData.downloadsInfo) {
          if (this.tagPanel==='mobile-info' && !this.graphs['mobile-info']) {
            var mobileData = this.graphData.downloadsInfo[1]
            this.graphs['mobile-info'] = new frappe.Chart("#download-info-m", {
              title: `移动端下载次数（共 ${mobileData.totalDownload} 次）`,
              data: {
                labels: mobileData.trendTag,
                datasets: [
                  {
                    name: "移动端", chartType: 'bar',
                    values: mobileData.trendData
                  }
                ]
              },
              height: 250,
              colors: ['#ffa3ef'],
              tooltipOptions: {
                formatTooltipX: v => v,
                formatTooltipY: d => d + ' 次',
              }
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: '暂无数据'
          })
        }
      })
    }
  },
  mounted () {
    axios.get('/yeardataall').then((response) => {
      let now = new Date()
      this.graphs['year-data-all'] = new frappe.Chart("#heatmap-all", {
        type: 'heatmap',
        title: "使用次数",
        data: {
          dataPoints: response.data,
          start: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
          end: now
        },
        countLabel: '次',
        height: 200,
        discreteDomains: 0,
        colors: ['#ebedf0', '#fdf436', '#ffc700', '#ff9100', '#06001c'],
        def: ['#ebedf0', '#fdf436', '#ffc700', '#ff9100', '#06001c']
      });
    }).catch((error) => {
      console.error(error)
    });

    axios.get('/yeardata').then((response) => {
      let now = new Date()
      this.graphs['year-data'] = new frappe.Chart("#heatmap", {
        type: 'heatmap',
        title: "成功预约次数",
        data: {
          dataPoints: response.data,
          start: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
          end: now
        },
        countLabel: '次',
        height: 200,
        discreteDomains: 0,
        // colors: ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'],
        // Set of five incremental colors,
        // preferably with a low-saturation color for zero data;
        // def: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
      });
    }).catch((error) => {
      console.error(error)
    });

    axios.get('/dayTrendData').then((response) => {
      if (!response.data || !response.data.length) {
        throw Error('Data is empty.')
      }
      var length = response.data.length
      var labels = []
      var values = []
      for (var i = length - 1; i >= 0; i--) {
        var date = new Date(Date.now().valueOf() - i * 86400000)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var dataIndex = response.data.findIndex(d => d.year === year && d.month === month && d.day === day)
        if (dataIndex !== -1) {
          values.push(response.data[dataIndex].count)
        } else {
          values.push(0)
        }
        labels.push(`${this.fill0(year)}-${this.fill0(month)}-${this.fill0(day)}`)
      }
      this.graphs['day-trend'] = new frappe.Chart("#day-trend", {
        data: {
          labels,
          datasets: [
            {
              name: "使用情况",
              values
            }
          ]
        },
        title: `过去 ${length} 天的使用情况`,
        type: 'line',
        lineOptions: {
          heatline: 1,
          regionFill: 1,
          hideDots: 1
        },
        height: 200,
        colors: ['#238e38'],
        tooltipOptions: {
          formatTooltipY: d => d + ' 次',
        }
      });
    }).catch((error) => {
      console.error(error)
    });

    axios.get('/downloadsInfo').then((response) => {
      if (response.data.status === 'success') {
        this.graphData.downloadsInfo = response.data.data
        var desktopData = this.graphData.downloadsInfo[0]
            this.graphs['desktop-info'] = new frappe.Chart("#download-info", {
              title: `桌面端下载次数（共 ${desktopData.totalDownload} 次）`,
              data: {
                labels: desktopData.trendTag,
                datasets: [
                  {
                    name: "桌面端", chartType: 'bar',
                    values: desktopData.trendData
                  }
                ]
              },
              height: 250,
              colors: ['light-blue'],
              tooltipOptions: {
                formatTooltipX: v => v,
                formatTooltipY: d => d + ' 次',
              }
            });
      } else {
        console.error("Can not fetch software downloads data. Error:", response.data.message)
      }
    }).catch((error) => {
      console.error(error)
    });

    axios.get('/distribution').then((response) => {
      if (!response.data || !response.data.length) {
        throw Error('Data is empty.')
      }
      var accounts = response.data
      this.userCount = accounts.length
      var gradeLabels = [...new Set(accounts.map(a => a.account.substr(0, 4)))].sort((x, y) => parseInt(x) - parseInt(y))
      var collegeLabels = [...new Set(accounts.map(a => a.account.substr(4, 4)))].sort((x, y) => parseInt(x) - parseInt(y))
      var gradeMap = {}
      var collegeMap = {}
      for (var i = 0; i < accounts.length; i++) {
        var grade = accounts[i].account.substr(0, 4)
        var college = accounts[i].account.substr(4, 4)
        gradeMap[grade] = !gradeMap[grade] ? 1 : gradeMap[grade] + 1
        collegeMap[college] = !collegeMap[college] ? 1 : collegeMap[college] + 1
      }
      var gradeValues = gradeLabels.map(l => gradeMap[l])
      var collegeValues = collegeLabels.map(c => collegeMap[c])
      this.graphs['grade-pie'] = new frappe.Chart("#grade-pie", {
        data: {
          labels: gradeLabels,
          datasets: [
            {
              name: "年级分布",
              values: gradeValues
            }
          ]
        },
        maxSlices: 6,
        title: `年级分布（共 ${gradeValues.length} 个年级）`,
        type: 'pie'
      });
      this.graphs['college-pie'] = new frappe.Chart("#college-pie", {
        data: {
          labels: collegeLabels,
          datasets: [
            {
              name: "院系分布",
              values: collegeValues
            }
          ]
        },
        maxSlices: 6,
        title: `院系分布（共 ${collegeValues.length} 个院系）`,
        type: 'pie'
      });
    }).catch((error) => {
      console.error(error)
    });

    axios.get('/dayData').then((response) => {
      let labels = []
      let loginData = []
      let grabData = []
      for (let i = 0; i < 24; i++) {
        labels.push(i.toString() + 'h')
        loginData.push(0)
        grabData.push(0)
      }
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].code === 4) {
          loginData[response.data[i].hour] = response.data[i].avg
        } else if (response.data[i].code === 6) {
          grabData[response.data[i].hour] = response.data[i].avg
        }
      }
      this.graphs['day-panel'] = new frappe.Chart("#hourline", {
        data: {
          labels: labels,
          datasets: [
            {
              name: "登录", chartType: 'line',
              values: loginData
            },
            {
              name: "抢座", chartType: 'line',
              values: grabData
            }
          ]
        },
        height: 250,
        title: "不同时间的使用情况",
        type: 'line',
        colors: ['light-blue', '#ffa3ef'],
        tooltipOptions: {
          formatTooltipX: d => (d + ''),
          formatTooltipY: d => d.toFixed(1) + ' 次',
        }
      });
    }).catch((error) => {
      console.error(error)
    });

    axios.get('/staticsdata').then((response) => {
      this.tableData = response.data
      this.eventTypeList = ['All']
      this.eventCodeList = ['All']
      this.accountList = ['All']
      this.statusList = ['All']
      this.versionList = ['All']
      this.githubIdList = ['All']
      this.tableData.forEach((item) => {
        if (!this.eventCodeList.includes(item.code)) {
          this.eventCodeList.push(item.code)
        }
        if (!this.eventTypeList.includes(item.event)) {
          this.eventTypeList.push(item.event)
        }
        if (!this.accountList.includes(item.account)) {
          this.accountList.push(item.account)
        }
        if (!this.statusList.includes(item.state)) {
          this.statusList.push(item.state)
        }
        if (!this.versionList.includes(item.version)) {
          this.versionList.push(item.version)
        }
        if (!this.deviceList.includes(item.mobile)) {
          this.deviceList.push(item.mobile)
        }
        if (item.githubId && !this.githubIdList.includes(item.githubId)) {
          this.githubIdList.push(item.githubId)
        }
      })
    }).catch((error) => {
      console.error(error)
    });
  },
  computed: {
    title () {
      if (this.userCount) {
        return `图书馆助手 使用统计（共 ${this.userCount} 位用户）`
      } else {
        return '图书馆助手'
      }
    },
    dataForShow () {
      let tempData = this.tableData.filter((item) => {
        return (this.selectedAccount === 'All' || item.account === this.selectedAccount) &&
          ((this.selectedEventType === 'All' || item.event === this.selectedEventType)) &&
          ((this.selectedEventCode === 'All' || item.code === this.selectedEventCode)) &&
          ((this.selectedStatus === 'All' || item.state === this.selectedStatus)) &&
          ((this.selectedVersion === 'All' || item.version === this.selectedVersion)) &&
          ((this.selectedGithubId === 'All' || item.githubId === this.selectedGithubId)) &&
          ((this.selectedDevice === 'All' || (item.mobile === this.selectedDevice || item.mobile === null)))
      })
      tempData.sort((x, y) => y.id - x.id)
      return tempData
    },
    countOfSelected () {
      return !this.dataForShow ? 0 : this.dataForShow.length
    }
  },
  methods: {
    fill0 (value) {
      var str = value > 9 ? '' : '0'
      return str + value
    },
    exportGraph (graph) {
      if (this.graphs[graph]) {
        this.graphs[graph].export()
      } else {
        this.$message({
          type: 'warning',
          message: '该图片暂不支持导出'
        })
      }
    },
    openLink (link) {
      window.open(link)
    },
    showMessage (message) {
      this.$message({
        message,
        center: true,
        during: 4000
      })
    }
  }
})
