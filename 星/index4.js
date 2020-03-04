for (var star = 5; star >= 1; star -= 1) {
    console.log(' '.repeat(5 - star) + '*'.repeat(star))
}

for (var star = 1; star <= 5; star += 1) {
    console.log(' '.repeat(5 - star) + '*'.repeat(star))
}

// 表示例
//  *****
//   ****
//    ***
//     **
//      *
//      *
//     **
//    ***
//   ****
//  *****