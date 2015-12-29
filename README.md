# vue-chat

 This simple chat application is an example of writing a socket.io app using the new vue.js framework.

## Function

 A node.js server runs on port 3000, which is defined in index.js. App.js starts the session, and
 instantiates a vue instance. The vue instance includes a global component, which are essentially
 the chat boxes for each individual conversation.

 The buttons at the top of index.html have been hard coded, however the idea is to attach this
 to a larger application that includes multiple users already. These buttons would be dynamically
 built, specific to each user that is chat enabled.

 By clicking a button, a vue component instance is activated (using v-show basically it component
 is brought into view). A two way socket user to socket user will be started. (this functionality
 has not been written yet.)


