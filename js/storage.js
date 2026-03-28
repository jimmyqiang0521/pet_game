const Storage = {
    KEYS: {
        PET_DATA: 'pet_data',
        USER_DATA: 'user_data',
        SHOP_DATA: 'shop_data',
        ACHIEVEMENTS: 'achievements',
        SETTINGS: 'settings'
    },

    save(key, data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    },

    load(key, defaultValue = null) {
        try {
            const jsonData = localStorage.getItem(key);
            return jsonData ? JSON.parse(jsonData) : defaultValue;
        } catch (error) {
            console.error('Storage load error:', error);
            return defaultValue;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    },

    getPetData() {
        return this.load(this.KEYS.PET_DATA, {
            type: null,
            name: '小可爱',
            hunger: 100,
            mood: 100,
            clean: 100,
            energy: 100,
            level: 1,
            exp: 0,
            createdAt: null,
            lastUpdate: null
        });
    },

    savePetData(data) {
        return this.save(this.KEYS.PET_DATA, {
            ...data,
            lastUpdate: new Date().toISOString()
        });
    },

    getUserData() {
        return this.load(this.KEYS.USER_DATA, {
            coins: 100,
            totalFeeds: 0,
            totalPlays: 0,
            totalCleans: 0,
            totalSleeps: 0,
            lastLoginDate: null,
            consecutiveDays: 0
        });
    },

    saveUserData(data) {
        return this.save(this.KEYS.USER_DATA, data);
    },

    getShopData() {
        return this.load(this.KEYS.SHOP_DATA, {
            ownedItems: [],
            foodInventory: {
                apple: 3,
                fish: 2,
                meat: 1
            },
            toyInventory: {
                ball: 1,
                yarn: 0
            }
        });
    },

    saveShopData(data) {
        return this.save(this.KEYS.SHOP_DATA, data);
    },

    getAchievements() {
        return this.load(this.KEYS.ACHIEVEMENTS, {
            unlocked: [],
            progress: {}
        });
    },

    saveAchievements(data) {
        return this.save(this.KEYS.ACHIEVEMENTS, data);
    },

    getSettings() {
        return this.load(this.KEYS.SETTINGS, {
            soundEnabled: true,
            vibrationEnabled: true,
            notificationsEnabled: true,
            voiceEnabled: true,
            iflytekAppId: '',
            iflytekApiKey: '',
            iflytekApiSecret: ''
        });
    },

    saveSettings(data) {
        return this.save(this.KEYS.SETTINGS, data);
    },

    calculateOfflineProgress() {
        const petData = this.getPetData();
        
        if (!petData.lastUpdate || !petData.type) {
            return { hunger: 100, mood: 100, clean: 100, energy: 100 };
        }

        const lastUpdate = new Date(petData.lastUpdate);
        const now = new Date();
        const hoursPassed = (now - lastUpdate) / (1000 * 60 * 60);

        const decayRates = {
            hunger: 2,
            mood: 1.5,
            clean: 1,
            energy: 0.5
        };

        const newStats = {
            hunger: Math.max(0, petData.hunger - hoursPassed * decayRates.hunger),
            mood: Math.max(0, petData.mood - hoursPassed * decayRates.mood),
            clean: Math.max(0, petData.clean - hoursPassed * decayRates.clean),
            energy: Math.min(100, petData.energy + hoursPassed * 2)
        };

        return newStats;
    },

    hasExistingPet() {
        const petData = this.getPetData();
        return petData.type !== null;
    },

    resetAllData() {
        this.clear();
        return true;
    },

    exportData() {
        return {
            pet: this.getPetData(),
            user: this.getUserData(),
            shop: this.getShopData(),
            achievements: this.getAchievements(),
            settings: this.getSettings(),
            exportDate: new Date().toISOString()
        };
    },

    importData(data) {
        try {
            if (data.pet) this.save(this.KEYS.PET_DATA, data.pet);
            if (data.user) this.save(this.KEYS.USER_DATA, data.user);
            if (data.shop) this.save(this.KEYS.SHOP_DATA, data.shop);
            if (data.achievements) this.save(this.KEYS.ACHIEVEMENTS, data.achievements);
            if (data.settings) this.save(this.KEYS.SETTINGS, data.settings);
            return true;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }
};
