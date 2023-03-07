// 简单路由实现
// hash路由实现
class HashRouter {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.history = [];

    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  }

  // route方法用于添加路由规则，它接受路径和回调函数作为参数。我们使用routes对象来存储路由规则。
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  // refresh方法是该路由器的核心方法，它获取当前URL的hash值，将其存储在currentUrl属性中，并执行与该路由相关的回调函数。
  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.history.push(this.currentUrl);
    this.routes[this.currentUrl]();
  }

  // back方法用于返回上一页，它从历史记录中删除当前URL，并在历史记录中返回上一页的URL。最后，它调用路由规则相关的回调函数。
  back() {
    if (this.history.length > 1) {
      this.history.pop();
      const previousUrl = this.history[this.history.length - 1];
      location.hash = previousUrl;
      this.routes[previousUrl]();
    }
  }

  // go方法用于导航到历史记录中的某一页，它使用window.history.go方法来实现导航
  go(n) {
    window.history.go(n);
  }
}

// 示例用法
const router = new HashRouter();

router.route('/', () => {
  console.log('Home page');
});

router.route('/about', () => {
  console.log('About page');
});

router.route('/contact', () => {
  console.log('Contact page');
});

// 跳转到/about页面
location.hash = '#/about';


class HistoryRouter {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
    this.history = [];

    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('popstate', this.refresh.bind(this), false);
  }

  // route方法用于添加路由规则，它接受路径和回调函数作为参数。我们使用routes对象来存储路由规则。
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  // refresh方法是该路由器的核心方法，它获取当前URL的pathname，将其存储在currentUrl属性中，并执行与该路由相关的回调函数。
  refresh() {
    this.currentUrl = location.pathname || '/';
    this.history.push(this.currentUrl);
    this.routes[this.currentUrl]();
  }
  // back方法用于返回上一页，它从历史记录中删除当前URL，并在历史记录中返回上一页的URL。最后，它调用路由规则相关的回调函数，并使用history.pushState方法更新URL。
  back() {
    if (this.history.length > 1) {
      this.history.pop();
      const previousUrl = this.history[this.history.length - 1];
      history.pushState(null, '', previousUrl);
      this.routes[previousUrl]();
    }
  }
  // go方法用于导航到历史记录中的某一页，它使用window.history.go方法来实现导航
  go(n) {
    window.history.go(n);
  }
}

// 示例用法
const router2 = new HistoryRouter();

router2.route('/', () => {
  console.log('Home page');
});

router2.route('/about', () => {
  console.log('About page');
});

router2.route('/contact', () => {
  console.log('Contact page');
});

// 跳转到/about页面
history.pushState(null, '', '/about');