// 可拖拽的div

var dragging = false
var position = null

xxx.addEventListener('mousedown', function (e) {
    dragging = true
    position = [e.clientX, e.clientY]
})


document.addEventListener('mousemove', function (e) {
    if (dragging === false) return null
    const x = e.clientX
    const y = e.clientY
    const deltaX = x - position[0]
    const deltaY = y - position[1]
    const left = parseInt(xxx.style.left || 0)
    const top = parseInt(xxx.style.top || 0)
    xxx.style.left = left + deltaX + 'px'
    xxx.style.top = top + deltaY + 'px'
    position = [x, y]
})
document.addEventListener('mouseup', function (e) {
    dragging = false
})