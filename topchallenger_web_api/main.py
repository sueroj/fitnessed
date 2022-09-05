
import random
import json

from http.client import responses
from flask import Flask, request, abort
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from controllers.profile_controller import ProfileController
from controllers.challenges_controller import ChallengesController

## Web API Configuration
# TODO: Validate all escape methods for invalid characters / XSS activities
# TODO: Move MongoDB config to seperate config file before next commit, update .gitignore
#  see https://docs.mongoengine.org/projects/flask-mongoengine/en/latest/
app = Flask(__name__)
# TODO: Remove in production build / Eval if required
CORS(app)
# app.run(debug=True) # TODO Warning: remove for production
# app.run(debug=True, use_debugger=False, use_reloader=False)

app.config['MONGODB_SETTINGS'] = {
    'db': 'topchallenger-db',
    'host': '127.0.0.1',
    'port': 27017
}
db: MongoEngine = MongoEngine(app)

## Initialize Controllers
profile_controller: ProfileController = ProfileController(app)
challenges_controller: ChallengesController = ChallengesController(app)


## Routes
@app.route('/')
def index():
    return f"<p> {app.config['MONGODB_SETTINGS']} </p>"

@app.route('/new_auth')
def generate_auth_key():
    # TODO: Implement security
    return str(random.randint(1, 20000))

# TODO: Get URL args using request.args.get('key', '')

# TODO: Implement security
# TODO: Implement XSS escape() security
## GET routes
@app.route('/challenges')
def get_challenges():
    return challenges_controller.read_all()

@app.route('/profile/<int:id>')
def get_profile(id: int):
    return profile_controller.read_profile(strava_id=id)

@app.route('/leaderboard')
def get_leaderboard():
    return profile_controller.read_leaderboard()


## POST routes
@app.route('/new_challenge', methods=['POST'])
def create_challenges():
    raw = request.get_json()['data']
    challenge = json.loads(raw)
    challenges_controller.create(challenge)
    return 'OK'

@app.route('/new_profile', methods=['POST'])
def create_profile():
    raw = request.get_json()['data']
    profile = json.loads(raw)
    profile_controller.create(profile)
    return 'OK'

@app.errorhandler(500)
def handle_internal_server_error(error):
    # return render_template('page_not_found.html'), 404
    abort(500)

