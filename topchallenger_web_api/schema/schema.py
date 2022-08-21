"""Top Challenger Mongo DB Schema

Note: Do not use 'id' as document field
"""

import mongoengine as mongo
# from schema.enums import *

# TODO: consider refactoring/grouping embedded document fields into seperate file
class Title(mongo.EmbeddedDocument):
    first = mongo.StringField()
    middle = mongo.StringField()
    last = mongo.StringField()

class GeoJSON(mongo.EmbeddedDocument):
    lng = mongo.IntField()
    lat = mongo.IntField()

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
    img = mongo.StringField() # TODO: mongo.ImageField ?
    category_major = mongo.StringField()
    category_minor = mongo.StringField()

    description = mongo.StringField()
    difficulty = mongo.IntField()

    coordinates = mongo.ListField()
    start_coords = mongo.DictField()
    finish_coords = mongo.DictField()

    start_datetime = mongo.DateTimeField()
    stop_datetime = mongo.DateTimeField()

    is_mappable = mongo.BooleanField()
    is_open = mongo.BooleanField()
    is_featured = mongo.BooleanField() # TODO: Consider refactor to new featured system
    accept_required = mongo.BooleanField()



    





