<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidenav">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a class="navbar-brand m-4" href="#"><img src="/img/logo_teste.png" alt=""></a>
                <ul class="mt-5 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                            <router-link to="/"><i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span></router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-0" @click="dashboardView"><i class="fa-lg fa-solid fa-chart-line"></i> <span class="d-none d-sm-inline">Dashboard</span></a>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fa-lg fa-solid fa-user-plus"></i> <span class="ms-1 d-none d-sm-inline">Usuario</span> 
                        </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0" @click="cadastrarNovoUsuario"> <span class="d-none d-sm-inline">Cadastrar</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0" @click="listarUsuarios"> <span class="d-none d-sm-inline">Editar / Excluir</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu4" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <i class="fa-lg fa-solid fa-burger"></i> <span class="ms-1 d-none d-sm-inline">Lanches</span> </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0" @click="cadastrarNovoLanche"> <span class="d-none d-sm-inline">Cadastrar</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0" @click="listarLanches"> <span class="d-none d-sm-inline">Editar / Excluir</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <i class="fa-lg fa-solid fa-martini-glass"></i> <span class="ms-1 d-none d-sm-inline">Bebidas</span> </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0" @click="cadastrarNovaBebida"> <span class="d-none d-sm-inline">Cadastrar</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0" @click="listarBebidas"> <span class="d-none d-sm-inline">Editar / Excluir</span></a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <hr>
                <div class="dropdown pb-4">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">          
                            <router-link class="nav-link" to="/"><i class="fs-4 bi bi-power"></i><span class="ms-1 d-none d-sm-inline">Logout</span></router-link>
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
                        <table class="table text-center table-striped">
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
    </div>
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

<style  scoped>
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

    #menu li span:hover {
        color: #666;
    }

    i {

        color: #f9a529;
    }

    span {
        color: #fff;
        transition: .4s;
    }

    img {
        width: 100px;
        border-radius: 50%;
    }

    a {
        text-decoration: none;
    }

    .body-dashboard {
        background-color: #e5e3e3;
    }

    label, h2, .text-card {
        color: black;
    }

    @media screen and (max-width: 768px) {
        .div-icon-dashboard i {
            font-size: 32px;
            padding-top: 25px;
        }

        .div-table {
            padding-right: 20px;
        }

        .div-form-cadastro {
            padding-right: 20px;
        }

        .div-form-cadastro {
            padding-right: 20px;
        }

        .div-form-cadastro {
            padding-right: 20px;
        }
    }

    @media screen and (max-width: 415px) {
        img {
            display: none;
        }

        .div-icon-dashboard i {
            font-size: 32px;
            padding-top: 25px;
        }

        .div-table {
            padding-right: 20px;
        }

        .div-form-cadastro {
            padding-right: 20px;
        }

        .div-form-cadastro {
            padding-right: 20px;
        }

        .div-form-cadastro {
            padding-right: 20px;
        }
    }
</style>