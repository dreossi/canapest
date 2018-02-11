from app import app
from flask import jsonify, render_template, Response, request
import os 
from werkzeug.utils import secure_filename


@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')


@app.route('/upload_image', methods = ['POST', "GET"])
def upload_image():
  print request.headers

  data = run_neural_net()
  if request.method == 'POST':
    if 'file' in request.files:
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      print 'Saved file'
    else:
      print 'No file'
  #else:
    #continue
  resp = jsonify(data)
  resp.status_code = 200
  return resp



def run_neural_net():
  #todo tie this to backend 
  return {'good': 55,'bad':45}