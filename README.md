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
In a browser:
1. Open http://\<server-ip\>:3000.
2. Click "Register" and make a user.
3. Log in.
4. Enter "TDT4140" in the text field on the left and click the '+', button.
5. Refresh the page.
6. Click the "TDT4140" button on the left.
7. Scroll down and upload a pdf file using the form.
9. The bot will start generating the summary.
10. Wait a minute and refresh the page.
11. Both the original file and the summary is available and can be read by clicking them.
