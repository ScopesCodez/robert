function Message(content, author) {
    this.content = content;
    this.author = author;
    this.date = new Date();
    this.id = Math.round(Math.random() * (99999999 - 10000000) + 10000000);
}

const br = document.createElement('br');
const allMessages = Object.keys(localStorage).map(x => localStorage.getItem(x));

for (var i = 0; i < allMessages.length; i++) {
    const message = JSON.parse(allMessages[i]);
    const date = new Date(message.date);
    
    const newMessage = document.createElement('article');
    newMessage.className = message.author === "Robort" ? 'message is-info' : 'message is-dark';
    newMessage.id = message.id;
    newMessage.innerHTML = `<div class="message-header">${message.author} <small>${date.getHours()}:${date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
    
    messagesBox.appendChild(newMessage);
}

function createMessage(author, content) {
    const message = new Message(content, author)
    console.log(message);
    localStorage.setItem(message.id, JSON.stringify({
        author: message.author,
        content: message.content,
        date: message.date
    }));
    return message;
}

const types = {
    hey: "greeting",
    hello: "greeting",
    hi: "greeting",
    howdy: "greeting",
    robert: "call"
};

const responses = {
    greeting: ["Hello! How you doin?", "Howdy!", "Hey there!", "Wassup!", "Yo what's good!"],
    call: ["That's me!", "Hi! How can I help?"]
};

function getReply(message) {
    let result = "I couldn't understand what you said."
    const words = message.toLowerCase().split(/\s+/);
    const type = words.find(x => !!x);

    if (type) {
        let replies;
        switch (type) {
            case 'greeting':
                result = responses.greeting[Math.floor(Math.random() * replies.length)];
                break;
            case 'call':
                result = responses.call[Math.floor(Math.random() * replies.length)];
        }
    }

    return result;
}

function reply(content) {
    const message = createMessage('Robort', content);
    const messagesBox = document.getElementById('messagesBox');
    const newMessage = document.createElement('article');
    newMessage.className = 'message is-info';
    newMessage.id = message.id;
    newMessage.innerHTML = `<div class="message-header">${message.author} <small>${message.date.getHours()}:${message.date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
    messagesBox.appendChild(newMessage);
    newMessage.scrollIntoView();
}

function registerMessage(messageContent=null) {
    const content = messageContent || document.getElementById('input').value;
    if (content.length < 1) return alert('Please enter a message');
    
    const message = createMessage('You', content);
    const messagesBox = document.getElementById('messagesBox');
    const newMessage = document.createElement('article');
    
    newMessage.className = 'message is-dark';
    newMessage.id = message.id;
    newMessage.innerHTML = `<div class="message-header">${message.author} <small>${message.date.getHours()}:${message.date.getMinutes()}</small></div><div class="message-body">${message.content}</div>`
    messagesBox.appendChild(newMessage);
    messagesBox.appendChild(br);
    messagesBox.appendChild(br);
    newMessage.scrollIntoView();
    
    document.getElementById('input').value = '';
    const replyMessage = getReply(message.content);
    setTimeout(() => reply(replyMessage), 500);
}

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode !== 13) return;
    registerMessage();
});
