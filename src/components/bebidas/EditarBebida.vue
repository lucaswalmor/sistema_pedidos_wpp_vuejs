<template>
    <div class="container">
        <Message :msg="msg" v-show="msg"/>
        <div class="row p-5">
            <h2>Editar Bebida</h2>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="dadosBebidas.nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="number" class="form-control" id="preco" v-model="dadosBebidas.preco">
            </div>
            <div class="col-md-12">
                <input type="submit" class="form-control btn btn-secondary" @click="updateBebida">
            </div>
        </form>
    </div>    
</template>

<script>
import Message from '../message/Message.vue';
export default {
    name: "EditarBebida",
    components: { Message },
    data() {
        return {
            nome: null,
            preco: null,
            msg: "",
            dadosBebidas: []
        };
    },
    methods: {
        async updateBebida() {
            var id = this.$route.params.id;

            const data = {
                nome: this.dadosBebidas.nome,
                preco: this.dadosBebidas.preco,
            };

            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/bebidas/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Bebida criado com sucesso";
                    this.nome = "";
                    this.preco = "";
                }

                this.$router.push({ path: '/dashboard'} );

            }

        },
        // carregar lista de usuarios
        async listarBebida() {
            var id = this.$route.params.id;
            // cria um array com os dados do pedido 
            // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`);
            const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/bebidas/${id}`);
            const data = await req.json();
            this.dadosBebidas = data;
        },
    },
    mounted() {
        this.listarBebida();
    }
}
</script>

<style>

</style>