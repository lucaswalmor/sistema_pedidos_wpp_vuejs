<template>
    <Sidenav />
    <div class="container">
        <Message :msg="msg" v-show="msg" />
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <div class="col-md-6">
                    <h1 class="text-secondary">Editar Lanche</h1>
                </div>
                <div class="col-md-5 pt-2">
                    <input type="text" name="filtro_lanche" id="filtro_lanche" class="form-control" placeholder="Pesquisar...">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 p-3 text-end">
                <button class="btn btn-dark text-warning" @click="cadastrarLanche">
                    Cadastrar Lanche
                </button>
            </div>
        </div>
        <table class="table text-center table-striped">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela_lanches">
                <tr v-for="lanche in dadosLanches" :key="lanche">
                    <th>{{lanche.id}}</th>
                    <td>{{lanche.nome}}</td>
                    <td>R$ {{lanche.preco}}</td>
                    <td class="botao-acao-tabela">
                        <button class="btn btn-primary" @click="editarLanche(lanche.id)"><i class="fa-solid fa-user-pen"></i></button>
                        <button @click="deletarLanche(lanche.id)" class="btn btn-danger"><i class="fa-solid fa-user-xmark"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// script de filtro de tabela
$(document).ready(function(){
  $("#filtro_lanche").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tabela_lanches tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
import Message from '../message/Message.vue';
import Sidenav from '../conteudo/Sidenav.vue';
export default {
    name: "ListaLanches",
    components: { Message, Sidenav },
    data() {
        return {
            dadosLanches: [],
            msg: "",
        };
    },
    methods: {
        // carregar lista de usuarios
        async listarLanche() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/lanches");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches");
            const data = await req.json();
            this.dadosLanches = data;
        },
        // deletar usuario 
        async deletarLanche(id) {
            if (confirm(`Você realmente deseja deletar o pedido Nº ${id} `)) {
                // const req = await fetch(`http://127.0.0.1:8000/api/lanches/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/lanches/${id}`, {
                    method: "DELETE"
                });
                const res = await req.json();

                // msg de pedido deletado
                this.msg = `Lanche Nº ${id} deletado com sucesso`;

                setTimeout(() => {
                    this.msg = "";
                    location.reload();
                }, 1500);
            }
        },

        editarLanche(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/editar-lanche/${token}/${id}`, params: {id: id, token: token}} );
        },
        cadastrarLanche() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-lanche/${token}`, params: {token: token } });
        }
    },
    mounted() {
        this.listarLanche();
    }
}
</script>

<style scoped>

    .botao-acao-tabela button {
        margin-left: 10px !important;
    }

    label, h2 {
        color: black;
    }

    @media screen and (max-width: 425px ) {
        .botao-acao-tabela button {
            padding: 2px;
            margin-left: 2px !important;
            margin-top: 3px;
        }
    }

</style>