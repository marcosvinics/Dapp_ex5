import Principal "mo:base/Principal"; //Identidade dos usuários e canisters
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";

actor {
  type Tarefa = {    
    id: Nat;  // Identificador único da tarefa
    categoria: Text; // Categoria da tarefa   
    descricao: Text;  // Descrição detalhada da tarefa 
    urgente: Bool;  // Indica se a tarefa é urgente (true) ou não (false)
    concluida: Bool;  // Indica se a tarefa foi concluída (true) ou não (false)
  };

  /* Esta variável será utilizada para armazenar o número do último identificador gerado para uma tarefa. 
     Ela será incrementada sempre que uma nova tarefa for adicionada */
  var idTarefa : Nat = 0;

  // Esta estrutura será utilizada para armazenar as "tarefas"
  var tarefas : Buffer.Buffer<Tarefa> = Buffer.Buffer<Tarefa>(10);

  public shared(message) func get_principal_client() : async Text {
    return "Principal: " # Principal.toText(message.caller) # "!";
  };

  // Função para adicionar itens ao buffer 'tarefas'.
  public func addTarefa(desc: Text, cat: Text, urg: Bool, con: Bool) : async () {
    idTarefa += 1;
    let t : Tarefa = {
      id = idTarefa;
      categoria = cat;
      descricao = desc;
      urgente = urg;
      concluida = con;
    };
    tarefas.add(t);
  };

  // Função para remover itens ao buffer 'tarefas'.
  public func excluirTarefa(idExcluir: Nat) : async () {
    func localizaExcluir(i: Nat, x: Tarefa) : Bool {
      return x.id != idExcluir;
    };
    tarefas.filterEntries(localizaExcluir); 
  };

  // Função para alterar itens ao buffer 'tarefas'.
  public func alterarTarefa(idTar: Nat, 
                            cat: Text, 
                            desc: Text, 
                            urg: Bool, 
                            con: Bool) : async () {

    let t : Tarefa = {  id = idTar; 
                        categoria = cat; 
                        descricao = desc; 
                        urgente = urg; 
                        concluida = con;
                        };

    func localizaIndex (x: Tarefa, y: Tarefa) : Bool {
      return x.id == y.id;
    };

    let index : ?Nat = Buffer.indexOf(t, tarefas, localizaIndex);

    switch(index){
      case(null) {
        // não foi localizado um index
      };
      case(?i){ tarefas.put(i,t); }
    };
  };

  // Função para retornar os itens do buffer 'tarefas'.
  public func getTarefas() : async [Tarefa] {
    return Buffer.toArray(tarefas);
  };

  // NOVAS FUNÇÕES ADICIONADAS PARA O EXERCÍCIO 4

  // Função para retornar o total de tarefas em andamento (concluida = false)

  public func totalTarefasEmAndamento() : async Nat {
    var contador : Nat = 0;
    // Utilizando estrutura for para percorrer todas as tarefas
    for (value in tarefas.vals()) {
      if (not value.concluida) {
        contador += 1;
      }
    };
    return contador;
  };

  // Função para retornar o total de tarefas concluídas (concluida = true)
  public func totalTarefasConcluidas() : async Nat {
    var contador : Nat = 0;
    // Utilizando estrutura for para percorrer todas as tarefas
    for (value in tarefas.vals()) {
      if (value.concluida) {
        contador += 1;
      }
    };
    return contador;
  };
};
