let toggleButton = document.getElementById("toggle")
toggleButton.addEventListener("click", event => {
    var body = document.getElementById("body");
    if(toggleButton.textContent === "Toggle Night Mode"){
        toggleButton.textContent = "Light Mode"
    }else{
        toggleButton.textContent = "Toggle Night Mode"
    }
    var currentClass = body.className;
    body.className = currentClass == "bg-light" ? "bg-dark" : "bg-light";
})

let botui = new BotUI("chat-bot-ui")

botui.message.add({
    delay: 1000,
    loading: true,
    content: "Hello, I am Ace. Welcome to Ace Africa."
}).then(function() {
    botui.message.add({ // show a message
        delay: 1000,
        loading: true,
        content: `Can I know your name?`
    }).then(function() { // wait till its shown
        return botui.action.text({ // show 'text' action
            action: {
                placeholder: 'Your name'
            }
        })
    }).then(function(res) { // get the result
    botui.message.add({
        content: 'Hello ' + res.value + ', ' +
            'Good to have you here, hope you\'re good?'
    });
    }).then(function() {
    return botui.action.button({
        delay: 1000,
        loading: true,
        action: [{
            text: "Yes, I am.",
            value: "Yes"
        }, {
            text: "No, I'm not.",
            value: "No"
        }]
        })
    }).then(function(res) {
        var message
        if (res.value === "Yes"){
            message = "Very good then."
        }else if(res.value === "No"){
            message = "Oh! Sorry. It will be alright, I promise." 
         }
        return botui.message.add({
         type: 'html',
         delay: 1000,
         loading: true,
         content: message
     });
     }).then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: `Let's get down to business. What do you really want to know about Ace Africa?`
        })
    }).then(function() { // The questions the bot can answer, set 1
        return botui.action.button({
            delay: 1000,
            loading: true,
            action: [{
                text: 'Who is Ace Africa?',
                value: 'afox'
            }, {
                text: 'What Services do they offer?',
                value: 'services'
            }, {
                text: 'How can I contact them?',
                value: 'contact'
            }, {
                text: 'What is the cost of their training?',
                value: 'hobbies'
            } ]
        });
    }).then(function(res) { //the answer to bot questions
        var message;
        if (res.value === "afox") {
            message =
                "Ace Africa is a computer science enthusiast with great passion for technology.<br>" + 
                "He is also a young enterprenuer that loves meeting with people."
        } else if (res.value === "services") {
            message =
                'As a software developer, he offers the following services:<br>' +
                ' Web Development' +
                ' Mobile Development'+
                'Graphics Design'
        } else if (res.value === "contact") {
            message =
                'You can contact him via his email: @afolwalex,gmail.com, Twitter: @afolwalex or on WhatsApp and Calls' +
                'on 09051151706';
        } else if (res.value === "hobbies") {
            message =
                'Afolwalex loves watching football and listening to music.';
        } 
        return botui.message.add({
            type: 'html',
            delay: 1000,
            loading: true,
            content: message
        });
    }).then(function() { // The questions the bot can answer, set 2
        return botui.action.button({
            delay: 1000,
            loading: true,
            action: [{
                text: 'Who is Afolwalex?',
                value: 'afox'
            }, {
                text: 'What Services does he offer?',
                value: 'services'
            }, {
                text: 'How should I contact him?',
                value: 'contact'
            }, {
                text: 'What are his hobbies?',
                value: 'hobbies'
            } ]
        });
    }).then(function(res) { //the answer to bot questions
        var message;
        if (res.value === "afox") {
            message =
                "Afolwalex is a computer science enthusiast with great passion for technology.<br>" + 
                "He is also a young enterprenuer that loves meeting with people."
        } else if (res.value == "services") {
            message =
                'As a software developer, he offers the following services:<br>' +
                ' Web Development' +
                ' Mobile Development'+
                'Graphics Design'
        } else if (res.value === "contact") {
            message =
                'You can contact him via his email: @afolwalex,gmail.com, Twitter: @afolwalex or on WhatsApp and Calls' +
                'on 09051151706';
        } else if (res.value === "hobbies") {
            message =
                'Afolwalex loves watching football and listening to music.';
        } 
        return botui.message.add({
            type: 'html',
            delay: 1000,
            loading: true,
            content: message
        });
    }).then(function() { // The questions the bot can answer, set 3
        return botui.action.button({
            delay: 1000,
            loading: true,
            action: [{
                text: 'Who is Afolwalex?',
                value: 'afox'
            }, {
                text: 'What Services does he offer?',
                value: 'services'
            }, {
                text: 'How should I contact him?',
                value: 'contact'
            }, {
                text: 'What are his hobbies?',
                value: 'hobbies'
            } ]
        });
    }).then(function(res) { //the answer to bot questions
        var message;
        if (res.value === "afox") {
            message =
                "Afolwalex is a computer science enthusiast with great passion for technology.<br>" + 
                "He is also a young enterprenuer that loves meeting with people."
        } else if (res.value == "services") {
            message =
                'As a software developer, he offers the following services:<br>' +
                ' Web Development' +
                ' Mobile Development'+
                'Graphics Design'
        } else if (res.value === "contact") {
            message =
                'You can contact him via his email: @afolwalex,gmail.com, Twitter: @afolwalex or on WhatsApp and Calls' +
                'on 09051151706';
        } else if (res.value === "hobbies") {
            message =
                'Afolwalex loves watching football and listening to music.';
        } 
        return botui.message.add({
            type: 'html',
            delay: 1000,
            loading: true,
            content: message
        });
    }).then(function() { // The questions the bot can answer, set 4
        return botui.action.button({
            delay: 1000,
            loading: true,
            action: [{
                text: 'Who is Afolwalex?',
                value: 'afox'
            }, {
                text: 'What Services does he offer?',
                value: 'services'
            }, {
                text: 'How should I contact him?',
                value: 'contact'
            }, {
                text: 'What are his hobbies?',
                value: 'hobbies'
            } ]
        });
    }).then(function(res) { //the answer to bot questions
        var message;
        if (res.value === "afox") {
            message =
                "Afolwalex is a computer science enthusiast with great passion for technology.<br>" + 
                "He is also a young enterprenuer that loves meeting with people."
        } else if (res.value == "services") {
            message =
                'As a software developer, he offers the following services:<br>' +
                ' Web Development' +
                ' Mobile Development'+
                'Graphics Design'
        } else if (res.value === "contact") {
            message =
                'You can contact him via his email: @afolwalex,gmail.com, Twitter: @afolwalex or on WhatsApp and Calls' +
                'on 09051151706';
        } else if (res.value === "hobbies") {
            message =
                'Afolwalex loves watching football and listening to music.';
        } 
        return botui.message.add({
            type: 'html',
            delay: 1000,
            loading: true,
            content: message
        });
    })
})