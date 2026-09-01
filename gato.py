from animal import Animal


class Gato(Animal):

    def __init__(self, nome, idade):
        super().__init__(nome, idade)

    # Polimorfismo
    def apresentar(self):
        super().apresentar()

    # Polimorfismo
    def emitir_som(self):
        print("Miau!")
