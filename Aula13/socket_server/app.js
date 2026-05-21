const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const path   = require('path');

const multer = require('multer');
const cors = require('cors');

// pasta onde as imagens ficam guardadas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1000);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const app    = express();
// middlewares
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:5173'
}));


const server = http.createServer(app); 
const io     = new Server(server,{
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    });  

// Ao ser efetuada uma ligação, regista os eventos:
io.on('connection', (socket) => {
    console.log('Cliente ligado:', socket.id);

    socket.on('send_message', (data) => {

        // Responder a todos:
        io.emit('broadcast_message', {
            id:        socket.id,
            username:  data.username,
            message:   data.message,
            image:     data.image,
            timestamp: new Date().toLocaleTimeString('pt-PT')
        });

        // // Responder só ao remetente:
        // socket.emit('outro_evento', { resposta: 'só para ti' });

        // // Responder a todos EXCETO o remetente:
        // socket.broadcast.emit('outro_evento', { resposta: 'para os outros' });
        
    });

    socket.on('disconnect', () => {
        console.log('Cliente desligado:', socket.id);
    });
});

// rotas (servidor express)
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum ficheiro enviado.' });
  }

  res.json({ url: `/uploads/${req.file.filename}` });
});


server.listen(3000, () => {
    console.log('Servidor a correr em http://localhost:3000');
});