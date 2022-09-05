from typing import Union

from schema.schema import ProfileDocument, Title
from models.repository_abc import RepositoryABC


class ProfileModel(RepositoryABC):

    def create(self, strava_id: int, firstname: str, lastname: str) -> str:
        document = ProfileDocument()
        document.firstname = firstname
        document.lastname = lastname
        document.profile_id = strava_id # generate unique profile id string or number
        document.strava_id = strava_id
        document.img = ''
        document.rank = 1
        document.rp = 0
        document.rp_to_next = 0

        title = Title()
        title.first = ''
        title.middle = ''
        title.last = ''

        document.title = title
        document.home_id = 9999999 # TODO Lookup home ID
        document.save()
        return document.to_json()

    def read(self, strava_id: int) -> Union[str, None]:
        profile: ProfileDocument = ProfileDocument.objects(strava_id=strava_id)
        return profile.to_json() if profile else None

    def read_all(self) -> str:
        profile: ProfileDocument = ProfileDocument.objects()
        return profile.to_json()




