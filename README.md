# Petfolio — Sistema de Cadastro de Animais

O **Petfolio** é um sistema para cadastrar e gerenciar animais de estimação. O projeto reúne uma aplicação de terminal em Python, desenvolvida para demonstrar orientação a objetos e padrões de projeto, e uma interface web moderna feita com React, TypeScript, componentes no estilo shadcn/ui e glassmorphism.

## Funcionalidades

- Cadastrar cachorros com nome, idade e raça
- Cadastrar gatos com nome, idade e raça
- Listar todos os animais cadastrados
- Buscar animais por nome ou espécie
- Alterar nome e idade
- Excluir animais
- Consultar a quantidade total de animais
- Exibir o som específico de cada espécie
- Filtrar cães e gatos no frontend
- Persistir os dados do frontend no `localStorage`
- Validar formulários e apresentar notificações
- Adaptar a interface para desktop, tablet e celular

## Tecnologias utilizadas

### Aplicação Python

- Python 3
- Programação orientada a objetos
- Classes abstratas com o módulo `abc`
- Encapsulamento, herança, abstração e polimorfismo
- Padrões de projeto Facade, Strategy e Singleton

### Frontend

- React
- TypeScript
- Vite
- Componentes seguindo a composição visual do shadcn/ui
- Lucide React para ícones
- CSS responsivo
- Glassmorphism
- LocalStorage

## Estrutura do projeto

```text
design-patterns/
├── src/
│   ├── App.tsx              # Interface e regras do frontend
│   ├── main.tsx             # Inicialização do React
│   ├── styles.css           # Estilos, glassmorphism e responsividade
│   └── vite-env.d.ts        # Tipagens do Vite
├── animal.py                # Classe abstrata Animal
├── cachorro.py              # Classe Cachorro
├── gato.py                  # Classe Gato
├── estrategia_busca.py      # Contrato das estratégias de busca
├── buscar_por_nome.py       # Busca por nome
├── buscar_por_especie.py    # Busca por espécie
├── repositorio.py           # Repositório Singleton
├── sistema.py               # Facade do sistema
├── main.py                  # Menu da aplicação Python
├── index.html               # Documento principal do frontend
├── package.json             # Dependências e scripts do frontend
└── README.md
```

## Padrões de projeto

### Facade

O padrão **Facade** disponibiliza uma interface simples para acessar operações que dependem de diferentes classes internas.

A classe `Sistema`, em `sistema.py`, atua como a fachada do projeto. O menu não precisa acessar diretamente o repositório, as classes dos animais ou as estratégias de busca. Ele utiliza métodos de alto nível:

```python
sistema.cadastrar_cachorro(nome, idade, raca)
sistema.cadastrar_gato(nome, idade, raca)
sistema.listar_animais()
sistema.buscar_por_nome(nome)
sistema.buscar_por_especie(especie)
sistema.alterar_animal(nome_atual, novo_nome, nova_idade)
sistema.excluir_animal(nome)
```

Isso reduz o acoplamento e concentra o acesso às regras da aplicação em uma única classe.

### Strategy

O padrão **Strategy** permite encapsular algoritmos diferentes que realizam uma mesma categoria de operação.

`EstrategiaBusca` define o contrato comum:

```python
class EstrategiaBusca(ABC):
    @abstractmethod
    def buscar(self, animais, criterio):
        pass
```

O projeto possui duas implementações:

- `BuscarPorNome`: procura ocorrências parciais no nome dos animais
- `BuscarPorEspecie`: retorna somente cachorros ou gatos

A classe `Sistema` escolhe a estratégia adequada para cada busca. Dessa forma, outras estratégias podem ser adicionadas sem modificar as existentes.

### Singleton

O padrão **Singleton** garante que uma classe tenha somente uma instância durante a execução.

`RepositorioPets` implementa o padrão no método `__new__`:

```python
class RepositorioPets:
    __instancia = None

    def __new__(cls):
        if cls.__instancia is None:
            cls.__instancia = super().__new__(cls)
            cls.__instancia.__animais = []

        return cls.__instancia
```

Assim, todas as partes da aplicação compartilham o mesmo repositório de animais em memória.

## Orientação a objetos

### Abstração

`Animal` é uma classe abstrata que reúne os dados e comportamentos comuns. Ela define `emitir_som()` como método abstrato.

### Herança

`Cachorro` e `Gato` herdam nome, idade e comportamentos comuns de `Animal`.

### Encapsulamento

Os atributos são privados e manipulados por getters e setters. Os setters validam nomes vazios, idades negativas e raças vazias.

### Polimorfismo

Cada espécie implementa seu próprio som:

- Cachorro: `Au au!`
- Gato: `Miau!`

Tanto cachorro quanto gato sobrescrevem `apresentar()` para incluir sua raça.

## Como executar o frontend

### Pré-requisitos

- Node.js 18 ou superior
- npm

Instale as dependências na raiz do projeto:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Abra o endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

### Build de produção

```bash
npm run build
```

O build será criado em `dist/`. Para visualizá-lo localmente:

```bash
npm run preview
```

## Como executar a aplicação Python

### Pré-requisitos

- Python 3.8 ou superior

Não existem dependências Python externas. Execute na raiz do projeto:

```bash
python main.py
```

Em alguns sistemas, utilize:

```bash
python3 main.py
```

O menu exibirá as opções:

```text
1 - Cadastrar cachorro
2 - Cadastrar gato
3 - Listar animais
4 - Buscar animal
5 - Excluir animal
6 - Alterar animal
7 - Ver quantidade de animais
0 - Sair
```

## Fluxo da aplicação Python

```text
Usuário
   │
   ▼
main.py — interface de terminal
   │
   ▼
Sistema — Facade
   ├── cria Cachorro ou Gato
   ├── seleciona uma Strategy de busca
   └── acessa RepositorioPets
                       │
                       ▼
                 Singleton em memória
```

## Persistência

- A versão Python mantém os registros em memória somente enquanto o programa está aberto.
- O frontend armazena os registros no `localStorage`, mantendo-os após a página ser atualizada.
- Atualmente, o frontend e a aplicação Python são independentes e não estão conectados por uma API.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o frontend em desenvolvimento |
| `npm run build` | Valida o TypeScript e cria o build de produção |
| `npm run preview` | Executa uma prévia do build |
| `python main.py` | Inicia a aplicação de terminal |

## Possíveis evoluções

- Criar uma API REST com FastAPI ou Flask
- Conectar o frontend à aplicação Python
- Persistir os dados em SQLite ou PostgreSQL
- Adicionar autenticação
- Permitir fotos dos animais
- Gerenciar vacinas, consultas e medicamentos
- Criar testes automatizados

---

Projeto desenvolvido para demonstrar padrões de projeto, orientação a objetos e construção de interfaces modernas.
