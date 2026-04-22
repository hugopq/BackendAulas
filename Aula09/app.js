const express = require('express');
const Car = require('./models/Car');

const sequelize = require('./config/database');

sequelize.sync({ force: true }) //force:true - obriga a eliminar e recriar a base de dados
    .then(() =>{
        console.log("BD sincronizada");
        Car.create({
            Brand: "Renault",
            Model: "clio",
            LicensePlate: "AA-12-12",
            Color: "Vermelho",
            Year: 1987,
            Power: 60,
            Displacement: 1200
        })
        const novosCarros = [
            { Brand: 'Tesla', Model: 'Model 3', LicensePlate: 'AA-00-BB', Color: 'Branco', Year: 2023, Power: 283, Displacement: 0 },
            { Brand: 'BMW', Model: '320d', LicensePlate: 'CC-11-DD', Color: 'Preto', Year: 2020, Power: 190, Displacement: 1995 },
            { Brand: 'Toyota', Model: 'Corolla', LicensePlate: 'EE-22-FF', Color: 'Cinzento', Year: 2022, Power: 122, Displacement: 1798 },
            { Brand: 'Volkswagen', Model: 'Golf', LicensePlate: 'GG-33-HH', Color: 'Azul', Year: 2019, Power: 150, Displacement: 1968 }
        ];
        Car.bulkCreate(novosCarros);
    })
    .catch((error) => {
        console.log("erro ao aceder à BD");
    });

const PORT = 3000;
const app = express();

app.use(express.json());

//endpoints
// 5.a. istar todos os carros existentes na tabela 
// Cars e devolver a resposta no body
app.get("/cars", async (req,res) => {
    const id = req.query.id;
    // if(id)
    //     res.redirect(300,`/cars/findById`);

    const cars = await Car.findAll();
    res.json(cars);
});
// versão promise
app.get("/cars2", (req,res) => {
    const promise = Car.findAll();
    promise.then((cars) => {
        res.json(cars);
    });
});
// versão promise2
app.get("/cars3", (req,res) => {
    Car.findAll().then((cars) => {
        res.json(cars);
    });
});

//  5.b. Adicionar um novo carro à tabela Cars, o ID 
// deve ser gerado automaticamente pelo MySQL tendo 
// em conta o número de carros existentes. O ID do 
// carro adicionado deve ser devolvido na resposta.
app.post("/cars", async (req,res) => {
    const { Brand, Model, LicensePlate,Color,
        Year,Power,Displacement } = req.body;

    if( !Brand || !Model || !LicensePlate )
        return res.status(400).send("Campos obrigatórios em falta");
    
    try {
        const car = await Car.create({ Brand, Model, 
            LicensePlate, Color, Year,Power,Displacement });

        res.json({resultado: "carro criado", id:car.id});
    } catch (error) {
        console.log(error);
        return res.status(500).send("ocorreu um erro");
    }    
});

// 5.c. Apagar um carro da tabela Cars pelo seu 
// ID recebido no body. O número de linhas afetadas 
// deve ser devolvido na resposta. Caso o carro a 
// apagar não exista o erro deverá ser tratado de 
// forma adequada.
app.delete("/cars", async(req,res) =>{
    const { id } = req.body;   

    const carro = await Car.findByPk(id);
    if(!carro)
        return res.status(404).send("O carro não existe");

    // await carro.destroy();   //não reotna nr de linhas
    const result = await Car.destroy( {where: { id: id }});
    res.json({linhas_afetadas: result});
});

// 5.d. Apagar um carro da tabela Cars pela sua matrícula 
// recebido como parâmetro. O número de linhas afetadas 
// deve ser devolvido na resposta. Caso o carro a apagar 
// não exista o erro deverá ser tratado de forma adequada.
app.delete("/cars/license/:plate", async(req,res) =>{
    try {
        const { plate } = req.params;   

        console.log(plate);
        if(!Car.validarMatricula(plate))
            return res.status(400).send("matricula inválida");

        const carro = await Car.findOne({where:{LicensePlate: plate}});

        if(!carro)
            return res.status(404).send("O carro não existe");

        // await carro.destroy();   //não reotna nr de linhas
        const result = await Car.destroy( {where: { id: carro.id }});
        res.json({linhas_afetadas: result});        
    } catch (error) {
        console.log(error);
        res.status(500).send("erro da BD");
    }
});

// 5.d. Selecionar apenas um carro pelo seu ID (como query) e devolver 
// na resposta. Caso o carro a selecionar não exista, o erro deverá ser
// tratado de forma adequada.
app.get("/cars/findById",async (req,res)=>{
    try {        
        const id = req.query.id;

        if(!id)
            return res.status(400).send("o id é obrigatório");

        const carro = await Car.findByPk(id);

        if(!carro)
            return res.status(404).send("carro não encontrado");

        res.json(carro);
    } catch (error) {
        console.log(error);
        res.status(500).send("erro da BD");
    }
});

// 5.f. Selecionar os carros pelo marca e modelo. Devolver todos os carros 
// que reúnam essas condições. Caso não exista, o erro deverá ser tratado de 
// forma adequada.
app.get('/cars/brand/:brand/model/:model', async (req,res,)=>{
    const {brand, model} = req.params;

    const carros = await Car.findAll({where: {Brand: brand, Model: model}});

    if(!carros)
        return res.status(404).send("nenhum carro não encontrado");

    res.json(carros);
});

// 5.g. Alterar os detalhes de um carro selecionado pelo seu ID. Os 
// novos detalhes deverão ser devolvidos na resposta.
app.patch('/cars/:id', async (req,res) => {
    const {id} = req.params;
    const { Brand, Model, LicensePlate,Color,
        Year,Power,Displacement } = req.body;
    
        let updates = {};

        if(Brand)
            updates.Brand = Brand;
        if(Model)
            updates.Model = Model;
        if(LicensePlate)
            updates.LicensePlate = LicensePlate;
        if(Color)
            updates.Color = Color;
        if(Year)
            updates.Year = Year;
        if(Power)
            updates.Power = Power;
        if(Displacement)
            updates.Displacement = Displacement;    

    try {
        const carro = await Car.findByPk(id);
        const carroUpdated = await carro.update(updates);
        // const carroUpdated = await Car.update(updates,{where:{id:id}}); //retorna apenas  linhas afetadas

        res.json(carroUpdated);
    } catch (error) {
        console.log(error);
        return res.status(500).send("ocorreu um erro");
    }  
});

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});