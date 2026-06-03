const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Config do Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

// Middleware para dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas Básicas

// Exercício 1 e 12
app.get('/', (req, res) => {
    res.render('home');
});

// Exercício 2
app.get('/sobre', (req, res) => {
    res.send('Esta é uma aplicação desenvolvida para a lista de exercícios de Express.js.');
});

// Exercício 3
app.get('/contato', (req, res) => {
    res.json({
        "email": "contato@email.com",
        "telefone": "(81) 99999-9999"
    });
});

// Exercício 4
app.get('/erro', (req, res) => {
    res.status(404).send('Página não encontrada');
});

// Exercício 5
app.get('/inicio', (req, res) => {
    res.redirect('/');
});


// Parâmetros de Rota

// Exercício 6
app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Usuário ${id}`);
});

// Exercício 7
app.get('/produtos/:nome', (req, res) => {
    const nome = req.params.nome;
    res.send(`Produto: ${nome}`);
});

// Exercício 8
app.get('/filmes/:id/:nome', (req, res) => {
    const { id, nome } = req.params;
    res.send(`ID do filme: ${id} <br> Nome do filme: ${nome}`);
});


// Query Strings

// Exercício 9
app.get('/buscar', (req, res) => {
    const nome = req.query.nome;
    res.send(`Buscando por: ${nome}`);
});

// Exercício 10
app.get('/produtos', (req, res) => {
    const { categoria, pagina } = req.query;
    res.send(`Categoria: ${categoria} <br> Página: ${pagina}`);
});

// Exercício 11
app.get('/usuarios', (req, res) => {
    const idade = req.query.idade;
    res.send(`Filtrando usuários com idade ${idade}`);
});

// Handlebars

// Exercício 13
app.get('/perfil', (req, res) => {
    res.render('perfil', {
        nome: 'João Silva',
        idade: 25
    });
});

// Exercício 14 e 16
app.get('/filmes', (req, res) => {
    const filmes = [
        { nome: 'Matrix', ano: 1999 },
        { nome: 'Interestelar', ano: 2014 },
        { nome: 'Avatar', ano: 2009 }
    ];
    res.render('filmes', { filmes });
});

// Exercício 15
app.get('/condicional', (req, res) => {
    res.render('condicional', {
        logado: true,
        admin: false
    });
});

// Exercício 17

let videos = [
    {
        titulo: 'Dicas de Node.js',
        criador: 'DevMaster',
        descricao: 'Aprenda Express em 1 minuto',
        visualizacoes: 1500,
        curtidas: 300,
        hashtag: 'nodejs',
        url: 'https://example.com/video1',
        thumbnail: 'https://picsum.photos/200/300'
    }
];

app.get('/videos', (req, res) => {
    res.render('videos', { videos });
});

app.get('/videos/cadastrar', (req, res) => {
    res.render('cadastrarVideo');
});

app.post('/videos', (req, res) => {
    const { titulo, criador, descricao, visualizacoes, curtidas, hashtag, url, thumbnail } = req.body;
    videos.push({
        titulo,
        criador,
        descricao,
        visualizacoes,
        curtidas,
        hashtag,
        url,
        thumbnail
    });
    res.redirect('/videos');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
