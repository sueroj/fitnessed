from flask import Flask
from abc import ABC, abstractmethod, abstractproperty


class RepositoryABC(ABC):
    # def __init__(self) -> None:
    #     pass
    
    @abstractmethod
    def create(self) -> str:
        raise NotImplementedError
    
    @abstractmethod
    def read(self) -> str:
        raise NotImplementedError
    
    # @abstractmethod
    # def get(self) -> object:
    #     raise NotImplementedError

    # @abstractmethod
    # def post(self) -> None:
    #     raise NotImplementedError
