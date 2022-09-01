from flask import Flask

from controllers.repository_abc import RepositoryABC
from models.profile_model import ProfileModel


class ProfileController(RepositoryABC):
    def __init__(self, app: Flask) -> None:
        super().__init__(app)
        self.profile: ProfileModel = ProfileModel()

    # TODO: Implement method for generating unique IDs for each new user profile
    # TODO: Also think of ways to backup user data on Databases
    def create(self, strava_id: int, firstname: str, lastname: str):
        self._app.logger.info(f'[ProfileController] create new profile: strava_id={strava_id}')
        json = self.profile.new_profile(strava_id, firstname, lastname)
        return json

    def read(self, strava_id: int) -> str:
        self._app.logger.info(f'[ProfileController] read profile: strava_id={strava_id}')
        json = self.profile.read_profile(strava_id)
        if not json:
            json = self.create(strava_id, 'Test', 'Only') # TODO: Test Only
        return json