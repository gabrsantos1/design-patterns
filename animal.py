from abc import ABC, abstractmethod


class Animal(ABC):

    def __init__(self, nome, idade):
        self.__nome = nome
        self.__idade = idade

    # Encapsulamento - nome
    def get_nome(self):
        return self.__nome

    def set_nome(self, nome):
        if nome.strip():
            self.__nome = nome
        else:
            raise ValueError("O nome não pode ser vazio.")

    # Encapsulamento - idade
    def get_idade(self):
        return self.__idade

    def set_idade(self, idade):
        if idade < 0:
            raise ValueError("A idade não pode ser negativa.")

        self.__idade = idade

    def apresentar(self):
        print(f"Nome: {self.__nome}")
        print(f"Idade: {self.__idade}")

    @abstractmethod
    def emitir_som(self):
        pass
