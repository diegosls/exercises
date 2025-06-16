const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const [_, tipo, acao] = pathname.split('/');

  res.setHeader('Content-Type', 'application/json');

  if (tipo === 'text' && req.method === 'POST') {
    let corpo = '';
    req.on('data', chunk => corpo += chunk);
    req.on('end', () => {
      const input = JSON.parse(corpo).input;
      const saida = acao === 'lowercase' ? input.toLowerCase()
                  : acao === 'uppercase' ? input.toUpperCase()
                  : null;

      res.end(JSON.stringify({ output: saida || 'Ação inválida' }));
    });

  } else if (tipo === 'number' && req.method === 'GET') {
    const nums = query.input.split(',').map(Number);
    const saida = acao === 'minimum' ? Math.min(...nums)
                : acao === 'maximum' ? Math.max(...nums)
                : null;

    res.end(JSON.stringify({ output: saida || 'Ação inválida' }));
  } else {
    res.end(JSON.stringify({ erro: 'Rota inválida' }));
  }

}).listen(3000, () => console.log('API em http://localhost:3000'));
