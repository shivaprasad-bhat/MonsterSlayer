new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: [],
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                playerTurn: true,
                text: "Player hists monster, damage is : " + damage,
            });
            if (this.checkResult()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                playerTurn: true,
                text: "Player hists monster hard, damage is : " + damage,
            });
            if (this.checkResult()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();
        },
        giveUp: function () {
            this.isGameRunning = false;
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(3, 10);
            this.playerHealth -= damage;
            this.turns.unshift({
                playerTurn: false,
                text: "Monster hists player, damage is : " + damage,
            });
            this.checkResult();
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkResult: function () {
            if (this.monsterHealth <= 0) {
                if (confirm("You won! You want to start new game?")) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost! You want to start new game?")) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});