from cachorro import Cachorro
from gato import Gato
from repositorio import RepositorioPets
from buscar_por_nome import BuscarPorNome
from buscar_por_especie import BuscarPorEspecie


class Sistema:

    def __init__(self):

        # Singleton
        self.__repositorio = RepositorioPets()

    # ==========================
    # CADASTRO
    # ==========================

    def cadastrar_cachorro(self, nome, idade, raca):

        cachorro = Cachorro(nome, idade, raca)

        self.__repositorio.adicionar(cachorro)

    def cadastrar_gato(self, nome, idade, raca):

        gato = Gato(nome, idade, raca)

        self.__repositorio.adicionar(gato)

    # ==========================
    # LISTAGEM
    # ==========================

    def listar_animais(self):

        return self.__repositorio.listar()

    # ==========================
    # BUSCA - STRATEGY
    # ==========================

    def buscar_por_nome(self, nome):

        estrategia = BuscarPorNome()

        animais = self.__repositorio.listar()

        return estrategia.buscar(animais, nome)

    def buscar_por_especie(self, especie):

        estrategia = BuscarPorEspecie()

        animais = self.__repositorio.listar()

        return estrategia.buscar(animais, especie)

    # ==========================
    # EXCLUSÃO
    # ==========================

    def excluir_animal(self, nome):

        animal = self.__repositorio.buscar_por_nome(nome)

        if animal:
            return self.__repositorio.remover(animal)

        return False

    # ==========================
    # ALTERAÇÃO
    # ==========================

    def alterar_animal(self, nome_atual, novo_nome, nova_idade):

        animal = self.__repositorio.buscar_por_nome(nome_atual)

        if animal:

            animal.set_nome(novo_nome)
            animal.set_idade(nova_idade)

            return True

        return False

    # ==========================
    # QUANTIDADE
    # ==========================

    def quantidade_animais(self):

        return self.__repositorio.quantidade()
