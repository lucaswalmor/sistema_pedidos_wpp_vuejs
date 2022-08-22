<template>
<div v-show="listaLanches">
    <div class="container">

        <Message :msg="msg" v-show="msg" />

        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Editar Lanche</h1>
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
            <tbody>
                <tr v-for="lanche in dadosLanches" :key="lanche">
                    <th>{{lanche.id}}</th>
                    <td>{{lanche.nome}}</td>
                    <td>{{lanche.preco}}</td>
                    <td class="botao-acao-tabela">
                        <button class="btn btn-primary" @click="editarLanche(lanche.id)"><i class="fa-solid fa-user-pen"></i></button>
                        <button @click="deletarLanche(lanche.id)" class="btn btn-danger"><i class="fa-solid fa-user-xmark"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</template>

<script>
import Message from '../message/Message.vue';
export default {
    name: "ListaLanches",
    components: { Message },
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
                }, 3000);

                this.$router.go(this.$router.currentRoute)
            }
        },
        editarLanche(id) {
            this.$router.push({ path: `/editar-lanche/${id}`, params: {id: id}} );
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