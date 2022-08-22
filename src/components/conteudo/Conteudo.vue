<template>
    <Sidenav />
    <div class="col py-3 body-dashboard">
        <div class="dashboard">
            <div class="container">
                <div class="row">
                    <div class="titulo col-md-12 p-5 d-flex">
                        <div class="col-md-6">
                            <h1 class="text-secondary">Dashboard</h1>
                        </div>
                        <div class="col-md-5 pt-2 d-flex">
                            <select class="form-control" v-model="selected">
                                <option v-for="option in options" :key="option" :value="option.value">{{ option.text }}</option>
                            </select>
                            <button class="btn btn-dark text-warning fw-bold ms-2" @click="filtrarData">
                                Filtrar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row col-md-12 d-flex justify-content-around">
                    <div class="col-md-5 d-flex cards text-card-pedidos card-pedidos">
                        <div class="col-md-3 div-icon-dashboard">
                            <i class="fa-5x fa-solid fa-scroll"></i>
                        </div>
                        <div class="col-md-9 text-center">
                            <div><h6>Total Pedidos</h6></div>
                            <div><h1>{{totalPedidos}}</h1></div>
                        </div>
                    </div>
                        
                    <div class="col-md-5 d-flex cards text-card-valor-total card-valor-total">
                        <div class="col-md-3 div-icon-dashboard">
                            <i class="fa-5x fa-solid fa-cash-register"></i>
                        </div>
                        <div class="col-md-9 text-center">
                            <div><h6>{{text_valor}}</h6></div>
                            <div v-if="selected === 'soma_total'"><h1>R$ {{somaValorTotal}}</h1></div>
                            <div v-if="selected === 'dia'"><h1>{{somaValorDiaAtual}}</h1></div>
                            <div v-if="selected === 'mes'"><h1>{{somaValorMesAtual}}</h1></div>
                            <div v-if="selected === 'ano'"><h1>{{somaValorAnoAtual}}</h1></div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4 col-md-12 d-flex justify-content-around">
                    <div class="col-md-5 d-flex cards text-card-pedidos card-pedidos">
                        <div class="col-md-3 div-icon-dashboard">
                            <i class="fa-5x fa-solid fa-scroll"></i>
                        </div>
                        <div class="col-md-9 text-center">
                            <div><h6>Total Pedidos</h6></div>
                            <div><h1>{{totalPedidos}}</h1></div>
                        </div>
                    </div>
                        
                    <div class="col-md-5 d-flex cards text-card-valor-total card-valor-total">
                        <div class="col-md-3 div-icon-dashboard">
                            <i class="fa-5x fa-solid fa-cash-register"></i>
                        </div>
                        <div class="col-md-9 text-center">
                            <div><h6>Valor Total</h6></div>
                            <div><h1>R$ {{somaValorTotal}}</h1></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from "./Sidenav.vue";

export default {
    name: "Dashboard",
    components: {
    Sidenav
},
    data() {
        return {
            dadosUsuario: [],
            pedidos: [],
            totalPedidos: '',
            somas_gerais: '',
            somaValorTotal: '',
            somaValorDiaAtual: '',
            somaValorMesAtual: '',
            somaValorAnoAtual: '',
            dataHora: '',
            token_storage: '',
            email: '',
            dia: '',
            mes: '',
            ano: '',
            selected: '',
            options: [
                { text: 'Soma Total', value: 'soma_total' },
                { text: 'Dia', value: 'dia' },
                { text: 'Mês', value: 'mes' },
                { text: 'Ano', value: 'ano' },
            ],
            text_valor: 'Soma Total'
        };
    },
    methods: {
        async listarPedidos() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/pedidos");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/pedidos");
            const data = await req.json();
            this.pedidos = data[0].pedidos;
            this.somas_gerais = data[0].somas;
            this.totalPedidos = this.pedidos.length;

            // busca as datas atuais, dia, mes e ano
            var dia_atual = new Date().getDate();
            var mes_atual = new Date().getMonth();
            var ano_atual = new Date().getFullYear();
            var arr = data[0].pedidos
            
            // percorre os dados created_at vindas do banco de dados
            for(var item in arr) {
                // separa as datas 
                var dia = arr[item].created_at.substring(8, 10);
                var mes = arr[item].created_at.substring(5, 7);
                var ano = arr[item].created_at.substring(0, 4);
                if(dia == dia_atual || dia == mes_atual || dia == ano_atual) {
                    // seta os valores para as variaveis
                    this.dia = dia;
                    this.mes = mes;
                    this.ano = ano;
                }
            }
        },
        async filtrarData() {
            if(this.selected == 'dia') {
                const data = {
                    nome: this.selected,
                    data: this.dia
                };
                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);

                // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/filtros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                const dados_data = await req.json();

                if (req.status === 200) {
                    var arr = dados_data
                    var teste = []
                    var soma = 0
                    // Soma os valores vindo do mes 
                    for(var item in arr) {
                        teste[item] = parseFloat(arr[item].valor_total);      
                        soma += parseFloat(teste[item]);
                    }
                    this.somaValorDiaAtual = 'R$ ' + soma;
                    this.text_valor = 'Valor Total Dia';
                } else {
                    this.somaValorDiaAtual = 'Sem resultado';
                }

            } else if(this.selected == 'mes') {
                const data = {
                    nome: this.selected,
                    data: this.mes
                };
                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);

                // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/filtros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                const dados_data = await req.json();

                if(req.status === 200) {
                    var arr = dados_data
                    var teste = []
                    var soma = 0
                    // Soma os valores vindo do mes 
                    for(var item in arr) {
                        teste[item] = parseFloat(arr[item].valor_total);      
                        soma += parseFloat(teste[item]);
                    }
                    this.somaValorMesAtual = 'R$ ' + soma;
                    this.text_valor = 'Valor Total Mês';
                } else {
                    this.somaValorMesAtual = 'Sem resultado';
                }
            } else if(this.selected == 'ano') {
                const data = {
                    nome: this.selected,
                    data: this.ano
                };
                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);
                console.log(dataJson);

                // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/filtros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                
                if(req.status === 200) {
                    const dados_data = await req.json();
                    var arr = dados_data
                    var teste = []
                    var soma = 0
                    // Soma os valores vindo do mes 
                    for(var item in arr) {
                        teste[item] = parseFloat(arr[item].valor_total);      
                        soma += parseFloat(teste[item]);
                    }
                    
                    this.somaValorAnoAtual = 'R$ ' + soma;
                    this.text_valor = 'Valor Total Ano';
                } else {
                    this.somaValorAnoAtual = 'Sem Resultado'
                }
            } else if(this.selected === 'soma_total') {
                this.somaValorTotal = this.somas_gerais;
                this.text_valor = 'Valor Total';
            }
        },
        token() {
            var email_storage = window.localStorage.getItem('email');
            this.email = email_storage
            this.token_storage = this.$route.params.token
        },
    },
    mounted() {
        this.token();
        this.listarPedidos();
    }
}
</script>

<style scoped>
.botao-acao-tabela button {
    margin-left: 10px !important;
}

.logo {
    width: 100px;
    margin-left: 50px;
    border-radius: 50%;
}

.offcanvas {
    width: 250px;
    background-color: #333;
}

.offcanvas-body ul li a {
    color: #fff;
    text-decoration: none;
}

.offcanvas-body ul li a:hover {
    opacity: 0.6;
}

.offcanvas-body ul li a i {
    color: #f9a529;
    padding-right: 15px;
}

.fa-2x {
    font-size: 2em;
}

.fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size:20px;
}


.main-menu:hover,nav.main-menu.expanded {
    width:250px;
    overflow:visible;
}

.main-menu {
    background:#212121;
    border-right:1px solid #e5e5e5;
    position:absolute;
    top:0;
    bottom:0;
    height:100%;
    left:0;
    width:60px;
    overflow:hidden;
    -webkit-transition:width .05s linear;
    transition:width .05s linear;
    -webkit-transform:translateZ(0) scale(1,1);
    z-index:1000;
}

.main-menu>ul {
    margin:7px 0;
}

.main-menu li {
    position:relative;
    display:block;
    width:250px;
}

.main-menu li > a {
    position:relative;
    display:table;
    border-collapse:collapse;
    border-spacing:0;
    color:#999;
    font-family: arial;
    font-size: 14px;
    text-decoration:none;
    -webkit-transform:translateZ(0) scale(1,1);
    -webkit-transition:all .1s linear;
    transition:all .1s linear;
}

.main-menu .nav-icon {
    position:relative;
    display:table-cell;
    width:60px;
    height:36px;
    text-align:center;
    vertical-align:middle;
    font-size:18px;
}

.main-menu .nav-text {
    position:relative;
    display:table-cell;
    vertical-align:middle;
    width:190px;
    font-family: 'Titillium Web', sans-serif;
}

.main-menu>ul.logout {
    position:absolute;
    left:0;
    bottom:0;
}

.no-touch .scrollable.hover {
    overflow-y:hidden;
}

.no-touch .scrollable.hover:hover {
    overflow-y:auto;
    overflow:visible;
}

a:hover,a:focus {
    text-decoration:none;
}

nav {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -o-user-select:none;
    user-select:none;
}

nav ul,nav li {
    outline:0;
    margin:0;
    padding:0;
}

.main-menu li:hover>a,nav.main-menu li.active>a,.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus,.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,.dashboard-page nav.dashboard-menu ul li.active a {
    color:#fff;
    background-color:#5fa2db;
}

.area {
    float: left;
    background: #e2e2e2;
    width: 100%;
    height: 100%;
}

.cards {
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.46);
    padding: 30px;
    background-color: #fff;
}

.card-pedidos {
    border-left: 5px solid green;
    border-radius: 10px;
    color: black;
}

.card-valor-total {
    border-left: 5px solid blue;
    border-radius: 10px;
    color: black;
}

.text-card-pedidos div i {
    color: #008000ad;
}

.text-card-valor-total div i {
    color: rgba(0, 0, 255, 0.459);
}
@font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 300;
    src: local('Titillium WebLight'), local('TitilliumWeb-Light'), url(http://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff) format('woff');
}

@media screen and (max-width: 425px) {
    .card-valor-total {
        margin: 35px;
    }

    .cards {
        width: 85%;
        justify-content: space-around;
    }
    
    .botao-acao-tabela button {
        padding: 2px;
        margin-left: 10px !important;
        margin-top: 3px;
    }
}
</style>