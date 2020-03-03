var 数字１ = Math.ceil(Math.random() * 9);
var 数字２ = Math.ceil(Math.random() * 9);
var 結果 = 数字１ * 数字２;

var body = document.body;
var 単語 = document.createElement('div');
単語.textContent = String(数字１) + '×' + String(数字２) + 'は？';
document.body.append(単語);
// formを使用することで、Enter機能が使用できる
var form = document.createElement('form');
document.body.append(form);
var 入力枠 = document.createElement('input');
// 数字を入力したい場合
入力枠.type = 'number';
form.append(入力枠);
var ボタン = document.createElement('button');
ボタン.textContent = '入力';
form.append(ボタン);
var 結果枠 = document.createElement('div');
document.body.append(結果枠);


form.addEventListener('submit', function コールバック関数　(e) {
  e.preventDefault();
  if (結果 === Number(入力枠.value)) {
    結果枠.textContent = '正解';
    数字１ = Math.ceil(Math.random() * 9);
    数字２ = Math.ceil(Math.random() * 9);
    結果 = 数字１ * 数字２;
    単語.textContent = String(数字１) + '×' + String(数字２) + 'は？';
    入力枠.value = '';
    入力枠.focus();
  } else {
    結果枠.textContent = '不正解';
    入力枠.value = '';
    入力枠.focus();
  }
});



// // console.logを使用して作成した場合
//   while (true) {
//     var 数字１ = Math.floor(Math.random() * 9)
//     var 数字２ = Math.floor(Math.random() * 9)
//     var 結果 = 数字１ * 数字２
//     var 条件 = true;
//     while (条件) {
//         var 答え = prompt(String(数字１) + '×' + String(数字２) + 'は？')
//         if (結果 === Number(答え)) {
//         alert('正解');
//         条件 = false;
//         } else {
//           alert('不正解')
//         }
//     }
// }