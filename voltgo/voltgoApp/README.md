# \# Documentação do Projeto "VoltGo - Sempre a carregar!"

# 

# Módulo: Algoritmia

# 

# Autores: Diogo Gomes e Matilde Gomes

# 

# \---

# 

# \## 1. Instruções de Execução

# 

# 1\. Executar a aplicação:

# `node main.js`

# 2\. Navegação:

# A interação com o sistema é efetuada através de um menu de texto na consola, introduzindo o número correspondente à opção pretendida.

# 

# Nota: Não é necessária a instalação ou configuração de bases de dados externas. Na primeira execução, o sistema cria automaticamente a pasta `./data` e gera os respetivos ficheiros `.json` a partir dos dados de teste iniciais.

# 

# \---

# 

# 2\. Requisitos Diferenciadores e Regras de Negócio

# 

# Para além da implementação dos requisitos de gestão de dados básicos, a aplicação inclui um conjunto de validações e funcionalidades que ajudam a responder a requisitos práticos de funcionamento:

# 

# 2.1. Garantia de exclusividade de utilização de cada posto físico (carregamentos com horário único no mesmo posto).



# Funcionamento: O sistema valida o intervalo temporal (`startDate` e `endDate`) antes de efetivar o registo de uma nova sessão. Caso exista sobreposição com outro carregamento ativo para o mesmo posto, a operação é interrompida e é emitida uma mensagem de erro.

# 

# 2.2. Sistema de Alerta de Manutenção Preventiva (Dashboard)

# 

# Funcionamento: Na inicialização da dashboard, o sistema calcula a diferença em dias entre a data atual e a data da última manutenção registada para cada posto. Se o valor for igual ou superior a 15 dias, é gerado um aviso em texto no terminal a dizer que é necessário fazer manutenção no posto.

# 

# 2.3. Armazenamento de Dados Automático

# 

# Funcionamento: No arranque da aplicação, a função `loadData` verifica a existência de ficheiros JSON na pasta `./data`. Se existirem, os dados são lidos para a memória; caso contrário, a aplicação inicializa-se com os dados padrão e cria os ficheiros no disco. Qualquer alteração efetuada (criação, edição ou remoção) ativa a escrita imediata em disco através da função `saveData`.

# 

# 

# 

# 2.4. Gestão da disponibilidade técnica das estações.

# 

# 

# Funcionamento: Impede a atribuição de novas sessões de carregamento a postos que se encontrem indisponíveis.

# 

# 

# 

# 2.5. Cálculo de consumos.

# 

# 

# Funcionamento: Os consumos energéticos e o valor a faturar são calculados dinamicamente com base no tempo de utilização, na potência do posto (standard ou rápida) e no tarifário associado.

# 

# 

# 

# 2.6. Atribuição de Pontos de Fidelidade 

# 

# 

# Funcionamento: A criação de uma sessão de carregamento paga resulta no cálculo e crédito automático de pontos de fidelidade no registo do cliente correspondente.

# 

# 

# 

# \---

# 

# 3\. Estrutura do Projeto

# 

# \* `data/` - Ficheiros JSON para armazenamento dos dados (`stations.json`, `clients.json`, `tariffs.json`, `charges.json`)

# \* `src/storage.js` - Leitura e escrita de dados no disco

# \* `src/stations.js` - Lógica dos postos e controlo de manutenção

# \* `src/clients.js` - Lógica de clientes e sistema de fidelidade

# \* `src/tariffs.js` - Lógica das tarifas e taxas aplicáveis

# \* `src/charges.js` - Validação de horários e gestão de carregamentos

# \* `main.js` - Ponto de entrada da aplicação

\* `README.md` - Documentação do projeto

