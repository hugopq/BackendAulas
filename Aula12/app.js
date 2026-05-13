const fs = require('fs');
const zlib = require('zlib');
const filename = 'bigtext.txt';

function readBigText()
{
    const data = fs.readFileSync(filename, 'utf-8');
    console.log(data);
}

async function readBigTextStream(){
    const stream = fs.createReadStream(filename,'utf-8');
    // // usar a variável para guardar todo o ficheiro
    // //podemos usar uma variável, mas vai piorar a performance
    let data ="";
    
    try{
        for await(const chunk of stream){
            // // a ideia é tratar o chunk 
            // // (um pedaço da cada vez)
            data += chunk;   
        }
        console.log(data);
    } catch (erro) {
        console.error('Erro ao ler o ficheiro:', erro.message);
    }
}
async function readBigTextStream2(){
    const stream = fs.createReadStream(filename,'utf-8');
        
    try{
        for await(const chunk of stream){
            console.log(chunk);
        }
    } catch (erro) {
        console.error('Erro ao ler o ficheiro:', erro.message);
    }
}

async function readBigTextStream3(){
    const stream = fs.createReadStream(filename,'utf-8');
    let data = "";

    stream.on('data', chunk =>{
        data+=chunk;
    })

    stream.on('end',() => {
        console.log(data);
    })
}

async function readBigTextStream4(){
    const stream = fs.createReadStream(filename,'utf-8');

    stream.on('data', chunk =>{
        console.log(chunk);
    })

    stream.on('end',() => {
        // console.log(data);
    })
}

async function manualPipe(){
    const outFile = 'bigtext2.txt';

    const readStream = fs.createReadStream(filename,'utf-8');
    const writeStream = fs.createWriteStream(outFile,'utf-8');
    let writing = false;

     readStream.on('data', chunk =>{
        writing = true;
        writeStream.write(chunk, ()=> {writing=false});
    })

    readStream.on('end',() => {
        console.log("leitura finalizada");
    })

    writeStream.on('finish',() => {
        console.log("escrita finalizada");
    })

}

async function pipe(){
    const outFile = 'bigtext2.txt';

    const readStream = fs.createReadStream(filename,'utf-8');
    const writeStream = fs.createWriteStream(outFile,'utf-8');
        
    readStream.pipe(writeStream);
}

async function pipeNZip(){
    const outFile = 'bigtext.zip';

    const readStream = fs.createReadStream(filename,'utf-8');
    const writeStream = fs.createWriteStream(outFile,'utf-8');
        
    readStream
        .pipe(zlib.createGzip())
        .pipe(writeStream);
}


// readBigText();
// readBigTextStream();
// readBigTextStream2();
// readBigTextStream4();
// manualPipe();
// pipe();
pipeNZip();