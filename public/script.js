(function() {
    const chatbotContainerId = 'chatbot-container';
    const socket = new WebSocket("http://localhost:3000")
    socket.
    // Fetch the client-specific configuration from your API
    function fetchChatbotConfig(clientId) {
        return fetch(`http://localhost:3000/api/chatbot/config/myID`)
            .then(response => response.json())
            .catch(error => console.error('Error fetching chatbot config:', error));
        // return ({
        //     chatbotName:"AI Support",
        //     theme: "#152935",
        //     welcomeMessage: "Hey, ask me anything",
        // })
    }

    function initializeChatbot(config) {
        // Create chatbot container
        const chatbotContainerId = 'chatbot-container';
    const chatbotIconId = 'chatbot-icon';

    // Load styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        /* Chatbot icon style */
        #${chatbotIconId} {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: ${config.theme};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            color: white;
            font-size: 24px;
            z-index: 1000;
        }

        /* Chatbot container with animation */
        #${chatbotContainerId} {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 300px;
            height: 400px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 1000;
            transform: scale(0); /* Start hidden with scale 0 */
            opacity: 0;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease; /* Transition for animation */
            transform-origin: bottom right;
        }
        #${chatbotContainerId}.open {
            transform: scale(1); /* Scale to full size when open */
            opacity: 1;
        }

        #${chatbotContainerId} header {
            background-color: ${config.theme};
            color: #ffffff;
            padding: 10px;
            font-weight: bold;
            text-align: center;
        }
        #${chatbotContainerId} .messages {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            background-color: #f4f4f4;
        }
        #${chatbotContainerId} footer {
            display: flex;
        }
        #${chatbotContainerId} input {
            flex: 1;
            padding: 8px;
            border: none;
            border-top: 1px solid #ddd;
        }
        #${chatbotContainerId} button {
            padding: 8px;
            background-color: ${config.theme};
            color: white;
            border: none;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Create chatbot icon
    const chatbotIcon = document.createElement('div');
    chatbotIcon.id = chatbotIconId;
    chatbotIcon.innerHTML = '💬';
    document.body.appendChild(chatbotIcon);

    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = chatbotContainerId;

    chatbotContainer.innerHTML = `
        <header>${config.chatbotName}</header>
        <div class="messages" id="chatbot-messages">
            <p>${config.welcomeMessage}</p>
        </div>
        <footer>
            <input type="text" id="chatbot-input" placeholder="Type your message...">
            <button onclick="window.sendMessage()">Send</button>
        </footer>
    `;
    document.body.appendChild(chatbotContainer);

    // Toggle chatbot visibility when the icon is clicked
    chatbotIcon.addEventListener('click', function() {
        if (chatbotContainer.classList.contains('open')) {
            // Hide with animation
            chatbotContainer.classList.remove('open');
            setTimeout(() => {
                chatbotContainer.style.display = 'none';
            }, 300); // Match the transition duration
        } else {
            // Show with animation
            chatbotContainer.style.display = 'flex';
            setTimeout(() => chatbotContainer.classList.add('open'), 10);
        }
    });

    document.body.addEventListener("click", ()=>{
        if (chatbotContainer.classList.contains('open')) {
            // Hide with animation
            chatbotContainer.classList.remove('open');
            setTimeout(() => {
                chatbotContainer.style.display = 'none';
            }, 300); // Match the transition duration
        }
    })
    // Add message sending functionality
    window.sendMessage = function() {
        const input = document.getElementById('chatbot-input');
        const messages = document.getElementById('chatbot-messages');
        if (input.value.trim()) {
            const userMessage = document.createElement('p');
            userMessage.style.color = 'blue';
            userMessage.innerText = input.value;
            messages.appendChild(userMessage);
            input.value = '';

            // Simulate bot response
            const botMessage = document.createElement('p');
            botMessage.style.color = 'black';
            botMessage.innerText = 'This is a response from the bot!';
            messages.appendChild(botMessage);

            messages.scrollTop = messages.scrollHeight;
        }
    };
    }

    // Assume the clientId is available in the global context or as a URL parameter
    const clientId = window.clientId || 'default-client-id';
    
    // Fetch and initialize chatbot with client-specific config
    fetchChatbotConfig(clientId).then(config => {
        if (config) {
            initializeChatbot(config);
        } else {
            console.error('Failed to load chatbot config');
        }
    });

    // let config = fetchChatbotConfig(clientId)
    // initializeChatbot(config)
})();
