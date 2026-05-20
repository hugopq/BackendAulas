# Servidor de Demonstração — Biblioteca

API REST para demonstração pedagógica dos conceitos de Node.js / Express / MySQL2.

## Arranque rápido

```bash
# 1. Instalar dependências
npm install

# 2. Criar a base de dados e inserir dados de exemplo
#    (MySQL a correr no Docker na porta 3306)
mysql -u root -p < setup.sql

# 3. Ajustar a password em server.js (linha com password: "secret")

# 4. Iniciar o servidor
npm run dev        # com hot-reload (nodemon)
npm start          # sem hot-reload
```

---

## Endpoints e conceitos demonstrados

### Ponto 1 — req.params vs req.query vs db.query

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| GET | /livros | db.query com callback; resultado em results |
| GET | /livros/:id | req.params.id — valor da rota |
| GET | /livros/pesquisa?titulo=x&categoria=y | req.query — query string |

### Ponto 2 — Desestruturação do req.body

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| POST | /livros | const { titulo, autor, ... } = req.body |

### Ponto 3 — SQL como primeiro argumento de db.query

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| PUT | /livros/:id | db.query(sql, params, callback) |

### Ponto 4 — return nos res.json de erro

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| DELETE | /livros/:id | return antes de cada res.status(...).json(...) |

### Ponto 5 — Ordem das validações

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| POST | /livros | existência antes de usar .length ou outros |
| PATCH | /livros/:id/disponibilidade | campo opcional com validação a dois passos |

### Ponto 6 — map, filter e reduce

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| GET | /livros/stats | filter, map, encadeamento, reduce |

### Ponto 7 — try/catch com async/await

| Método | Rota | O que demonstra |
|--------|------|-----------------|
| GET | /livros/async | db.promise().query(), desestruturação [rows] |
| POST | /livros/async | async/await + try/catch completo |

---

## Exemplos de pedidos (Postman / Thunder Client)

```
# Listar todos
GET http://localhost:3000/livros

# Detalhe
GET http://localhost:3000/livros/1

# Pesquisa por query string
GET http://localhost:3000/livros/pesquisa?categoria=Tecnico

# Estatísticas
GET http://localhost:3000/livros/stats

# Criar livro
POST http://localhost:3000/livros
Content-Type: application/json
{ "titulo": "Node.js em Ação", "autor": "Mike Cantelon", "categoria": "Técnico", "ano": 2017 }

# Atualizar livro
PUT http://localhost:3000/livros/1
Content-Type: application/json
{ "titulo": "O Nome do Vento", "autor": "Patrick Rothfuss", "categoria": "Fantasia", "ano": 2007 }

# Alterar disponibilidade
PATCH http://localhost:3000/livros/2/disponibilidade
Content-Type: application/json
{ "disponivel": 1 }

# Apagar livro
DELETE http://localhost:3000/livros/10
```
