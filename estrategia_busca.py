from abc import ABC, abstractmethod


class EstrategiaBusca(ABC):

    @abstractmethod
    def buscar(self, animais, criterio):
        pass
