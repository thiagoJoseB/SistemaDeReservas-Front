<template>
    <q-page-container style="padding-top: 70px; padding-bottom: 100px; background-color: #202020;">
      <q-card class="card-cadastro">
        <h1 class="q-mt-sm">Locações disponíveis por data</h1>
        <div class="caixa-input">
          <q-input
            v-model="data_criacao"
            outlined
            type="date"
            dense
            class="input"
            label="Data de Criação"
          />
        </div>
  
        <div class="caixa-btn">
          <q-btn 
            class="btn-login"
            label="Buscar por Data"
            @click="buscarPorData"
          />
        </div>
  
        <div class="criar-conta">
          <p @click="voltarIndex">Voltar</p>
        </div>
      </q-card>
  
      <q-card class="card-listagem q-pa-md">
        <q-table
          title="Locações disponíveis por data"
          :rows="clientes"
          :columns="[
            { name: 'id', label: 'ID', align: 'left', field: 'id' },
            { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
            { name: 'tipo', label: 'Tipo', align: 'left', field: 'tipo' },
            { name: 'descricao', label: 'Descrição', align: 'left', field: 'descricao' },
            { name: 'valor_hora', label: 'Valor hora', align: 'left', field: 'valor_hora' },
            { name: 'tempo_minimo', label: 'Tempo mínimo', align: 'left', field: 'tempo_minimo' },
            { name: 'tempo_maximo', label: 'Tempo máximo', align: 'left', field: 'tempo_maximo' },
            { name: 'data_criacao', label: 'Data de Criação', align: 'left', field: 'data_criacao' }
          ]"
           row-key="id"
            flat
            bordered
            no-data-label="Nenhum Resultado encontrado para a data selecionada."
        />
      </q-card>
    </q-page-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  const data_criacao = ref('')
  const clientes = ref([])
  
  function voltarIndex() {
    router.push('/')
  }
  
  async function buscarPorData() {

    if (data_criacao.value == "") {
        alert('Campo de busca não foi preenchido')
      return
        
    }
  try {
    const response = await axios.get(`http://localhost:3000/locacoesDisponiveis/?data=${data_criacao.value}`)
    clientes.value = response.data || []
  } catch (error) {
    console.error('Erro ao buscar clientes por data:', error)
  }
}


  
  </script>
  