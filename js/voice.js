const Voice = {
    enabled: true,
    speaking: false,
    queue: [],
    currentAudio: null,
    isFirstInteraction: true,
    audioContext: null,
    audioCache: {},

    voiceSettings: {
        rate: 0.85,
        pitch: 1.6,
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
        this.setupMobileAudioUnlock();
        this.preloadVoices();
        return true;
    },

    preloadVoices() {
        if ('speechSynthesis' in window) {
            const loadVoices = () => {
                speechSynthesis.getVoices();
            };
            loadVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = loadVoices;
            }
        }
    },

    setupMobileAudioUnlock() {
        const unlockAudio = () => {
            if (this.isFirstInteraction) {
                this.isFirstInteraction = false;
                
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    
                    if (this.audioContext.state === 'suspended') {
                        this.audioContext.resume();
                    }
                } catch (e) {
                    console.log('Audio context not supported');
                }
                
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
                document.removeEventListener('touchend', unlockAudio);
            }
        };
        
        document.addEventListener('click', unlockAudio, { once: true });
        document.addEventListener('touchstart', unlockAudio, { once: true });
        document.addEventListener('touchend', unlockAudio, { once: true });
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

    async speak(text) {
        if (!this.enabled) return;

        if (this.isFirstInteraction) {
            this.setupMobileAudioUnlock();
            await this.unlockMobileAudio();
            return;
        }

        await this.speakWithBrowser(text);
    },

    async unlockMobileAudio() {
        return new Promise((resolve) => {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume().then(() => {
                        this.isFirstInteraction = false;
                        resolve();
                    });
                } else {
                    this.isFirstInteraction = false;
                    resolve();
                }
            } catch (e) {
                this.isFirstInteraction = false;
                resolve();
            }
            
            setTimeout(resolve, 100);
        });
    },

    async speakWithBrowser(text) {
        if (!('speechSynthesis' in window)) {
            console.log('浏览器不支持语音合成');
            return;
        }

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = this.voiceSettings.rate;
        utterance.pitch = this.voiceSettings.pitch;
        utterance.volume = this.voiceSettings.volume;

        let selectedVoice = null;
        const voices = speechSynthesis.getVoices();
        
        const zhFemaleVoices = voices.filter(v => 
            (v.lang.includes('zh') || v.lang.includes('CN')) && 
            (v.name.toLowerCase().includes('female') || 
             v.name.includes('女') ||
             v.name.includes('xiaoxiao') ||
             v.name.includes('yaoyao') ||
             v.name.includes('huihui') ||
             v.name.includes('kangkang'))
        );
        
        if (zhFemaleVoices.length > 0) {
            selectedVoice = zhFemaleVoices[0];
        } else {
            const zhVoices = voices.filter(v => v.lang.includes('zh') || v.lang.includes('CN'));
            if (zhVoices.length > 0) {
                selectedVoice = zhVoices[0];
            }
        }
        
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        this.speaking = true;

        return new Promise((resolve) => {
            utterance.onend = () => {
                this.speaking = false;
                this.processQueue();
                resolve();
            };
            
            utterance.onerror = (event) => {
                console.error('语音合成错误:', event);
                this.speaking = false;
                resolve();
            };

            try {
                speechSynthesis.speak(utterance);
            } catch (e) {
                console.error('语音播放失败:', e);
                this.speaking = false;
                resolve();
            }

            setTimeout(resolve, 100);
        });
    },

    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
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
            setTimeout(() => this.speak(next), 150);
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
            setTimeout(() => this.speak(message), 800);
        }
        return message;
    },

    speakLogin(petType) {
        const message = this.getRandomMessage(petType, 'login');
        if (message) {
            setTimeout(() => this.speak(message), 500);
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

    isSpeaking() {
        return this.speaking;
    }
};

window.Voice = Voice;
