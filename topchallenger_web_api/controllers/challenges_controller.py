from flask import Flask

from models.challenge_model import ChallengeModel
from controllers.controller import Controller


# TODO: IMPLEMENT - Challenges required in order to rank up
# TODO: TEST - Implement unit tests against database stored data. To catch corrupted data, broken pipelines, etc
class ChallengesController(Controller):
    def __init__(self, app: Flask) -> None:
        super().__init__(app)
        self.challenge: ChallengeModel = ChallengeModel()

    # TODO: Implement method for generating unique IDs for each new user profile
    # TODO: Also think of ways to backup user data on Databases
    def create(self, challenge: dict):
        # self._app.logger.info(f'[ChallengesController] create new challenge: {challenge}')
        result = self.challenge.create(challenge)
        self._app.logger.info(f'[ChallengesController] created new challenge: {challenge}')

    # TODO: Eval if exception handling required
    def read_all(self) -> str:
        self._app.logger.info(f'[ChallengesController] read all challenges')
        json = self.challenge.read()
        return json