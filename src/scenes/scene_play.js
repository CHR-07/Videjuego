import Palas from '../gameObjects/palas.js';
class Scene_play extends Phaser.Scene {
    constructor() {
        super({ key: "Scene_play" });
        this.score1 = 0;
        this.score2 = 0;
    }

    create() {
        let center_width = this.sys.game.config.width / 2;
        let center_height = this.sys.game.config.height / 2;

        // Separador
        this.add.image(center_width, center_height, "separador");

        // Palas
        this.izquierda = new Palas(this, 30, center_height, "izquierda");
        this.derecha = new Palas(this, this.sys.game.config.width - 30, center_height, "derecha");

        // bola
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, "ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-180);

        // Fisicas
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

        // Controles
        // Pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();

        // Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // Marcador
        this.marcador();
    }
    update() {
        // Control de las palas
        // pala derecha
        if (this.cursor.down.isDown) {
            this.derecha.body.setVelocityY(300);
        } else if (this.cursor.up.isDown) {
            this.derecha.body.setVelocityY(-300);
        } else {
            this.derecha.body.setVelocityY(0);
        }
        // Pala izquierda
        if (this.cursor_S.isDown) {
            this.izquierda.body.setVelocityY(300);
        } else if (this.cursor_W.isDown) {
            this.izquierda.body.setVelocityY(-300);
        } else {
            this.izquierda.body.setVelocityY(0);
        }

        if (this.ball.x < 0) {
            this.score2 += 1;
            this.scoreText2.setText('' + this.score2);
            this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        } else if (this.ball.x > this.sys.game.config.width) {
            this.score1 += 1;
            this.scoreText1.setText('' + this.score1);
            this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        }
    }

    chocaPala() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }

    marcador() {
        this.scoreText1 = this.add.text(295, 5, '0', {
            fontFamily: 'font1',
            fontSize: 40,
            color: '#ffffff',
            align: 'right'
        }).setOrigin(1, 0);
        this.scoreText2 = this.add.text(345, 5, '0', {
            fontFamily: 'font1',
            fontSize: 40,
            color: '#ffffff'
        });
    }

}
export default Scene_play;