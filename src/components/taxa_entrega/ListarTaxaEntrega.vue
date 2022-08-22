<template>
<div v-show="listaTaxa">
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5 d-flex">
                <div class="col-md-6">
                    <h1 class="text-secondary">Editar Taxa de Entrega</h1>
                </div>
                <div class="col-md-5 pt-2">
                    <input type="text" name="filter" id="filter" class="form-control" placeholder="Pesquisar...">
                </div>
            </div>
        </div>
        <table class="table text-center table-striped">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Bairro</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="myTable">
                <tr v-for="taxa in dadosTaxa" :key="taxa">
                    <th>{{taxa.id}}</th>
                    <td>{{taxa.bairro}}</td>
                    <td>{{taxa.preco}}</td>
                    <td class="botao-acao-tabela">
                        <button class="btn btn-primary botao-acao-tabela" @click="editTaxa(taxa.id)"><i class="fa-solid fa-user-pen"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  
</template>

<script>
// script de filtro de tabela
$(document).ready(function(){
  $("#filter").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

export default {
    name: "ListaTaxa",
    data() {
        return {
            dadosTaxa: [],
            msg: ""
        };
    },
    methods: {
        async editarTaxa() {
            const req = await fetch("http://127.0.0.1:8000/api/taxa_entrega");
            // const req = await fetch("https://pedidoparrilha.herokuapp.com/api/taxa_entrega");
            const data = await req.json();
            this.dadosTaxa = data;
        },
        editTaxa(id) {
            this.$router.push({ path: `/editar-usuario/${id}`, params: {id: id}} );
        }
    },
    mounted() {
        this.editarTaxa();
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