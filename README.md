SnapNote

How to Run the App

We developed SnapNote as an HTML5 web application and used Phonegap to port it to Android devices. While you could setup an Android emulator or device to run our app, it is simpler and easier to use a local web server (i.e. Python’s simple HTTP server) to host the web app and run it in a web browser. The following instructions follow this simplified approach.


Installation steps:

If you don’t already have Python installed, download and install Python from http://www.python.org/download/
Open a command prompt or terminal and navigate to the app/www directory in the SnapNote source directory.
If you have Python version 2.7.6 or below, run: python -m SimpleHTTPServer
If you have Python version 3.0 or above, run: python -m http.server
Take note of the URL and port number that the Python server is hosting.
Open up a web browser (preferably Google Chrome) and go to the specified URL (probably localhost:8000). You should see the SnapNote app home screen.
Reduce the width and height of the web browser to roughly match that of a mobile phone.