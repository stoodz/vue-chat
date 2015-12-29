var socket = io('http://www.fieldapp.ca:3000');


//Initialize variables
//var $myUser =  document.querySelector('#my-user').getAttribute('value');
//var $theirUser = document.querySelector('#your-user').getAttribute('value');

Vue.component('chatboxes', {
    template: '#chatboxes-template',

    props: ['guestUser', 'chatBox'],

    data: function () {
        return {
            messages: [],
            message: '',
            myUsername: this.$parent.myUsername,
            openChat: true
        }
    },

    methods: {
        showChatBox: function () {
            this.chatBox = !this.chatBox;
        },

        toggleChatBody: function () {
            this.openChat = !this.openChat;
        },

        send: function (e) {
            socket.emit('chat-message', this.message);

            this.message = '';

            $( "#messageFocus" ).focus();

            e.preventDefault();
        },

        scrollText: function () {
            $('.chat-body')[0].scrollTop = $('.chat-body')[0].scrollHeight;
        }

    },

    ready: function () {
        socket.on('chat-message', function (message) {
            this.messages.push(message);
            this.scrollText();
        }.bind(this));
        socket.emit('add-user', this.myUsername);
    }

});


new Vue({
    el: '.chatContainer',

    data: {
        myUsername: document.querySelector('#my-user').getAttribute('value'),
        showUser: true
    },

    methods: {
        showChatBox: function (val) {
            this.$children[val].chatBox = !this.$children[val].chatBox;
        }
    }

});
