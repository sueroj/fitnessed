
import random
import json

from http.client import responses
from flask import Flask, request, abort
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from controllers.profile import ProfileController
from controllers.challenges import ChallengesController

## Web API Configuration
# TODO: Validate all escape methods for invalid characters / XSS activities
# TODO: Move MongoDB config to seperate config file before next commit, update .gitignore
#  see https://docs.mongoengine.org/projects/flask-mongoengine/en/latest/
app = Flask(__name__)
# TODO: Remove in production build / Eval if required
CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'topchallenger-db',
    'host': '127.0.0.1',
    'port': 27017
}
db: MongoEngine = MongoEngine(app)

## Initialize Controllers
profile: ProfileController = ProfileController(app)
challenges: ChallengesController = ChallengesController(app)


## Routes
@app.route('/')
def index():
    return f"<p> {app.config['MONGODB_SETTINGS']} </p>"

@app.route('/test')
def test_db():
    Profile().create('Joel', 'Suero')

@app.route('/new_auth')
def generate_auth_key():
    # TODO: Implement security
    return str(random.randint(1, 20000))

# @app.route('/profile', methods=['POST'])
# def get_profile():
#     strava_id = request.form['strava_id']
#     action = request.form['action']
#     print(strava_id)
#     print(action)

# TODO: Get URL args using request.args.get('key', '')

# TODO: Implement security
# TODO: Implement XSS escape() security
@app.route('/profile/<int:id>')
def get_profile(id: int):
    app.logger.info(f'[GET/profile] id={id}')
    return profile.read(strava_id=id)


@app.route('/challenges')
def get_challenges():
    app.logger.info(f'[GET/challenges] Start')
    return challenges.read()

@app.route('/new_challenge' , methods=['POST'])
def create_challenges():
    raw = request.get_json()['data']
    challenge = json.loads(raw)
    challenges.create(challenge)
    return 'OK'

@app.errorhandler(500)
def handle_internal_server_error(error):
    # return render_template('page_not_found.html'), 404
    abort(500)

