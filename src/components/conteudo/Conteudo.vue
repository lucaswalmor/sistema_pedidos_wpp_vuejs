<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <span id="data-hora"></span>
            </div>
        </nav>
    </div>
    <div class="sidenav">
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <img src="/img/logo_teste.png" alt="" class="logo">
                <button type="button" class="btn-close text-reset text-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="row text-center text-light">
                    <h2>Nome cliente</h2>
                </div>
                <ul class="mt-5 nav flex-column" id="menu">
                    <li class="nav-item">
                        <router-link to="/" class="col-md-12 d-flex nav-link px-0">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-shop"></i>
                            </div>
                            <div class="col-md-6">
                                <span>
                                    Pedidos
                                </span>
                            </div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="col-md-12 d-flex nav-link px-0" @click="dashboardView">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-gauge"></i> 
                            </div>
                            <div class="col-md-6">
                            <span>
                                Dashboard
                            </span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse"  class="col-md-12 d-flex nav-link px-0">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-user-plus"></i>
                            </div>
                            <div class="col-md-6">
                                <span>
                                    Usuario
                                </span>
                            </div>
                        </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100 ms-4">
                                <a href="#" class="nav-link px-0" @click="cadastrarNovoUsuario"> Cadastrar</a>
                            </li>
                            <li class="ms-4">
                                <a href="#" class="nav-link px-0" @click="listarUsuarios"> Editar / Excluir</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu4" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <i class="fa-lg fa-solid fa-burger"></i> Lanches </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                            <li class="w-100 ms-4">
                                <a href="#" class="nav-link px-0" @click="cadastrarNovoLanche">Cadastrar</a>
                            </li>
                            <li class=" ms-4">
                                <a href="#" class="nav-link px-0" @click="listarLanches">Editar / Excluir</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <i class="fa-lg fa-solid fa-martini-glass"></i> Bebidas </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100 ms-4">
                                <a href="#" class="nav-link px-0" @click="cadastrarNovaBebida">Cadastrar</a>
                            </li>
                            <li class=" ms-4">
                                <a href="#" class="nav-link px-0" @click="listarBebidas">Editar / Excluir</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col py-3 body-dashboard">
        <div class="dashboard" v-show="dashboard">
            <div class="container">
                <div class="row">
                    <div class="titulo col-md-12 p-5">
                        <h1 class="text-secondary">Dashboard</h1>
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
                            <div><h6>Valor Total</h6></div>
                            <div><h1>R$ {{somaValorTotal}}</h1></div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 div-table">
                    <Message :msg="msg" v-show="msg" />
                    <table class="table text-center table-striped table-responsive">
                        <thead class="table-dark">
                            <tr>
                                <th>Nº</th>
                                <th>Nome Cliente</th>
                                <th>Telefone</th>
                                <th>Forma Pag</th>
                                <th>Total</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pedido in pedidos" :key="pedido.id">
                                <th>{{pedido.id}}</th>
                                <td>{{pedido.nome_cliente}}</td>
                                <td>{{pedido.telefone}}</td>
                                <td>{{pedido.forma_pagamento}}</td>
                                <td>R$ {{pedido.valor_total}}</td>
                                <td class="botao-acao-tabela">
                                    <button class="btn btn-dark" @click="verPedido(pedido.id)"><i class="fa-solid fa-eye text-light"></i></button>
                                    <button class="btn btn-danger" @click="cancelarPedido(pedido.id)"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <form @submit.prevent class="div-form-cadastro">
            <CadastrarUsuario :token_storage="token_storage" v-show="cadastroUsuario" />
            <CadastrarLanche :token_storage="token_storage" v-show="cadastroLanche"/>
            <CadastrarBebida :token_storage="token_storage" v-show="cadastroBebida"/>
            <ListaUsuarios :token_storage="token_storage" v-show="listaUsuarios"/>
            <ListarLanches :token_storage="token_storage" v-show="listaLanches"/>
            <ListarBebidas :token_storage="token_storage" v-show="listaBebidas"/>
        </form>
    </div>
</template>

<script>
import CadastrarUsuario from "../usuarios/CadastrarUsuario.vue";
import ListaUsuarios from "../usuarios/ListaUsuarios.vue";
import CadastrarLanche from "../lanches/CadastrarLanche.vue";
import ListarLanches from "../lanches/ListarLanches.vue";
import ListarBebidas from "../bebidas/ListarBebidas.vue";
import CadastrarBebida from "../bebidas/CadastrarBebida.vue";

export default {
    name: "Dashboard",
    components: { CadastrarUsuario, ListaUsuarios, CadastrarLanche, ListarLanches, ListarBebidas, CadastrarBebida },
    data() {
        return {
            cadastroUsuario: false,
            listaUsuarios: false,
            listaLanches: false,
            cadastroLanche: false,
            cadastroBebida: false,
            dashboard: true,
            dadosUsuario: [],
            pedidos: [],
            totalPedidos: '',
            somaValorTotal: '',
            dataHora: '',
            token_storage: ''
        };
    },
    methods: {
        cadastrarNovoUsuario() {
            this.cadastroUsuario = true;
            this.cadastroLanche = false;
            this.cadastroBebida = false;
            this.listaUsuarios = false;
            this.listaLanches = false;
            this.listaBebidas = false;
            this.dashboard = false;
        },
        cadastrarNovoLanche() {
            this.cadastroLanche = true;
            this.cadastroUsuario = false;
            this.cadastroBebida = false;
            this.listaUsuarios = false;
            this.listaLanches = false;
            this.listaBebidas = false;
            this.dashboard = false;
        },
        cadastrarNovaBebida() {
            this.cadastroBebida = true;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            this.listaUsuarios = false;
            this.listaLanches = false;
            this.listaBebidas = false;
            this.dashboard = false;
        },
        dashboardView() {
            this.dashboard = true;
            this.cadastroBebida = false;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            this.listaUsuarios = false;
            this.listaLanches = false;
            this.listaBebidas = false;
        },
        listarUsuarios() {
            this.listaUsuarios = true;
            this.cadastroBebida = false;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            this.listaLanches = false;
            this.listaBebidas = false;
            this.dashboard = false;
        },
        listarLanches() {
            this.listaLanches = true;
            this.listaUsuarios = false;
            this.cadastroBebida = false;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            this.listaBebidas = false;
            this.dashboard = false;
        },
        listarBebidas() {
            this.listaBebidas = true;
            this.listaLanches = false;
            this.listaUsuarios = false;
            this.cadastroBebida = false;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            this.dashboard = false;
        },
        async listarPedidos() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/pedidos");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/pedidos");
            const data = await req.json();
            this.pedidos = data[0].pedidos;
            this.somaValorTotal = data[0].somas;
            this.totalPedidos = this.pedidos.length;
            
        },
        async cancelarPedido(id) {
            if (confirm(`Você realmente deseja deletar o pedido Nº ${id} `)) {
                // const req = await fetch(`http://127.0.0.1:8000/api/pedidos/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/pedidos/${id}`, {
                    method: "DELETE"
                });

                const res = await req.json();
                // msg de pedido deletado
                this.msg = `bebida Nº ${id} deletado com sucesso`;

                setTimeout(() => {
                    this.msg = "";
                }, 3000);

                this.$router.go(this.$router.currentRoute)
            }
        },
        verPedido(id) {
            this.$router.push({ path: `/ver-pedido/${id}`, params: {id: id}} );            
        },
        horas() {
            const zeroFill = n => {
                return ('0' + n).slice(-2);
            }

            // Cria intervalo
            const interval = setInterval(() => {
                // Pega o horário atual
                const now = new Date();

                // Formata a data conforme dd/mm/aaaa hh:ii:ss
                const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
                // Exibe na tela usando a div#data-hora
                document.getElementById('data-hora').innerHTML = dataHora;
            }, 1000);
        },
        token() {
            this.token_storage = this.$route.params.token
        }
    },
    mounted() {
        this.token();
        this.horas();
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