
// =========================================
// PORTFOLIO ASSISTANT — LET'S DESIGN.CODE
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const mascot = document.getElementById("assistantMascot");
    const chatWindow = document.getElementById("assistantWindow");
    const closeButton = document.getElementById("assistantClose");
    const messages = document.getElementById("assistantMessages");
    const chatForm = document.getElementById("assistantForm");
    const chatInput = document.getElementById("assistantInput");
    const suggestions = document.getElementById("assistantSuggestions");

    if (!mascot || !chatWindow || !closeButton ||
        !messages || !chatForm || !chatInput || !suggestions) {
        console.error("Portfolio Assistant: Required HTML elements not found.");
        return;
    }

    // =========================================
    // OPEN AND CLOSE CHAT
    // =========================================

    function openChat() {
        chatWindow.classList.add("open");
        chatWindow.setAttribute("aria-hidden", "false");
        mascot.setAttribute("aria-expanded", "true");

        setTimeout(function () {
            chatInput.focus();
        }, 250);
    }

    const heroAssistantBtn = document.getElementById("heroAssistantBtn");

    if (heroAssistantBtn) {
        heroAssistantBtn.addEventListener("click", function () {
            openChat();
        });
    }

    function closeChat() {
        chatWindow.classList.remove("open");
        chatWindow.setAttribute("aria-hidden", "true");
        mascot.setAttribute("aria-expanded", "false");
    }

    mascot.addEventListener("click", function () {
        if (chatWindow.classList.contains("open")) {
            closeChat();
        } else {
            openChat();
        }
    });

    closeButton.addEventListener("click", closeChat);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" &&
            chatWindow.classList.contains("open")) {
            closeChat();
        }
    });

    // =========================================
    // MESSAGE SYSTEM
    // =========================================

    function addMessage(text, type) {
        const message = document.createElement("div");

        message.className = "assistant-message " +
            (type === "user" ? "user-message" : "bot-message");

        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement("div");

        typing.className = "assistant-message bot-message typing-message";
        typing.id = "assistantTyping";
        typing.textContent = "Typing...";

        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById("assistantTyping");
        if (typing) typing.remove();
    }

    // =========================================
    // PROJECT KNOWLEDGE
    // =========================================

    const projects = {

        savvycart:
            "SavvyCart is an e-commerce mobile app design project. It focuses on creating a convenient shopping experience through a mobile interface. You can explore its screens and design work in Sakshi's portfolio.",

        stylehub:
            "StyleHub is a fashion e-commerce dashboard web app designed for store owners. It focuses on helping store owners manage their fashion e-commerce business through a dedicated dashboard experience.",

        foodhut:
            "FoodHut is a responsive food delivery landing page. The project focuses on presenting a food delivery experience through a clean, responsive website layout.",

        brewlab:
            "BrewLab is an animated coffee landing page project. It combines a coffee-focused visual concept with animation to create an engaging landing page experience.",

        autopalace:
            "Auto Palace is a website project for a pre-owned two-wheeler and four-wheeler showroom in Pune. The showroom has been operating since 1978. The website focuses on showcasing the business, its vehicles and showroom visits. It also includes an OLX listing direction and information about RC/RTO transfer assistance.",

        ekdanta:
            "Ekdanta Homoeopathy & Cosmetology Clinic is a responsive, single-page clinic website project. It is designed to present the clinic and its services in an organised and approachable way, with sections such as services, gallery and testimonials.",

        passionfitness:
            "Passion Fitness is a freelance yoga website project created in Framer. It has a calm, warm and premium wellness direction. The sections include Home, About, Programs, Experience and Testimonials, along with a Book a Free Trial call-to-action.",

        velora:
            "Velora is a shoe website project in Sakshi's portfolio. It is a footwear-focused website design and frontend project. You can explore its visual presentation in the portfolio.",

        qrcode:
            "QR Code Generator is a functional web application built using HTML, CSS and JavaScript. Users can enter content such as text or a URL and generate a QR code. The project also includes options to download and clear the generated result."
    };

    // =========================================
    // PROJECT MATCHING
    // =========================================

    function getProjectAnswer(q) {

        const projectKeywords = [
            { key: "savvycart", words: ["savvycart", "savvy cart"] },
            { key: "stylehub", words: ["stylehub", "style hub"] },
            { key: "foodhut", words: ["foodhut", "food hut"] },
            { key: "brewlab", words: ["brewlab", "brew lab"] },
            { key: "autopalace", words: ["auto palace", "autopalace"] },
            { key: "ekdanta", words: ["ekdanta", "homoeopathy", "homeopathy"] },
            { key: "passionfitness", words: ["passion fitness", "passionfitness", "yoga website"] },
            { key: "velora", words: ["velora", "shoe website", "footwear website"] },
            { key: "qrcode", words: ["qr code", "qr generator", "qr-code"] }
        ];

        for (const project of projectKeywords) {
            if (project.words.some(word => q.includes(word))) {
                return projects[project.key];
            }
        }

        return null;
    }

    // =========================================
    // ALL PORTFOLIO ANSWERS
    // =========================================

    function getAnswer(question) {

        const q = question.toLowerCase().trim();

        // Project-specific answers
        const projectAnswer = getProjectAnswer(q);

        if (projectAnswer) return projectAnswer;

        // About Sakshi
        if (
            q.includes("who is sakshi") ||
            q.includes("about sakshi") ||
            q.includes("introduce") ||
            q === "about"
        ) {
            return "Sakshi Agarwal is a UI/UX Designer and Frontend Developer based in Pune, India. She enjoys combining thoughtful design with creative development to build meaningful digital experiences.";
        }

        // All projects
        if (
            q.includes("all projects") ||
            q.includes("list of projects") ||
            q.includes("which projects") ||
            q.includes("projects") ||
            q.includes("portfolio work")
        ) {
            return "Here are Sakshi's portfolio projects:\n\n" +
                "• SavvyCart — E-commerce mobile app design\n" +
                "• StyleHub — Fashion e-commerce dashboard\n" +
                "• FoodHut — Responsive food delivery landing page\n" +
                "• BrewLab — Animated coffee landing page\n" +
                "• Auto Palace — Pre-owned vehicle showroom website\n" +
                "• Ekdanta Homoeopathy — Clinic website\n" +
                "• Passion Fitness — Yoga website\n" +
                "• Velora — Shoe website\n" +
                "• QR Code Generator — Functional web application\n\n" +
                "Ask me about any individual project to know more!";
        }

        // Skills
        if (
            q.includes("skill") ||
            q.includes("technology") ||
            q.includes("tech stack") ||
            q.includes("tools") ||
            q.includes("software")
        ) {
            return "Sakshi's design and development skills include:\n\n" +
                "• Figma and FigJam\n" +
                "• UI/UX design\n" +
                "• Wireframing and prototyping\n" +
                "• HTML and CSS\n" +
                "• JavaScript\n" +
                "• Framer\n" +
                "• Responsive web design\n\n" +
                "Her work combines interface design with frontend development.";
        }

        // Design process
        if (
            q.includes("design process") ||
            q.includes("design approach") ||
            q.includes("how does she design") ||
            q.includes("design thinking")
        ) {
            return "Sakshi approaches design by focusing on the user experience, interface structure and visual presentation. Her work includes UI design, wireframing, prototyping and responsive layouts. Explore her individual projects to see her design work.";
        }

        // UI/UX
        if (
            q.includes("ui ux") ||
            q.includes("ui/ux") ||
            q.includes("user experience") ||
            q.includes("user interface")
        ) {
            return "Sakshi works in UI/UX design, focusing on user-friendly interfaces, clear layouts, visual consistency and meaningful digital experiences. She uses Figma and FigJam for design and prototyping.";
        }

        // Frontend development
        if (
            q.includes("development") ||
            q.includes("frontend") ||
            q.includes("coding") ||
            q.includes("programming") ||
            q.includes("developer")
        ) {
            return "Sakshi's frontend development work includes HTML, CSS and JavaScript. She also creates websites using Framer. Her portfolio includes responsive websites and functional projects such as the QR Code Generator.";
        }

        // Framer
        if (q.includes("framer")) {
            return "Sakshi uses Framer to create website experiences. Her portfolio includes website projects such as Auto Palace, Ekdanta Homoeopathy and Passion Fitness.";
        }

        // Education
        if (
            q.includes("education") ||
            q.includes("qualification") ||
            q.includes("degree") ||
            q.includes("college") ||
            q.includes("bba")
        ) {
            return "Sakshi is a BBA graduate from Vishwakarma College of Arts, Commerce & Science, with a specialisation in Finance.";
        }

        // Experience
        if (
            q.includes("experience") ||
            q.includes("professional background") ||
            q.includes("work background")
        ) {
            return "Sakshi's portfolio showcases design projects, website work and practical project experience. Her work includes UI/UX concepts, frontend development and freelance website projects. Explore the individual projects to understand her work.";
        }

        // Services
        if (
            q.includes("services") ||
            q.includes("service") ||
            q.includes("hire") ||
            q.includes("what can she do") ||
            q.includes("work with")
        ) {
            return "Sakshi is interested in opportunities involving:\n\n" +
                "• UI/UX design\n" +
                "• Website design\n" +
                "• Responsive frontend development\n" +
                "• Framer websites\n" +
                "• Landing pages\n" +
                "• Digital experiences\n\n" +
                "You can contact her to discuss a project or opportunity.";
        }

        // Location
        if (
            q.includes("location") ||
            q.includes("where is she") ||
            q.includes("based") ||
            q.includes("city")
        ) {
            return "Sakshi is based in Pune, Maharashtra, India.";
        }

        // Contact
        if (
            q.includes("contact") ||
            q.includes("email") ||
            q.includes("reach") ||
            q.includes("connect") ||
            q.includes("linkedin")
        ) {
            return "You can connect with Sakshi through:\n\n" +
                "Email: saku14agarwal@gmail.com\n\n" +
                "LinkedIn: linkedin.com/in/sakshi-agarwal-6245343a4\n\n" +
                "You can also visit the Contact section of this portfolio.";
        }

        // Greetings
        if (/^(hi|hello|hey|hii|good morning|good afternoon|good evening)\b/.test(q)) {
            return "Hey there! 👋 Welcome to Sakshi's portfolio. I can help you explore her projects, skills, education, design work and contact details. What would you like to know?";
        }

        // Thanks
        if (q.includes("thank you") || q.includes("thanks")) {
            return "You're welcome! 😊 Feel free to explore more of Sakshi's portfolio. Is there anything else you'd like to know?";
        }

        // Fallback
        return "I don't have a specific answer to that yet, but I can help you explore Sakshi's portfolio!\n\nYou can ask me about:\n\n• Any individual project\n• UI/UX design and frontend skills\n• Tools and technologies\n• Education and background\n• Services and work opportunities\n• Contact details\n\nTry asking me something specific!";
    }

    // =========================================
    // MIXED SUGGESTED QUESTIONS
    // =========================================

    const suggestionBank = [

        // Projects
        { id: "projects", text: "Explore her projects", question: "Tell me about all her projects" },

        // About and background
        { id: "about", text: "About Sakshi", question: "Tell me about Sakshi" },
        { id: "education", text: "Her education", question: "Tell me about her education" },

        // Skills and process
        { id: "skills", text: "Skills & tools", question: "What are her skills and tools?" },
        { id: "design", text: "Design process", question: "What is her design process?" },
        { id: "development", text: "Development skills", question: "Tell me about her frontend development skills" },

        // Career
        { id: "experience", text: "Her experience", question: "Tell me about her experience" },
        { id: "services", text: "Services she offers", question: "What services does she offer?" },

        // Contact
        { id: "contact", text: "Contact Sakshi", question: "How can I contact Sakshi?" },

        // Individual projects
        { id: "savvycart", text: "SavvyCart", question: "Tell me about SavvyCart" },
        { id: "stylehub", text: "StyleHub", question: "Tell me about StyleHub" },
        { id: "foodhut", text: "FoodHut", question: "Tell me about FoodHut" },
        { id: "brewlab", text: "BrewLab", question: "Tell me about BrewLab" },
        { id: "autopalace", text: "Auto Palace", question: "Tell me about Auto Palace" },
        { id: "ekdanta", text: "Ekdanta Homoeopathy", question: "Tell me about Ekdanta Homoeopathy" },
        { id: "passion", text: "Passion Fitness", question: "Tell me about Passion Fitness" },
        { id: "velora", text: "Velora Shoe Website", question: "Tell me about Velora" },
        { id: "qrcode", text: "QR Code Generator", question: "Tell me about the QR Code Generator" }
    ];

    // Remember selected suggestions during this page session
    const usedSuggestions = new Set();

    // =========================================
    // RENDER SUGGESTIONS
    // =========================================

    function renderSuggestions() {

        suggestions.innerHTML = "";

        const available = suggestionBank.filter(function (item) {
            return !usedSuggestions.has(item.id);
        });

        // When all suggestions have been used, start a fresh round
        if (available.length === 0) {
            usedSuggestions.clear();
        }

        const remaining = suggestionBank.filter(function (item) {
            return !usedSuggestions.has(item.id);
        });

        // Show four mixed suggestions at a time
        const nextSuggestions = remaining.slice(0, 4);

        nextSuggestions.forEach(function (item) {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "suggestion-btn";
            button.textContent = item.text;
            button.dataset.suggestionId = item.id;
            button.dataset.question = item.question;

            suggestions.appendChild(button);
        });

        if (nextSuggestions.length === 0) {
            return;
        }

        // Keep suggestions at the bottom of the conversation
        messages.appendChild(suggestions);
        messages.scrollTop = messages.scrollHeight;
    }

    // Initial suggestions
    renderSuggestions();

    // =========================================
    // SEND MESSAGE
    // =========================================

    function sendMessage(question, suggestionId = null) {

        const cleanQuestion = question.trim();
        if (!cleanQuestion) return;

        // Remember the selected suggestion
        if (suggestionId) {
            usedSuggestions.add(suggestionId);
        }

        addMessage(cleanQuestion, "user");
        chatInput.value = "";

        // Remove suggestions while answer is being prepared
        suggestions.remove();

        showTyping();

        setTimeout(function () {

            removeTyping();

            const answer = getAnswer(cleanQuestion);
            addMessage(answer, "bot");

            // Show next unused suggestions
            renderSuggestions();

        }, 500);
    }

    // =========================================
    // FORM SUBMISSION
    // =========================================

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendMessage(chatInput.value);
    });

    // =========================================
    // SUGGESTION BUTTON CLICK
    // =========================================

    suggestions.addEventListener("click", function (event) {

        const button = event.target.closest(".suggestion-btn");

        if (!button || !button.dataset.suggestionId) return;

        const suggestionId = button.dataset.suggestionId;
        const question = button.dataset.question;

        sendMessage(question, suggestionId);
    });

});
