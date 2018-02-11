import dataset
import tensorflow as tf
import time
from datetime import timedelta
import math
import random
import numpy as np

def create_weights(shape):
    return tf.Variable(tf.truncated_normal(shape, stddev=0.05))


def create_biases(size):
    return tf.Variable(tf.constant(0.05, shape=[size]))


def create_convolutional_layer(input, num_input_channels, conv_filter_size, num_filters):
    '''Create a convolutional layer + max pool + relu activation'''

    # Trainable weights and biases
    weights = create_weights(shape=[conv_filter_size, conv_filter_size, num_input_channels, num_filters])
    biases = create_biases(num_filters)

    # Create the convolutional layer
    layer = tf.nn.conv2d(input=input, filter=weights, strides=[1, 1, 1, 1], padding='SAME')
    layer += biases

    # Max-pooling.
    layer = tf.nn.max_pool(value=layer, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')

    # Relu activation function
    layer = tf.nn.relu(layer)

    return layer

def create_max_pool_layer(layer):
    return tf.nn.max_pool(value=layer, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')

def create_relu_layer(layer):
    return tf.nn.relu(layer)

def create_flatten_layer(layer):
    '''Flatten layer of dimension  [batch_size img_size img_size num_channels] to single column tensor'''

    layer_shape = layer.get_shape()
    num_features = layer_shape[1:4].num_elements()

    # Flatten layer reshaped to num_features
    layer = tf.reshape(layer, [-1, num_features])

    return layer


def create_fc_layer(input, num_inputs, num_outputs, use_relu=True):
    '''Create fully connected layer'''

    #Trainable weights and biases
    weights = create_weights(shape=[num_inputs, num_outputs])
    biases = create_biases(num_outputs)

    # Fully connected layer takes input x and produces wx+b
    layer = tf.matmul(input, weights) + biases
    if use_relu:
        layer = tf.nn.relu(layer)

    return layer
