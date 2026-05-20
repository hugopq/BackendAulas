-- =============================================================================
-- SETUP — Base de dados para demonstração pedagógica
-- Corre este ficheiro antes de iniciar o servidor:
--   mysql -u root -p < setup.sql
-- Ou cola diretamente no phpMyAdmin / DBeaver.
-- =============================================================================

CREATE DATABASE IF NOT EXISTS biblioteca
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE biblioteca;

-- -----------------------------------------------------------------------------
-- Tabela books
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id         INT          NOT NULL AUTO_INCREMENT,
  titulo     VARCHAR(200) NOT NULL,
  autor      VARCHAR(100) NOT NULL,
  categoria  VARCHAR(50)  NOT NULL,
  ano        INT          NOT NULL,
  disponivel TINYINT(1)   NOT NULL DEFAULT 1,  -- 1 = disponível, 0 = emprestado
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------------------------------
-- Dados de exemplo
-- -----------------------------------------------------------------------------
INSERT INTO books (titulo, autor, categoria, ano, disponivel) VALUES
  ('O Nome do Vento',           'Patrick Rothfuss',   'Fantasia',    2007, 1),
  ('Duna',                      'Frank Herbert',      'Ficção',      1965, 0),
  ('Clean Code',                'Robert C. Martin',   'Técnico',     2008, 1),
  ('O Senhor dos Anéis',        'J.R.R. Tolkien',     'Fantasia',    1954, 1),
  ('Design Patterns',           'Gang of Four',       'Técnico',     1994, 0),
  ('Sapiens',                   'Yuval Noah Harari',  'História',    2011, 1),
  ('The Pragmatic Programmer',  'David Thomas',       'Técnico',     1999, 1),
  ('Neuromancer',               'William Gibson',     'Ficção',      1984, 0),
  ('Homo Deus',                 'Yuval Noah Harari',  'História',    2015, 1),
  ('Fundação',                  'Isaac Asimov',       'Ficção',      1951, 1);
