const React = require('react');

const { renderToString } = require('react-dom/server');

const http = require('http');

//组件
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>{this.props.data.title}</h1>
    }
}

//模拟数据的获取
const fetch = function () {
    return {
        title: 'react ssr',
        data: []
    }
}

//服务
http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const data = fetch();

        const html = renderToString(<Index data={data} />);
        res.end(html);
    }
}).listen(8080);

