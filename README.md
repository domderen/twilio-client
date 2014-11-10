twilio-client
================

Twilio client element, being able to perform outgoing calls, receive incoming calls,
and supports browser-to-browser calls.

See the [component page](http://domderen.github.io/components/twilio-client) for more information.

## Getting Started

Inspired by Szymon Nowak during the presentation [WebRTC - so much more than just video conferencing](http://vimeo.com/111287617)

To run the demo application, please follow the steps described in the "Run demo" section.

## Example

Examplary use of the component on the web page. For 

    <twilio-client
    capailityToken="<YOUR-TWILIO-CAPABILITY-TOKEN>"
    capailityTokenUrl="<URL-TO-YOUR-TWILIO-APP>"
    number="<NUMBER-TO-PREFILL-THE-TEXTBOX>">
    clientName="<NAME-UNDER-WHICH-BROWSER-WIL-BE-REGISTERED-AS-A-CLIENT>"</twilio-client>
    
## Run demo

 To run the demo, first of all you will need a [twilio account](https://www.twilio.com/user/account).
 
 When you will have you account up and running, obtain following configuration parameters:
 - *accountSid*: Main account secure identifier, available at the main dashboard page.
 - *authToken*: Main account authentication token, available at the main dashboard page.
 - *applicationSid*: Secure identifier of your Twilio application. Available from **Dashboard -> DEV TOOLS -> TWIML APPS**. Here you can either create a new application, or use existing one. Base in mind that demo setup will require setting up Voice URL later on.
 - *callerId*: Verified caller identifier (number). Available from **Dashboard -> NUMBERS -> VERIFIED CALLER IDS**. Here you can verify a number, or buy a new one. Once you perform one of the two operations, save the verified number as your configuration parameter.
 
After collecting necessary parameters, it is time to setup demo server and clients. There are two possible ways of doing it:
 
### 1) Using Docker as application host
 
On a docker host machine, run command:
 
     docker run -d -p 3000:3000 domderen/twilio-client node /src/twilio-client/demo-server/index.js --accountSid <Your-accountSid> --authToken <Your-authToken> --applicationSid <Your-applicationSid> --callerId <Your-callerId>

### 2) Running demo server as node application
 
Open command line, and run following commands to start a web server with application:
 
     mkdir polymer-components // First two commands are not mandatory, but are recommended, as by default bower is configured with "directory": "../".
     cd polymer-components
     git clone https://github.com/domderen/twilio-client.git
     cd twilio-client
     npm install bower -g
     bower install
     cd demo-server
     npm install
     node index.js --accountSid <Your-accountSid> --authToken <Your-authToken> --applicationSid <Your-applicationSid> --callerId <Your-callerId>
      
**Bear in mind that server application has to be accessible by Twilio application, so you have to set up this application on public network.**

This will run the server-demo application on port 3000.
 
To check the setup go to: 

    http://[your-application-host]:3000/
 
 this should bring up a page with XML response:
 
    `<Response>
        <Dial callerId="48792467588">
            <Client>someClient</Client>
        </Dial>
    </Response>`
     
Next, to finish setting up Twilio application, go to your **Twilio Dashboard -> DEV TOOLS -> TWIML APPS** and edit the details of the application, you have previously selected. Here, as the Voice Request URL provide your main host address 
    
    http://[your-application-host]:3000/
     
and as a method choose HTTP GET.
 
Finally, go to **Dashboard -> NUMBERS -> TWILIO NUMBERS** and edit one of your numbers. In the details page, connect the number with the application that you have just configured.
 
Now you are ready to start using the twilio-client. Go to 

    http://[your-application-host]:3000/twilio-client/demo-clients/demo.html

and 

    http://[your-application-host]:3000/twilio-client/demo-clients/demo-second-client.html

in another browser window, to test browser-to-browser communication.

**Bear in mind, that "/twilio-client" part of URLs is the name of the directory, where you have have cloned this repo. If you cloned it to a directory different than 'twilio-client', you must update the paths to:

    http://[your-application-host]:3000/[twilio-component-folder-name]/demo-clients/demo.html

and

    http://[your-application-host]:3000/[twilio-component-folder-name]/demo-clients/demo-second-client.html
   
To perform a call to other browser window, just type the name of the client of the other window, and press the 'Call' button.
 
Enjoy!
