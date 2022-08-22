<template>
    <div class="container" v-show="cadastroLanche">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Lanche</h1>
            </div>
        </div>
        <!-- <form class="row g-3" autocomplete="off" @submit.prevent="createLanche" id="formulario"> -->
        <form class="row g-3" autocomplete="off" @submit.prevent id="formulario">
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" name="nome" id="nome" v-model="nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" name="preco" id="preco" placeholder="00.00" min="0" v-model="preco">
            </div>
            <!-- <div class="col-md-6">
                <label for="foto" class="form-label">foto</label>
                <input type="file" class="form-control" id="foto" name="foto" @change="upload($event)">
            </div>   -->
            <div class="col-md-12">
                <!-- <input type="submit" class="form-control btn btn-secondary" > -->
                <input type="submit" class="form-control btn btn-secondary" @click="createLanche">
            </div>
        </form>
        <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00", sempre colocar os valores decimais</small></p>
    </div>  
</template>

<script>
export default {
    name: "CadastarLanche",
    data() {
        return {
            nome: null,
            preco: null,
            foto: [],
        };
    },
    methods: {
        async createLanche() {
            // cria um array com os dados do pedido 
            const data = {
                nome: this.nome,
                preco: 'R$ ' + this.preco
            };

            // // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);

            // const form = document.querySelector('#formulario');
            // const formData = new FormData(form);
            // const values = [...formData.entries()];
                
            if(this.nome === null || this.preco === null) {
                alert('Porfavor preencha todos os campos');
            } else {
                // const req = await fetch("http://127.0.0.1:8000/api/lanches", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: dataJson
                });

                if (req.status === 200) {
                    this.nome = "";
                    this.preco = "";
                    this.$router.go(this.$router.currentRoute)
                }

                setTimeout(() => {
                    this.msg = "";
                }, 2000);
            }
        },
        upload(event){
            let file = event.target.files[0];
            this.foto = file
        }
    }
}
</script>

<style scoped>
    label, h2 {
        color: black;
    }

</style>