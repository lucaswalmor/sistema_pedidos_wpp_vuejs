<template>
<div v-show="listaUsuarios">
    <div class="container">
        <Message :msg="msg" v-show="msg" />
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Editar Usuário</h1>
            </div>
        </div>
        <table class="table text-center table-striped">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in dadosUsuario" :key="usuario">
                    <th>{{usuario.id}}</th>
                    <td>{{usuario.name}}</td>
                    <td>{{usuario.email}}</td>
                    <td class="botao-acao-tabela">
                        <button class="btn btn-primary botao-acao-tabela" @click="editUsuario(usuario.id)"><i class="fa-solid fa-user-pen"></i></button>
                        <button @click="deleteUser(usuario.id)" class="btn btn-danger ms-3"><i class="fa-solid fa-user-xmark"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</template>

<script>
import Message from '../Message.vue';
export default {
    name: "ListaUsuarios",
    components: { Message },
    data() {
        return {
            dadosUsuario: [],
            msg: ""
        };
    },
    methods: {
        // carregar lista de usuarios
        async editarUsuario() {
            
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/usuarios");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/usuarios");
            const data = await req.json();
            this.dadosUsuario = data;
        },

        // deletar usuario 
        async deleteUser(id) {
            // requisicao feita para o backend
            const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/usuarios/${id}`, {
                method: "DELETE"
            });
            const res = await req.json();

            // msg de pedido deletado
            this.msg = `Usuário Nº ${id} deletado com sucesso`;
            setTimeout(() => {
                this.msg = "";
            }, 3000);

            this.$router.go(this.$router.currentRoute)
        },
        editUsuario(id) {
            this.$router.push({ path: `/editar-usuario/${id}`, params: {id: id}} );
        }
    },
    mounted() {
        this.editarUsuario();
    }
}
</script>

<style scoped>
    .botao-acao-tabela button {
        padding: 2px;
        margin-left: 2px !important;
        margin-top: 3px;
    }

    label, h2 {
        color: black;
    }

</style>