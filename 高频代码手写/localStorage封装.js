// localStorage封装
// localStorage/sessionStorage默认只能存储字符串，而实际开发中，
// 我们往往需要存储的数据多为对象类型，那么这里我们就可以在存储时
//利用json.stringify()将对象转为字符串，而在取缓存时，只需配合json.parse()转回对象即可
const isClient = typeof window === 'object' && window !== null

export function setItem(key, val) {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(val))
  }
}

export function getItem(key) {
  try {
    const storageContent = isClient && JSON.parse(localStorage.getItem(key))
    return storageContent ?? null // or undefined, or throw an error
  } catch (error) {
    console.error(error)
    return null // or undefined, or throw an error
  }
}

export function deleteItem(key) {
  try {
    const storageContent = isClient && JSON.parse(localStorage.getItem(key))
    if (storageContent && key in storageContent) { // check for falsy values and key existence
      delete storageContent[key]
      setItem(key, storageContent)
    }
  } catch (error) {
    console.error(error)
    // throw error or do something else
  }
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
