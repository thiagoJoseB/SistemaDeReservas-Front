<template>
    <q-page-container style="padding-top: 70px; padding-bottom: 100px; background-color: #202020;">
      <q-card class="card-cadastro" style="height: 80vh;">
        <h1 class="q-mt-sm">Cadastro de Reserva</h1>
        <form @submit.prevent="cadastrar">
          <div class="caixa-input" style="margin-top: -25px;">
            <q-select
              v-model="cliente_id"
              :options="clientes"
              option-label="nome"
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              class="input"
              label="Selecione o Cliente"
            />
          </div>
  
          <div class="caixa-input">
            <q-select
              v-model="locacao_id"
              :options="locacoes"
              option-label="nome"
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              class="input"
              label="Selecione a Locação"
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="data_inicio"
              outlined
              type="datetime-local"
              dense
              class="input"
              label="Data de Início"
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="data_fim"
              outlined
              type="datetime-local"
              dense
              class="input"
              label="Data de Fim"
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="valor_final"
              outlined
              type="number"
              dense
              class="input"
              label="Valor Final"
              prefix="R$"
              step="0.01"
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="situacao"
              outlined
              type="text"
              dense
              class="input"
              label="Situação"
            />
          </div>
  
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
            <q-btn class="btn-login" label="Cadastrar" type="submit" />
          </div>
  
          <div class="criar-conta">
            <p @click="voltarIndex">Voltar</p>
          </div>
        </form>
      </q-card>
  
      <!-- CARD DE LISTAGEM -->
      <q-card class="card-listagem q-pa-md">
        <q-table
          title="Lista de Reservas"
          :rows="reservas"
          :columns="[
            { name: 'id', label: 'ID', align: 'left', field: 'id' },
            { name: 'cliente_id', label: 'Cliente ID', align: 'left', field: 'cliente_id' },
            { name: 'locacao_id', label: 'Locação ID', align: 'left', field: 'locacao_id' },
            { name: 'data_inicio', label: 'Data Início', align: 'left', field: 'data_inicio' },
            { name: 'data_fim', label: 'Data Fim', align: 'left', field: 'data_fim' },
            { name: 'valor_final', label: 'Valor Final', align: 'left', field: 'valor_final' },
            { name: 'situacao', label: 'Situação', align: 'left', field: 'situacao' },
            { name: 'data_criacao', label: 'Data de Criação', align: 'left', field: 'data_criacao' }
          ]"
          row-key="id"
          flat
          bordered
          no-data-label="Nenhuma reserva encontrada"
        />
      </q-card>
    </q-page-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  

  const cliente_id = ref('')
  const locacao_id = ref('')
  const data_inicio = ref('')
  const data_fim = ref('')
  const valor_final = ref('')
  const situacao = ref('')
  const data_criacao = ref('')
  const reservas = ref([])  
  

  const clientes = ref([])
  const locacoes = ref([])
  

  const buscarDados = async (endpoint, store) => {
    try {
      const response = await axios.get(`http://localhost:3000/${endpoint}`)
      store.value = response.data.data || response.data 
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error)
      alert(`Erro ao buscar ${endpoint}.`)
    }
  }
  
  onMounted(() => {
    buscarDados('listarClientes', clientes)
    buscarDados('listarTipoLocacao', locacoes)
    buscarReservas()
  })
  

  const buscarReservas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/listarReservas')
      reservas.value = response.data.data || response.data
    } catch (error) {
      console.error('Erro ao buscar reservas:', error)
      alert('Erro ao buscar reservas.')
    }
  }
  

  function voltarIndex() {
    router.push('/')
  }
  

  async function cadastrar() {
    if (
      cliente_id.value === '' ||
      locacao_id.value === '' ||
      data_inicio.value === '' ||
      data_fim.value === '' ||
      valor_final.value === '' ||
      situacao.value === '' ||
      data_criacao.value === ''
    ) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }
  
    try {
      await axios.post('http://localhost:3000/cadastroReserva', {
        cliente_id: parseInt(cliente_id.value),
        locacao_id: parseInt(locacao_id.value),
        data_inicio: data_inicio.value,
        data_fim: data_fim.value,
        valor_final: parseFloat(valor_final.value),
        situacao: situacao.value,
        data_criacao: data_criacao.value
      })
  
      alert('Reserva cadastrada com sucesso!')
  
      cliente_id.value = ''
      locacao_id.value = ''
      data_inicio.value = ''
      data_fim.value = ''
      valor_final.value = ''
      situacao.value = ''
      data_criacao.value = ''
  

      buscarReservas()
    } catch (error) {
      console.error('Erro ao cadastrar reserva:', error)
      if (error.response && error.response.data) {
        alert(`Erro: ${error.response.data.message || JSON.stringify(error.response.data)}`)
      } else {
        alert('Erro ao cadastrar reserva.')
      }
    }
  }
  </script>
  