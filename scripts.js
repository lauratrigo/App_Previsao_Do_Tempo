// terceiro passo: escrever no head <script src = "scripts.js"> </script> para avisar que existe um arquivo em javascript que fará tudo funcionar 
/* antes de escrever o código em javascript, precisa entrar em contato com o servidor, as informações vão vir de uma API e essas informações serão 
usadas no site que está sendo montado */

const key = "42c8b28a5ee46db4ad1171bc6fb74e3a"; //declaração de uma variável constante = o valor é fixo e não pode ser alterado

// para ficar organizado, é bom que cada função tenha a sua respectiva "responsabilidade"
// essa função tem o objetivo de pegar o que está no input
function clickButton() {
    // pegar a informação da cidade
    // document é usado no javascript para chamar o html, tipo o apelido
    // querySelector = procura alguma informação no html
    // o .value serve para a variável buscar apenas o valor do input, não o input inteiro
    const city = document.querySelector(".input-city").value

    searchCity(city)
}


// foi criada uma segunda função que tem responsabilidade de buscar informação no servidor
// tem como chamar essa segunda função "searchCity" na primeira função "clickButton" e enviar este dado que é o nome da cidade
/* toda vez que se usa servidores no javascript, precisa usar async na frente da função, para avisar que será acessado um servidor, 
visto que não tem como saber quanto tempo vai demorar para ele pegar a informação */
async function searchCity(city) {

    // await = comando para o javascript esperar até o servidor responder e poder dar prosseguimento à execução do código
    // a crase permite que você coloque o seu texto e no meio dele, uma variável
    const data = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`).then(response => response.json())
    // para os valores saírem em pt, basta colocar um parâmetro logo após {key} &lang=pt_br
    /* acessa o servidor -> servidor traz uma resposta -> quando o servidor responder, passar essa resposta para o formato .json -> automaticamente
    o javascript passa tudo para "data" */

    addDataScreen(data)   
}


// terceira função é para receber os dados e imprimir na tela
function addDataScreen(data){

    console.log(data)
    // innerHTML = pega o texto "Weather in São Paulo"
    document.querySelector(".city").innerHTML = "Weather in " + data.name
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C"
    document.querySelector(".prevision-text").innerHTML = data.weather[0].description
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%"
    document.querySelector(".img-prevision").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
}