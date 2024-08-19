# teddy-shortener
Projeto realizado para desafio técnico da empresa teddy solutions

Tecnologias utilizadas

NodeJs 
Express
PostgresSql
Git

Como rodar o projeto:
Tenha a última versão do node, e o postgress instalado.

Clone o repositório do projeto
Instale as dependências do projeto com "npm install"

Utilize "npm start" para inicializar o projeto
Talvez no primeiro npm start de problema na hora de abrir o banco, não consegui resolver a tempo, é só dar npm start de novo que é problema da primeira inserção de registro.

Melhorias que poderiam ser feitas futuramente com mais tempo de projeto -
1 - Separar os métodos services/controllers por rota, por exemplo:
UpdateUrlService
Atualmente estão todos no mesmo arquivo por conta do tempo de desafio ter sido realizado no fim de semana e eu tive um evento fora da cidade então não tive tanto tempo para deixar tudo "redondo";

2 - Realizar implementação docker para subir todos os containerS do projeto de forma única;

3 - Realizar documentação do swagger;

4 - Implementar injeção de dependências, interfaces;

5 - Utilizar prisma para melhor organização;

6 - Realizar implementação dos testes;
