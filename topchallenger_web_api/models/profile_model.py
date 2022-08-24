
from typing import Union

from schema.schema import ProfileDocument, Title

class ProfileModel:
    def __init__(self) -> None:
        self.profile = ProfileDocument()

    def new_profile(self, profile: dict) -> str:
        self.profile.firstname = profile.get('firstname')
        self.profile.lastname = profile.get('lastname')
        self.profile.profile_id = profile.get('profile_id') # generate unique profile id string or number
        self.profile.strava_id = profile.get('strava_id')
        self.profile.img = ''
        self.profile.rank = profile.get('rank')
        self.profile.rp = profile.get('rp')
        self.profile.rp_to_next = profile.get('rp_to.next')

        title = Title()
        title.first = ''
        title.middle = ''
        title.last = ''

        self.profile.title = title
        self.profile.home_id = profile.get() # TODO Lookup home ID
        self.profile.save()
        return self.profile.to_json()

    def read_profile(self, strava_id: int) -> Union[str, None]:
        profile: ProfileDocument = ProfileDocument.objects(strava_id=strava_id)
        return profile.to_json() if profile else None




