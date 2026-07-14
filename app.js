(function () {
  'use strict';

  const STORAGE_KEY = 'erkan_hoca_api_key';
  const STORAGE_PROVIDER = 'erkan_hoca_api_provider';
  const MAX_HISTORY = 20;

  const chatMessages = document.getElementById('chatMessages');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const settingsOverlay = document.getElementById('settingsOverlay');
  const btnSettings = document.getElementById('btnSettings');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const apiProviderSelect = document.getElementById('apiProviderSelect');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const apiKeyHint = document.getElementById('apiKeyHint');
  const btnSaveApiKey = document.getElementById('btnSaveApiKey');
  const btnClearApiKey = document.getElementById('btnClearApiKey');
  const apiKeyStatus = document.getElementById('apiKeyStatus');

  var conversationHistory = [];

  function getApiKey() {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function setApiKey(key) {
    try {
      if (key) localStorage.setItem(STORAGE_KEY, key);
      else localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function getProvider() {
    try {
      var p = localStorage.getItem(STORAGE_PROVIDER);
      return (p === 'openai' || p === 'gemini' || p === 'ucretsiz') ? p : 'ucretsiz';
    } catch (e) {
      return 'ucretsiz';
    }
  }

  function setProvider(p) {
    try {
      var val = (p === 'openai' || p === 'gemini') ? p : 'ucretsiz';
      localStorage.setItem(STORAGE_PROVIDER, val);
      return true;
    } catch (e) {
      return false;
    }
  }

  function updateApiKeyHint() {
    var p = apiProviderSelect ? apiProviderSelect.value : getProvider();
    var keyLabel = document.querySelector('label[for="apiKeyInput"]');
    if (apiKeyInput) {
      apiKeyInput.disabled = p === 'ucretsiz';
      apiKeyInput.placeholder = p === 'ucretsiz'
        ? 'Bu seçenekte anahtar gerekmez'
        : 'Gemini: AIza... / OpenAI: sk-...';
    }
    if (keyLabel) keyLabel.style.display = p === 'ucretsiz' ? 'none' : '';
    if (apiKeyInput) apiKeyInput.style.display = p === 'ucretsiz' ? 'none' : '';
    if (apiKeyHint) {
      if (p === 'ucretsiz') {
        apiKeyHint.innerHTML = '<strong>Tamamen ücretsiz</strong> yapay zeka kullanılır. API anahtarı gerekmez; doğrudan soru sorabilirsin.';
      } else if (p === 'gemini') {
        apiKeyHint.innerHTML = 'Key\'i <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a> → Get API key ile <strong>ücretsiz</strong> alabilirsin. Tarayıcında saklanır.';
      } else {
        apiKeyHint.innerHTML = 'Key\'i <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">platform.openai.com</a> → API Keys bölümünden alabilirsin. Tarayıcında saklanır.';
      }
    }
  }

  function openSettings() {
    var p = getProvider();
    if (apiProviderSelect) apiProviderSelect.value = p;
    apiKeyInput.value = getApiKey();
    apiKeyStatus.textContent = '';
    updateApiKeyHint();
    settingsOverlay.classList.add('open');
    settingsOverlay.setAttribute('aria-hidden', 'false');
    apiKeyInput.focus();
  }

  if (apiProviderSelect) {
    apiProviderSelect.addEventListener('change', updateApiKeyHint);
  }

  function closeSettings() {
    settingsOverlay.classList.remove('open');
    settingsOverlay.setAttribute('aria-hidden', 'true');
  }

  function showStatus(msg, isError) {
    apiKeyStatus.textContent = msg;
    apiKeyStatus.classList.toggle('ok', !isError);
    apiKeyStatus.classList.toggle('err', isError);
  }

  btnSettings.addEventListener('click', openSettings);
  btnCloseSettings.addEventListener('click', closeSettings);
  settingsOverlay.addEventListener('click', function (e) {
    if (e.target === settingsOverlay) closeSettings();
  });

  btnSaveApiKey.addEventListener('click', function () {
    var key = (apiKeyInput.value || '').trim();
    var provider = apiProviderSelect ? apiProviderSelect.value : getProvider();
    if (provider === 'ucretsiz') {
      if (setProvider('ucretsiz')) {
        showStatus('Tamamen ücretsiz API seçildi. Anahtar gerekmez.', false);
      } else {
        showStatus('Kaydedilemedi.', true);
      }
      return;
    }
    if (!key) {
      showStatus('Lütfen bir API Key yaz.', true);
      return;
    }
    if (setApiKey(key) && setProvider(provider)) {
      var label = provider === 'gemini' ? 'Gemini' : 'OpenAI';
      showStatus('API Key kaydedildi (' + label + '). Artık kendi sorularına da cevap alacaksın.', false);
    } else {
      showStatus('Kaydedilemedi.', true);
    }
  });

  btnClearApiKey.addEventListener('click', function () {
    setApiKey('');
    apiKeyInput.value = '';
    setProvider('ucretsiz');
    if (apiProviderSelect) apiProviderSelect.value = 'ucretsiz';
    updateApiKeyHint();
    showStatus('API Key silindi. Tamamen ücretsiz moda geçildi.', false);
  });

  function nowStr() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function addMessage(text, isOutgoing) {
    var msg = document.createElement('div');
    msg.className = 'msg ' + (isOutgoing ? 'msg-outgoing' : 'msg-incoming');

    var avatarSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23007a5c'/%3E%3Ctext x='50' y='62' font-size='40' fill='white' text-anchor='middle' font-family='sans-serif'%3EE%3C/text%3E%3C/svg%3E";

    if (isOutgoing) {
      msg.innerHTML =
        '<div class="msg-bubble msg-bubble-out">' +
        '<span class="msg-text"></span>' +
        '<span class="msg-time">' + nowStr() + '</span>' +
        '</div>';
    } else {
      msg.innerHTML =
        '<div class="msg-avatar"><img src="' + avatarSvg + '" alt=""></div>' +
        '<div class="msg-bubble msg-bubble-in">' +
        '<span class="msg-text"></span>' +
        '<span class="msg-time">' + nowStr() + '</span>' +
        '</div>';
    }

    var textEl = msg.querySelector('.msg-text');
    if (isOutgoing) {
      textEl.textContent = text;
    } else {
      var html = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
      textEl.innerHTML = html;
    }

    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function addTypingIndicator() {
    var msg = document.createElement('div');
    msg.className = 'msg msg-incoming msg-typing';
    var avatarSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23007a5c'/%3E%3Ctext x='50' y='62' font-size='40' fill='white' text-anchor='middle' font-family='sans-serif'%3EE%3C/text%3E%3C/svg%3E";
    msg.innerHTML =
      '<div class="msg-avatar"><img src="' + avatarSvg + '" alt=""></div>' +
      '<div class="msg-bubble msg-bubble-in"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function removeTypingIndicator(typingEl) {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
  }

  var systemPrompt = 'Sen Erkan Hoca\'sın. Ortaokul Türkçe dersi öğretmenisin. ' +
    'Dil bilgisi, yazım kuralları, paragraf, sözcük türleri, fiil kipleri, cümle türleri, fiilimsiler, ek-fiil konularında doğru cevap ver. ' +
    'Söz sanatlarını (kişileştirme, benzetme, mecaz, abartma, konuşturma vb.) bilirsin; örneğin "çiçekler gülümsüyordu" gibi cümlelerde kişileştirme olduğunu açıklarsın. ' +
    'Cevapların kısa, net ve öğretici olsun. Türkçe yaz. Öğrenciye "sen" diye hitap edebilirsin.';

  function buildMessages(userText) {
    var messages = [
      { role: 'system', content: systemPrompt }
    ];
    var recent = conversationHistory.slice(-MAX_HISTORY);
    for (var i = 0; i < recent.length; i++) {
      messages.push({ role: recent[i].role, content: recent[i].content });
    }
    messages.push({ role: 'user', content: userText });
    return messages;
  }

  function askOpenAI(apiKey, userText) {
    return fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: buildMessages(userText),
        max_tokens: 800,
        temperature: 0.6
      })
    }).then(function (res) {
      if (!res.ok) {
        return res.json().then(function (err) {
          var msg = (err && err.error && err.error.message) ? err.error.message : ('Hata: ' + res.status);
          throw new Error(msg);
        }).catch(function () {
          throw new Error('API hatası: ' + res.status);
        });
      }
      return res.json();
    }).then(function (data) {
      var choice = data.choices && data.choices[0];
      if (!choice || !choice.message || !choice.message.content) {
        throw new Error('Cevap alınamadı.');
      }
      return choice.message.content.trim();
    });
  }

  function buildGeminiContents(userText) {
    var contents = [];
    var recent = conversationHistory.slice(-MAX_HISTORY);
    for (var i = 0; i < recent.length; i++) {
      var r = recent[i];
      contents.push({
        role: r.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: r.content }]
      });
    }
    contents.push({ role: 'user', parts: [{ text: userText }] });
    return contents;
  }

  function askGemini(apiKey, userText) {
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + encodeURIComponent(apiKey);
    var body = {
      contents: buildGeminiContents(userText),
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 800
      }
    };
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().then(function (data) {
        if (data.error) {
          throw new Error(data.error.message || data.error.code || 'Gemini hatası');
        }
        var cand = data.candidates && data.candidates[0];
        if (!cand || !cand.content || !cand.content.parts || !cand.content.parts[0]) {
          throw new Error('Cevap alınamadı.');
        }
        return (cand.content.parts[0].text || '').trim();
      });
    }).catch(function (err) {
      if (err.message) throw err;
      throw new Error('API hatası');
    });
  }

  function askUcretsiz(userText) {
    return fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai',
        messages: buildMessages(userText),
        max_tokens: 800,
        temperature: 0.6
      })
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (body) {
          throw new Error(body || ('API hatası: ' + res.status));
        });
      }
      return res.json();
    }).then(function (data) {
      var choice = data.choices && data.choices[0];
      if (!choice || !choice.message || !choice.message.content) {
        throw new Error('Cevap alınamadı.');
      }
      return choice.message.content.trim();
    });
  }

  function sendUserMessage() {
    var text = (messageInput.value || '').trim();
    if (!text) return;

    addMessage(text, true);
    messageInput.value = '';
    conversationHistory.push({ role: 'user', content: text });

    var typingEl = addTypingIndicator();
    var apiKey = getApiKey();
    var provider = getProvider();

    function showAnswer(cevap) {
      removeTypingIndicator(typingEl);
      addMessage(cevap, false);
      conversationHistory.push({ role: 'assistant', content: cevap });
    }

    function showError(errMsg) {
      removeTypingIndicator(typingEl);
      var fallback = typeof ErkanHoca !== 'undefined' ? ErkanHoca.cevapVer(text) : 'Şu an cevap veremiyorum.';
      addMessage('API yanıt vermedi: ' + errMsg + '\n\nYerel cevap:\n' + fallback, false);
      conversationHistory.push({ role: 'assistant', content: fallback });
    }

    if (provider === 'ucretsiz') {
      askUcretsiz(text)
        .then(showAnswer)
        .catch(function (err) {
          showError(err.message || 'Bilinmeyen hata');
        });
    } else if (apiKey) {
      var ask = provider === 'gemini' ? askGemini(apiKey, text) : askOpenAI(apiKey, text);
      ask
        .then(showAnswer)
        .catch(function (err) {
          showError(err.message || 'Bilinmeyen hata');
        });
    } else {
      setTimeout(function () {
        var cevap = typeof ErkanHoca !== 'undefined' ? ErkanHoca.cevapVer(text) : 'Şu an cevap veremiyorum.';
        showAnswer(cevap);
      }, 600);
    }
  }

  sendBtn.addEventListener('click', sendUserMessage);
  messageInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage();
    }
  });
})();
