function saveStats(key) {
    let statsToStore = JSON.stringify(userStats);
    localStorage.setItem(key,statsToStore);
};

function loadStoredStats(key) {
    let storedStats = getStoredStats(key);
    userStats.amountHealed = storedStats.amountHealed;
    userStats.damageDealt = storedStats.damageDealt;
    userStats.enemiesKilled = storedStats.enemiesKilled;
    userStats.roundsCompleted = storedStats.roundsCompleted;
};

function getStoredStats(key) {
    let storedStats = localStorage.getItem(key);
    if(storedStats == null || storedStats == "") {
        storedStats = {
            amountHealed: 0,
            damageDealt: 0,
            enemiesKilled: 0,
            roundsCompleted: 0,
        }
    } else {
        storedStats = JSON.parse(storedStats);
    };
    return storedStats;
};
