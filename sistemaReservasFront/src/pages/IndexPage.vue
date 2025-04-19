<template>
  <q-page class="flex flex-cente tela-index">
    <q-card class="card-index">
      <q-toolbar-title class="titulo-index">
         Bem Vindo
        </q-toolbar-title>
        <div class="caixa-btn">
          <q-btn @click="criarConta"
            class="btn-opcoes"
            label="Cadastro e Consulta Clientes"
          />
        </div>

        <div class="caixa-btn">
          <q-btn @click="cadastrarLocacao"
            class="btn-opcoes"
            label="Cadastro e Consulta Tipo Locação"
          />
        </div>

        <div class="caixa-btn">
          <q-btn @click="criarConta"
            class="btn-opcoes"
            label="Realizar e Visualizar Reservas"
          />
        </div>

        <div class="caixa-btn">
          <q-btn @click="listarLocacoes"
            class="btn-opcoes"
            label="Busca de Locações Disponiveis por data"
          />
        </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function criarConta () {
  router.push('/CadastroCliente')
}

function listarLocacoes () {
  router.push('/ListarLocacoes')
}

function cadastrarLocacao() {
  router.push('/CadastroLocacoes')
}

</script>