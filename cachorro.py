from animal import Animal


class Cachorro(Animal):

    def __init__(self, nome, idade, raca):
        super().__init__(nome, idade)
        self.set_raca(raca)

    # Encapsulamento - raça
    def get_raca(self):
        return self.__raca

    def set_raca(self, raca):
        if raca.strip():
            self.__raca = raca
        else:
            raise ValueError("A raça não pode ser vazia.")

    # Polimorfismo
    def apresentar(self):
        super().apresentar()
        print(f"Raça: {self.__raca}")

    # Polimorfismo
    def emitir_som(self):
        print("Au au!")
