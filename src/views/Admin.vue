<template>

    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-2"></div>
            <div class="col-lg-6 col-md-8 login-box">
                <div class="col-lg-12 login-key row justify-content-center mb-5 mt-3">
                  <img src="/img/logo_teste.png" alt="">
                </div>
                <div class="col-lg-12">
                    <h2>ADMIN PAINEL</h2>
                </div>

                <Message :msg="msg" v-show="msg"/>

                <div class="col-lg-12 login-form">
                        <form @submit.prevent="createUser" autocomplete="off" v-show="novoCadastro">
                            <div class="form-group">
                                <label class="form-control-label">Email</label>
                                <input type="email" class="form-control" name="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label">Senha</label>
                                <input type="password" class="form-control" name="password" v-model="password">
                            </div>
                            <div class="form-group">
                                <label class="form-control-label">Nome</label>
                                <input type="name" class="form-control" name="name" v-model="name">
                            </div>

                            <div class="col-lg-12 loginbttm">
                                <div class="col-lg-6 login-btm login-text">
                                    <!-- Error Message -->
                                </div>
                                <div class="col-lg-12 text-center login-btm login-button">
                                    <button @click="fazerLogin" type="submit" class="btn btn-outline-primary">LOGIN</button>
                                </div>
                            </div>
                        </form>

                        <form @submit.prevent="login" autocomplete="off">
                            <div class="col-12 d-flex align-items-center flex-column">
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">Email</label>
                                    <input type="email" class="form-control" name="email" v-model="email">
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="form-control-label">Senha</label>
                                    <input type="password" class="form-control" name="password" v-model="password">
                                </div>
                            </div>

                            <div class="col-lg-12 loginbttm">
                                <div class="col-lg-6 login-btm login-text">
                                    <!-- Error Message -->
                                </div>
                                <div class="col-lg-12 text-center login-btm login-button">
                                    <button @click="fazerLogin" type="submit" class="btn btn-outline-primary">LOGIN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                <div class="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "../components/Message.vue";

export default {
    name: "Admin",
    components: { Message },
    data() {
        return {
            name: null,
            password: null,
            email: null,
            novoCadastro: false,
            msg: ""
        };
    },
    methods: {
        fazerLogin() {
            console.log("entrou");
        },
        async createUser() {
            // cria um array com os dados do pedido 
            const data = {
                name: this.name,
                password: this.password,
                email: this.email
            };
            console.log("DATA = " + data);
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
            console.log("DATAJSON = " + dataJson);
            const req = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-Token": this.csrf },
                body: dataJson
            });
            console.log("REQ = " + dataJson);
            // traz a resposta dos dados criado
            const res = await req.json();
            console.log("RES = " + res);
        },
        async login() {
            // cria um array com os dados do pedido 
            const data = {
                password: this.password,
                email: this.email
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
            // const req = await fetch("http://127.0.0.1:8000/api/login", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-Token": this.csrf },
                body: dataJson
            });
            // traz a resposta dos dados criado
            const res = await req.json();
            // verifica se o usuario é válido, se for faz o login se não for retorna mensagem de erro 
            if (res.error == "UnAuthorised Access") {
                this.msg = 'Usuário ou senha inválido!'
            }
            else {
                this.$router.push({ path: "/dashboard" });
            }
        }
    }
}
</script>

<style scoped>
body {
    background: #222D32;
    font-family: 'Roboto', sans-serif;
}

.login-box {
    margin-top: 91px;
    border-radius: 20px;
    height: auto;
    background: #1A2226;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.login-title {
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    color: #ECF0F5;
}

.login-form {
    margin-top: 25px;
    text-align: left;
}

input[type=text] {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
}

input[type=password] {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: #ECF0F5;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0DB8DE;
    outline: 0;
    background-color: #1A2226;
    color: #ECF0F5;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}

label {
    margin-bottom: 0px;
}

.form-control-label {
    font-size: 10px;
    color: #6C6C6C;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    border-radius: 0px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.btn-outline-primary:hover {
    background-color: #333;
    right: 0px;
}

.login-btm {
    float: left;
}

.login-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}

.login-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.loginbttm {
    padding: 0px;
}

img {
  width: 150px;
}

</style>