// 随机数获取

// 得到一个大于等于 0，小于 1 之间的随机数
function getRandom() {
  return Math.random();
}
// 得到一个两数之间的随机数
// 这个例子返回了一个在指定值之间的随机数。这个值不小于 min（有可能等于），并且小于（不等于）max。

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// 得到一个两数之间的随机整数
// 这个例子返回了一个在指定值之间的随机整数。这个值不小于 min （如果 min 不是整数，则不小于 min 的向上取整数），且小于（不等于）max。

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
// 备注： 也许很容易想到用 Math.round() 来实现，但是这会导致你的随机数处于一个不均匀的分布，这可能不符合你的需求。

// 得到一个两数之间的随机整数，包括两个数在内
// 上一个例子提到的函数 getRandomInt() 结果范围包含了最小值，但不含最大值。如果你的随机结果需要同时包含最小值和最大值，怎么办呢？getRandomIntInclusive() 函数可以实现。

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}