class Pet {
    constructor(type, name = '小可爱') {
        this.type = type;
        this.name = name;
        this.hunger = 100;
        this.mood = 100;
        this.clean = 100;
        this.energy = 100;
        this.level = 1;
        this.exp = 0;
        this.createdAt = new Date().toISOString();
        this.lastUpdate = new Date().toISOString();
        
        this.decayInterval = null;
        this.state = 'normal';
        this.isAnimating = false;
        
        this.config = {
            maxStat: 100,
            minStat: 0,
            decayRates: {
                hunger: 0.5,
                mood: 0.4,
                clean: 0.3,
                energy: 0.2
            },
            actionCosts: {
                feed: { hunger: 30, energy: -5 },
                play: { mood: 25, energy: -15, hunger: -5 },
                clean: { clean: 40, mood: 5 },
                sleep: { energy: 50, hunger: -10 }
            },
            expGain: {
                feed: 5,
                play: 10,
                clean: 8,
                sleep: 3
            },
            levelUpExp: 100
        };
    }

    static loadFromData(data) {
        const pet = new Pet(data.type, data.name);
        pet.hunger = data.hunger;
        pet.mood = data.mood;
        pet.clean = data.clean;
        pet.energy = data.energy;
        pet.level = data.level;
        pet.exp = data.exp;
        pet.createdAt = data.createdAt;
        pet.lastUpdate = data.lastUpdate;
        return pet;
    }

    toJSON() {
        return {
            type: this.type,
            name: this.name,
            hunger: this.hunger,
            mood: this.mood,
            clean: this.clean,
            energy: this.energy,
            level: this.level,
            exp: this.exp,
            createdAt: this.createdAt,
            lastUpdate: this.lastUpdate
        };
    }

    startDecay(callback) {
        if (this.decayInterval) {
            clearInterval(this.decayInterval);
        }

        this.decayInterval = setInterval(() => {
            this.decay();
            if (callback) callback();
        }, 10000);
    }

    stopDecay() {
        if (this.decayInterval) {
            clearInterval(this.decayInterval);
            this.decayInterval = null;
        }
    }

    decay() {
        this.hunger = Utils.clamp(
            this.hunger - this.config.decayRates.hunger,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.mood = Utils.clamp(
            this.mood - this.config.decayRates.mood,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.clean = Utils.clamp(
            this.clean - this.config.decayRates.clean,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.energy = Utils.clamp(
            this.energy - this.config.decayRates.energy,
            this.config.minStat,
            this.config.maxStat
        );

        this.updateState();
        this.lastUpdate = new Date().toISOString();
    }

    updateState() {
        const avgStat = (this.hunger + this.mood + this.clean + this.energy) / 4;
        
        if (this.energy < 20) {
            this.state = 'tired';
        } else if (this.hunger < 20) {
            this.state = 'hungry';
        } else if (this.clean < 20) {
            this.state = 'dirty';
        } else if (this.mood < 20) {
            this.state = 'sad';
        } else if (avgStat > 80) {
            this.state = 'happy';
        } else {
            this.state = 'normal';
        }
    }

    feed() {
        if (this.isAnimating || this.hunger >= this.config.maxStat) {
            return { success: false, message: '宠物现在不饿哦~' };
        }

        this.hunger = Utils.clamp(
            this.hunger + this.config.actionCosts.feed.hunger,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.energy = Utils.clamp(
            this.energy + this.config.actionCosts.feed.energy,
            this.config.minStat,
            this.config.maxStat
        );

        this.gainExp(this.config.expGain.feed);
        this.updateState();
        
        return { success: true, message: '真好吃！😋' };
    }

    play() {
        if (this.isAnimating || this.energy < 15) {
            return { success: false, message: '宠物太累了，需要休息~' };
        }

        this.mood = Utils.clamp(
            this.mood + this.config.actionCosts.play.mood,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.energy = Utils.clamp(
            this.energy + this.config.actionCosts.play.energy,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.hunger = Utils.clamp(
            this.hunger + this.config.actionCosts.play.hunger,
            this.config.minStat,
            this.config.maxStat
        );

        this.gainExp(this.config.expGain.play);
        this.updateState();
        
        return { success: true, message: '好开心！🎉' };
    }

    clean() {
        if (this.isAnimating || this.clean >= this.config.maxStat) {
            return { success: false, message: '宠物已经很干净啦~' };
        }

        this.clean = Utils.clamp(
            this.clean + this.config.actionCosts.clean.clean,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.mood = Utils.clamp(
            this.mood + this.config.actionCosts.clean.mood,
            this.config.minStat,
            this.config.maxStat
        );

        this.gainExp(this.config.expGain.clean);
        this.updateState();
        
        return { success: true, message: '洗香香！🛁' };
    }

    sleep() {
        if (this.isAnimating || this.energy >= this.config.maxStat) {
            return { success: false, message: '宠物现在不想睡觉~' };
        }

        this.energy = Utils.clamp(
            this.energy + this.config.actionCosts.sleep.energy,
            this.config.minStat,
            this.config.maxStat
        );
        
        this.hunger = Utils.clamp(
            this.hunger + this.config.actionCosts.sleep.hunger,
            this.config.minStat,
            this.config.maxStat
        );

        this.gainExp(this.config.expGain.sleep);
        this.updateState();
        
        return { success: true, message: '睡得好香！💤' };
    }

    gainExp(amount) {
        this.exp += amount;
        
        while (this.exp >= this.config.levelUpExp) {
            this.exp -= this.config.levelUpExp;
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        return {
            leveledUp: true,
            newLevel: this.level,
            message: `恭喜！宠物升级到 ${this.level} 级！🌟`
        };
    }

    getDaysOld() {
        return Utils.daysBetween(new Date(this.createdAt), new Date());
    }

    getOverallStatus() {
        const avg = (this.hunger + this.mood + + this.clean + this.energy) / 4;
        
        if (avg >= 80) return { status: 'excellent', emoji: '🥰', text: '非常开心' };
        if (avg >= 60) return { status: 'good', emoji: '😊', text: '状态不错' };
        if (avg >= 40) return { status: 'normal', emoji: '😐', text: '一般般' };
        if (avg >= 20) return { status: 'bad', emoji: '😢', text: '需要照顾' };
        return { status: 'critical', emoji: '😰', text: '状态很差' };
    }

    canPerformAction(action) {
        switch (action) {
            case 'feed':
                return this.hunger < this.config.maxStat;
            case 'play':
                return this.energy >= 15;
            case 'clean':
                return this.clean < this.config.maxStat;
            case 'sleep':
                return this.energy < this.config.maxStat;
            default:
                return false;
        }
    }

    applyOfflineProgress() {
        const offlineStats = Storage.calculateOfflineProgress();
        
        this.hunger = offlineStats.hunger;
        this.mood = offlineStats.mood;
        this.clean = offlineStats.clean;
        this.energy = offlineStats.energy;
        
        this.updateState();
        this.lastUpdate = new Date().toISOString();
    }

    setAnimating(state) {
        this.isAnimating = state;
    }

    getStatColor(stat, value) {
        if (value >= 70) return 'good';
        if (value >= 40) return 'medium';
        return 'low';
    }

    needsAttention() {
        return this.hunger < 30 || this.mood < 30 || this.clean < 30 || this.energy < 30;
    }

    getAttentionMessage() {
        const messages = [];
        
        if (this.hunger < 30) messages.push('肚子饿了');
        if (this.mood < 30) messages.push('心情不好');
        if (this.clean < 30) messages.push('需要洗澡');
        if (this.energy < 30) messages.push('想睡觉了');
        
        return messages.length > 0 ? messages.join('，') : null;
    }
}
