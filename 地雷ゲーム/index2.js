// JavaScriptのスコープについての説明
// zerocho 8-7~8-11

// 変数が一緒の時 ex) xを使用
// 結果は'global'と出る
// function範囲内にある var = x は範囲外に出ることができない

var x = 'global';

function ex() {
    var x = 'local'; // -> change
    x = 'change';
}

ex();
alert(x);



// function範囲内のvarを無くして書いた時
// 結果は'change'と出る
// funcion範囲内のxは、範囲外にあるxを探して、見つけたら上書きする

var x = 'global'; // -> local -> change

function ex() {
    x = 'local';
    x = 'change';
}

ex();
alert(x);



// 結果は'undefined'と出る

var name = 'hanada';
var enemy; // ここに値がないｋ場合undefinedと出る
function outer() {
    console.log('外部', name); // 外部 hanada
    function inner() {
        var enemy = 'miriya';
        console.log('内部', name); // 内部 hanada
    }
    inner();
}

outer();
console.log(enemy);



// 結果は'miriya'と出る

var name = 'hanada'; // -> miriya
function log() {
    console.log(name); // -> miriya
}

function wrapper() {
    name = 'miriya';
    log();
}
wrapper();



// 結果は'hanada'と出る

var name = 'hanada';
function log() {
    console.log(name);
}

function wrapper() {
    var name = 'miriya';
    name = 'hana';
    name = 'miri';
    log();
}
wrapper();



// 結果は1秒ごとに100と出る

for (var i = 0; i < 100; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000); // 1秒ごとにiの結果が出る
}