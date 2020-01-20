const express = require('express');
const router = express.Router();
const Axios = require('axios').default;

var downloadsInfoCache = null;

(() => {
	Date.prototype.Format = function(fmt) {
		const o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
})();

downloadOfAssets = (assets) => {
  return assets.reduce((sum, asset) => sum + asset.download_count, 0)
}

function getDownloadsInfo () {
  return new Promise((resolve, reject) => {
    const desktopURL = 'https://api.github.com/repos/CS-Tao/whu-library-seat/releases'
    const mobileURL = 'https://api.github.com/repos/CS-Tao/whu-library-seat-mobile/releases'

    var desktopLoader = Axios.get(desktopURL)
    var mobileLoader = Axios.get(mobileURL)

    Promise.all([desktopLoader, mobileLoader])
    .then(res => {
      var downLoadsInfo = []
      for (var i = 0; i < res.length; i++) {
        if (res[i].data.length) {
          const data = res[i].data.sort((a, b) => a.created_at===b.created_at ? 0 : a.created_at<b.created_at ? 1 : -1).reverse()
          const since = new Date(data[data.length-1].created_at).Format("yyyy-MM-dd")
          const totalDownload = data.reduce((sum, release) => sum + this.downloadOfAssets(release.assets), 0)
          const trendTag = data.map(release => release.tag_name)
          const trendData = data.map(release => this.downloadOfAssets(release.assets))
          const publishDate = data.map(release => new Date(release.created_at).Format("yyyy-MM-dd"))
          downLoadsInfo.push({
            since,
            totalDownload,
            trendTag,
            trendData,
            publishDate,
        })
        }
      }
      if (downLoadsInfo.length === 2) {
        resolve(downLoadsInfo)
      } else {
        reject(Error('Can not fetch software downloads data.'))
      }
    })
    .catch(error => reject(error))
  })
}

router.get('/', function(req, res, next) {
  if (downloadsInfoCache) {
    res.json({
      'status': 'success',
      'code': 0,
      'message': '',
      'data': downloadsInfoCache
    });
  } else {
    getDownloadsInfo().then(downloadsInfo => {
      downloadsInfoCache = downloadsInfo
      setTimeout(_ => downloadsInfoCache = null, 3600000)
      res.json({
        'status': 'success',
        'code': 0,
        'message': '',
        'data': downloadsInfo
      });
    }).catch(error => {
      console.error(error.message)
      res.json({
        'status': 'fail',
        'code': 1,
        'message': error.message,
        'data': null
      });
    })
  }
})

module.exports = router
