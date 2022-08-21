
from typing import Union

from schema.schema import ProfileDocument, Title

class ProfileModel:
    def __init__(self) -> None:
        self.profile = ProfileDocument()

    def new_profile(self, strava_id: int, firstname: str, lastname: str) -> str:
        self.profile.firstname = firstname
        self.profile.lastname = lastname
        self.profile.profile_id = 100 # generate unique profile id string or number
        self.profile.strava_id = strava_id
        self.profile.img = ''
        self.profile.rank = 1
        self.profile.rp = 0
        self.profile.rp_to_next = 0

        title = Title()
        title.first = ''
        title.middle = ''
        title.last = ''

        self.profile.title = title
        self.profile.home_id = None # Lookup home ID
        self.profile.save()
        return self.profile.to_json()

    def read_profile(self, strava_id: int) -> Union[str, None]:
        profile: ProfileDocument = ProfileDocument.objects(strava_id=strava_id)
        return profile.to_json() if profile else None




