// zerocho 7-1~7-6

var イメージ座標 = '0';
var じゃんけん = {
　グー: '0',
　チョキ: '-142px',
　パー: '-284px'
};

function コンピューター選択(イメージ座標) {
  return Object.entries(じゃんけん).find(function(v) {
    return v[1] === イメージ座標;
  })[0];
}

var インターバル;
function インターバルメイカー() {
  インターバル = setInterval(function () {
    if (イメージ座標 === じゃんけん.グー) {
        イメージ座標 = じゃんけん.チョキ;
    } else if (イメージ座標 === じゃんけん.チョキ) {
        イメージ座標 = じゃんけん.パー;
    } else {
        イメージ座標 = じゃんけん.グー;
    }
    document.querySelector('#computer').style.background =
      'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + イメージ座標 + ' 0';
  }, 100);
}

インターバルメイカー();

var 点数表 = {
  グー: 1,
  チョキ: 0,
  パー: -1,
};

document.querySelectorAll('.btn').forEach(function(btn) {
 btn.addEventListener('click', function() {
   clearInterval(インターバル); // setInterval 中止
   setTimeout(function() {
    インターバルメイカー();
   }, 1000);
   var 自分選択 = this.textContent;
   var 自分得点 = 点数表[自分選択];
   var コンピューター点数 = 点数表[コンピューター選択(イメージ座標)];
   var 点差 = 自分得点 - コンピューター点数;
   if (点差 === 0) {
     console.log('あいこです');
   } else if ([-1, 2].includes(点差)) {
     console.log('勝ちました!!');
   } else {
     console.log('負けました ㅠㅠ.');
   }
  });
});

// チョキ: 1, グー: 0, パー: -1
// 私\コンピューター　チョキ   グー    パー
//        　 チョキ   1 1    1 0   1 -1
//        　 グー  　 0 1    0 0   0 -1
//       　  パー  　-1 1   -1 0  -1 -1

var 開始値 = 3;
var インターバル２ = setInterval(function() {
  if (開始値 === 0) {
    console.log('中止!!!');
    return clearInterval(インターバル２);
  }
  console.log(開始値);
  開始値 -= 1;
}, 1000);