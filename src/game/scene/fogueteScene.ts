import Phaser from 'phaser';

export class FogueteScene extends Phaser.Scene {

    constructor() {
        super('FogueteScene');
    }

    preload() {
        // Terra
        this.load.image(
            'terra',
            'src/assets/fogueteTerra/terra.png'
        );

        // Foguete
        this.load.image(
            'foguete',
            'src/assets/fogueteTerra/foguete.png'
        );
    }

    create() {

        // FUNDO
        this.cameras.main.setBackgroundColor('#020617');


        // ==========================================
        // ESTRELAS
        // ==========================================

        for (let i = 0; i < 100; i++) {

            const x = Phaser.Math.Between(
                0,
                this.scale.width
            );

            const y = Phaser.Math.Between(
                0,
                this.scale.height
            );

            const tamanho = Phaser.Math.Between(1, 3);

            const estrela = this.add.circle(
                x,
                y,
                tamanho,
                0xffffff
            );

            estrela.setAlpha(
                Phaser.Math.FloatBetween(0.3, 1)
            );
        }


        // ==========================================
        // TERRA
        // ==========================================

        const terra = this.add.image(
            this.scale.width / 2,
            this.scale.height + 150,
            'terra'
        );

        terra.setDisplaySize(
            500,
            500
        );


        // ==========================================
        // FOGUETE
        // ==========================================

        const foguete = this.add.image(
            this.scale.width / 2,
            this.scale.height + 100,
            'foguete'
        );

        foguete.setDisplaySize(
            180,
            260
        );


        // ==========================================
        // LEVE BALANÇO DO FOGUETE
        // ==========================================

        this.tweens.add({
            targets: foguete,
            angle: 2,
            duration: 300,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });


        // ==========================================
        // FOGUETE SUBINDO
        // ==========================================

        this.tweens.add({

            targets: foguete,

            y: -300,

            scaleX: 0.6,
            scaleY: 0.6,

            duration: 5000,

            ease: 'Cubic.easeIn',

            onComplete: () => {

                // Transição para a próxima cena
                this.cameras.main.fadeOut(
                    800,
                    2,
                    6,
                    23
                );

                this.time.delayedCall(
                    800,
                    () => {
                        this.scene.start('TransicaoScene',{
                            fase: 1
                        })
                    }
                );
            }
        });


        // ==========================================
        // TERRA DESCENDO
        // ==========================================

        this.tweens.add({

            targets: terra,

            y: this.scale.height + 500,

            scaleX: 0.7,
            scaleY: 0.7,

            duration: 5000,

            ease: 'Sine.easeInOut'
        });


        // ==========================================
        // ESTRELAS SE MOVENDO
        // ==========================================

        this.time.addEvent({

            delay: 80,

            loop: true,

            callback: () => {

                const estrela =
                    this.add.rectangle(
                        Phaser.Math.Between(
                            0,
                            this.scale.width
                        ),
                        -20,
                        2,
                        Phaser.Math.Between(
                            15,
                            40
                        ),
                        0xffffff
                    );

                this.tweens.add({

                    targets: estrela,

                    y: this.scale.height + 50,

                    duration: Phaser.Math.Between(
                        500,
                        1000
                    ),

                    onComplete: () => {
                        estrela.destroy();
                    }
                });
            }
        });


        // ==========================================
        // CLARÃO DO LANÇAMENTO
        // ==========================================

        const brilho = this.add.circle(
            this.scale.width / 2,
            this.scale.height - 20,
            70,
            0xffffff,
            0.15
        );

        this.tweens.add({

            targets: brilho,

            scale: 2,

            alpha: 0,

            duration: 1200,

            ease: 'Sine.easeOut'
        });
    }
}