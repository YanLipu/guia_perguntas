const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");


connection.authenticate().then(()=>{
    console.log("Conexao feita com o BD");
}).catch((msgErro)=> {
    console.log(msgErro);
})

app.set('view engine', 'ejs');
app.use(express.static('public'));

//ferramenta usada para trazer dados do front para o back
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//definindo as rotas do sistema
app.get("/", (req, res)=>{    
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
        console.log(perguntas)
    })
    
});

app.get("/perguntar",(req,res)=> {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("pergunta");
        }else{
            res.redirect("/")
        }
    })

})

app.listen(8080,()=>{
    console.log("app rodando")
});

