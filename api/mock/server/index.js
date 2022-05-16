const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api/mock/db.json')
const middlewares = jsonServer.defaults()
const PORT = process.env.API_MOCK_PORT || 5001

server.use(middlewares)

// Adiciona o prefixo /api para todas rotas
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
)

server.use(router)
server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on http://localhost:${PORT}`)
})
