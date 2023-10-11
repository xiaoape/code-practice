// 下划线转成驼峰命名
// 方式一: 正则表达式实现
function underscoreToCamel(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => underscoreToCamel(item));
    }
  
    const camelObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelObj[camelKey] = underscoreToCamel(obj[key]);
      }
    }
  
    return camelObj;
  }

  // 方式二：逐个字符串遍历

  function underscoreToCamel2(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(item => underscoreToCamel2(item));
    }
  
    const camelObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const words = key.split('_');
        const camelKey = words[0] + words.slice(1).map(word => word[0].toUpperCase() + word.slice(1)).join('');
        camelObj[camelKey] = underscoreToCamel2(obj[key]);
      }
    }
  
    return camelObj;
  }
  
  
  
  // 示例用法
  const underscoreObj = {
    first_name: 'John',
    last_name: 'Doe',
    phone_number: {
      home_phone: '123-456-7890',
      work_phone: '987-654-3210',
    },
  };
  
  const camelObj = underscoreToCamel(underscoreObj);
  console.log(camelObj);
  const camelObj2 = underscoreToCamel2(underscoreObj);
  console.log(camelObj2);
  