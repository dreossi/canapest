from app import app
from flask import jsonify
from flask import Response
from flask import request

@app.route('/')
@app.route('/index')
def index():
  return "Hello, World!"


@app.route('/upload_image', methods = ['POST', "GET"])
def upload_image():
  if 'file' in request.files:
    f = request.files['file']
    f.save(secure_filename(f.filename))
  data = run_neural_net()
  resp = jsonify(data)
  resp.status_code = 200
  return resp



def run_neural_net():
  return {'good': 55,'bad':45}