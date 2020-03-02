var body = document.body;
var 単語 = document.createElement('div');
単語.textContent = 'りんご';
document.body.append(単語);
// formを使用することで、Enter機能が使用できる
var form = document.createElement('form');
document.body.append(form);
var 入力枠 = document.createElement('input');
form.append(入力枠);
var ボタン = document.createElement('button');
ボタン.textContent = '入力';
form.append(ボタン);
var 結果 = document.createElement('div');
document.body.append(結果);

form.addEventListener('submit', function コールバック関数(イベント) {
    イベント.preventDefault();
  if (単語.textContent[単語.textContent.length - 1] === 入力枠.value[0]) {
      結果.textContent = '続きます';
      単語.textContent = 入力枠.value;
      入力枠.value = '';
      入力枠.focus(); //自動入力を指示
  } else {
      結果.textContent = 'もう一度';
      入力枠.focus(); //自動入力を指示
  }
});


// // console.logを使用して作成した場合
// // while使用した時
// var word = 'りんご'
// while (true) {
//     var answer = prompt(word)
//     if (word[word.length - 1] === answer[0]) {
//         alert('続きます')
//         word = answer
//     } else {
//         alert('もう一度')
//     }
// }

// // for使用した時
// for (var word = 'りんご'; true; ) {
//     var answer = prompt(word)
//     if (word[word.length - 1] === answer[0]) {
//         alert('続きます')
//         word = answer
//     } else {
//         alert('もう一度')
//     }
// }