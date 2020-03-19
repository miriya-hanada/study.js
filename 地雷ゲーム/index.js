// zerocho 8-6,8-12~8-16

// スコープ役割
var dataset = [];
var tbody = document.querySelector('#table tbody');

var 中断フラッグ = false;
var 開いたマス = 0;
// データ部分をライブラリー（コード表）を作って書く方法
var コード表 = {
  マス: -1,
  疑問マーク: -2,
  旗: -3,
  旗地雷: -4,
  疑問マーク地雷: -5,
  地雷: 1,
  普通行: 0,
};

document.querySelector('#exec').addEventListener('click', function() {
  // 内部を先に初期化
  tbody.innerHTML = '';
  document.querySelector('#result').textContent = '';
  dataset = [];
  開いたマス = 0;
  中断フラッグ = false;
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  // 1~100まで地雷の位置に合わせてランダムで数字を抜き出す
  var 候補群 = Array(hor * ver)
    .fill()
    .map(function (要素, インデックス) {
      // return インデックス + 1; (1~100まで選ぶとき)
      return インデックス; // (0~99まで選ぶとき)
    });
  // シャッフルで数字を並べる
  var シャッフル = [];
  while (候補群.length > hor * ver - mine) {
    var 移動値 = 候補群.splice(Math.floor(Math.random() * 候補群.length), 1)[0];
    シャッフル.push(移動値);
  }


  // 地雷のテーブル作成
  for (var i = 0; i < ver; i += 1) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j = 0; j < hor; j += 1) {
      arr.push(コード表.普通行);
      // 'rd'を作成後、EventListenerを作成すると同期、非同期関係なく実行される
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        if (中断フラッグ) {
          return;
        }
        // e.target e.currentTargetの違い
        // e.currentTargetは<tbody> EventListenerを直接対象にした時
        // e.targetは<td> EventListenerが実際に発生する
        var 親tr = e.currentTarget.parentNode;
        var 親tbody = e.currentTarget.parentNode.parentNode;
        var 行 = Array.prototype.indexOf.call(親tr.children, e.currentTarget);
        var 列 = Array.prototype.indexOf.call(親tbody.children, 親tr);
        if (dataset[列][行] === コード表.カッコ) { // 이미 연 칸은 오른쪽 눌러도 효과 없게
          return;
        }
        // 右クリックした時の機能（!と?）
        if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
          e.currentTarget.textContent = '!';
          e.currentTarget.classList.add('flag');
          if (dataset[列][行] === コード表.地雷) {
            dataset[列][行] = コード表.旗地雷;
          } else {
            dataset[列][行] = コード表.旗;
          }
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?';
          e.currentTarget.classList.remove('flag');
          e.currentTarget.classList.add('question');
          if (dataset[列][行] === コード表.旗地雷) {
            dataset[列][行] = コード表.疑問マーク地雷;
          } else {
            dataset[列][行] = コード表.疑問マーク;
          }
        } else if (e.currentTarget.textContent === '?') {
          e.currentTarget.classList.remove('question');
          if (dataset[列][行] === コード表.疑問マーク地雷) {
            e.currentTarget.textContent = 'X';
            dataset[列][行] = コード表.地雷;
          } else {
            e.currentTarget.textContent = '';
            dataset[列][行] = コード表.普通行;
          }
        }
      });
      td.addEventListener('click', function (e) {
        if (中断フラッグ) {
          return;
        }
        var 親tr = e.currentTarget.parentNode;
        var 親tbody = e.currentTarget.parentNode.parentNode;
        var 行 = Array.prototype.indexOf.call(親tr.children, e.currentTarget);
        var 列 = Array.prototype.indexOf.call(親tbody.children, 親tr);
        if ([コード表.カッコ, コード表.旗, コード表.旗地雷, コード表.疑問マーク地雷, コード表.疑問マーク].includes(dataset[列][行])) {
          return;
        }
        // クリックした時
        e.currentTarget.classList.add('opened');
        開いたマス += 1;
        if (dataset[列][行] === コード表.地雷) { // 地雷クリック時
          e.currentTarget.textContent = 'ボン';
          document.querySelector('#result').textContent = '失敗 ㅠㅠ';
          中断フラッグ = true;
        } else { // 地雷でない場合、周辺の地雷の個数
          var 周辺 = [
            dataset[列][行-1], dataset[列][行+1],
          ];
          // .concatは新しい配列を作成する
          if (dataset[列-1]) {
            周辺 = 周辺.concat([dataset[列-1][行-1], dataset[列-1][行], dataset[列-1][行+1]]);
          }
          if (dataset[列+1]) {
            周辺 = 周辺.concat([dataset[列+1][行-1], dataset[列+1][行], dataset[列+1][行+1]]);
          }
          var 周辺地雷回数 = 周辺.filter(function(v) {
            return [コード表.地雷, コード表.旗地雷, コード表.疑問マーク地雷].includes(v);
          }).length;

          // 嘘な値: false, '', 0, null, undefined, NaN
          e.currentTarget.textContent = 周辺地雷回数 || '';
          dataset[列][行] = コード表.カッコ;
          if (周辺地雷回数 === 0) {
            // console.log('周辺を開けます');
            var 周辺行 = [];
            if (tbody.children[列-1]) {
              周辺行 = 周辺行.concat([
                tbody.children[列 - 1].children[行 - 1],
                tbody.children[列 - 1].children[行],
                tbody.children[列 - 1].children[行 + 1],
              ]);
            }
            周辺行 = 周辺行.concat([
              tbody.children[列].children[行 - 1],
              tbody.children[列].children[行 + 1],
            ]);

            if (tbody.children[列+1]) {
              周辺行 = 周辺行.concat([
                tbody.children[列 + 1].children[行 - 1],
                tbody.children[列 + 1].children[行],
                tbody.children[列 + 1].children[行 + 1],
              ]);
            }
            周辺行.filter(function (v) {
              return !!v;
            }).forEach(function(横行) {
              var 親tr = 横行.parentNode;
              var 親tbody = 横行.parentNode.parentNode;
              var 横行行 = Array.prototype.indexOf.call(親tr.children, 横行);
              var 横行列 = Array.prototype.indexOf.call(親tbody.children, 親tr);
              if (dataset[横行列][横行行] !== コード表.横行) {
                横行.click();
              }
            });
          }
        }
        // console.log(開いたマス, hor * ver - mine);
        if (開いたマス === hor * ver - mine) {
          中断フラッグ = true; // これ以上続けることができない
          document.querySelector('#result').textContent = '勝利 ^^';
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  // 地雷作り方
  for (var k = 0; k < シャッフル.length; k++) { // ex) 60
    var 縦 = Math.floor(シャッフル[k] / ver);  // ex) 7 -> 6
    var 横 = シャッフル[k] % ver; // ex) 0 -> 0
    // console.dir(tbody);
    // console.log(縦);
    // tbody=<tbody> .children[縦]=<tr> .children[横]=<td>
    tbody.children[縦].children[横].textContent = 'X';
    dataset[縦][横] = コード表.地雷;
  }
});