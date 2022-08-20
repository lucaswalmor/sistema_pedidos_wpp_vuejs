<template>
    <div class="container" v-show="cadastroLanche">
        <Message :msg="msg" v-show="msg"/>

        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Lanche</h1>
            </div>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="number" class="form-control" id="preco" v-model="preco">
            </div>
            <div class="col-md-12">
                <input type="submit" class="form-control btn btn-secondary" @click="createLanche">
            </div>
        </form>
    </div>  
</template>

<script>
import Message from '../Message.vue';
export default {
    name: "CadastarLanche",
    data() {
        return {
            nome: null,
            preco: null,
            msg: ''
        };
    },
    methods: {
        async createLanche() {
            // cria um array com os dados do pedido 
            const data = {
                nome: this.nome,
                preco: this.preco,
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);

            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha todos os campos');
            } else {
                // const req = await fetch("http://127.0.0.1:8000/api/lanches", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "X-CSRF-Token": this.csrf },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Lanche criado com sucesso";
                    this.nome = "";
                    this.preco = "";
                }
                setTimeout(() => {
                    this.msg = "";
                }, 2000);
            }
        }
    },
    components: { Message }
}
</script>

<style scoped>
    label, h2 {
        color: black;
    }

</style>