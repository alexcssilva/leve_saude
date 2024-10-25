# API de Agendamento Médico

Esta é uma API de agendamento médico desenvolvida com Node.js, TypeScript, Serverless Framework e AWS Lambda.

## 🚀 Tecnologias Utilizadas

- Node.js (v14+)
- TypeScript
- Serverless Framework
- AWS Lambda
- Docker
- Jest para testes
- ESLint e Prettier para qualidade de código

## 📋 Pré-requisitos

- Docker e Docker Compose
- Node.js v14 ou superior
- AWS CLI configurado (para deploy)

## 🔧 Instalação e Execução Local

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/leve-saude-api.git
cd leve-saude-api
```

2. Execute com Docker:

```bash
docker-compose up
```

3. Ou instale localmente:

```bash
npm install
npm run dev
```

## 🔍 Endpoints

### 1. Buscar Agendas e Horários

```
GET /schedule
```

### 2. Marcar Agendamento

```
POST /appointment
```

Payload:

```json
{
  "medico_id": 1,
  "paciente_nome": "João Silva",
  "data_horario": "2024-10-05 09:00"
}
```

## 🧪 Testes

Execute os testes:

```Todos os testes
npm test
```

```Com coverage:
npm test -- --coverage
```

## 🛠️ Desenvolvimento

Para rodar em modo desenvolvimento:

```bash
npm run dev
```

## 📝 Documentação API

A API estará disponível em:

- Local: http://localhost:3000
- Endpoints:
  - GET /schedule
  - POST /appointment

## ⚙️ Variáveis de Ambiente

Copie o arquivo .env.example para .env e configure as variáveis necessárias:

```bash
cp .env.example .env
```
