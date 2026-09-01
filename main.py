from sistema import Sistema


def mostrar_menu():

    print("""
==========================================
       SISTEMA DE CADASTRO DE ANIMAIS
==========================================
1 - Cadastrar cachorro
2 - Cadastrar gato
3 - Listar animais
4 - Buscar animal
5 - Excluir animal
6 - Alterar animal
7 - Ver quantidade de animais
0 - Sair
==========================================
""")


def cadastrar_cachorro(sistema):

    try:

        nome = input("Nome do cachorro: ")
        idade = int(input("Idade: "))
        raca = input("Raça: ")

        sistema.cadastrar_cachorro(
            nome,
            idade,
            raca
        )

        print("\nCachorro cadastrado com sucesso!")

    except ValueError as erro:

        print(f"\nErro: {erro}")


def cadastrar_gato(sistema):

    try:

        nome = input("Nome do gato: ")
        idade = int(input("Idade: "))

        sistema.cadastrar_gato(
            nome,
            idade
        )

        print("\nGato cadastrado com sucesso!")

    except ValueError as erro:

        print(f"\nErro: {erro}")


def listar_animais(sistema):

    animais = sistema.listar_animais()

    if not animais:

        print("\nNenhum animal cadastrado.")

        return

    print("\n==========================================")
    print("           ANIMAIS CADASTRADOS")
    print("==========================================")

    for i, animal in enumerate(animais, start=1):

        print(f"\nAnimal {i}")

        animal.apresentar()

        print("Som:", end=" ")

        animal.emitir_som()

        print("------------------------------------------")


def buscar_animal(sistema):

    print("""
------------------------------------------
             BUSCAR ANIMAL
------------------------------------------
1 - Buscar por nome
2 - Buscar por espécie
------------------------------------------
""")

    opcao = input("Escolha uma opção: ")

    if opcao == "1":

        nome = input("Digite o nome: ")

        resultados = sistema.buscar_por_nome(nome)

    elif opcao == "2":

        especie = input(
            "Digite a espécie (cachorro/gato): "
        )

        resultados = sistema.buscar_por_especie(especie)

    else:

        print("\nOpção inválida.")

        return

    if not resultados:

        print("\nNenhum animal encontrado.")

        return

    print("\n==========================================")
    print("             RESULTADO DA BUSCA")
    print("==========================================")

    for animal in resultados:

        animal.apresentar()

        print("Som:", end=" ")

        animal.emitir_som()

        print("------------------------------------------")


def excluir_animal(sistema):

    nome = input("Digite o nome do animal que deseja excluir: ")

    if sistema.excluir_animal(nome):

        print("\nAnimal excluído com sucesso!")

    else:

        print("\nAnimal não encontrado.")


def alterar_animal(sistema):

    try:

        nome_atual = input("Nome atual do animal: ")
        novo_nome = input("Novo nome: ")
        nova_idade = int(input("Nova idade: "))

        alterado = sistema.alterar_animal(
            nome_atual,
            novo_nome,
            nova_idade
        )

        if alterado:

            print("\nAnimal alterado com sucesso!")

        else:

            print("\nAnimal não encontrado.")

    except ValueError as erro:

        print(f"\nErro: {erro}")


def main():

    # Facade
    sistema = Sistema()

    while True:

        mostrar_menu()

        opcao = input("Escolha uma opção: ")

        if opcao == "1":

            cadastrar_cachorro(sistema)

        elif opcao == "2":

            cadastrar_gato(sistema)

        elif opcao == "3":

            listar_animais(sistema)

        elif opcao == "4":

            buscar_animal(sistema)

        elif opcao == "5":

            excluir_animal(sistema)

        elif opcao == "6":

            alterar_animal(sistema)

        elif opcao == "7":

            quantidade = sistema.quantidade_animais()

            print(
                f"\nQuantidade de animais: {quantidade}"
            )

        elif opcao == "0":

            print("\nSistema encerrado.")

            break

        else:

            print("\nOpção inválida.")


if __name__ == "__main__":
    main()
