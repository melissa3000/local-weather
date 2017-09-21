from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import json, requests, os, urllib2
from pprint import pprint


app = Flask(__name__)



# Required to use Flask sessions and the debug toolbar
app.secret_key = "ABC"



@app.route("/")
def index():
    """Return home page."""

    return render_template("index.html")


@app.route("/get-weather", methods=['GET'])
def getWeatherPy():
    """Gets local weather from API"""

    lat = request.args.get("lat")
    lon = request.args.get("lon")


    # make API call to weather site and return response Python object
    response = requests.get("https://fcc-weather-api.glitch.me/api/current?lat=%s&lon=%s" % (lat, lon))


    # convert response object to python dict
    # dict used to work with data, but not send over internet
    data = response.json()
    # pprint(data)

    weather = data['weather'][0]['description']
    icon = data['weather'][0]['icon']
    humidity = data['main']['humidity']
    temp = data['main']['temp']
    # print weather, humidity, temp

    results = [weather, icon, humidity, temp]

    # converts dictionary to string so that it can be sent over http and displayed
    # as result on local server
    return json.dumps(results)

@app.route("/error")
def error():
    raise Exception("Error!")


if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    # app.debug = True

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    # import sys
    # if sys.argv[-1] == "jstest":
    #     JS_TESTING_MODE = True

    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = "NO_DEBUG" not in os.environ

    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)


    app.run(host="0.0.0.0")
