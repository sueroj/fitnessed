from abc import ABC, abstractmethod, abstractproperty

class RepositoryABC(ABC):
    def __init__(self) -> None:
        # MongoDB session create
        pass
    
    @abstractmethod
    def create(self) -> None:
        raise NotImplementedError
    
    # @abstractmethod
    # def get(self) -> object:
    #     raise NotImplementedError

    # @abstractmethod
    # def post(self) -> None:
    #     raise NotImplementedError
