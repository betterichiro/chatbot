$(() => {

  class Chat {

    constructor() {
      this.count = 0; //何問目かのカウント
      this.logs =[]; //ユーザーがクリックした履歴
    }
    output() {
      if(this.count < questions.length) {
        this.textPush(questions[this.count]['title']);
        setTimeout(() => {
          questions[this.count]['list'].forEach((text, index) => {
          $('#select-list').append(`<li data-number="${index+1}">${text}</li>`).removeClass('slideOut');
        });
      },400);
      }else{
        this.result();
        console.log('結果発表〜〜！！');
      }

    }
    textPush(text) {
      $('#chat-ul').append(`<li>${text}</li>`);
    }
    answer() {
      $('body').on('click','#select-list li', (e) => {
        this.textPush($(e.target).text());
        this.logs[this.count] = Number($(e.target).attr('data-number'));
        $('#select-list').addClass('slideOut');
        this.count++;
        setTimeout(() => {
          $('#select-list li').remove();
          this.output();
          this.positioning();
        },1000);
      });
    }
    positioning() {
      $('#field').animate({
        scrollTop:$('#chat-ul').height()
      }, 800, 'swing');
    }
    get total() {
     return this.logs.reduce((a,x) => a+=x, 0);
    }
    result() {
      let message = '';
      if( this.total <= 6) {
        message = 'GOALはすぐそこです！';
      }else if( this.total >= 15) {
        message = 'まだまだこれからです！';
      }else{
        message = 'その調子で頑張りましょう！';
      }
      this.textPush(message);
    }
    init() {
      this.answer();
      this.output();
    }

  }

  const chat = new Chat();
  chat.init();

});
