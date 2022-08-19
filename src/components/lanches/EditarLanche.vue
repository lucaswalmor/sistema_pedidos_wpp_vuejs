<template>
    <div class="container">
        <Message :msg="msg" v-show="msg"/>
        <div class="row m-5">
            <h2>Editar Lanche</h2>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="dadosLanche.nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="number" class="form-control" id="preco" v-model="dadosLanche.preco">
            </div>
            <div class="col-md-12">
                <input type="submit" class="form-control btn btn-secondary" @click="updateLanche">
            </div>
        </form>
    </div>    
</template>

<script>
import Message from '../Message.vue';
export default {
    name: "EditarLanche",
    components: { Message },
    data() {
        return {
            nome: null,
            preco: null,
            msg: "",
            dadosLanche: []
        };
    },
    methods: {
        async updateLanche() {
            var id = this.$route.params.id;
            console.log(id)
            const data = {
                nome: this.dadosLanche.nome,
                preco: this.dadosLanche.preco,
            };

            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/lanches/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/usuarios/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Lanche criado com sucesso";
                    this.nome = "";
                    this.preco = "";
                }

                this.$router.push({ path: '/dashboard'} );

            }

        },
        // carregar lista de usuarios
        async listarLanche() {
            var id = this.$route.params.id;
            // cria um array com os dados do pedido 
            const req = await fetch(`http://127.0.0.1:8000/api/lanches/${id}`);
            const data = await req.json();
            this.dadosLanche = data;
            console.log(this.dadosLanche)
        },
    },
    mounted() {
        this.listarLanche();
    }
}
</script>

<style>

</style>