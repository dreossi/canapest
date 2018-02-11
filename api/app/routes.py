from app import app
from flask import jsonify, render_template, Response, request
import os 
from werkzeug.utils import secure_filename
from flask import make_response
import json

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')


@app.route('/upload_image', methods = ['POST'])
def upload_image():
  data = run_neural_net()
  print dir(request)
  if request.method == 'POST':
    if 'file' in request.files:
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      print 'Saved file'
    else:
      print 'No file'
  resp = Response(json.dumps(data),status=200,mimetype='application/json')
  return resp



def run_neural_net():
  #todo tie this to backend 
  return {'good': 55,'bad':45}