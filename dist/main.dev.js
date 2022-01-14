"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(function () {
  var Chat =
  /*#__PURE__*/
  function () {
    function Chat() {
      _classCallCheck(this, Chat);

      this.count = 0; //何問目かのカウント

      this.logs = []; //ユーザーがクリックした履歴
    }

    _createClass(Chat, [{
      key: "output",
      value: function output() {
        var _this = this;

        if (this.count < questions.length) {
          this.textPush(questions[this.count]['title']);
          setTimeout(function () {
            questions[_this.count]['list'].forEach(function (text, index) {
              $('#select-list').append("<li data-number=\"".concat(index + 1, "\">").concat(text, "</li>")).removeClass('slideOut');
            });
          }, 400);
        } else {
          this.result();
          console.log('結果発表〜〜！！');
        }
      }
    }, {
      key: "textPush",
      value: function textPush(text) {
        $('#chat-ul').append("<li>".concat(text, "</li>"));
      }
    }, {
      key: "answer",
      value: function answer() {
        var _this2 = this;

        $('body').on('click', '#select-list li', function (e) {
          _this2.textPush($(e.target).text());

          _this2.logs[_this2.count] = Number($(e.target).attr('data-number'));
          $('#select-list').addClass('slideOut');
          _this2.count++;
          setTimeout(function () {
            $('#select-list li').remove();

            _this2.output();

            _this2.positioning();
          }, 1000);
        });
      }
    }, {
      key: "positioning",
      value: function positioning() {
        $('#field').animate({
          scrollTop: $('#chat-ul').height()
        }, 800, 'swing');
      }
    }, {
      key: "result",
      value: function result() {
        var message = '';

        if (this.total <= 6) {
          message = 'GOALはすぐそこです！';
        } else if (this.total >= 15) {
          message = 'まだまだこれからです！';
        } else {
          message = 'その調子で頑張りましょう！';
        }

        this.textPush(message);
      }
    }, {
      key: "init",
      value: function init() {
        this.answer();
        this.output();
      }
    }, {
      key: "total",
      get: function get() {
        return this.logs.reduce(function (a, x) {
          return a += x;
        }, 0);
      }
    }]);

    return Chat;
  }();

  var chat = new Chat();
  chat.init();
});