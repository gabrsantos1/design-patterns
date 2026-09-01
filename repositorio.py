class RepositorioPets:

    # Instância única
    __instancia = None

    def __new__(cls):
        if cls.__instancia is None:
            cls.__instancia = super().__new__(cls)
            cls.__instancia.__animais = []

        return cls.__instancia

    def adicionar(self, animal):
        self.__animais.append(animal)

    def listar(self):
        return self.__animais.copy()

    def buscar_por_nome(self, nome):
        for animal in self.__animais:
            if animal.get_nome().lower() == nome.lower():
                return animal

        return None

    def remover(self, animal):
        if animal in self.__animais:
            self.__animais.remove(animal)
            return True

        return False

    def quantidade(self):
        return len(self.__animais)
