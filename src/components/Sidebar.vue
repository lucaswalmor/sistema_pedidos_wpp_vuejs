<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidenav">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a class="navbar-brand m-4" href="#"><img src="/img/logo_teste.png" alt=""></a>
                <ul class="mt-5 nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link align-middle px-0">
                            <router-link to="/"><i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span></router-link>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <i class="fa-lg fa-solid fa-user-plus"></i> <span class="ms-1 d-none d-sm-inline">Usuario</span> </a>
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
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Editar / Excluir</span></a>
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
                                <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Editar / Excluir</span></a>
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
            <form @submit.prevent>
                <CadastrarUsuario v-show="cadastroUsuario"></CadastrarUsuario>
                <ListaUsuarios  v-show="listaUsuarios"/>
            </form>
            <div class="container" v-show="cadastroLanche">
                <div class="row m-5">
                    <h2>Cadastro de Lanche</h2>
                </div>
                <form class="row g-3" autocomplete="off" @submit.prevent>
                    <div class="col-md-6">
                        <label for="name_lanche" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="name_lanche">
                    </div>
                    <div class="col-md-6">
                        <label for="preco_lanche" class="form-label">Preco:</label>
                        <input type="text" class="form-control" id="preco_lanche">
                    </div>
                </form>
            </div>
            <div class="container" v-show="cadastroBebida">
                <div class="row m-5">
                    <h2>Cadastro de Bebida</h2>
                </div>
                <form class="row g-3" autocomplete="off" @submit.prevent>
                    <div class="col-md-6">
                        <label for="name_lanche" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="name_lanche">
                    </div>
                    <div class="col-md-6">
                        <label for="preco_lanche" class="form-label">Preco:</label>
                        <input type="text" class="form-control" id="preco_lanche">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CadastrarUsuario from "./usuarios/CadastrarUsuario.vue";
import ListaUsuarios from "./usuarios/ListaUsuarios.vue";

export default {
    name: "Dashboard",
    components: { CadastrarUsuario, ListaUsuarios },
    data() {
        return {
            cadastroUsuario: false,
            listaUsuarios: false,
            cadastroLanche: false,
            cadastroBebida: false,
            dadosUsuario: [],
        };
    },
    methods: {
        cadastrarNovoUsuario() {
            this.cadastroUsuario = true;
            this.cadastroLanche = false;
            this.cadastroBebida = false;
            this.listaUsuarios = false;
        },
        cadastrarNovoLanche() {
            this.cadastroLanche = true;
            this.cadastroUsuario = false;
            this.cadastroBebida = false;
            this.listaUsuarios = false;
        },
        cadastrarNovaBebida() {
            this.cadastroBebida = true;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            this.listaUsuarios = false;
        },
        listarUsuarios() {
            this.listaUsuarios = true;
            this.cadastroBebida = false;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
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
        background-color: #fff;
    }

    label, h2 {
        color: black;
    }
</style>