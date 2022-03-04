// DOM转JSON
// 实现将DOM转化为JSON，例子如下。
{
    /* <div>
      <span>  
        <a></a>
      </span>
      <span>
        <a></a>
        <a></a>
      </span>
    </div> */
}

/* {
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
} */

function dom2Json(domtree) {
    let obj = {}
    obj.name = domtree.tagName
    obj.children = []
    domtree.childNodes.forEach(
        child => obj.children.push(dom2Json(child))
    )
    return obj
}