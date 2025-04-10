    // 接口防刷示例
    class RateLimiter {
      constructor() {
        this.requestMap = new Map();
      }
      
      isAllowed(userId, action) {
        const key = `${userId}:${action}`;
        const now = Date.now();
        const userRequests = this.requestMap.get(key) || [];
        
        // 清理过期记录
        const validRequests = userRequests.filter(time => 
          now - time < 60000 // 1分钟内的请求
        );
        
        // 判断频率
        if (validRequests.length >= 60) { // 每分钟最多60次
          return false;
        }
        
        validRequests.push(now);
        this.requestMap.set(key, validRequests);
        return true;
      }
    }
