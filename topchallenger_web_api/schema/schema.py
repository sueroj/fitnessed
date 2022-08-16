"""Top Challenger Mongo DB Schema

Note: Do not use 'id' as document field
"""

from enum import unique
import mongoengine as mongo

# TODO: consider refactoring/grouping embedded document fields into seperate file
class Title(mongo.EmbeddedDocument):
    first = mongo.StringField()
    middle = mongo.StringField()
    last = mongo.StringField()

class ProfileDocument(mongo.Document):
    profile_id = mongo.IntField(required=True, unique=True)
    strava_id = mongo.IntField(required=True, unique=True)
    firstname = mongo.StringField()
    lastname = mongo.StringField()
    rank = mongo.IntField()
    rp = mongo.IntField()
    rp_to_next = mongo.IntField()
    title = mongo.EmbeddedDocumentField(Title)
    home_id = mongo.IntField()
    img = mongo.StringField() # TODO: mongo.ImageField ?

class ChallengeDocument(mongo.Document):
    challenge_id = mongo.IntField(required=True, unique=True)
    name = mongo.StringField()
    # category_major = mongo.EnumField()
    # category_minor = mongo.EnumField()
    # TODO coordinates = TBC
    start_datetime = mongo.DateTimeField()
    stop_datetime = mongo.DateTimeField()
    difficulty = mongo.IntField()
    img = mongo.StringField() # TODO: mongo.ImageField ?
    description = mongo.StringField()

    is_mappable = mongo.BooleanField()
    is_open = mongo.BooleanField()
    is_featured = mongo.BooleanField()



    





