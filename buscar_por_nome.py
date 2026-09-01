from estrategia_busca import EstrategiaBusca


class BuscarPorNome(EstrategiaBusca):

    def buscar(self, animais, criterio):

        resultados = []

        for animal in animais:
            if criterio.lower() in animal.get_nome().lower():
                resultados.append(animal)

        return resultados
