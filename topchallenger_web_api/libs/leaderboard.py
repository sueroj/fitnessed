from typing import List

from schema.schema import ProfileDocument

class Leaderboard:
    def __init__(self, profiles: List[ProfileDocument]) -> None:
        self.profiles = profiles

    def get(self):
        def _by_rank(profile: ProfileDocument):
            return profile['rank']
        
        self.profiles.sort(key=_by_rank)
        return self.profiles
