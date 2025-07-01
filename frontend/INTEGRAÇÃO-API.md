# 🚀 Integração Frontend + API - Cadastro de Doadores

## ✅ O que foi implementado:

### 1. **Serviços de API** (`src/services/`)

- **`api.js`**: Configuração base do Axios com interceptors e tratamento de erros
- **`doadorService.js`**: Serviço específico para operações de doadores

### 2. **Fluxo de Cadastro Integrado**

O cadastro de doador agora segue o padrão da API do backend:

1. **Criar Endereço** → `/api/addresses`
2. **Criar Pessoa** → `/api/people`
3. **Criar Doador (Giver)** → `/api/givers`

### 3. **Código Mock Preservado**

- Mantido como comentário para referência futura
- Facilita rollback se necessário
- Preserva a lógica anterior

## 🔧 Configuração

### Variáveis de Ambiente (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
PORT=8181
```

### Estrutura de Dados

```javascript
// Dados do formulário frontend
{
  nomeCompleto: "João Silva",
  telefoneCelular: "(45) 99999-9999",
  email: "joao@email.com",
  cpf: "12345678901",
  endereco: "Rua das Flores",
  bairro: "Centro",
  numero: "123",
  complemento: "Apto 45",
  pontoReferencia: "Próximo ao banco"
}

// Transformado para API backend
Endereço → Pessoa → Doador
```

## 🧪 Como Testar

1. **Frontend**: http://localhost:3001
2. **Backend**: http://localhost:8080 (verificar se está rodando)
3. **Navegar**: Login → Home → Cadastro → Doador
4. **Preencher** o formulário e enviar

## 📝 Próximos Passos

1. **Lista de Doadores** - Conectar `/cadastrodoador/lista`
2. **Beneficiários** - Implementar CRUD completo
3. **Voluntários** - Conectar com API
4. **Estoque** - Integrar com `/api/items`
5. **Tratamento de Erros** - Melhorar UX

## 🔍 Debug

- **Console do navegador**: Logs das requisições API
- **Network tab**: Verificar chamadas HTTP
- **Terminal backend**: Logs do Spring Boot
- **Terminal frontend**: Logs do Next.js

---

**Status**: ✅ Cadastro de Doadores conectado à API
**Próximo**: Implementar listagem de doadores
