from flask import Flask
import os


from flask import jsonify, render_template, Response, request
import os 
from werkzeug.utils import secure_filename
from flask import make_response
import json
import ai.model as am


import sys, getopt
import cv2
import tensorflow as tf
import matplotlib.image as mpimg


from flask import Flask

app = Flask(__name__)
app.debug = True
APP_ROOT = os.path.dirname(os.path.abspath(__file__))


UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')


@app.route('/upload_image', methods = ['POST'])
def upload_image():
  data = run_neural_net()
  if request.method == 'POST':
    if 'file' in request.files:
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      data['saved_file']= True
      print 'Saved file'
      #call the classifier here, return the result

      with tf.Session() as sess:
      	print
        print '************************************'
        print 
        print dir(ai)
        
        print 
        print '************************************'
      	
        nn = am.Model()
        nn.init(sess)
        #image = cv2.imread(image_path)
        image = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        classifier_result = nn.predict(image)[0] 
        
        data['classifier_result'] = classifier_result

    else:
      print 'No file'
  
  resp = jsonify(data)
  resp.status_code = 200
  return resp



def run_neural_net():
  #todo tie this to backend 
  return {'good': 55,'bad':45}