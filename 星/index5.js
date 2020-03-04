for (var star = 9; star >= 1; star -= 2) {
    console.log(' '.repeat((9 - star) / 2) + '*'.repeat(star))
}

for (var star = 1; star <= 9; star += 2) {
    console.log(' '.repeat((9 - star) / 2) + '*'.repeat(star))
}

// 表示例
//  *********
//   *******
//    *****
//     ***
//      *
//      *
//     ***
//    *****
//   *******
//  *********