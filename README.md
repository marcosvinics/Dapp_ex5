# **Exercício 4**

**Exercício 4**

Neste exercício, você irá evoluir o DAPP que desenvolvemos na aula anterior, adicionando novas funcionalidades para aprimorar a interação entre o frontend e o backend. O objetivo é praticar a integração dessas duas camadas, consolidando seus conhecimentos em desenvolvimento full-stack na blockchain Internet Computer (ICP).

Instruções:

## **Listar Total de "Tarefas em Andamento"**

- Adicionar um totalizador ao final da lista de **tarefas em andamento**. Este totalizador deverá apresentar a quantidade de tarefas que estão em andamento, conforme ilustrado na imagem abaixo.
    
    ![](https://aprendaicp.xyz/exercicio1_4i1.jpg)
    
- Crie uma função no frontend chamada `totalTarefasEmAndamento` esta função deverá realizar uma chamada para a função `totalTarefasEmAndamento` que será adicionada ao backend. O número retornado por esta função deverá ser apresentado na tela no campo **TOTAL** (da lista de tarefas em andamento).
- Crie uma função no backend chamada `totalTarefasEmAndamento`. Esta função deve retornar a quantidade de tarefas presentes no **Buffer** `tarefas` que possuem o atributo `concluida` definido como **false**. O retorno deverá ser do tipo `Nat`.
- No frontend a função `totalTarefasEmAndamento` deverá ser chamada sempre`useEffect` for executado.
- No frontend a função `totalTarefasEmAndamento` deverá ser chamada sempre uma tarefa for incluída, excluida ou concluída.

## **Listar Total de Tarefas "Concluídas"**

- Adicionar um totalizador ao final da lista de **tarefas concluídas**. Este totalizador deverá apresentar a quantidade de tarefas que estão concluídas, conforme ilustrado na imagem abaixo.
    
    ![](https://aprendaicp.xyz/exercicio1_4i2.jpg)
    
- Crie uma função no frontend chamada `totalTarefasConcluidas` esta função deverá realizar uma chamada para a função `totalTarefasConcluidas` que será adicionada ao backend. O número retornado por esta função deverá ser apresentado na tela no campo **TOTAL** (da lista de tarefas concluídas).
- Crie uma função no backend chamada `totalTarefasConcluidas`. Esta função deve retornar a quantidade de tarefas presentes no **Buffer** `tarefas` que possuem o atributo `concluida` definido como **true**. O retorno deverá ser do tipo `Nat`.
- No frontend a função `totalTarefasConcluidas` deverá ser chamada sempre`useEffect` for executado.
- No frontend a função `totalTarefasConcluidas` deverá ser chamada sempre uma tarefa for concluída.

## **Publicação do DAPP**

- Após concluir o desenvolvimento, publique o código-fonte do DAPP no seu **GitHub**.
- Preencha o campo **GitHub** (abaixo) com o link do repositório e clique em **Enviar**.

### **Dicas:**

- Uma alternativa para implementar as funções `totalTarefasEmAndamento` e `totalTarefasConcluidas` no backend, para contagem das terafas (em andamento/concluídas) é utilizar uma estrutura **for**, como por exemplo: `for( value in tarefas.vals() )`. Neste caso você poderá ser acessar o valor dos atributos conforme este exemplo: `value.categoria` (neste caso estamos obtendo o valor de categoria). Outra alternativa é pesquisar uma função da biblioteca **Buffer** que permita filtrar itens de acordo com os critérios que você definir, e em seguida contar a quantidade de registros retornados, no final da aula  é apresentada uma lista de funções de **Buffer** que podem ser estudadas.
    
    Estrutura de dados Buffer
    
- No frontend ao receber o retorno do backend utilize a função `parseInt` do JavaScript para evitar qualquer tipo de incompatibilidade do dado recebido, exemplo: `parseInt(await to_do_backend.totalTarefasEmAndamento())`.
- Certifique-se de que o código está bem organizado e comentado.
- Teste as funções localmente antes de publicar o DAPP. Utilize o comando `dfx deploy` para gerar o Dapp localmente, e utilize a URL correspondente a interface de frontend para realizar os testes em um navegador web.
