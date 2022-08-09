import logging

from models.repository_abc import RepositoryABC
from schema.schema import ProfileDocument


class Profile(RepositoryABC):
    def __init__(self) -> None:
        super().__init__()
        self.profile = ProfileDocument()

    # TODO: Implement method for generating unique IDs for each new user profile
    # TODO: Also think of ways to backup user data on Databases
    def create(self, firstname: str, lastname: str):
        logging.info('Create new profile')
        # TODO: Test only
        id = 12345
        firstname = 'Joel'
        lastname = 'Suero'

        # new_profile = ProfileModel(profile_id=id, firstname=firstname, lastname=lastname)
        self.profile.profile_id = id
        self.profile.firstname = firstname
        self.profile.lastname = lastname
        self.profile.save()
    