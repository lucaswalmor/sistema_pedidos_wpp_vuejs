<template>
    
    <div class="area"></div>
    <nav class="main-menu">
        <ul>
            <li>
                <a href="http://justinfarrow.com">
                    <i class="fa fa-home fa-2x"></i>
                    <span class="nav-text">
                        Dashboard
                    </span>
                </a>

            </li>
            <li class="has-subnav">
                <a href="#">
                    <i class="fa fa-laptop fa-2x"></i>
                    <span class="nav-text">
                        Stars Components
                    </span>
                </a>

            </li>
            <li class="has-subnav">
                <a href="#">
                    <i class="fa fa-list fa-2x"></i>
                    <span class="nav-text">
                        Forms
                    </span>
                </a>

            </li>
            <li class="has-subnav">
                <a href="#">
                    <i class="fa fa-folder-open fa-2x"></i>
                    <span class="nav-text">
                        Pages
                    </span>
                </a>

            </li>
            <li>
                <a href="#">
                    <i class="fa fa-bar-chart-o fa-2x"></i>
                    <span class="nav-text">
                        Graphs and Statistics
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-font fa-2x"></i>
                    <span class="nav-text">
                        Quotes
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-table fa-2x"></i>
                    <span class="nav-text">
                        Tables
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-map-marker fa-2x"></i>
                    <span class="nav-text">
                        Maps
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-info fa-2x"></i>
                    <span class="nav-text">
                        Documentation
                    </span>
                </a>
            </li>
        </ul>

        <ul class="logout">
            <li>
                <a href="#">
                    <i class="fa fa-power-off fa-2x"></i>
                    <span class="nav-text">
                        Logout
                    </span>
                </a>
            </li>
        </ul>
    </nav>
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
                                <td>
                                    <button class="btn btn-primary" @click="verPedido(pedido.id)"><i class="fa-solid fa-eye text-light"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <form @submit.prevent class="div-form-cadastro">
            <CadastrarUsuario v-show="cadastroUsuario" />
            <CadastrarLanche v-show="cadastroLanche"/>
            <CadastrarBebida v-show="cadastroBebida"/>
            <ListaUsuarios v-show="listaUsuarios"/>
            <ListarLanches v-show="listaLanches"/>
            <ListarBebidas v-show="listaBebidas"/>
        </form>
    </div>
</template>

<script>
import CadastrarUsuario from "./usuarios/CadastrarUsuario.vue";
import ListaUsuarios from "./usuarios/ListaUsuarios.vue";
import CadastrarLanche from "./lanches/CadastrarLanche.vue";
import ListarLanches from "./lanches/ListarLanches.vue";
import ListarBebidas from "./bebidas/ListarBebidas.vue";
import CadastrarBebida from "./bebidas/CadastrarBebida.vue";

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
            somaValorTotal: ''
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
        // carregar lista de usuarios
        async listarPedidos() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/pedidos");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/pedidos");
            const data = await req.json();
            this.pedidos = data[0].pedidos;
            this.somaValorTotal = data[0].somas;
            this.totalPedidos = this.pedidos.length;
            
        },
        verPedido(id) {
            this.$router.push({ path: `/ver-pedido/${id}`, params: {id: id}} );            
        }
    },
    mounted() {
        this.listarPedidos();
    }
}
</script>

<style scoped>
.body-dashboard {
    padding-left: 60px;
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

@font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 300;
    src: local('Titillium WebLight'), local('TitilliumWeb-Light'), url(http://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff) format('woff');
}

@media screen and (max-width: 425px) {
}
</style>