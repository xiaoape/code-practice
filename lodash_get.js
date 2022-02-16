// _get(obj,'a.b.c')

function _get(obj, path = '') {
    if (!obj) return;
    const attrs = path.split('.');
    let tem = obj;
    for (let i = 0; i < attrs.length; ++i) {
        if (tem && tem[attrs[i]]) {
            tem = tem[attrs[i]];
        } else {
            return;
        }
    }
    return tem;
}
_get({
    a: {
        b: [1, 2]
    }
}, 'a.b.0');