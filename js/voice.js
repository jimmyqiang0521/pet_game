const Voice = {
    enabled: true,
    speaking: false,
    queue: [],
    currentAudio: null,
    useIFLYTEK: false,
    iflytekWs: null,
    audioChunks: [],

    voiceSettings: {
        rate: 0.9,
        pitch: 1.5,
        volume: 1.0
    },

    messages: {
        cat: {
            feed: [
                '谢谢主人～好好吃哦！',
                '喵喵～香香哒！',
                '主人最好啦～',
                '吃饱饱啦～谢谢主人！',
                '喵～这个好好吃哦！',
                '主人喂我吃东西～好幸福！'
            ],
            play: [
                '好开心好开心～喵喵！',
                '再来一次嘛～喵喵！',
                '主人陪我玩～最开心啦！',
                '嘻嘻～好好玩哦！',
                '喵～太好玩啦！还想玩！',
                '和主人一起玩～好幸福！'
            ],
            clean: [
                '洗香香啦～好舒服哦！',
                '喵～泡泡好多哦！',
                '主人帮我洗澡澡～好开心！',
                '搓搓背～好舒服呀！',
                '喵喵～现在香香的啦！',
                '洗澡澡真好玩～泡泡飞飞！',
                '主人～水水暖暖的～好舒服！',
                '喵～搓搓小爪爪～'
            ],
            sleep: [
                '晚安主人～我要睡觉觉啦！',
                '喵～困了困了...呼呼...',
                '主人晚安～做个好梦哦！',
                '谢谢主人～我要休息啦！',
                '呼呼呼～好困哦...',
                '喵～我要睡美容觉啦！'
            ],
            hungry: [
                '主人～肚肚饿了...',
                '喵喵～肚子咕咕叫！',
                '想吃好吃的～主人...',
                '主人～有吃的吗？',
                '肚肚好饿哦～喵...'
            ],
            tired: [
                '主人～我累了...',
                '想睡觉觉了喵...',
                '好困好困...',
                '需要休息一下下...',
                '主人～我想睡觉觉...'
            ],
            dirty: [
                '主人～我想洗澡澡...',
                '身上不舒服喵～想香香的！',
                '主人帮我洗澡澡嘛～',
                '我想变得香香的～喵！'
            ],
            sad: [
                '主人～陪我玩嘛...',
                '好无聊哦～喵...',
                '主人抱抱我～',
                '想要主人陪～喵...'
            ],
            happy: [
                '今天好开心好开心！',
                '喵喵喵～好幸福！',
                '最喜欢主人啦！',
                '幸福满满～喵喵！',
                '主人对我最好啦～'
            ],
            welcome: [
                '你好呀～我是你的小猫咪！',
                '喵～见到你真开心！',
                '以后要好好照顾我哦～喵！'
            ],
            login: [
                '主人回来啦～想死你了！',
                '喵喵～主人终于回来啦！',
                '欢迎回家～主人！'
            ]
        },
        dog: {
            feed: [
                '谢谢主人～好好吃哦！',
                '汪汪～香香哒！',
                '主人最好啦～',
                '吃饱饱啦～谢谢主人！',
                '汪～这个好好吃哦！',
                '主人喂我吃东西～好幸福！'
            ],
            play: [
                '好开心好开心～汪汪！',
                '再来一次嘛～汪汪！',
                '主人陪我玩～最开心啦！',
                '嘻嘻～好好玩哦！',
                '汪～太好玩啦！还想玩！',
                '和主人一起玩～好幸福！'
            ],
            clean: [
                '洗香香啦～好舒服哦！',
                '汪～泡泡好多哦！',
                '主人帮我洗澡澡～好开心！',
                '搓搓背～好舒服呀！',
                '汪汪～现在香香的啦！',
                '洗澡澡真好玩～泡泡飞飞！',
                '主人～水水暖暖的～好舒服！',
                '汪～搓搓小爪爪～'
            ],
            sleep: [
                '晚安主人～我要睡觉觉啦！',
                '汪～困了困了...呼呼...',
                '主人晚安～做个好梦哦！',
                '谢谢主人～我要休息啦！',
                '呼呼呼～好困哦...',
                '汪～我要睡美容觉啦！'
            ],
            hungry: [
                '主人～肚肚饿了...',
                '汪汪～肚子咕咕叫！',
                '想吃好吃的～主人...',
                '主人～有吃的吗？',
                '肚肚好饿哦～汪...'
            ],
            tired: [
                '主人～我累了...',
                '想睡觉觉了汪...',
                '好困好困...',
                '需要休息一下下...',
                '主人～我想睡觉觉...'
            ],
            dirty: [
                '主人～我想洗澡澡...',
                '身上不舒服汪～想香香的！',
                '主人帮我洗澡澡嘛～',
                '我想变得香香的～汪！'
            ],
            sad: [
                '主人～陪我玩嘛...',
                '好无聊哦～汪...',
                '主人抱抱我～',
                '想要主人陪～汪...'
            ],
            happy: [
                '今天好开心好开心！',
                '汪汪汪～好幸福！',
                '最喜欢主人啦！',
                '幸福满满～汪汪！',
                '主人对我最好啦～'
            ],
            welcome: [
                '你好呀～我是你的小狗狗！',
                '汪～见到你真开心！',
                '以后要好好照顾我哦～汪！'
            ],
            login: [
                '主人回来啦～想死你了！',
                '汪汪～主人终于回来啦！',
                '欢迎回家～主人！'
            ]
        },
        rabbit: {
            feed: [
                '谢谢主人～好好吃哦！',
                '香香哒～好好吃！',
                '主人最好啦～',
                '吃饱饱啦～谢谢主人！',
                '这个好好吃哦！',
                '主人喂我吃东西～好幸福！'
            ],
            play: [
                '好开心好开心～蹦蹦跳跳！',
                '再来一次嘛～',
                '主人陪我玩～最开心啦！',
                '嘻嘻～好好玩哦！',
                '太好玩啦！还想玩！',
                '和主人一起玩～好幸福！'
            ],
            clean: [
                '洗香香啦～好舒服哦！',
                '哇～泡泡好多哦！',
                '主人帮我洗澡澡～好开心！',
                '搓搓背～好舒服呀！',
                '现在香香的啦！',
                '洗澡澡真好玩～泡泡飞飞！',
                '主人～水水暖暖的～好舒服！',
                '搓搓小爪爪～'
            ],
            sleep: [
                '晚安主人～我要睡觉觉啦！',
                '困了困了...呼呼...',
                '主人晚安～做个好梦哦！',
                '谢谢主人～我要休息啦！',
                '呼呼呼～好困哦...',
                '我要睡美容觉啦！'
            ],
            hungry: [
                '主人～肚肚饿了...',
                '肚子咕咕叫！',
                '想吃好吃的～主人...',
                '主人～有吃的吗？',
                '肚肚好饿哦...'
            ],
            tired: [
                '主人～我累了...',
                '想睡觉觉了...',
                '好困好困...',
                '需要休息一下下...',
                '主人～我想睡觉觉...'
            ],
            dirty: [
                '主人～我想洗澡澡...',
                '身上不舒服～想香香的！',
                '主人帮我洗澡澡嘛～',
                '我想变得香香的！'
            ],
            sad: [
                '主人～陪我玩嘛...',
                '好无聊哦...',
                '主人抱抱我～',
                '想要主人陪～'
            ],
            happy: [
                '今天好开心好开心！',
                '蹦蹦跳跳～好幸福！',
                '最喜欢主人啦！',
                '幸福满满～',
                '主人对我最好啦～'
            ],
            welcome: [
                '你好呀～我是你的小兔子！',
                '见到你真开心！',
                '以后要好好照顾我哦～'
            ],
            login: [
                '主人回来啦～想死你了！',
                '主人终于回来啦！',
                '欢迎回家～主人！'
            ]
        }
    },

    init() {
        this.loadSettings();
        
        if (this.enabled && this.hasIFLYTEKCredentials()) {
            this.useIFLYTEK = true;
        }
        
        return true;
    },

    hasIFLYTEKCredentials() {
        const settings = Storage.getSettings();
        return settings.iflytekAppId && settings.iflytekApiKey && settings.iflytekApiSecret;
    },

    setIFLYTEKCredentials(appId, apiKey, apiSecret) {
        const settings = Storage.getSettings();
        settings.iflytekAppId = appId;
        settings.iflytekApiKey = apiKey;
        settings.iflytekApiSecret = apiSecret;
        Storage.saveSettings(settings);
        
        this.useIFLYTEK = !!(appId && apiKey && apiSecret);
        
        if (this.useIFLYTEK) {
            console.log('讯飞语音配置成功');
        }
    },

    async speak(text) {
        if (!this.enabled) return;

        if (this.useIFLYTEK && this.hasIFLYTEKCredentials()) {
            await this.speakWithIFLYTEK(text);
        } else {
            await this.speakWithBrowser(text);
        }
    },

    async speakWithIFLYTEK(text) {
        try {
            if (this.iflytekWs) {
                this.iflytekWs.close();
            }

            const settings = Storage.getSettings();
            const wsUrl = this.createIFLYTEKUrl(settings.iflytekApiKey, settings.iflytekApiSecret);
            
            this.audioChunks = [];
            
            return new Promise((resolve, reject) => {
                this.iflytekWs = new WebSocket(wsUrl);
                
                this.iflytekWs.onopen = () => {
                    const frame = {
                        common: {
                            app_id: settings.iflytekAppId
                        },
                        business: {
                            aue: 'lame',
                            auf: 'audio/L16;rate=16000',
                            vcn: 'aisbabychan',
                            speed: 45,
                            volume: 50,
                            pitch: 55,
                            tte: 'UTF8'
                        },
                        data: {
                            text: this.encodeText(text),
                            status: 2
                        }
                    };
                    
                    this.iflytekWs.send(JSON.stringify(frame));
                };
                
                this.iflytekWs.onmessage = (event) => {
                    const jsonData = JSON.parse(event.data);
                    
                    if (jsonData.code !== 0) {
                        console.error('讯飞语音合成错误:', jsonData);
                        this.speakWithBrowser(text).then(resolve);
                        return;
                    }
                    
                    if (jsonData.data && jsonData.data.audio) {
                        this.audioChunks.push(jsonData.data.audio);
                    }
                    
                    if (jsonData.data && jsonData.data.status === 2) {
                        this.playIFLYTEKAudio().then(resolve);
                        this.iflytekWs.close();
                    }
                };
                
                this.iflytekWs.onerror = (error) => {
                    console.error('讯飞WebSocket错误:', error);
                    this.speakWithBrowser(text).then(resolve);
                };
                
                this.iflytekWs.onclose = () => {
                    this.speaking = false;
                    this.processQueue();
                };
            });
        } catch (error) {
            console.error('讯飞语音合成失败:', error);
            await this.speakWithBrowser(text);
        }
    },

    createIFLYTEKUrl(apiKey, apiSecret) {
        const host = 'ws-api.xfyun.cn';
        const date = new Date().toUTCString();
        const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`;
        const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
        const signature = CryptoJS.enc.Base64.stringify(signatureSha);
        const authorizationOrigin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
        const authorization = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin));
        
        return `wss://tts-api.xfyun.cn/v2/tts?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${host}`;
    },

    encodeText(text) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    },

    async playIFLYTEKAudio() {
        if (this.audioChunks.length === 0) return;
        
        const allAudio = this.audioChunks.join('');
        const audioData = atob(allAudio);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const view = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < audioData.length; i++) {
            view[i] = audioData.charCodeAt(i);
        }
        
        const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
        
        this.currentAudio = new Audio(url);
        this.speaking = true;
        
        return new Promise((resolve) => {
            this.currentAudio.onended = () => {
                this.speaking = false;
                URL.revokeObjectURL(url);
                this.processQueue();
                resolve();
            };
            
            this.currentAudio.onerror = () => {
                this.speaking = false;
                URL.revokeObjectURL(url);
                resolve();
            };
            
            this.currentAudio.play().catch(() => {
                resolve();
            });
        });
    },

    async speakWithBrowser(text) {
        if (!('speechSynthesis' in window)) {
            return;
        }

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = this.voiceSettings.rate;
        utterance.pitch = this.voiceSettings.pitch;
        utterance.volume = this.voiceSettings.volume;

        const voices = speechSynthesis.getVoices();
        const zhVoice = voices.find(v => v.lang.includes('zh'));
        if (zhVoice) {
            utterance.voice = zhVoice;
        }

        return new Promise((resolve) => {
            utterance.onend = () => {
                this.speaking = false;
                this.processQueue();
                resolve();
            };
            utterance.onerror = () => {
                this.speaking = false;
                resolve();
            };
            this.speaking = true;
            speechSynthesis.speak(utterance);
        });
    },

    loadSettings() {
        const settings = Storage.getSettings();
        this.enabled = settings.voiceEnabled !== false;
    },

    saveSettings() {
        const settings = Storage.getSettings();
        settings.voiceEnabled = this.enabled;
        Storage.saveSettings(settings);
    },

    toggle() {
        this.enabled = !this.enabled;
        this.saveSettings();
        
        if (!this.enabled) {
            this.stop();
        }
        
        return this.enabled;
    },

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        if (this.iflytekWs) {
            this.iflytekWs.close();
            this.iflytekWs = null;
        }
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        this.speaking = false;
        this.queue = [];
    },

    processQueue() {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            setTimeout(() => this.speak(next), 100);
        }
    },

    getRandomMessage(petType, category) {
        const messages = this.messages[petType]?.[category];
        if (!messages || messages.length === 0) {
            return '';
        }
        return messages[Math.floor(Math.random() * messages.length)];
    },

    speakAction(petType, action) {
        const message = this.getRandomMessage(petType, action);
        if (message) {
            this.speak(message);
        }
        return message;
    },

    speakStatus(petType, statusType) {
        const message = this.getRandomMessage(petType, statusType);
        if (message) {
            this.speak(message);
        }
        return message;
    },

    speakWelcome(petType) {
        const message = this.getRandomMessage(petType, 'welcome');
        if (message) {
            setTimeout(() => this.speak(message), 500);
        }
        return message;
    },

    speakLogin(petType) {
        const message = this.getRandomMessage(petType, 'login');
        if (message) {
            setTimeout(() => this.speak(message), 300);
        }
        return message;
    },

    checkAndSpeakStatus(pet) {
        if (!this.enabled || !pet) return;

        const messages = [];
        
        if (pet.hunger < 20) {
            messages.push(this.getRandomMessage(pet.type, 'hungry'));
        } else if (pet.energy < 20) {
            messages.push(this.getRandomMessage(pet.type, 'tired'));
        } else if (pet.clean < 20) {
            messages.push(this.getRandomMessage(pet.type, 'dirty'));
        } else if (pet.mood < 20) {
            messages.push(this.getRandomMessage(pet.type, 'sad'));
        } else if (pet.hunger > 80 && pet.mood > 80 && pet.clean > 80 && pet.energy > 80) {
            messages.push(this.getRandomMessage(pet.type, 'happy'));
        }

        if (messages.length > 0) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            this.speak(message);
            return message;
        }
        
        return null;
    },

    speakCustom(text) {
        return this.speak(text);
    },

    isEnabled() {
        return this.enabled;
    },

    isIFLYTEKEnabled() {
        return this.useIFLYTEK && this.hasIFLYTEKCredentials();
    }
};

window.Voice = Voice;
