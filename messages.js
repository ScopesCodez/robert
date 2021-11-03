class Message {
    constructor(content, author) {
        this.content = content;
        this.author = author;
        this.date = new Date();
        this.id = Math.round(Math.random() * (99999999 - 10000000) + 10000000);
    }
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

let allMessages = allStorage();
for (var i = 0; i < allMessages.length; i++) {
    let message = JSON.parse(allMessages[i]);
    if (message.author == "Robort") {
        let newMessage = document.createElement('article');
        newMessage.className = 'message is-info';
        newMessage.id = message.id;
        let date = new Date(message.date);
        newMessage.innerHTML = `<div class="message-header">${message.author} <small>${date.getHours()}:${date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
        messagesBox.appendChild(newMessage);
    } else {
        let newMessage = document.createElement('article');
        newMessage.className = 'message is-dark';
        newMessage.id = message.id;
        let date = new Date(message.date);
        newMessage.innerHTML = `<div class="message-header">${message.author} <small>${date.getHours()}:${date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
        messagesBox.appendChild(newMessage);
    }
}

function createMessage(author, content) {
    let message = new Message(content, author)
    console.log(message);
    localStorage.setItem(message.id, JSON.stringify({
        author: message.author,
        content: message.content,
        date: message.date
    }));
    return message;
}

let types = {
    hey: "greeting",
    hello: "greeting",
    hi: "greeting",
    howdy: "greeting",
    robert: "call"
}

let responses = {
    greeting: ["Hello! How you doin?", "Howdy!", "Hey there!", "Wassup!", "Yo what's good!"],
    call: ["That's me!", "Hi! How can I help?"]
}

function getReply(message) {
    let content = message.toLowerCase();
    let result = "I couldn't understand what you said."
    let type;
    let words = content.split(' ');
    for (var i = 0; i < words.length; i++) {
        if (types[words[i]]) {
            type = types[words[i]];
            break
        }
    }
    if (type) {
        let replies;
        switch(type) {
            case 'greeting':
                replies = responses.greeting
                result = replies[Math.floor(Math.random() * replies.length)];
                break;
            case 'call':
                replies = responses.call
                result = replies[Math.floor(Math.random() * replies.length)];
                break;
        }
    }

    return result;
}

function reply(content) {
    let message = createMessage('Robort', content);
    let messagesBox = document.getElementById('messagesBox');
    let newMessage = document.createElement('article');
    newMessage.className = 'message is-info';
    newMessage.id = message.id;
    newMessage.innerHTML = `<div class="message-header">${message.author} <small>${message.date.getHours()}:${message.date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
    messagesBox.appendChild(newMessage);
    newMessage.scrollIntoView();
}

function registerMessage(messageContent=null) {
    let content = messageContent || document.getElementById('input').value;
    if (content.length < 1) {return alert('Please enter a message')}
    let message = createMessage('You', content);
    let messagesBox = document.getElementById('messagesBox');
    let newMessage = document.createElement('article');
    let br = document.createElement('br');
    newMessage.className = 'message is-dark';
    newMessage.id = message.id;
    newMessage.innerHTML = `<div class="message-header">${message.author} <small>${message.date.getHours()}:${message.date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
    messagesBox.appendChild(newMessage);
    messagesBox.appendChild(br);
    messagesBox.appendChild(br);
    newMessage.scrollIntoView();
    document.getElementById('input').value = '';
    let replyMessage = getReply(message.content);
    setTimeout(() => {
        reply(replyMessage);
    }, 500);
}

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode !== 13) {
      return;
    }
    registerMessage();
  });