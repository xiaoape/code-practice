// px和rem及vw的互相转换

// 将px转换为rem
function pxToRem(px) {
  return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// 将rem转换为px
function remToPx(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// 将px转换为vw
function pxToVw(px) {
  return (px / document.documentElement.clientWidth) * 100;
}

// 将vw转换为px
function vwToPx(vw) {
  return (vw / 100) * document.documentElement.clientWidth;
}

// 将rem转换为vw
function remToVw(rem) {
  return pxToVw(remToPx(rem));
}

// 将vw转换为rem
function vwToRem(vw) {
  return pxToRem(vwToPx(vw));
}

// 将50px转换为rem
pxToRem(50); // 返回 3.125

// 将3rem转换为px
remToPx(3); // 返回 48

// 将50px转换为vw
pxToVw(50); // 返回 6.25

// 将6.25vw转换为px
vwToPx(6.25); // 返回 50

// 将3rem转换为vw
remToVw(3); // 返回 37.5

// 将37.5vw转换为rem
vwToRem(37.5); // 返回 3
