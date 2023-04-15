let view = {
    highlightCharacterSelection: function (img) {
        img = img.target
        img.parentElement.classList.add("highlighted");
        let pos = img.id.substring(3,4);
        controller.selectCharacter(pos);
        setTimeout(()=>{
        if(playerTeam.length == 4) {
            controller.preStart();
        }},10)
    },
    removeSelections: function() {
        for(let i = 0; i < playerTeam.length; i++) {
            let selImage = document.getElementById("sel"+i);
            selImage.src = "";
        };
        setTimeout(()=>{
            this.unHighlightCharacters();
            let backgroundMusic = new Audio("sound/epic.mp3");
            setInterval(()=> {
                backgroundMusic.play()},179000);
        },1)
    },
    killCharacter: function(index) {
        let flame = document.getElementById("pos"+index);
        flame.src = "images/flame.png";
        let flameSound = new Audio("sound/ondeath.mp3");
        flameSound.play();
        setTimeout(function() {
            flame.src = "";
            if(index <= 3) {
                let stats = document.getElementById("char"+index);
                stats.innerHTML = "";
            } else {
                let target = document.getElementById("target"+index);
                target.innerHTML = "";
            };
        },2000);
        setTimeout(function() {
            if(enemyTeam.length < 1) {
                enemyTeam = [];
                teamFunctions.Difficulty = teamFunctions.Difficulty*1.1;
                gameState.Round = gameState.Round+1;
                teamFunctions.populateEnemies();
        }},2000);
    },
    addEnemy: function(index) {
        let spot = index + 4;
        let position = document.getElementById("pos"+spot);
        let target = document.getElementById("target"+spot);
        let image = enemyTeam[index].image
        position.src = image;
        target.innerHTML = enemyTeam[index].name;
    },
    addTeam: function(index) {
        let position = document.getElementById("pos"+index);
        let statusSpot = document.getElementById("char"+index);
        position.src = model.team[index].image;
        statusSpot.innerHTML = model.team[index].name+" --- "+model.team[index].health+"/100";
    },
    switchToActionsWindow () {
        let target = document.getElementById("targets");
        target.setAttribute("class", "hide");
        let actions = document.getElementById("actions");
        actions.classList.remove("hide");
    },
    switchToTargetsWindow () {
        let actions = document.getElementById("actions");
        actions.setAttribute("class", "hide");
        let targets = document.getElementById("targets");
        targets.classList.remove("hide");  
    },
    unHighlightCharacters: function () {
        let images = document.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
            images[i].parentElement.classList.remove("highlighted");
        }
    },
    highlightCharacterTurn (index) {
        let image = document.getElementById("pos"+index);
        image.parentElement.classList.add("highlighted");
    },
    attackAnimation (message,pos,array,messageNote) {
        let messageWindow = document.getElementById("attackMessageWindow");
        messageWindow.classList.remove("hide");
        let messageText = document.getElementById("attackMessage");
        messageText.innerHTML = message;
        let messageSub = document.getElementById("messageNote");
        messageSub.innerHTML = messageNote;
        let target = document.getElementById("pos"+pos);
        let intervalID = setInterval(() => {
            if(target.classList.contains("flash")) {
                target.classList.remove("flash");
                let onAttack = new Audio("sound/onAttack.mp3");
                onAttack.play();
            } else {
                target.setAttribute("class", "flash");
            }
        },100);
        setTimeout(()=> {
            clearInterval(intervalID);
            if(target.classList.contains("flash")) {
                target.classList.remove("flash");
            }
        },700);
        setTimeout(() => {
            for(let i = 0; i < array.length; i++) {
                let image = document.getElementById("pos"+array[i]);
                image.setAttribute("class","red");
                let onHit = new Audio("sound/onHit.mp3");
                onHit.play();
                //add damage amount
            }
        },700);
        setTimeout(()=> {
            for(let i = 0; i < array.length; i++) {
                let image = document.getElementById("pos"+array[i]);
                image.classList.remove("red");
                //remove damage amount
            }
        },1150);
        setTimeout(()=> {
            messageWindow.setAttribute("class","hide");
            this.updateHealth();
        },1150);
    },
    updateHealth: function() {
        for (let i = 0; i < model.team.length; i++) {
            let newHealth = model.team[i].health;
            let oldHealth = document.getElementById("char"+model.team[i].pos);
            oldHealth.innerHTML = model.team[i].name+" --- "+newHealth+"/100";
        };
    },
    displayEndWindow: function(amountHealed,roundsCompleted, damageDealt,enemiesKilled) {
        let window = document.getElementById("endWindow");
        window.classList.remove("hide");
        document.getElementById("amountHealed").innerHTML = amountHealed;
        document.getElementById("roundsCompleted").innerHTML = roundsCompleted;
        document.getElementById("damageDealt").innerHTML = damageDealt;
        document.getElementById("enemiesKilled").innerHTML = enemiesKilled;
    },
    messageWindowOnly: function(message,messageNote) {
        let messageWindow = document.getElementById("attackMessageWindow");
        messageWindow.classList.remove("hide");
        let messageText = document.getElementById("attackMessage");
        messageText.innerHTML = message;
        let messageSub = document.getElementById("messageNote");
        messageSub.innerHTML = messageNote;
        setTimeout(()=> {
            messageWindow.setAttribute("class","hide");
            this.updateHealth();
        },1150);
    }

}
let player1 = {}
let player2 = {}
let player3 = {}
let player4 = {}
let playerTeam = [player1, player2, player3, player4]
let enemy1 = {}
let enemy2 = {}
let enemy3 = {}
let enemy4 = {}
let enemyTeam = [enemy1, enemy2, enemy3, enemy4]
let playerConstructorArray = [Paladin, Barbarian, Priest, Mage, Captain, Summoner, Priestess, Wizard]
let enemyConstructorArray = []
const teamFunctions = {
    checkForDeath(team) {
        for (i = 0; i < team.length; i++) {
            if (team[i].health < 1) {
                team[i] = {};
                view.killCharacter(team[i].location)
            }
        }
    },
    checkForSpace(array) {
        for (i = 0; i < array.length; i++) {
            if (array[i] == {}) {
                return i
            };
            return false
        }
    }
}
const gameState = {
    Round: 0,
    //keeps gameState data
}
class Character {
    constructor () {
        this.health = 100;
        this.location = "p1";
    }
    attack(target) {
        let roll = Math.floor(Math.random()*100);
        if (roll < target.defense) {
            //miss message
            //iterate turn
        } else {
            damageDealt = this.attack;
            target.health = target.health - damageDealt;
            //attack message
            //check for death
            //iterate turn
        }
    }
}
class Paladin extends Character {
    constructor() {
        this.attack = 50;
        this.defense = 75;
    }
    special() {
        amountHealed = this.attack/2;
        playerTeam.forEach(item => item.health + amountHealed);
        //message "Holy Light - Each Teammate Healed " + amountHealed
        //iterate turn
    }
}
class Barbarian extends Character {
    constructor() {
        this.attack = 75;
        this.defense = 50;
    }
    special() {
        damageDealt = this.attack/4;
        enemyTeam.forEach(item => item.health = item.health - damageDealt);
        //message "Barbarian goes berserk! "+damageDealt+" to each enemy!"
        //iterate turn
        
    }
}
class Priest extends Character {
    constructor () {
        this.attack = 20;
        this.defense = 20;
    }
    special (target) {
        target.health = 100;
        //message "Priest heals "+target.name
        //iterate turn
    }
}
class Mage extends Character {
    constructor () {
        this.attack = 20;
        this.defense = 20;
    }
    special () {
        let damageDealt = this.attack*2;
        enemyTeam.forEach(item => item.health - damageDealt);
        //message "Mage attacks each enemy for "+damageDealt
        //iterate turn
    }
}
class Captain extends Character {
    constructor () {
        this.attack = 5;
        this.defense = 90
    }
    special () {
        playerTeam.forEach(item => item.attack = item.attack + this.attack);
        //iterate turn
    }
}
class Summoner extends Character {
    constructor () {
        this.attack = 25;
        this.defense = 35
    }
    special () {
        for (i = 0; i < playerTeam.length; i++) {
            if (teamFunctions.checkForSpace(playerTeam) !== false) {
                let RandomConstructor = playerConstructorArray[Math.floor(Math.random()*playerConstructorArray.length)]; //returns a random player character constructor function
                let playerSpot = playerTeam[teamFunctions.checkForSpace(playerTeam)]
                playerSpot = new RandomConstructor();
                //add character image
                //message "Summoner summons aide!"
            }
        }
    }
}
class Priestess extends Character {
    constructor () {
        this.attack = 20;
        this.defense = 20;
    }
    special() {
        playerTeam.forEach(item => item.health = item.health + this.attack);
        //message "Priestess adds "+this.attack+" to everyone's health!"
    }
}
class Wizard extends Character {
    constructor () {
        this.attack = 30;
        this.defense = 80
    }
    special(target) {
        let roll = Math.floor(Math.random()*100);
        if (roll < this.attack) {
            target.health = 0;
            //message "Wizard fells his target with one blow!"
        }
    }
}
class Goblin extends Character {
    constructor () {
        this.attack = 70;
        this.defense = 70;
    }
    special () {

    }
}