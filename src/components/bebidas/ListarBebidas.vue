<template>
<div v-show="listaBebidas">
    <Message :msg="msg" v-show="msg" />
    <div class="row col-12 m-5">
        <h2>Bebidas</h2>
    </div>
    <table class="table text-center">
        <thead class="table-dark">
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="bebida in dadosBebidas" :key="bebida">
                <th>{{bebida.id}}</th>
                <td>{{bebida.nome}}</td>
                <td>{{bebida.preco}}</td>
                <td>
                    <button class="btn btn-primary" @click="editarBebida(bebida.id)"><i class="fa-solid fa-user-pen"></i></button>
                    <button @click="deletarBebida(bebida.id)" class="btn btn-danger ms-3"><i class="fa-solid fa-user-xmark"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
</div>



</template>

<script>
import Message from '../Message.vue';
export default {
    name: "ListarBebidas",
    components: { Message },
    data() {
        return {
            dadosBebidas: [],
            msg: "",
            updateBebidaIcon: false,
            acoes: true
        };
    },
    methods: {
        // carregar lista de usuarios
        async listarBebida() {
            
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/bebidas");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/bebidas");
            const data = await req.json();
            this.dadosBebidas = data;
        },
        // deletar usuario 
        async deletarBebida(id) {
            // requisicao feita para o backend
            // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`, {
            const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/bebidas/${id}`, {
                method: "DELETE"
            });
            const res = await req.json();

            // msg de pedido deletado
            this.msg = `bebida Nº ${id} deletado com sucesso`;
            setTimeout(() => {
                this.msg = "";
            }, 3000);

            this.$router.go(this.$router.currentRoute)
        },
        editarBebida(id) {
            this.$router.push({ path: `/editar-bebida/${id}`, params: {id: id}} );
        }
    },
    mounted() {
        this.listarBebida();
    }
}
</script>

<style scoped>

    label, h2 {
        color: black;
    }

</style>