var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lock = function () {
  function Lock() {
    _classCallCheck(this, Lock);
    this.pin = '7f1a65908b05238c21c134c764c89e28';
    this.setupDom();
    this.setupFlickity();
    this.setupAudio();
    this.onResize();
    this.listen();
  }

  _createClass(Lock, [{
    key: 'listen',
    value: function listen() {
      var _this = this;

      window.addEventListener('resize', function () {
        return _this.onResize();
      });
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      if (window.innerWidth % 2 === 0) {
        this.dom.lock.style.marginLeft = '0px';
      } else {
        this.dom.lock.style.marginLeft = '1px';
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.sounds.select.play();
      this.code = this.getCode();
      this.dom.code.textContent = this.code;
      if (md5(this.code) === this.pin) {
        this.verified = true;
        this.dom.lock.classList.add('verified');
        this.dom.status.textContent = 'UNLOCKED';
        this.sounds.success.play();
        localStorage.homepageAuthForCSTaoOrFriend = this.pin;
        setTimeout( function(){
          window.location = "/"
        }, 1.5 * 1000 );
      } else {
        this.dom.lock.classList.remove('verified');
        this.dom.status.textContent = 'LOCKED';
        if (this.verified) {
          this.sounds.fail.play();
        }
        this.verified = false;
      }
    }
  }, {
    key: 'getCode',
    value: function getCode() {
      var code = '';
      for (var i = 0, len = this.dom.rows.length; i < len; i++) {
        var cell = this.dom.rows[i].querySelector('.is-selected .text');
        var num = cell.textContent;
        code += num;
      }
      return code;
    }
  }, {
    key: 'setupDom',
    value: function setupDom() {
      this.dom = {};
      this.dom.lock = document.querySelector('.lock');
      this.dom.rows = document.querySelectorAll('.row');
      this.dom.code = document.querySelector('.code');
      this.dom.status = document.querySelector('.status');
    }
  }, {
    key: 'setupAudio',
    value: function setupAudio() {
      this.sounds = {};

      this.sounds.select = new Howl({
        src: ['https://jackrugile.com/sounds/misc/lock-button-1.mp3', 'https://jackrugile.com/sounds/misc/lock-button-1.ogg'],
        volume: 0.5,
        rate: 1.4
      });

      this.sounds.prev = new Howl({
        src: ['https://jackrugile.com/sounds/misc/lock-button-4.mp3', 'https://jackrugile.com/sounds/misc/lock-button-4.ogg'],
        volume: 0.5,
        rate: 1
      });

      this.sounds.next = new Howl({
        src: ['https://jackrugile.com/sounds/misc/lock-button-4.mp3', 'https://jackrugile.com/sounds/misc/lock-button-4.ogg'],
        volume: 0.5,
        rate: 1.2
      });

      this.sounds.hover = new Howl({
        src: ['https://jackrugile.com/sounds/misc/lock-button-1.mp3', 'https://jackrugile.com/sounds/misc/lock-button-1.ogg'],
        volume: 0.2,
        rate: 3
      });

      this.sounds.success = new Howl({
        src: ['https://jackrugile.com/sounds/misc/lock-online-1.mp3', 'https://jackrugile.com/sounds/misc/lock-online-1.ogg'],
        volume: 0.5,
        rate: 1
      });

      this.sounds.fail = new Howl({
        src: ['https://jackrugile.com/sounds/misc/lock-fail-1.mp3', 'https://jackrugile.com/sounds/misc/lock-fail-1.ogg'],
        volume: 0.6,
        rate: 1
      });
    }
  }, {
    key: 'setupFlickity',
    value: function setupFlickity() {
      var _this2 = this;

      var _loop = function _loop(i, len) {
        var row = _this2.dom.rows[i];
        var flkty = new Flickity(row, {
          selectedAttraction: 0.25,
          friction: 0.9,
          cellAlign: 'center',
          pageDots: false,
          wrapAround: true
        });
        flkty.lastIndex = 0;

        flkty.on('select', function () {
          if (flkty.selectedIndex !== flkty.lastIndex) {
            _this2.onChange();
          }
          flkty.lastIndex = flkty.selectedIndex;
        });

        row.addEventListener('mouseenter', function () {
          _this2.sounds.hover.play();
        });
      };

      for (var i = 0, len = this.dom.rows.length; i < len; i++) {
        _loop(i, len);
      }

      this.dom.prevNextBtns = this.dom.lock.querySelectorAll('.flickity-prev-next-button');

      var _loop2 = function _loop2(i, len) {
        var btn = _this2.dom.prevNextBtns[i];
        btn.addEventListener('click', function () {
          if (btn.classList.contains('previous')) {
            _this2.sounds.prev.play();
          } else {
            _this2.sounds.next.play();
          }
        });
      };

      for (var i = 0, len = this.dom.prevNextBtns.length; i < len; i++) {
        _loop2(i, len);
      }
    }
  }]);

  return Lock;
}();

var lock = new Lock();