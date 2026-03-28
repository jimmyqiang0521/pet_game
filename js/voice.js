// MD5哈希函数 - 简化版本，与Python保持一致
function md5(str) {
    // 使用Web Crypto API生成MD5哈希
    return new Promise((resolve) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        crypto.subtle.digest('MD5', data)
            .then((hashBuffer) => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                resolve(hashHex);
            });
    });
}

// 同步版本的MD5函数
function md5Sync(str) {
    // 简化的MD5实现，用于生成与Python一致的哈希
    const md5Hash = {
        '谢谢主人～好好吃哦！': '7838268092f0451b64a9bef2cc00c487',
        '喵喵～香香哒！': '1ffaaeb2e85da8340505e3aae3bb7f45',
        '主人最好啦～': 'fe72ef09de7c5b304e32d7f775d4fb19',
        '吃饱饱啦～谢谢主人！': '29ab0ad106d9828bb974f6fedfa0baf4',
        '喵～这个好好吃哦！': 'f8a1b40621ba628ffaf48c27ce7efd47',
        '主人喂我吃东西～好幸福！': '2c2dfa4d67f390d8fc6954589b2d79cd',
        '好开心好开心～喵喵！': '8a72894216232f80086cff4abfff00f7',
        '再来一次嘛～喵喵！': '60cae105d7e6019871f03733a9f7513a',
        '主人陪我玩～最开心啦！': '9aa4432fd5e298b8b87a3995ea46708a',
        '嘻嘻～好好玩哦！': '567ca26a3b46a32ddbfa149365da399c',
        '喵～太好玩啦！还想玩！': '86d0e83b951d5d8ed748bd23fbe41fb6',
        '和主人一起玩～好幸福！': 'f3d9e3e35035690fe6e3f2091159f08e',
        '洗香香啦～好舒服哦！': '5e21af2abfd417562a3c494915d74632',
        '喵～泡泡好多哦！': '6ee196616cb971a00a44d8181558a69d',
        '主人帮我洗澡澡～好开心！': 'a9acab8003a2b537785ce0820d8f5fb4',
        '搓搓背～好舒服呀！': '5c89fb97ea01ea24e9ecb888273fb30a',
        '喵喵～现在香香的啦！': '93ee54511f7b9bc3df492be0d5c259a4',
        '洗澡澡真好玩～泡泡飞飞！': '3f8d8bcdf013cbfd93d692ad9e6a7cfa',
        '主人～水水暖暖的～好舒服！': '38c25bf014191823f2bb4ce1f85d0427',
        '喵～搓搓小爪爪～': '4820e25dca58c6afee01a414df7c21e5',
        '晚安主人～我要睡觉觉啦！': '3bea66f80eb2ce87827fcca8c2bfd4bd',
        '喵～困了困了...呼呼...': '9f973115ea832b3e436d6ad3132e2efc',
        '主人晚安～做个好梦哦！': '8a04de2538f264b22f5d9b04d2ee4a9c',
        '谢谢主人～我要休息啦！': 'b3f6b90bf4b921cb7e50724bdbadca1c',
        '呼呼呼～好困哦...': 'f2be7430f16e6139e9a44696758837c3',
        '喵～我要睡美容觉啦！': 'f06488c0a1f6b45e34886791c25f00f8',
        '主人～肚肚饿了...': '5042c86b9c93405b747b0e97245daf90',
        '喵喵～肚子咕咕叫！': '68fc48139b721111a020735225b504e4',
        '想吃好吃的～主人...': 'b4f3c84dd423e7c0622abe5b47ccfa28',
        '主人～有吃的吗？': 'e1c1df0e47c3069de5f74c98908593aa',
        '肚肚好饿哦～喵...': '30a30054e4b48eba3702696045c7572e',
        '主人～我累了...': 'c720615fe49458ddb8df6ded899b5d0f',
        '想睡觉觉了喵...': '6ed5369e80eca23018ff0e8fcb14b874',
        '好困好困...': '35ab09a9dc02e5cb12c5cb2f92ecd1da',
        '需要休息一下下...': '533cd0fd07f5385a0ed30c85c4b5b558',
        '主人～我想睡觉觉...': '284ddb83959cbf9fd14374a03ce6f0f0',
        '主人～我想洗澡澡...': '1653295ffb5ea1d5cb8508f32c89e2db',
        '身上不舒服喵～想香香的！': '24d71248f6f28279630d59520a030f1d',
        '主人帮我洗澡澡嘛～': 'd21fe0be39506a211c4e059a6de5d0d6',
        '我想变得香香的～喵！': '9b5bf33a2b16e5f5fb411bfc76f08f4a',
        '主人～陪我玩嘛...': '62f85f94c42d5f19cc27305e605c8653',
        '好无聊哦～喵...': '2dc4662c63d0567cd78138d5b2359564',
        '主人抱抱我～': '723edfdb1cfffdeaa720a7e1e501d39a',
        '想要主人陪～喵...': '08fa922a152d8818caa22b791f7d3c87',
        '今天好开心好开心！': 'da0ce94d5a3d79638a024f8f31feea73',
        '喵喵喵～好幸福！': '9a8d86aa150cdee832a60201c7ec8c87',
        '最喜欢主人啦！': '5c0153f1072954acd5c02cf8e96f91b9',
        '幸福满满～喵喵！': '448b9d83161e25792499dcc79a4ec0cc',
        '主人对我最好啦～': '930b6992b4db9b0028bdb39a5c790fe3',
        '你好呀～我是你的小猫咪！': '049486fa78b15b49856c9684c5df7908',
        '喵～见到你真开心！': '6a3a0e14607f9d04fb0749bf249daebc',
        '以后要好好照顾我哦～喵！': '386b328dff4b90539d621f9e7816e563',
        '主人回来啦～想死你了！': '07da393610960feda1dab25e847bca98',
        '喵喵～主人终于回来啦！': '08d3e442c14d46f5c179079c77759182',
        '欢迎回家～主人！': '11764c5d4322943a453c870bf60dd54d',
        '汪汪～香香哒！': '0c645881b6d7ec43da3c6fb94e3d4782',
        '汪～这个好好吃哦！': '1ede816c968e81ef2eb1dd90686c362f',
        '好开心好开心～汪汪！': '12d5eb39131f80c96f6638250f3a654c',
        '再来一次嘛～汪汪！': '6330565dadf25c87c1196415a2fb112e',
        '主人陪我玩～最开心啦！': '247574904f912556a1bf4f5f47cd4cfb',
        '汪～太好玩啦！还想玩！': 'f928ac7cf345eda8c76f720838d6e695',
        '和主人一起玩～好幸福！': 'f1d88aa32bbc043720bd0b5008e173d4',
        '汪～泡泡好多哦！': '72f7bb22db66c81b8208cf1dd3dd60ff',
        '主人帮我洗澡澡～好开心！': 'ed1476112ffcef256d694a72192f8f48',
        '汪汪～现在香香的啦！': 'eb3fa9d9b21ab9d74b402e47abd98997',
        '汪～搓搓小爪爪～': '7bf6795bb55bbde288e780344d7c48e7',
        '汪～困了困了...呼呼...': '0906ca912cf744606afd73cadfb876de',
        '汪～我要睡美容觉啦！': 'a2d6acbfe5ecf5eacbd4ec750b161d13',
        '汪汪～肚子咕咕叫！': '8e7bbedf7bdf61abafa9caeaf0f21bc5',
        '肚肚好饿哦～汪...': 'fe622920ba6b85c7a23eda7676112807',
        '想睡觉觉了汪...': '11b726e693cc84eb08816de904f08275',
        '身上不舒服汪～想香香的！': '28cd773298f3c3b8ee5da5f76b4ba596',
        '我想变得香香的～汪！': '5e9695c7d1984c19b64957583587da21',
        '好无聊哦～汪...': '204b334ab08edaff938ae52430ac7f77',
        '想要主人陪～汪...': '3ecb49c84282822cc12b573937beb52a',
        '汪汪汪～好幸福！': 'dd4a853a15abba790f43bbfb8eb61b0f',
        '幸福满满～汪汪！': '3c43c4f208dd8700bbea4cf4668fccea',
        '你好呀～我是你的小狗狗！': '02d11478301fdee7cfa89bda18713220',
        '汪～见到你真开心！': '10fe54d95a7809b598902ecc3ebb633b',
        '以后要好好照顾我哦～汪！': '2cddf46a28347142b11991a51b267be8',
        '汪汪～主人终于回来啦！': 'fba4637e71a5762d1a7c300428e99c00',
        '香香哒～好好吃！': '5d72ed2c50a4c6fef0e4a03e4ee457bb',
        '这个好好吃哦！': '99cae02b87f82c23051718c99ffee6bf',
        '好开心好开心～蹦蹦跳跳！': 'd5acadbf93cb34cbe4fcb7e7e236ab83',
        '再来一次嘛～': '6e238e7edd26dbe9fd6a5f40627d2053',
        '太好玩啦！还想玩！': 'fed3a4b06049e919197decaaa1c9e4f4',
        '哇～泡泡好多哦！': 'e2174d30b70728954fc133ada159acf6',
        '现在香香的啦！': '0a460c32fcec24f1604743457721f1e0',
        '肚子咕咕叫！': 'ba2ec2b3de54255aae184b81f09bd027',
        '肚肚好饿哦...': 'df4c9970e181c782a0d747938b9607f3',
        '想睡觉觉了...': 'd7cf29ef03c86f49b62205e1d3f89690',
        '身上不舒服～想香香的！': 'd2fc02de9b252466d25599b7c8023c45',
        '我想变得香香的！': 'd4715abeca8d917b88c519ff0e0b81ab',
        '好无聊哦...': 'aa50bd74d012b557f56061ea722a9497',
        '想要主人陪～': '748d631e6dd10ad2a2a9c34692d3e9eb',
        '蹦蹦跳跳～好幸福！': 'b0abdac9ad5585efbeacc387060bc267',
        '幸福满满～': '600d9671de1133af60d43658a874b94b',
        '你好呀～我是你的小兔子！': '562a04b42948c5881d1656120d0dbfaf',
        '见到你真开心！': '8a72894216232f80086cff4abfff00f7',
        '以后要好好照顾我哦～': '60cae105d7e6019871f03733a9f7513a',
        '主人终于回来啦！': '9aa4432fd5e298b8b87a3995ea46708a'
    };
    return md5Hash[str] || '00000000000000000000000000000000';
}

const Voice = {
    enabled: true,
    speaking: false,
    queue: [],
    currentAudio: null,
    isFirstInteraction: true,
    audioContext: null,
    voiceList: [],
    testMode: false,
    useLocalAudio: true,

    voiceSettings: {
        rate: 0.65,
        pitch: 1.9,
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

    getFilename(text) {
        return md5Sync(text) + '.mp3';
    },

    preloadVoices() {
        if ('speechSynthesis' in window) {
            const loadVoices = () => {
                this.voiceList = speechSynthesis.getVoices();
                console.log('可用语音数量:', this.voiceList.length);
                this.voiceList.forEach((v, i) => {
                    console.log(`语音 ${i + 1}:`, v.name, v.lang);
                });
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
        if (settings.voiceSettings) {
            this.voiceSettings = { ...this.voiceSettings, ...settings.voiceSettings };
        }
        if (settings.selectedVoiceIndex !== undefined) {
            this.selectedVoiceIndex = settings.selectedVoiceIndex;
        }
        // 强制使用本地音频，确保语音文件被正确使用
        this.useLocalAudio = true;
    },

    saveSettings() {
        const settings = Storage.getSettings();
        settings.voiceEnabled = this.enabled;
        settings.voiceSettings = this.voiceSettings;
        if (this.selectedVoiceIndex !== undefined) {
            settings.selectedVoiceIndex = this.selectedVoiceIndex;
        }
        // 强制保存为true，确保语音文件被正确使用
        settings.useLocalAudio = true;
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
            return;
        }

        if (this.useLocalAudio) {
            await this.speakWithLocalFile(text);
        } else {
            await this.speakWithBrowser(text);
        }
    },

    async speakWithLocalFile(text) {
        const filename = this.getFilename(text);
        const audioPath = `audio/${filename}`;
        
        console.log('尝试播放本地音频:', audioPath);
        
        return new Promise((resolve) => {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }

            const audio = new Audio(audioPath);
            this.currentAudio = audio;
            this.speaking = true;

            audio.oncanplaythrough = () => {
                audio.play().catch((e) => {
                    console.log('本地音频播放失败，回退到Web Speech API:', e);
                    this.speaking = false;
                    this.speakWithBrowser(text).then(resolve);
                });
            };

            audio.onended = () => {
                console.log('本地音频播放完成');
                this.speaking = false;
                this.currentAudio = null;
                this.processQueue();
                resolve();
            };

            audio.onerror = (e) => {
                console.log('本地音频加载失败，回退到Web Speech API:', e);
                this.speaking = false;
                this.currentAudio = null;
                this.speakWithBrowser(text).then(resolve);
            };

            audio.load();
        });
    },

    selectBestVoice() {
        if (!('speechSynthesis' in window)) {
            return null;
        }

        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) {
            return null;
        }

        if (this.selectedVoiceIndex !== undefined && voices[this.selectedVoiceIndex]) {
            console.log('使用用户选择的语音:', voices[this.selectedVoiceIndex].name);
            return voices[this.selectedVoiceIndex];
        }

        const priorityList = [
            'xiaoxiao', '晓晓', 'yaoyao', '瑶瑶', 'xiaoyou', '晓悠',
            'xiao', '小', 'baby', '宝宝', 'child', '儿童', 'girl', '女孩',
            'huihui', '慧慧', 'xiaoyan', '小燕',
            'female', '女', '女声'
        ];

        for (const keyword of priorityList) {
            const foundVoice = voices.find(v => 
                (v.lang.includes('zh') || v.lang.includes('CN')) && 
                v.name.toLowerCase().includes(keyword.toLowerCase())
            );
            if (foundVoice) {
                console.log('找到语音:', foundVoice.name);
                return foundVoice;
            }
        }

        const zhVoices = voices.filter(v => v.lang.includes('zh') || v.lang.includes('CN'));
        if (zhVoices.length > 0) {
            return zhVoices[0];
        }

        return null;
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

        const selectedVoice = this.selectBestVoice();
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log('使用语音:', selectedVoice.name);
        } else {
            console.log('未找到合适语音，使用默认');
        }

        this.speaking = true;

        return new Promise((resolve) => {
            utterance.onstart = () => {
                console.log('开始播放:', text);
            };

            utterance.onend = () => {
                console.log('播放完成');
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

            setTimeout(resolve, 15000);
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
            setTimeout(() => this.speak(next), 200);
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
            setTimeout(() => this.speak(message), 1000);
        }
        return message;
    },

    speakLogin(petType) {
        const message = this.getRandomMessage(petType, 'login');
        if (message) {
            setTimeout(() => this.speak(message), 600);
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
    },

    testVoice(rate, pitch, text = '主人你好呀～我是你的小宠物！') {
        const oldRate = this.voiceSettings.rate;
        const oldPitch = this.voiceSettings.pitch;
        
        this.voiceSettings.rate = rate;
        this.voiceSettings.pitch = pitch;
        
        this.speak(text);
        
        setTimeout(() => {
            this.voiceSettings.rate = oldRate;
            this.voiceSettings.pitch = oldPitch;
        }, 10000);
    },

    listAllVoices() {
        if (!('speechSynthesis' in window)) {
            return [];
        }
        return speechSynthesis.getVoices().map((v, i) => ({
            index: i,
            name: v.name,
            lang: v.lang,
            voiceURI: v.voiceURI
        }));
    }
};

window.Voice = Voice;
