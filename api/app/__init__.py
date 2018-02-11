from flask import Flask
import os

app = Flask(__name__)
app.debug = True
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
print app.config
print
from app import routes