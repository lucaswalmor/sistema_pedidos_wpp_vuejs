<template>
<div v-show="listaUsuarios">
    <Message :msg="msg" v-show="msg" />
    <table class="table text-center">
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
                <td>
                    <button class="btn btn-primary"><i class="fa-solid fa-user-pen"></i></button>
                    <button @click="deleteUser(usuario.id)" class="btn btn-danger ms-3"><i class="fa-solid fa-user-xmark"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
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
            this.divEditarUsuario = true;
            this.cadastroBebida = false;
            this.cadastroLanche = false;
            this.cadastroUsuario = false;
            // cria um array com os dados do pedido 
            const req = await fetch("http://127.0.0.1:8000/api/usuarios");
            const data = await req.json();
            this.dadosUsuario = data;
        },

        // deletar usuario 
        async deleteUser(id) {
            // requisicao feita para o backend
            const req = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}`, {
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
    },
    mounted() {
        this.editarUsuario();
    }
}
</script>

<style scoped>

    label, h2 {
        color: black;
    }

</style>