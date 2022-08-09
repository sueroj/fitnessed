from flask import Flask
from flask_mongoengine import MongoEngine
from models.profile import Profile

# TODO: Validate all escape methods for invalid characters / XSS activities
# TODO: Move MongoDB config to seperate config file before next commit, update .gitignore
#  see https://docs.mongoengine.org/projects/flask-mongoengine/en/latest/
app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'topchallenger-db',
    'host': '127.0.0.1',
    'port': 27017
}
db: MongoEngine = MongoEngine(app)

@app.route('/')
def index():
    return f"<p> {app.config['MONGODB_SETTINGS']} </p>"

@app.route('/test')
def test_db():
    Profile().create('Joel', 'Suero')
