from json import JSONDecoder
from flask import Flask

from libs.leaderboard import Leaderboard
from models.profile_model import ProfileModel
from controllers.controller import Controller


class ProfileController(Controller):
    def __init__(self, app: Flask) -> None:
        super().__init__(app)
        self.profile: ProfileModel = ProfileModel()

    # TODO: Implement method for generating unique IDs for each new user profile
    # TODO: Also think of ways to backup user data on Databases
    def create(self, strava_id: int, firstname: str, lastname: str):
        self._app.logger.info(f'[ProfileController] create new profile: strava_id={strava_id}')
        json = self.profile.create(strava_id, firstname, lastname)
        return json

    def read_profile(self, strava_id: int) -> str:
        self._app.logger.info(f'[ProfileController] read profile: strava_id={strava_id}')
        json = self.profile.read(strava_id)
        if not json:
            json = self.create(strava_id, 'Test', 'Only') # TODO: Test Only
        return json

    def read_leaderboard(self) -> str:
        self._app.logger.info(f'[ProfileController] read leaderboard')
        decoder = JSONDecoder()
        json = self.profile.read_all()
        profiles = decoder.decode(json)
        leaderboard = Leaderboard(profiles).get()
        return leaderboard