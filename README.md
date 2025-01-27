Descrição:
Este projeto é um sistema para gerenciar um simulador campeonato de futebol. Ele exibe as rodadas e os jogos de cada rodada, bem como permite inserir e calcular os resultados dos jogos. A pontuação, vitórias, derrotas, empates e histórico de cada time são atualizados dinamicamente.

Funcionalidades:
Exibição de Rodadas: O campeonato é composto por várias rodadas, cada uma contendo uma lista de jogos. O horário de cada jogo e os times participantes são exibidos.
Inserção de Resultados: É possível inserir os gols de cada time em cada jogo. Os resultados são atualizados automaticamente.
Classificação: A classificação é exibida em uma tabela, ordenada com base na pontuação, gols feitos, gols sofridos e outros critérios.
Histórico dos Times: Através da função de histórico, é possível verificar o desempenho passado de cada time em termos de vitórias, derrotas e empates.

Estrutura do Código
1. Rodadas:
As rodadas são organizadas em um array. Cada rodada contém uma lista de jogos, onde cada jogo tem informações sobre os times, gols, status e horário.

2. Dados dos Times:
Os dados de cada time são armazenados em um objeto teamsData, que contém informações como:

Pontuação:
Jogos realizados.
Vitórias, empates, derrotas
Gols marcados (gf)
Gols sofridos (ga)


Histórico de status de cada jogo

3. Atualização da Classificação:
A função updateTable() ordena os times com base em sua pontuação e gols feitos, e atualiza a tabela de classificação.

4. Exibição dos Jogos:
A função renderRound() exibe os jogos de uma rodada específica, incluindo os times e os campos para inserir os gols.

5. Cálculo de Resultados:
A função calculateResults() percorre todos os jogos da rodada atual, atualiza os gols e altera os dados de cada time, incluindo vitórias, empates e derrotas.

6. Função de Histórico:
A função calcularGolsTotal() é responsável por calcular o total de gols feitos, gols sofridos, vitórias, empates, derrotas e jogos para um time específico, além de fornecer um histórico de status.

Como Usar


Inicialização

O projeto precisa ser executado em um ambiente que suporte HTML, CSS e JavaScript.
Os dados das rodadas e dos times estão predefinidos no código.
Inserção de Resultados

Em cada card de jogo, insira o número de gols para os times participantes. O sistema calculará e atualizará automaticamente as estatísticas dos times.
Visualização da Classificação

A tabela de classificação será automaticamente atualizada sempre que os resultados forem inseridos.
