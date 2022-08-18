<template>
    <div class="container" v-show="cadastroUsuario">

        <Message :msg="msg" v-show="msg" />

        <div class="row m-5">
            <h2>Cadastro de Usuário</h2>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="name" v-model="name">
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" v-model="email">
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4" v-model="password">
            </div>
            <div class="col-md-12">
                <input type="submit" class="form-control" @click="createUser">
            </div>
        </form>
    </div>
</template>

<script>
import Message from '../Message.vue';

export default {
    name: "CadastrarUsuario",
    components: { Message },    
    data() {
        return {
            name: null,
            email: null,
            password: null,
            msg: ""
        };
    },
    methods: {
        async createUser() {
            // cria um array com os dados do pedido 
            const data = {
                name: this.name,
                password: this.password,
                email: this.email
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
            const req = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-Token": this.csrf },
                body: dataJson
            });

            // traz a resposta dos dados criado
            const res = await req.json();
            if (res.message === "User successfully register.") {
                this.msg = "Usuario criado com sucesso"
                this.name = "";
                this.email = "";
                this.password = "";
            }

            setTimeout(() => {
                this.msg = ''
            }, 2000);
        }
    },
}
</script>

<style scoped>
    label, h2 {
        color: black;
    }
</style>