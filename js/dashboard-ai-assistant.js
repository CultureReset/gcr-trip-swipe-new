/**
 * Dashboard AI Assistant - OpenAI GPT-4 powered chat with voice input
 * Context-aware help for CSV import, business management, and troubleshooting
 */

class DashboardAIAssistant {
  constructor() {
    this.apiKey = null;
    this.conversationHistory = [];
    this.isListening = false;
    this.recognition = null;
    this.currentContext = {
      tab: null,
      business: null,
      lastAction: null,
      lastError: null
    };

    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.handleVoiceInput(transcript);
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.stopListening();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicButton();
      };
    }
  }

  /**
   * Initialize assistant with API key
   */
  init(apiKey) {
    if (!apiKey) {
      const stored = localStorage.getItem('openai_api_key');
      if (stored) {
        this.apiKey = stored;
      } else {
        console.warn('No OpenAI API key configured');
        return false;
      }
    } else {
      this.apiKey = apiKey;
      localStorage.setItem('openai_api_key', apiKey);
    }

    this.showAssistant();
    return true;
  }

  /**
   * Show assistant UI
   */
  showAssistant() {
    const assistantEl = document.getElementById('ai-assistant');
    if (assistantEl) {
      assistantEl.style.display = 'flex';
    }
  }

  /**
   * Hide assistant UI
   */
  hideAssistant() {
    const assistantEl = document.getElementById('ai-assistant');
    if (assistantEl) {
      assistantEl.style.display = 'none';
    }
  }

  /**
   * Toggle assistant visibility
   */
  toggleAssistant() {
    const assistantEl = document.getElementById('ai-assistant');
    if (assistantEl) {
      if (assistantEl.style.display === 'none') {
        this.showAssistant();
      } else {
        this.hideAssistant();
      }
    }
  }

  /**
   * Update current context
   */
  updateContext(updates) {
    this.currentContext = { ...this.currentContext, ...updates };
  }

  /**
   * Handle text input
   */
  async handleTextInput() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();

    if (!message) return;

    // Clear input
    input.value = '';

    // Add user message to chat
    this.addMessageToChat('user', message);

    // Get AI response
    await this.getAIResponse(message);
  }

  /**
   * Handle voice input
   */
  async handleVoiceInput(transcript) {
    // Add user message to chat
    this.addMessageToChat('user', transcript, true);

    // Get AI response
    await this.getAIResponse(transcript);
  }

  /**
   * Toggle voice listening
   */
  toggleVoiceInput() {
    if (!this.recognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  /**
   * Start listening for voice
   */
  startListening() {
    if (!this.recognition) return;

    try {
      this.recognition.start();
      this.isListening = true;
      this.updateMicButton();
      this.addSystemMessage('🎤 Listening...');
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
    }
  }

  /**
   * Stop listening for voice
   */
  stopListening() {
    if (!this.recognition) return;

    this.recognition.stop();
    this.isListening = false;
    this.updateMicButton();
  }

  /**
   * Update microphone button state
   */
  updateMicButton() {
    const micBtn = document.getElementById('ai-mic-btn');
    if (micBtn) {
      if (this.isListening) {
        micBtn.classList.add('listening');
        micBtn.innerHTML = '🔴';
      } else {
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '🎤';
      }
    }
  }

  /**
   * Get AI response from OpenAI
   */
  async getAIResponse(userMessage) {
    if (!this.apiKey) {
      this.addMessageToChat('assistant', 'Please configure your OpenAI API key in the API Keys tab first.');
      return;
    }

    // Show typing indicator
    this.addSystemMessage('💭 Thinking...');

    try {
      // Build context-aware system message
      const systemMessage = this.buildSystemMessage();

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemMessage },
            ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      // Add to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Remove typing indicator
      this.removeSystemMessage();

      // Add assistant response to chat
      this.addMessageToChat('assistant', assistantMessage);

      // Check if response contains actions
      this.checkForActions(assistantMessage);

    } catch (error) {
      console.error('OpenAI API Error:', error);
      this.removeSystemMessage();
      this.addMessageToChat('assistant', `Error: ${error.message}. Please check your API key in the API Keys tab.`);
    }
  }

  /**
   * Build context-aware system message
   */
  buildSystemMessage() {
    let context = `You are a helpful AI assistant for the Gulf Coast Radar admin dashboard.
You help with CSV imports, business data management, troubleshooting, and general questions.

Current Context:
- Tab: ${this.currentContext.tab || 'Unknown'}
- Business: ${this.currentContext.business || 'None selected'}
- Last Action: ${this.currentContext.lastAction || 'None'}
${this.currentContext.lastError ? `- Last Error: ${this.currentContext.lastError}` : ''}

Available Features:
- CSV Import (3 modes: REPLACE, MERGE, UPDATE)
  * REPLACE: Overwrites all data (keeps images)
  * MERGE: Adds new data, skips duplicates
  * UPDATE: Replaces only specific sections (menus, specials, events, etc.)
- Business Management (view, edit, delete)
- Menu Management (breakfast, brunch, lunch, dinner, sunset, cocktails, wine, beer, desserts)
- Events & Specials Management
- Analytics Integration (GA4, Facebook)

CSV Record Types:
1. BUSINESS - Basic business info
2. HOURS - Operating hours
3. SERVICE_WINDOW - Service times (breakfast 7-11, lunch 11-3, etc.)
4. MENU_SECTION - Menu sections (appetizers, seafood, burgers, etc.)
5. MENU_ITEM - Individual menu items with prices
6. OPTION_GROUP - Option groups (size, temperature, toppings)
7. OPTION - Individual options (+$2, +$3, etc.)
8. EVENT - Entertainment/activities (NOT price deals)
9. POLICY - Business policies

Important Rules:
- SPECIALS = Price deals/promotions (Wine Wednesday, Taco Tuesday)
- EVENTS = Entertainment/activities (Live Jazz, Trivia Night)
- Kids meals need age restrictions (e.g., "12 and under")
- Duplicate detection checks both ID and name
- Always preserve images when replacing data
- Service windows show "Available Now" badges

When helping with CSV imports:
1. Ask clarifying questions if data structure is unclear
2. Suggest the appropriate import mode
3. Warn about potential duplicates
4. Recommend testing with small files first
5. Offer to fix validation errors

Be concise, helpful, and proactive. If you detect an error in user's data or approach, point it out and suggest fixes.`;

    return context;
  }

  /**
   * Check response for actionable items
   */
  checkForActions(message) {
    // Check if AI is suggesting a specific import mode
    if (message.toLowerCase().includes('suggest') && message.toLowerCase().includes('mode')) {
      // Could highlight the import mode options
    }

    // Check if AI is offering to fix something
    if (message.toLowerCase().includes('would you like me to') || message.toLowerCase().includes('should i')) {
      // Mark as requiring user approval
      const lastMsg = document.querySelector('.ai-message:last-child');
      if (lastMsg) {
        lastMsg.classList.add('requires-approval');
      }
    }
  }

  /**
   * Add message to chat UI
   */
  addMessageToChat(role, content, isVoice = false) {
    const chatMessages = document.getElementById('ai-chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-${role}`;

    const icon = role === 'user' ? (isVoice ? '🎤' : '👤') : '🤖';

    messageDiv.innerHTML = `
      <div class="ai-message-icon">${icon}</div>
      <div class="ai-message-content">${this.formatMessage(content)}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Add system message (typing indicator, etc.)
   */
  addSystemMessage(content) {
    const chatMessages = document.getElementById('ai-chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message ai-system';
    messageDiv.id = 'ai-system-message';
    messageDiv.innerHTML = `<div class="ai-message-content">${content}</div>`;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Remove system message
   */
  removeSystemMessage() {
    const systemMsg = document.getElementById('ai-system-message');
    if (systemMsg) {
      systemMsg.remove();
    }
  }

  /**
   * Format message with markdown-like syntax
   */
  formatMessage(content) {
    // Convert **bold** to <strong>
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert line breaks
    content = content.replace(/\n/g, '<br>');

    // Convert bullet points
    content = content.replace(/^- (.*?)$/gm, '<li>$1</li>');
    if (content.includes('<li>')) {
      content = content.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }

    return content;
  }

  /**
   * Clear chat history
   */
  clearChat() {
    const chatMessages = document.getElementById('ai-chat-messages');
    if (chatMessages) {
      chatMessages.innerHTML = '';
    }
    this.conversationHistory = [];
    this.addMessageToChat('assistant', 'Hi! I\'m your dashboard assistant. I can help with CSV imports, business management, troubleshooting, and more. What can I help you with?');
  }

  /**
   * Trigger assistant for CSV validation
   */
  async validateCSV(file, mode, sections) {
    this.showAssistant();

    const message = `I'm about to import a CSV file (${file.name}) using ${mode.toUpperCase()} mode${sections && sections.length > 0 ? ` for sections: ${sections.join(', ')}` : ''}. Can you check if this looks correct and warn me about any potential issues?`;

    this.addMessageToChat('user', message);
    await this.getAIResponse(message);
  }

  /**
   * Trigger assistant for error help
   */
  async helpWithError(error, context) {
    this.updateContext({ lastError: error });
    this.showAssistant();

    const message = `I got this error: "${error}". Context: ${context}. What should I do?`;

    this.addMessageToChat('user', message);
    await this.getAIResponse(message);
  }

  /**
   * Auto-suggest fixes for common issues
   */
  async suggestFix(issue, data) {
    this.showAssistant();

    const message = `I found this issue: ${issue}. Here's the data: ${JSON.stringify(data)}. Can you suggest how to fix it?`;

    this.addMessageToChat('user', message);
    await this.getAIResponse(message);
  }
}

// Initialize global assistant
if (typeof window !== 'undefined') {
  window.dashboardAI = new DashboardAIAssistant();
}
