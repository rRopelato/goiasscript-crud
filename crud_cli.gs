uai readline = require('readline');

uai rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

presta_serviço ler_entrada(pergunta) {
    faz_favor new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

trem pessoas = [];

// Função para criar uma nova pessoa
presta_serviço criar_pessoa(nome, idade) {
    uai nova_pessoa = {
        nome: nome,
        idade: idade
    };
    pessoas.push(nova_pessoa);
    faz_favor nova_pessoa;
}

// Função para ler todas as pessoas
presta_serviço ler_pessoas() {
    faz_favor pessoas;
}

// Função para atualizar uma pessoa
presta_serviço atualizar_pessoa(indice, nome, idade) {
    se_ocê_quiser (indice >= 0 && indice < pessoas.length) {
        pessoas[indice].nome = nome;
        pessoas[indice].idade = idade;
        faz_favor certeza;
    } se_não {
        faz_favor de_jeito_nenhum;
    }
}

// Função para deletar uma pessoa
presta_serviço deletar_pessoa(indice) {
    se_ocê_quiser (indice >= 0 && indice < pessoas.length) {
        pessoas.splice(indice, 1);
        faz_favor certeza;
    } se_não {
        faz_favor de_jeito_nenhum;
    }
}

// Função para exibir o menu
presta_serviço mostrar_menu() {
    prosa("\n=== CRUD GoiásScript CLI ===");
    prosa("1. Criar pessoa");
    prosa("2. Listar pessoas");
    prosa("3. Atualizar pessoa");
    prosa("4. Deletar pessoa");
    prosa("5. Sair");
    prosa("===========================");
}

// Função para criar pessoa
presta_serviço criar_pessoa_cli() {
    prosa("\n=== Criar Pessoa ===");
    rl.question("Digite o nome: ", (nome) => {
        rl.question("Digite a idade: ", (idade) => {
            uai idade_num = parseInt(idade);
            se_ocê_quiser (nome && !isNaN(idade_num)) {
                criar_pessoa(nome, idade_num);
                prosa("Pessoa criada com sucesso!");
            } se_não {
                reclama("Dados inválidos!");
            }
            escolher_opcao();
        });
    });
}

// Função para listar pessoas
presta_serviço listar_pessoas_cli() {
    prosa("\n=== Lista de Pessoas ===");
    uai lista_pessoas = ler_pessoas();
    
    se_ocê_quiser (lista_pessoas.length === 0) {
        prosa("Nenhuma pessoa cadastrada.");
    } se_não {
        trem i = 0;
        enquanto_tiver (i < lista_pessoas.length) {
            prosa(`${i + 1}. Nome: ${lista_pessoas[i].nome}, Idade: ${lista_pessoas[i].idade}`);
            i++;
        }
    }
    escolher_opcao();
}

// Função para atualizar pessoa
presta_serviço atualizar_pessoa_cli() {
    prosa("\n=== Atualizar Pessoa ===");
    uai lista_pessoas = ler_pessoas();
    
    se_ocê_quiser (lista_pessoas.length === 0) {
        prosa("Nenhuma pessoa cadastrada.");
        escolher_opcao();
    } se_não {
        trem i = 0;
        enquanto_tiver (i < lista_pessoas.length) {
            prosa(`${i + 1}. Nome: ${lista_pessoas[i].nome}, Idade: ${lista_pessoas[i].idade}`);
            i++;
        }
        
        rl.question("Digite o número da pessoa que deseja atualizar: ", (indice_str) => {
            uai indice = parseInt(indice_str) - 1;
            
            se_ocê_quiser (indice >= 0 && indice < lista_pessoas.length) {
                rl.question("Digite o novo nome: ", (novo_nome) => {
                    rl.question("Digite a nova idade: ", (nova_idade_str) => {
                        uai nova_idade = parseInt(nova_idade_str);
                        se_ocê_quiser (novo_nome && !isNaN(nova_idade)) {
                            se_ocê_quiser (atualizar_pessoa(indice, novo_nome, nova_idade)) {
                                prosa("Pessoa atualizada com sucesso!");
                            } se_não {
                                reclama("Erro ao atualizar pessoa!");
                            }
                        } se_não {
                            reclama("Dados inválidos!");
                        }
                        escolher_opcao();
                    });
                });
            } se_não {
                reclama("Índice inválido!");
                escolher_opcao();
            }
        });
    }
}

// Função para deletar pessoa
presta_serviço deletar_pessoa_cli() {
    prosa("\n=== Deletar Pessoa ===");
    uai lista_pessoas = ler_pessoas();
    
    se_ocê_quiser (lista_pessoas.length === 0) {
        prosa("Nenhuma pessoa cadastrada.");
        escolher_opcao();
    } se_não {
        trem i = 0;
        enquanto_tiver (i < lista_pessoas.length) {
            prosa(`${i + 1}. Nome: ${lista_pessoas[i].nome}, Idade: ${lista_pessoas[i].idade}`);
            i++;
        }
        
        rl.question("Digite o número da pessoa que deseja deletar: ", (indice_str) => {
            uai indice = parseInt(indice_str) - 1;
            
            se_ocê_quiser (indice >= 0 && indice < lista_pessoas.length) {
                rl.question("Tem certeza que deseja deletar esta pessoa? (s/n): ", (confirmacao) => {
                    se_ocê_quiser (confirmacao.toLowerCase() === 's') {
                        se_ocê_quiser (deletar_pessoa(indice)) {
                            prosa("Pessoa deletada com sucesso!");
                        } se_não {
                            reclama("Erro ao deletar pessoa!");
                        }
                    } se_não {
                        prosa("Operação cancelada.");
                    }
                    escolher_opcao();
                });
            } se_não {
                reclama("Índice inválido!");
                escolher_opcao();
            }
        });
    }
}

// Função para escolher opção
presta_serviço escolher_opcao() {
    mostrar_menu();
    rl.question("Escolha uma opção: ", (opcao_str) => {
        uai opcao = parseInt(opcao_str);
        
        se_ocê_quiser (opcao === 1) {
            criar_pessoa_cli();
        } se_num_for (opcao === 2) {
            listar_pessoas_cli();
        } se_num_for (opcao === 3) {
            atualizar_pessoa_cli();
        } se_num_for (opcao === 4) {
            deletar_pessoa_cli();
        } se_num_for (opcao === 5) {
            prosa("Até logo!");
            rl.close();
        } se_não {
            reclama("Opção inválida!");
            escolher_opcao();
        }
    });
}

// Iniciando o programa
escolher_opcao(); 