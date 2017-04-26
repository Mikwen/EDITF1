# EDITF1

This application is a school project where one can add users, courses and lecture with differing information on a web site and then get summaries from these as the lecturer(admin) adds them.
The backend consists of 2 collections (a user collection and a lecture collection). The user collection is also linked to the courses.

The routes go via their own respective models with custom schemas and the route links are directly implemented into the function so one can easily update the handlebars. 


Technologies used:
- MongoDB
- Node js (express, handlebars, npm, json)
- HTML
- CSS
- GitBash (mainly for testing puproses)




## Install web service:
### Requirements:
- node.js
- mongodb
```
git clone https://github.com/Mikwen/EDITF1.git
cd EDITF1
npm install
utils/createCourse TDT4140 Programvareutvikling
```
Change ip address in routes/index.js to your servers ip.

## Install summary bot:
Uses python3.
### Required libraries
- networkx
- nltk
- io
- itertools
- pdfminer.six
- reportlab
```
git clone https://github.com/Mikwen/summary-service.git
sudo pip3 install <each required library>
```
Open a python shell and run 
```
import nltk
nltk.download('punkt')
```
## To run full application
Terminal 1:
```
cd EDITF1
node app
```
Terminal 2:
```
python3 summary-service/summary-service.py EDITF1/public/files
```
In a browser open http://\<server-ip\>:3000
