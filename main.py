# Created by Maximilian Matthe, Barkhausen Institut, 2022
# Licensed under General Public License v3


import flask
from flask import Flask, send_from_directory

import logging


app = flask.Flask(__name__)

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/host_action")
def hostAction():
    print("HOST Action!")
    return {}

if __name__ == '__main__':
    app.run()
