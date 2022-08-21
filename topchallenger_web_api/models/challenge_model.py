from typing import Union

from schema.schema import ChallengeDocument, GeoJSON

class ChallengeModel:

    def new_challenge(self, challenge: dict) -> str:
        document = ChallengeDocument()
        document.challenge_id = challenge.get('challenge_id')
        document.name = challenge.get('name')
        document.img = challenge.get('img')
        document.category_major = challenge.get('category_major')
        document.category_minor = challenge.get('category_minor')
        
        document.description = challenge.get('description')
        document.difficulty = challenge.get('difficulty')
        
        document.coordinates = challenge.get('coordinates')
        document.start_coords = challenge.get('start_coords')
        document.finish_coords = challenge.get('finish_coords')

        # self.challenge.start_datetime = challenge.get('start_datetime')
        # self.challenge.stop_datetime = challenge.get('stop_datetime')

        document.is_open = challenge.get('is_open')
        document.is_mappable = challenge.get('is_mappable')
        document.is_featured = challenge.get('is_featured') # TODO: Consider refactor to new featured system
        document.accept_required = challenge.get('accept_required')
        result = document.save()
        return result

    def read_all(self) -> str:
        challenges: ChallengeDocument = ChallengeDocument.objects()
        return challenges.to_json()

    # new challenge
    # read one
    # read all