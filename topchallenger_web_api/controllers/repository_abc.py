from flask import Flask
from abc import ABC, abstractmethod, abstractproperty

class RepositoryABC(ABC):
    def __init__(self, app: Flask) -> None:
        # MongoDB session create
        self._app = app
    
    @abstractmethod
    def create(self) -> None:
        raise NotImplementedError
    
    # @abstractmethod
    # def get(self) -> object:
    #     raise NotImplementedError

    # @abstractmethod
    # def post(self) -> None:
    #     raise NotImplementedError
