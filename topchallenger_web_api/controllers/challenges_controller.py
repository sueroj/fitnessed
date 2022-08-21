import logging
from flask import Flask

from controllers.repository_abc import RepositoryABC
from models.challenge_model import ChallengeModel



class ChallengesController(RepositoryABC):
    def __init__(self, app: Flask) -> None:
        super().__init__(app)
        self.challenge: ChallengeModel = ChallengeModel()

    # TODO: Implement method for generating unique IDs for each new user profile
    # TODO: Also think of ways to backup user data on Databases
    def create(self, challenge: dict):
        # self._app.logger.info(f'[ChallengesController] create new challenge: {challenge}')
        result = self.challenge.new_challenge(challenge)
        self._app.logger.info(f'[ChallengesController] created new challenge: {challenge}')

    # TODO: Eval if exception handling required
    def read(self) -> str:
        self._app.logger.info(f'[ChallengesController] read all challenges')
        json = self.challenge.read_all()
        return json