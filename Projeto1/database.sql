-- CREATE
CREATE TABLE Projeto1.Book 
    (id INT NOT NULL AUTO_INCREMENT 
    , title VARCHAR(45) NOT NULL 
    , isbn VARCHAR(100) NOT NULL 
    , genre VARCHAR(45) NOT NULL 
    , review INT NOT NULL 
    , synopsis VARCHAR(500) NOT NULL 
    , pages INT NOT NULL 
    , price INT NOT NULL 
    , published DATE NOT NULL 
    , comment JSON NOT NULL
    , PRIMARY KEY (id)
) ENGINE = InnoDB;


-- INSERTs
INSERT INTO `Projeto1`.`Book` (`title`, `isbn`, `genre`, `review`, `synopsis`, `pages`, `price`, `published`, `comment`) VALUES
('The Pragmatic Programmer', '978-0135957059', 'Technology', 5, 'A guide to software craftsmanship covering best practices and career advice for developers.', 352, 45, '2019-09-13', '{"user": "alice", "text": "Livro essencial para qualquer programador.", "rating": 5}'),

('Clean Code', '978-0132350884', 'Technology', 4, 'A handbook of agile software craftsmanship focused on writing readable and maintainable code.', 431, 38, '2008-08-01', '{"user": "bob", "text": "Muito bom mas alguns exemplos são datados.", "rating": 4}'),

('Dune', '978-0441013593', 'Science Fiction', 5, 'Epic science fiction novel set in a distant future amidst a feudal interstellar society.', 688, 20, '1965-08-01', '{"user": "carlos", "text": "Uma obra-prima da ficção científica.", "rating": 5}'),

('Harry Potter and the Philosopher\'s Stone', '978-0747532699', 'Fantasy', 5, 'A young boy discovers he is a wizard and begins his education at Hogwarts School of Witchcraft and Wizardry.', 223, 15, '1997-06-26', '{"user": "diana", "text": "Clássico atemporal, ótimo para todas as idades.", "rating": 5}'),

('The Great Gatsby', '978-0743273565', 'Classic', 3, 'A story of the mysteriously wealthy Jay Gatsby and his obsession with the beautiful Daisy Buchanan.', 180, 12, '1925-04-10', '{"user": "eve", "text": "Interessante mas não é para todos os gostos.", "rating": 3}');