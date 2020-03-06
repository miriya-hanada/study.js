// // ZeroCho Youtube 4-1~4-6

var body = document.body;

var 数字候補;
var 数字配列;

function 数字選ぶ() {
    数字候補 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    数字配列 = [];
    for (var i = 0; i < 4; i += 1) {
      var 選ぶ = 数字候補.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // 配列で表示させない為に[0]をつける
      数字配列.push(選ぶ);
    }
}

// // pop();は数字候補の最後の文字が絶対入る　ex) {1,4,5,9}
// // unshift();は数字候補の最後の文字が並ぶ　ex) {9,9,9,9}
// // shift();は数字候補の最初の文字から並ぶ　ex) {1,2,3,4}
// for (var i = 1; i < 4; i += 1) {
//     var 選ぶ = 数字候補.pop/ unshift/ shift();
//     数字配列.push(選ぶ);
// }

// // spliceは数字を選ぶことができる。 ex) (5, 2)の場合 前から6番目と７番目を選ぶ
// for (var i = 0; i < 4; i += 1) {
//     var 選ぶ = 数字候補.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // // 1~9の数字をランダムで選ぶことができる
//     数字配列.push(選ぶ);
// }

数字選ぶ();
console.log(数字配列);

var 結果 = document.createElement('h1');
body.append(結果);
// formを使用することで、Enter機能が使用できる
var フォーム = document.createElement('form');
document.body.append(フォーム);
var 入力枠 = document.createElement('input');
フォーム.append(入力枠);
入力枠.type = 'text';
入力枠.maxLength = 4;
var ボタン = document.createElement('button');
ボタン.textContent = '入力';
フォーム.append(ボタン);

// 配列を文字に直すときはjoin
// 数字配列.join('')
// "1234"
// 数字配列.join(',')
// "1,2,3,4"
// 数字配列.join(';')
// "1;2;3;4"
// 数字配列.join('-')
// "1-2-3-4"

// 文字を配列に直すときはsplit
// var 答え = '1234'
// 答え.split()
// ["1234"]
// 答え.split('')
// ["1","2","3","4"]

var 間違った回数 = 0;

// formタグを作成したら絶対書くコード
フォーム.addEventListener('submit', function 非同期(e) {
    e.preventDefault();
    var 答え = 入力枠.value;
    if (答え === 数字配列.join('')) {
        結果.textContent = 'ホームラン';
        入力枠.value = '';
        入力枠.focus();
        // 問題と答えが合った時、新しい問題を呼び出す
        数字選ぶ();
        間違った回数 = 0;
    } else {
        var 答え配列 = 答え.split('');
        var ストライク = 0;
        var ボール = 0;

        間違った回数 += 1;
        if (間違った回数 > 10) { // 10回以上間違った場合
            結果.textContent = '10回以上間違えたので失敗！　答えは' + 数字配列.join(',') + 'でした！';
            入力枠.value = '';
            入力枠.focus();
            // 終了したので新しい問題を呼び出す
            数字選ぶ();
            間違った回数 = 0;
        } else { // 10回未満間違った場合
            for (var i = 0; i < 3; i += 1) {
                // 答え配列は""文字型になっている為、数字配列と=にならない。
                // そのため答え配列にNumberをつける
                    if (Number(答え配列[i]) === 数字配列[i]) { // 同じ場所なのか確認
                        ストライク += 1;
                        // index.Ofは配列にある数字を見つけるメソッド
                        // ない数字は-1と表示される為、(答え配列[i]) > -1とする
                    } else if (数字配列.indexOf(Number(答え配列[i])) > -1) { // 同じ場所ではないが、数字が重なるのを確認
                        ボール += 1;
                    }
                }
                結果.textContent = ストライク + 'ストライク' + ボール + 'ボールです';
                入力枠.value = '';
                入力枠.focus();
        }
    }
});