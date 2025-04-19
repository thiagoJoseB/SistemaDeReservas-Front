<template>
    <q-page-container style="padding-top: 70px; padding-bottom: 100px; background-color: #202020;">
<q-card class="card-cadastro" style="height: 80vh;" >
  <h1 class="q-mt-sm">Cadastro de Locação</h1>
  <form @submit.prevent="cadastrar">
    
    <div class="caixa-input" style="margin-top: -25px;">
      <q-input
        v-model="nome"
        outlined
        type="text"
        dense
        class="input"
        label="Nome"
      />
    </div>

    <div class="caixa-input">
      <q-input
        v-model="tipo"
        outlined
        type="text"
        dense
        class="input"
        label="Tipo"
      />
    </div>

    <div class="caixa-input">
      <q-input
        v-model="descricao"
        outlined
        type="text"
        dense
        class="input"
        label="Descrição"
      />
    </div>

    <div class="caixa-input">
      <q-input
        v-model="valor_hora"
        outlined
        type="number"
        dense
        class="input"
        label="Valor por Hora (R$)"
        prefix="R$"
        step="0.01"
      />
    </div>

    <div class="caixa-input">
      <q-input
        v-model="tempo_minimo"
        outlined
        type="number"
        dense
        class="input"
        label="Tempo Mínimo (min)"
      />
    </div>

    <div class="caixa-input">
      <q-input
        v-model="tempo_maximo"
        outlined
        type="number"
        dense
        class="input"
        label="Tempo Máximo (min)"
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
      <q-btn 
        class="btn-login"
        label="Cadastrar"
        type="submit"
      />
    </div>

    <div class="criar-conta">
      <p @click="voltarIndex">Voltar</p>
    </div>

  </form>
</q-card>
      <q-card class="card-listagem q-pa-md">
        <q-table
  title="Lista de Locações"
  :rows="clientes"
  :columns="[
    { name: 'id', label: 'ID', align: 'left', field: 'id' },
    { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
    { name: 'tipo', label: 'Tipo', align: 'left', field: 'tipo' },
    { name: 'descricao', label: 'Descricao', align: 'left', field: 'descricao' },
    { name: 'valor_hora', label: 'Valor hora', align: 'left', field: 'valor_hora' },
    { name: 'tempo_minimo', label: 'Tempo minimo', align: 'left', field: 'tempo_minimo' },
    { name: 'tempo_maximo', label: 'Tempo maximo', align: 'left', field: 'tempo_maximo' },
    { name: 'data_criacao', label: 'Data de Criação', align: 'left', field: 'data_criacao' }
  ]"

    row-key="id"
            flat
            bordered
            no-data-label="Nenhum Resultado encontrado"
/>
</q-card>

    </q-page-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // variáveis reativas do formulário
  const nome = ref('')
  const tipo = ref('')
  const descricao = ref('')
  const valor_hora = ref('')
  const tempo_minimo = ref('')
  const tempo_maximo = ref('')
  const data_criacao = ref('')
  
  // lista de tipos de locação
  const clientes = ref([]) // poderia chamar de "locacoes", mas como você usou "clientes" no q-table, mantive igual
  
  // buscar os tipos de locação
  const buscarTiposLocacao = async () => {
    try {
      const response = await axios.get('http://localhost:3000/listarTipoLocacao')
      clientes.value = response.data.data
    } catch (error) {
      console.error('Erro ao buscar tipos de locação:', error)
      alert('Erro ao buscar os dados das locações.')
    }
  }
  
  // Executa ao carregar a página
  onMounted(() => {
    buscarTiposLocacao()
  })
  
  // voltar
  function voltarIndex() {
    router.push('/')
  }
  
  // cadastrar
  async function cadastrar() {
    if (
      nome.value === '' ||
      tipo.value === '' ||
      valor_hora.value === '' ||
      tempo_minimo.value === '' ||
      tempo_maximo.value === '' ||
      data_criacao.value === ''
    ) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }
  
    try {
      await axios.post('http://localhost:3000/cadastroTipoLocacao', {
        nome: nome.value,
        tipo: tipo.value,
        descricao: descricao.value,
        valor_hora: parseFloat(valor_hora.value),
        tempo_minimo: parseInt(tempo_minimo.value),
        tempo_maximo: parseInt(tempo_maximo.value),
        data_criacao: data_criacao.value
      })
  
      alert('Tipo de locação cadastrado com sucesso!')
  
      // limpa os campos
      nome.value = ''
      tipo.value = ''
      descricao.value = ''
      valor_hora.value = ''
      tempo_minimo.value = ''
      tempo_maximo.value = ''
      data_criacao.value = ''
  
      // atualiza a tabela
      buscarTiposLocacao()
    } catch (error) {
      console.error('Erro ao cadastrar tipo de locação:', error)
  
      if (error.response && error.response.data) {
        alert(
          `Erro ao cadastrar: ${error.response.data.message || JSON.stringify(error.response.data)}`
        )
      } else {
        alert('Erro ao cadastrar tipo de locação.')
      }
    }
  }
  </script>
  
