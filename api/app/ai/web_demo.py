import sys, getopt
import cv2

import tensorflow as tf
from model import Model
#import cv2
import matplotlib.image as mpimg

graph_path = 'canapest-multi-model.meta'
checkpoints_path = './'



def run(image_path):
    with tf.Session() as sess:
        nn = Model()
        nn.init(graph_path, checkpoints_path, sess)
        #image = cv2.imread(image_path)
        image = cv2.imread(image_path)

        print(nn.predict(image)[0])

if __name__ == "__main__":
   run(sys.argv[1:])

    