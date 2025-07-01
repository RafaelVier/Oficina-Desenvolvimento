import axios from "axios";

// Configuração base da API
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para requisições (pode adicionar tokens, logs, etc.)
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar tokens de autenticação se necessário
    // config.headers.Authorization = `Bearer ${token}`;
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API] Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas (tratamento de erros globais)
api.interceptors.response.use(
  (response) => {
    console.log(
      `[API] Resposta recebida de ${response.config.url}:`,
      response.status
    );
    return response;
  },
  (error) => {
    console.error(
      "[API] Erro na resposta:",
      error.response?.data || error.message
    );

    // Tratamento específico de erros
    if (error.response?.status === 401) {
      // Não autorizado - redirecionar para login se necessário
      console.warn("[API] Token expirado ou usuário não autorizado");
    } else if (error.response?.status === 500) {
      console.error("[API] Erro interno do servidor");
    }

    return Promise.reject(error);
  }
);

export default api;
