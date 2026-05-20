// =============================================================================
// SERVIDOR DE DEMONSTRAÇÃO — Node.js / Express / MySQL2
// API de gestão de livros de uma biblioteca
// =============================================================================

const express = require("express");
const mysql = require("mysql2");
// const mysql = require("mysql2/promisses");

const app = express();

// -----------------------------------------------------------------------------
// MIDDLEWARE
// -----------------------------------------------------------------------------
// O express.json() "lê" o corpo do pedido HTTP e transforma o JSON em objeto
// JavaScript, disponibilizando-o em req.body.
// SEM este middleware, req.body é sempre undefined!
app.use(express.json());

// -----------------------------------------------------------------------------
// LIGAÇÃO À BASE DE DADOS
// -----------------------------------------------------------------------------
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",      // <- ajusta à tua config do Docker
  database: "biblioteca_exemplo",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao ligar à base de dados:", err.message);
    process.exit(1);
  }
  console.log("Ligado à base de dados MySQL.");
});


// =============================================================================
// PONTO 1 — req.params vs req.query vs db.query
//
// req.params  → segmentos dinâmicos da ROTA       → GET /livros/:id  →  req.params.id
// req.query   → parâmetros da query string        → GET /livros?ano=2020  →  req.query.ano
// db.query    → método do MySQL2 para executar SQL; não tem nada a ver com req
// =============================================================================

// GET /livros
// Retorna todos os livros (sem parâmetros)
app.get("/livros", (req, res) => {
  // db.query executa SQL — o resultado vem no callback como segundo argumento
  const sql = "SELECT * FROM books";
  db.query(sql, (err, results) => {
    if (err) 
      return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /livros/pesquisa?titulo=harry&categoria=ficcao
// req.query.titulo     →  valor do parâmetro "titulo" na query string
// req.query.categoria  →  valor do parâmetro "categoria"
app.get("/livros/pesquisa", (req, res) => {
  const titulo    = req.query.titulo    ?? ""; // vem da QUERY STRING  →  ?titulo=...
  const categoria = req.query.categoria ?? "";

  const sql = `
    SELECT * FROM books
    WHERE titulo    LIKE CONCAT('%', ?, '%')
      AND categoria LIKE CONCAT('%', ?, '%')
  `;

  db.query(sql, [titulo, categoria], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// =============================================================================
// PONTO 2 — Desestruturação do req.body
//
// Quando o cliente envia um POST com JSON no corpo, o Express disponibiliza
// esse objeto em req.body (desde que app.use(express.json()) esteja ativo).
//
// const { titulo, autor } = req.body
//   é equivalente a:
// const titulo = req.body.titulo;
// const autor  = req.body.autor;
//
// SEM o "= req.body", o JavaScript lança SyntaxError — const exige inicializador.
// =============================================================================

// POST /livros
// O cliente envia: { "titulo": "...", "autor": "...", "categoria": "...", "ano": 2020 }
app.post("/livros", (req, res) => {
  // Desestruturação CORRETA — os valores vêm do corpo do pedido
  const { titulo, autor, categoria, ano } = req.body;

  // PONTO 5 — Ordem das validações:
  // Primeiro verifica se os campos existem; só depois usa as suas propriedades.
  // Se titulo for undefined e tentarmos titulo.length → TypeError imediato.
  if (!titulo || !autor || !categoria || !ano) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (titulo.length < 2) {
    return res.status(400).json({ error: "Título demasiado curto" });
  }

  if (typeof ano !== "number" || ano < 1000 || ano > new Date().getFullYear()) {
    return res.status(400).json({ error: "Ano inválido" });
  }

  // PONTO 3 — O SQL é sempre o PRIMEIRO argumento de db.query
  // Assinatura: db.query(sql, params, callback)
  const sql = "INSERT INTO books (titulo, autor, categoria, ano) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [titulo, autor, categoria, ano],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});


// =============================================================================
// PONTO 3 — O SQL no db.query
//
// db.query(sql, params, callback)
//   sql      → string com a query; usa ? como placeholder para os valores
//   params   → array com os valores que substituem os ? (pela mesma ordem)
//   callback → função chamada quando a query termina: (err, results)
//
// Os placeholders ? protegem contra SQL Injection — o MySQL2 trata do escape.
// =============================================================================

// PUT /livros/:id
// Atualiza um livro existente (combina req.params + req.body + db.query)
app.put("/livros/:id", (req, res) => {
  const id = req.params.id;                            // da ROTA
  const { titulo, autor, categoria, ano } = req.body;  // do CORPO

  if (!titulo || !autor || !categoria || !ano) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // sql é o PRIMEIRO argumento; o array de params é o SEGUNDO
  const sql = "UPDATE books SET titulo=?, autor=?, categoria=?, ano=? WHERE id=?";

  db.query(sql, [titulo, autor, categoria, ano, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }
    res.json({ message: "Livro atualizado" });
  });
});


// =============================================================================
// PONTO 4 — return nos res.send/res.json de erro
//
// res.json() envia a resposta HTTP mas NÃO para a execução da função.
// Sem return, o código continua a correr depois do if — podendo:
//   1. tentar enviar uma segunda resposta → "Cannot set headers after they are sent"
//   2. aceder a results quando é undefined (se houve erro no db.query)
//
// Regra: sempre que envias uma resposta dentro de um if, coloca return antes.
// =============================================================================

// DELETE /livros/:id
app.delete("/livros/:id", (req, res) => {
  const id = req.params.id;

  // Passo 1 — verificar se o livro existe
  db.query("SELECT id FROM books WHERE id = ?", [id], (err, results) => {
    if (err) 
      return res.status(500).json({ error: err.message }); // return → para aqui

    if (results.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado" }); // return → para aqui
    }

    // Passo 2 — apagar (só chega aqui se passou ambas as validações)
    db.query("DELETE FROM books WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Livro apagado com sucesso" });
    });
  });
});


// =============================================================================
// PONTO 5 — Ordem das validações  (ver também POST /livros acima)
//
// Regra geral:
//   1. Verificar se os campos existem / não são undefined
//   2. Só depois verificar o conteúdo (length, tipo, formato, etc.)
//
// O endpoint PATCH abaixo mostra o padrão com um campo opcional.
// =============================================================================

// PATCH /livros/:id/disponibilidade
// Altera apenas o campo "disponivel" (0 ou 1)
app.patch("/livros/:id/disponibilidade", (req, res) => {
  const id = req.params.id;
  const { disponivel } = req.body;

  // 1º — existe?
  if (disponivel === undefined) {
    return res.status(400).json({ error: "Campo 'disponivel' é obrigatório" });
  }

  // 2º — é válido?
  if (disponivel !== 0 && disponivel !== 1) {
    return res.status(400).json({ error: "'disponivel' deve ser 0 ou 1" });
  }

  db.query(
    "UPDATE books SET disponivel = ? WHERE id = ?",
    [disponivel, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }
      res.json({ message: "Disponibilidade atualizada" });
    }
  );
});


// =============================================================================
// PONTO 6 — map, filter e reduce
//
// filter  → testa cada elemento; mantém-no se a função retornar true
//           resultado: array com os elementos que passaram (igual ou menor)
//
// map     → transforma cada elemento; o retorno da função é o novo elemento
//           resultado: novo array com o MESMO número de elementos
//
// reduce  → acumula todos os elementos num único valor
//           resultado: um número, string, objeto, array...
// =============================================================================

// GET /livros/stats
// Retorna estatísticas calculadas em JS (não em SQL)
app.get("/livros/stats", (req, res) => {
  db.query("SELECT * FROM books", (err, livros) => {
    if (err) return res.status(500).json({ error: err.message });

    // filter — quais os livros disponíveis?
    // Mantém o objeto livro tal como está; só decide se entra ou não.
    const disponiveis = livros.filter((livro) => livro.disponivel === 1);

    // map — extrair apenas os títulos de todos os livros
    // Transforma cada objeto livro numa string (o título).
    const titulos = livros.map((livro) => livro.titulo);

    // map + filter encadeados — títulos dos livros disponíveis
    const titulosDisponiveis = livros
      .filter((livro) => livro.disponivel === 1)
      .map((livro) => livro.titulo);

    // reduce — contar livros por categoria
    // O acumulador começa como {} e vai sendo preenchido a cada iteração.
    const porCategoria = livros.reduce((acc, livro) => {
      const cat = livro.categoria;
      acc[cat] = (acc[cat] ?? 0) + 1; // incrementa ou inicializa a 0
      return acc;
    }, {});

    // reduce — soma dos anos (para calcular a média)
    const somaAnos = livros.reduce((acc, livro) => acc + livro.ano, 0);
    const mediaAnos = livros.length > 0 ? Math.round(somaAnos / livros.length) : 0;

    res.json({
      total: livros.length,
      totalDisponiveis: disponiveis.length,
      titulos,
      titulosDisponiveis,
      porCategoria,
      mediaAnos,
    });
  });

});


// =============================================================================
// PONTO 7 — try/catch com async/await
//
// Com callbacks (estilo acima), os erros chegam sempre como primeiro argumento.
// Com async/await, se a promise for rejeitada, o erro é lançado como exceção
// — e SEM try/catch esse erro fica sem tratamento, podendo derrubar o servidor.
//
// Estrutura correta:
//   async (req, res) => {
//     try {
//       const [rows] = await db.promise().query(...)
//       res.json(rows)
//     } catch (err) {
//       res.status(500).json({ error: err.message })
//     }
//   }
//
// db.promise() → versão "prometificada" do MySQL2 (retorna promises em vez de callbacks)
// A desestruturação [rows] funciona porque o MySQL2 retorna [results, fields].
// =============================================================================

// GET /livros/async  (mesmo que GET /livros, mas com async/await)
// Mostra o padrão async/await com try/catch
app.get("/livros/async", async (req, res) => {
  try {
    // db.promise().query() retorna uma Promise que resolve em [results, fields]
    const [livros] = await db.promise().query("SELECT * FROM books");
    // const [livros] = await db.query("SELECT * FROM books");
    res.json(livros);
  } catch (err) {
    // Qualquer erro da query (ligação perdida, SQL inválido, etc.) cai aqui
    res.status(500).json({ error: err.message });
  }
});


// GET /livros/:id
// req.params.id  →  o valor de :id na URL
// Exemplo: GET /livros/3  →  req.params.id === "3"
app.get("/livros/:id", (req, res) => {
  const id = req.params.id; // vem da ROTA  →  /livros/:id

  db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }
    res.json(results[0]);
  });
});


// POST /livros/async  (mesmo que POST /livros, mas com async/await)
app.post("/livros/async", async (req, res) => {
  const { titulo, autor, categoria, ano } = req.body;

  if (!titulo || !autor || !categoria || !ano) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const [result] = await db.promise().query(
      "INSERT INTO books (titulo, autor, categoria, ano) VALUES (?, ?, ?, ?)",
      [titulo, autor, categoria, ano]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =============================================================================
// INICIAR O SERVIDOR
// =============================================================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
