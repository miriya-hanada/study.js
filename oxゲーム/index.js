// // ZeroCho Youtube 5-1~5-5

var body = document.body;
var テーブル = document.createElement('table');
var 列達 = [];
var 行達 = [];
var ばつ = 'X';
var 結果 = document.createElement('div');

var 非同期コールバック = function (e) {
    // console.log(e.target); // 行
    // console.log(e.target.parentNode); // 列
    // console.log(e.target.parentNode.parentNode); // テーブル

    var 何列 = 列達.indexOf(e.target.parentNode);
    console.log('何列', 何列);
    var 何行 = 行達[何列].indexOf(e.target);
    console.log('何行', 何行);

    if (行達[何列][何行].textContent !== '') {
        console.log('空欄ではありません');
    } else {
        console.log('空欄です');
        行達[何列][何行].textContent = ばつ;
        var 全部 = false;
    // 行　検査
    if (
        行達[何列][0].textContent === ばつ &&
        行達[何列][1].textContent === ばつ &&
        行達[何列][2].textContent === ばつ
    ) {
        全部 = true;
    }
    // 列　検査
    if (
        行達[0][何行].textContent === ばつ &&
        行達[1][何行].textContent === ばつ &&
        行達[2][何行].textContent === ばつ
    ) {
        全部 = true;
    }
    // 左斜め・右斜め　検査
    if (何列 - 何行 === 0) {
        if (
            行達[0][0].textContent === ばつ &&
            行達[1][1].textContent === ばつ &&
            行達[2][2].textContent === ばつ
        ) {
            全部 = true;
        }
    }
    if (Math.abs(何列 - 何行) === 2) {
        if (
            行達[0][2].textContent === ばつ &&
            行達[1][1].textContent === ばつ &&
            行達[2][0].textContent === ばつ
        ) {
            全部 = true;
        }
    }
    // 全部埋まったら
    if (全部) {
        結果.textContent = ばつ + 'あなたの勝ちです！';
        ばつ = 'X';
        行達.forEach(function (列) {
          列.forEach(function (行) {
              行.textContent = '';
            });
        });　
    } else {
      if (ばつ === 'X') {
          ばつ = 'O';
        } else {
          ばつ = 'X';
        }
        }
    }
};

for (var i = 1; i <= 3; i += 1) {
    var 列 = document.createElement('tr');
    列達.push(列);
    行達.push([]);
    for (var j = 1; j <= 3; j += 1) {
        var 行 = document.createElement('td');
        行.addEventListener('click', 非同期コールバック);
        行達[i - 1].push(行);
        列.appendChild(行);
    }
    テーブル.appendChild(列);
}
body.appendChild(テーブル);
body.appendChild(結果);
