/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "cd4e7ad21f056d31dceb8ccd8c834bd2"
  },
  {
    "url": "assets/css/1.styles.65bb565e.css",
    "revision": "1c877f0a6de38b447794ec58ef865715"
  },
  {
    "url": "assets/css/2.styles.5f044365.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/styles.8dad7f06.css",
    "revision": "a571667f511050438488159fcbccf76b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.65bb565e.js",
    "revision": "cceae162bc5ab740aebafb5bf6287a00"
  },
  {
    "url": "assets/js/10.3a8e0900.js",
    "revision": "d55def76a38ca547387c024c4a032985"
  },
  {
    "url": "assets/js/11.6d2bb66f.js",
    "revision": "d4f17efbebfa1dcfc5dd0e0e7e74bd70"
  },
  {
    "url": "assets/js/12.1bdfc596.js",
    "revision": "481e1bf0c6fe3332772dce7001714465"
  },
  {
    "url": "assets/js/13.ac79c964.js",
    "revision": "efb794b1c380399f6807605cb964e979"
  },
  {
    "url": "assets/js/14.6f548850.js",
    "revision": "ba63fdb00662835f02da6462f8fd7bae"
  },
  {
    "url": "assets/js/2.5f044365.js",
    "revision": "637eebfb2d652fe074e54e32accd495d"
  },
  {
    "url": "assets/js/3.d9609e87.js",
    "revision": "d272ee848e035798464ec5cb13efcbe5"
  },
  {
    "url": "assets/js/4.1458e2b2.js",
    "revision": "444b5b125905f8e7f8160e416fb8f6e0"
  },
  {
    "url": "assets/js/5.0a5da165.js",
    "revision": "9a3f50865ac8a5fe99eb9530d8711fbe"
  },
  {
    "url": "assets/js/6.3715c9fe.js",
    "revision": "9e9fb9d8e0da687b6eed1aa73e511b14"
  },
  {
    "url": "assets/js/7.396d996b.js",
    "revision": "b85f931003e96c2ae6eba0b1de2cdd2e"
  },
  {
    "url": "assets/js/8.d5158909.js",
    "revision": "d272105670649ee9080339b4cd0ef2dd"
  },
  {
    "url": "assets/js/9.76906ac0.js",
    "revision": "0866acdf013c1ed774ca93d39524d0bc"
  },
  {
    "url": "assets/js/app.8dad7f06.js",
    "revision": "a687a1045ad8f56b384e869eeaebea91"
  },
  {
    "url": "hero.png",
    "revision": "29bd814ac246a997513f6393e9fc0324"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "eb006a4b790cc14160e00f1f056833aa"
  },
  {
    "url": "logo.png",
    "revision": "29bd814ac246a997513f6393e9fc0324"
  },
  {
    "url": "project/index.html",
    "revision": "3de3c8b0065df5e058251017a370a4e6"
  },
  {
    "url": "specification/auth.html",
    "revision": "40c88a07d5e1b9f9b2e7275482d7205f"
  },
  {
    "url": "specification/index.html",
    "revision": "122d1a44298de5fbf9c7ebccf46c5677"
  },
  {
    "url": "specification/manualtoken.html",
    "revision": "453e0f94acfad3340384f9bd9c2e67cc"
  },
  {
    "url": "specification/menu.html",
    "revision": "ccfc58b1ea0a860dbd8e767f67e3be9f"
  },
  {
    "url": "specification/monitor.html",
    "revision": "0d6445c1433274d29f6cd390492a3b3e"
  },
  {
    "url": "specification/others.html",
    "revision": "62cd3a2d56f167947c25018eb4c83bb1"
  },
  {
    "url": "specification/protect.html",
    "revision": "6cef3df327c4f69eb38325d12d7953fa"
  },
  {
    "url": "specification/reservation.html",
    "revision": "ddb7b5ce3f969c5af2c5ae217169968e"
  },
  {
    "url": "specification/seatoperate.html",
    "revision": "6d9ca4031fa9ecdab6e84147e624700c"
  },
  {
    "url": "specification/settings.html",
    "revision": "dda6993a3b4909a283735052fed01628"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
