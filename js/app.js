class App {
    constructor() {
        this.currentPage = 'home';
        this.pet = null;
        this.userData = null;
        this.shopData = null;
        this.achievements = null;
        
        this.shopItems = {
            food: [
                { id: 'apple', name: '苹果', icon: '🍎', price: 10, effect: { hunger: 20 } },
                { id: 'fish', name: '小鱼干', icon: '🐟', price: 20, effect: { hunger: 35, mood: 5 } },
                { id: 'meat', name: '肉肉', icon: '🍖', price: 30, effect: { hunger: 50, mood: 10 } },
                { id: 'cake', name: '蛋糕', icon: '🍰', price: 50, effect: { hunger: 30, mood: 30 } },
                { id: 'milk', name: '牛奶', icon: '🥛', price: 15, effect: { hunger: 15, energy: 10 } }
            ],
            toys: [
                { id: 'ball', name: '小球', icon: '⚽', price: 30, effect: { mood: 20, energy: -5 } },
                { id: 'yarn', name: '毛线球', icon: '🧶', price: 25, effect: { mood: 25 } },
                { id: 'frisbee', name: '飞盘', icon: '🥏', price: 40, effect: { mood: 30, energy: -10 } },
                { id: 'bone', name: '骨头', icon: '🦴', price: 35, effect: { mood: 25, hunger: 10 } }
            ],
            decor: [
                { id: 'bow', name: '蝴蝶结', icon: '🎀', price: 50, type: 'accessory' },
                { id: 'crown', name: '皇冠', icon: '👑', price: 100, type: 'accessory' },
                { id: 'hat', name: '小帽子', icon: '🎩', price: 80, type: 'accessory' },
                { id: 'glasses', name: '墨镜', icon: '🕶️', price: 60, type: 'accessory' }
            ]
        };

        this.achievementDefs = [
            { id: 'first_feed', name: '第一次喂食', desc: '给宠物喂食一次', icon: '🍖', condition: (stats) => stats.totalFeeds >= 1 },
            { id: 'feed_10', name: '美食家', desc: '喂食10次', icon: '🍽️', condition: (stats) => stats.totalFeeds >= 10 },
            { id: 'feed_50', name: '大厨', desc: '喂食50次', icon: '👨‍🍳', condition: (stats) => stats.totalFeeds >= 50 },
            { id: 'play_10', name: '玩伴', desc: '玩耍10次', icon: '🎮', condition: (stats) => stats.totalPlays >= 10 },
            { id: 'play_50', name: '游戏达人', desc: '玩耍50次', icon: '🏆', condition: (stats) => stats.totalPlays >= 50 },
            { id: 'days_7', name: '一周陪伴', desc: '养成7天', icon: '📅', condition: (stats) => stats.days >= 7 },
            { id: 'days_30', name: '月度之星', desc: '养成30天', icon: '⭐', condition: (stats) => stats.days >= 30 },
            { id: 'rich', name: '小富翁', desc: '拥有500金币', icon: '💰', condition: (stats) => stats.coins >= 500 },
            { id: 'level_5', name: '成长之路', desc: '宠物达到5级', icon: '📈', condition: (stats) => stats.level >= 5 },
            { id: 'level_10', name: '高级宠物', desc: '宠物达到10级', icon: '🌟', condition: (stats) => stats.level >= 10 }
        ];

        this.init();
    }

    init() {
        this.loadGameData();
        Voice.init();
        this.setupEventListeners();
        this.checkExistingPet();
    }

    loadGameData() {
        this.userData = Storage.getUserData();
        this.shopData = Storage.getShopData();
        this.achievements = Storage.getAchievements();
    }

    checkExistingPet() {
        if (Storage.hasExistingPet()) {
            const petData = Storage.getPetData();
            this.pet = Pet.loadFromData(petData);
            this.pet.applyOfflineProgress();
            this.navigateTo('main');
            this.startGame();
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.pet-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectPet(e));
        });

        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAction(e));
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });

        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryChange(e));
        });

        const voiceToggle = document.getElementById('voice-toggle');
        if (voiceToggle) {
            voiceToggle.addEventListener('click', () => this.toggleVoice());
        }

        const settingsCloseBtn = document.getElementById('settings-close');
        
        if (settingsCloseBtn) {
            settingsCloseBtn.addEventListener('click', () => this.closeSettings());
        }

        const voiceBtn = document.getElementById('voice-toggle');
        if (voiceBtn) {
            voiceBtn.addEventListener('dblclick', () => this.openVoiceSettings());
        }
    }

    selectPet(e) {
        const card = e.currentTarget;
        const petType = card.dataset.pet;

        document.querySelectorAll('.pet-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        Utils.vibrate(50);

        setTimeout(() => {
            this.createPet(petType);
        }, 300);
    }

    createPet(type) {
        const petNames = {
            cat: '小喵喵',
            dog: '小汪汪',
            rabbit: '小兔兔'
        };

        this.pet = new Pet(type, petNames[type]);
        this.pet.createdAt = new Date().toISOString();
        
        Storage.savePetData(this.pet.toJSON());
        
        this.navigateTo('main');
        this.startGame();
        this.showMessage(`欢迎${this.pet.name}来到你的身边！💕`);
        
        Voice.speakWelcome(type);
    }

    startGame() {
        this.updateUI();
        this.updateVoiceButton();
        this.pet.startDecay(() => {
            this.updateUI();
            Storage.savePetData(this.pet.toJSON());
        });
        
        this.checkDailyBonus();
        
        if (this.userData.lastLoginDate !== Utils.formatDate(new Date())) {
            Voice.speakLogin(this.pet.type);
        }
    }

    checkDailyBonus() {
        const today = Utils.formatDate(new Date());
        const lastLogin = this.userData.lastLoginDate;

        if (lastLogin !== today) {
            const yesterday = Utils.formatDate(new Date(Date.now() - 86400000));
            
            if (lastLogin === yesterday) {
                this.userData.consecutiveDays++;
            } else {
                this.userData.consecutiveDays = 1;
            }

            const bonus = this.userData.consecutiveDays * 10;
            this.userData.coins += bonus;
            this.userData.lastLoginDate = today;
            
            Storage.saveUserData(this.userData);
            
            this.showMessage(`每日登录奖励：+${bonus}金币！💰`);
        }
    }

    handleAction(e) {
        if (!this.pet || this.pet.isAnimating) return;

        const action = e.currentTarget.dataset.action;
        const result = this.pet[action]();

        if (result.success) {
            this.pet.setAnimating(true);
            this.playActionAnimation(action);
            
            this.updateUserData(action);
            this.checkAchievements();
            
            Utils.vibrate([50, 30, 50]);
            
            const voiceMessage = Voice.speakAction(this.pet.type, action);
            if (voiceMessage) {
                this.showMessage(voiceMessage);
            } else {
                this.showMessage(result.message);
            }
            
            setTimeout(() => {
                this.pet.setAnimating(false);
                this.updateUI();
                Storage.savePetData(this.pet.toJSON());
            }, 1000);
        } else {
            this.showMessage(result.message);
        }
    }

    playActionAnimation(action) {
        const petContainer = document.getElementById('pet-container');
        petContainer.className = `pet-container ${this.pet.type} ${action}ing`;
        
        setTimeout(() => {
            petContainer.className = `pet-container ${this.pet.type} ${this.pet.state}`;
        }, 1000);
    }

    updateUserData(action) {
        switch (action) {
            case 'feed':
                this.userData.totalFeeds++;
                this.userData.coins += 2;
                break;
            case 'play':
                this.userData.totalPlays++;
                this.userData.coins += 3;
                break;
            case 'clean':
                this.userData.totalCleans++;
                this.userData.coins += 2;
                break;
            case 'sleep':
                this.userData.totalSleeps++;
                this.userData.coins += 1;
                break;
        }
        
        Storage.saveUserData(this.userData);
    }

    handleNavigation(e) {
        const page = e.currentTarget.dataset.page;
        this.navigateTo(page);
    }

    navigateTo(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        this.currentPage = page;

        if (page === 'shop') {
            this.renderShop('food');
        } else if (page === 'achievements') {
            this.renderAchievements();
        }
    }

    handleCategoryChange(e) {
        const category = e.currentTarget.dataset.category;
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        this.renderShop(category);
    }

    renderShop(category) {
        const container = document.getElementById('shop-items');
        const items = this.shopItems[category] || [];

        document.getElementById('shop-coins-display').textContent = this.userData.coins;

        container.innerHTML = items.map(item => {
            const owned = this.shopData.ownedItems.includes(item.id);
            const canAfford = this.userData.coins >= item.price;
            
            return `
                <div class="shop-item ${owned ? 'owned' : ''}" data-item="${item.id}" data-category="${category}">
                    <div class="shop-item-icon">${item.icon}</div>
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-price">💰 ${item.price}</div>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.shop-item').forEach(itemEl => {
            itemEl.addEventListener('click', (e) => this.handleShopItemClick(e));
        });
    }

    handleShopItemClick(e) {
        const itemEl = e.currentTarget;
        const itemId = itemEl.dataset.item;
        const category = itemEl.dataset.category;
        const item = this.shopItems[category].find(i => i.id === itemId);

        if (!item) return;

        if (this.shopData.ownedItems.includes(itemId)) {
            this.showMessage('你已经拥有这个道具了！');
            return;
        }

        if (this.userData.coins < item.price) {
            this.showMessage('金币不足！继续照顾宠物赚取金币吧~');
            return;
        }

        this.showConfirm(
            `购买 ${item.name}`,
            `确定要花费 ${item.price} 金币购买 ${item.name} 吗？`,
            () => {
                this.purchaseItem(item, category);
            }
        );
    }

    purchaseItem(item, category) {
        this.userData.coins -= item.price;
        this.shopData.ownedItems.push(item.id);
        
        if (category === 'food') {
            this.shopData.foodInventory[item.id] = (this.shopData.foodInventory[item.id] || 0) + 1;
        } else if (category === 'toys') {
            this.shopData.toyInventory[item.id] = (this.shopData.toyInventory[item.id] || 0) + 1;
        }
        
        Storage.saveUserData(this.userData);
        Storage.saveShopData(this.shopData);
        
        this.renderShop(category);
        this.updateUI();
        this.showMessage(`成功购买 ${item.name}！🎉`);
        
        this.checkAchievements();
    }

    renderAchievements() {
        const container = document.getElementById('achievements-list');
        const stats = this.getAchievementStats();

        document.getElementById('total-days').textContent = this.pet ? this.pet.getDaysOld() : 0;
        document.getElementById('total-feeds').textContent = this.userData.totalFeeds;
        document.getElementById('total-plays').textContent = this.userData.totalPlays;

        container.innerHTML = this.achievementDefs.map(achievement => {
            const unlocked = this.achievements.unlocked.includes(achievement.id);
            
            return `
                <div class="achievement-item ${unlocked ? '' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${achievement.name}</div>
                        <div class="achievement-desc">${achievement.desc}</div>
                    </div>
                    <div class="achievement-badge">${unlocked ? '✅' : '🔒'}</div>
                </div>
            `;
        }).join('');
    }

    getAchievementStats() {
        return {
            totalFeeds: this.userData.totalFeeds,
            totalPlays: this.userData.totalPlays,
            totalCleans: this.userData.totalCleans,
            totalSleeps: this.userData.totalSleeps,
            days: this.pet ? this.pet.getDaysOld() : 0,
            coins: this.userData.coins,
            level: this.pet ? this.pet.level : 1
        };
    }

    checkAchievements() {
        const stats = this.getAchievementStats();
        let newAchievements = [];

        this.achievementDefs.forEach(achievement => {
            if (!this.achievements.unlocked.includes(achievement.id)) {
                if (achievement.condition(stats)) {
                    this.achievements.unlocked.push(achievement.id);
                    newAchievements.push(achievement);
                }
            }
        });

        if (newAchievements.length > 0) {
            Storage.saveAchievements(this.achievements);
            
            newAchievements.forEach(achievement => {
                setTimeout(() => {
                    this.showMessage(`🏆 解锁成就：${achievement.name}！`);
                    Utils.vibrate([100, 50, 100, 50, 100]);
                }, 500);
            });
        }
    }

    updateUI() {
        if (!this.pet) return;

        document.getElementById('coins-display').textContent = this.userData.coins;
        document.getElementById('days-display').textContent = this.pet.getDaysOld();
        document.getElementById('pet-name').textContent = this.pet.name;

        this.updateStatusBar('hunger', this.pet.hunger);
        this.updateStatusBar('mood', this.pet.mood);
        this.updateStatusBar('clean', this.pet.clean);
        this.updateStatusBar('energy', this.pet.energy);

        const petContainer = document.getElementById('pet-container');
        petContainer.className = `pet-container ${this.pet.type} ${this.pet.state}`;

        this.updateActionButtons();
        
        if (Math.random() < 0.1 && this.pet.needsAttention()) {
            Voice.checkAndSpeakStatus(this.pet);
        }
    }

    updateStatusBar(stat, value) {
        const bar = document.getElementById(`${stat}-bar`);
        const valueEl = document.getElementById(`${stat}-value`);
        
        bar.style.width = `${value}%`;
        valueEl.textContent = Math.round(value);

        const fill = bar.classList.contains('status-fill') ? bar : bar.querySelector('.status-fill');
        if (fill) {
            fill.classList.remove('status-low', 'status-medium', 'status-good');
            if (value < 30) {
                fill.style.filter = 'brightness(0.7)';
            } else if (value < 60) {
                fill.style.filter = 'brightness(0.85)';
            } else {
                fill.style.filter = 'brightness(1)';
            }
        }
    }

    updateActionButtons() {
        const actions = ['feed', 'play', 'clean', 'sleep'];
        
        actions.forEach(action => {
            const btn = document.querySelector(`[data-action="${action}"]`);
            if (btn) {
                btn.disabled = !this.pet.canPerformAction(action);
            }
        });
    }

    showMessage(text) {
        const toast = document.getElementById('message-toast');
        toast.textContent = text;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    showConfirm(title, message, onConfirm) {
        const modal = document.getElementById('confirm-modal');
        const titleEl = document.getElementById('modal-title');
        const messageEl = document.getElementById('modal-message');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');

        titleEl.textContent = title;
        messageEl.textContent = message;
        modal.classList.add('show');

        const handleConfirm = () => {
            modal.classList.remove('show');
            onConfirm();
            cleanup();
        };

        const handleCancel = () => {
            modal.classList.remove('show');
            cleanup();
        };

        const cleanup = () => {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
    }

    toggleVoice() {
        const enabled = Voice.toggle();
        const voiceBtn = document.getElementById('voice-toggle');
        const voiceIcon = voiceBtn?.querySelector('.voice-icon');
        
        if (voiceIcon) {
            voiceIcon.textContent = enabled ? '🔊' : '🔇';
        }
        
        this.showMessage(enabled ? '语音已开启 🔊' : '语音已关闭 🔇');
        
        if (enabled && this.pet) {
            Voice.speakCustom('语音已开启');
        }
    }

    updateVoiceButton() {
        const voiceBtn = document.getElementById('voice-toggle');
        const voiceIcon = voiceBtn?.querySelector('.voice-icon');
        
        if (voiceIcon) {
            voiceIcon.textContent = Voice.isEnabled() ? '🔊' : '🔇';
        }
    }

    openVoiceSettings() {
        const modal = document.getElementById('settings-modal');
        modal.classList.add('show');
    }

    closeSettings() {
        const modal = document.getElementById('settings-modal');
        modal.classList.remove('show');
    }
}

const app = new App();
