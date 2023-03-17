// localStorage封装
// localStorage/sessionStorage默认只能存储字符串，而实际开发中，
// 我们往往需要存储的数据多为对象类型，那么这里我们就可以在存储时
//利用json.stringify()将对象转为字符串，而在取缓存时，只需配合json.parse()转回对象即可
const isClient = typeof window !== 'undefined'

export function setItem(key, val) {
  isClient && localStorage.setItem(key, JSON.stringify(val) || {})
}

export function getItem(key) {
  let storageContent
  try {
    storageContent = isClient && JSON.parse(localStorage.getItem(key)) || {} //TODO 坑，值为0，返回{}
  } catch (error) {
    storageContent = {}
  }

  return storageContent
}

export function deleteItem(key) {
  try {
    storageContent = isClient && JSON.parse(localStorage.getItem(key)) || {}
    if (Object.keys(storageContent).length > 0) {
      delete storageContent[key]
      setItem(key, storageContent)
    }
  } catch (error) {

  }
}

export function removeItem(key) {
  localStorage.removeItem(key)
}

export function setSessionItem(key, val) {
  isClient && sessionStorage.setItem(key, val)
}

export function getSessionItem(key) {
  let storageContent
  try {
    storageContent = isClient && sessionStorage.getItem(key)
  } catch (error) {
    storageContent = {}
  }

  return storageContent
}

export function removeSessionItem(key) {
  isClient && sessionStorage.removeItem(key)
}
