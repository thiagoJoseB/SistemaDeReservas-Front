<template>
    <q-page-container style="padding-top: 70px; padding-bottom: 100px; background-color: #202020;">
      <q-card class="card-cadastro">
        <h1 class="q-mt-sm">Cadastro de Cliente</h1>
        <form @submit.prevent="cadastrar">
          <div class="caixa-input">
            <q-input
              v-model="nome"
              outlined
              type="text"
              dense
              class="input"
              label="Digite seu nome"
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="email"
              outlined
              type="email"
              dense
              class="input"
              label="Digite seu email"
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="telefone"
              outlined
              type="tel"
              dense
              class="input"
              label="Digite seu telefone"
              mask="(##) #####-####"
            fill-mask
            />
          </div>
  
          <div class="caixa-input">
            <q-input
              v-model="cpf"
              outlined
              type="text"
              dense
              class="input"
              label="Digite seu CPF"
              mask="###.###.###-##"
              fill-mask
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
  title="Lista de Clientes"
  :rows="clientes"
  :columns="[
    { name: 'id', label: 'ID', align: 'left', field: 'id' },
    { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
    { name: 'email', label: 'Email', align: 'left', field: 'email' },
    { name: 'telefone', label: 'Telefone', align: 'left', field: 'telefone' },
    { name: 'cpf', label: 'CPF', align: 'left', field: 'cpf' },
    { name: 'data_criacao', label: 'Data de Criação', align: 'left', field: 'data_criacao' }
  ]"
  row-key="id"
  flat
  bordered
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
  const email = ref('')
  const telefone = ref('')
  const cpf = ref('')
  const data_criacao = ref('')
  
  // lista de clientes
  const clientes = ref([])
  
  // Função para buscar os clientes da API
  const buscarClientes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/listarClientes')
    clientes.value = response.data.data // <- acessa só o array de clientes aqui
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    alert('Erro ao buscar os dados dos clientes.')
  }
}

  // Executa ao carregar a página
  onMounted(() => {
    buscarClientes()
  })
  
  function voltarIndex() {
    router.push('/')
  }
  
  async function cadastrar() {
    if (
      nome.value === '' ||
      email.value === '' ||
      telefone.value === '' ||
      cpf.value === '' ||
      data_criacao.value === ''
    ) {
      alert('Existem campos que não foram preenchidos')
      return
    }
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email.value)) {
      alert('Formato de email inválido')
      return
    }
  
    try {
      await axios.post('http://localhost:3000/cadastroCliente', {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        cpf: cpf.value,
        data_criacao: data_criacao.value
      })
      alert('Cadastro realizado com sucesso!')
  
      // Atualiza a lista na tabela
      buscarClientes()
  
      // Limpa os campos
      nome.value = ''
      email.value = ''
      telefone.value = ''
      cpf.value = ''
      data_criacao.value = ''
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
  
      if (error.response && error.response.data) {
        alert(
          `Erro ao cadastrar: ${error.response.data.message || JSON.stringify(error.response.data)}`
        )
      } else {
        alert('Erro ao cadastrar cliente.')
      }
    }
  }
  </script>
  