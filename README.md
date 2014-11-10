twilio-client
================

See the [component page](http://domderen.github.io/twilio-client) for more information.

## Getting Started

Twilio client element, being able to perform outgoing calls, receive incoming calls,
and supports browser-to-browser calls.

Inspired by Szymon Nowak during the presentation [WebRTC - so much more than just video conferencing](http://vimeo.com/111287617)

## Example

    <twilio-client
    capailityToken="54h54h7j8k8"
    capailityTokenUrl="<URL-TO-YOUR-TWILIO-APP>"
    number="=48123456789">
    clientName="someName"</twilio-client>
    
## Run demo

 To run the demo, first of all you will need a [twilio account](https://www.twilio.com/user/account).
 
 When you will have you account up and running, obtain following configuration parameters:
 - accountSid: Main account secure identifier, available at the main dashboard page.
 - authToken: Main account authentication token, available at the main dashboard page.
 - applicationSid: Secure identifier of your Twilio application. Available from Dashboard -> DEV TOOLS -> TWIML APPS. Here you can either create a new application, or use existing one. Base in mind that demo setup will require setting up Voice URL later on.
 - callerId: Verified caller identifier (number). Available from Dashboard -> NUMBERS -> VERIFIED CALLER IDS. Here you can verify a number, or buy a new one. Once you perform one of the two operations, save the verified number as your configuration parameter.
 
 After collecting necessary parameters, it is time to setup demo server and clients. There are two possible ways of doing it:
 
 1) Using Docker as application host
 
 On a docker host machine, run command:
 
     
