from flask import Flask


class Controller:
    def __init__(self, app: Flask) -> None:
        self._app = app
