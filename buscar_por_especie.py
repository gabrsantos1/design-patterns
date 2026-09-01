from estrategia_busca import EstrategiaBusca
from cachorro import Cachorro
from gato import Gato


class BuscarPorEspecie(EstrategiaBusca):

    def buscar(self, animais, criterio):

        resultados = []

        for animal in animais:

            if criterio.lower() == "cachorro" and isinstance(animal, Cachorro):
                resultados.append(animal)

            elif criterio.lower() == "gato" and isinstance(animal, Gato):
                resultados.append(animal)

        return resultados
