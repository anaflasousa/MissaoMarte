import Phaser from 'phaser';

export class Fase2Scene extends Phaser.Scene {

    constructor() {

        super('Fase2Scene');
    }


    create() {

        this.cameras.main
            .setBackgroundColor(
                '#020617'
            );


        this.add
            .text(

                this.scale.width / 2,

                this.scale.height / 2,

                'FASE 2',

                {
                    fontSize: '48px',
                    color: '#ffffff',
                    fontStyle: 'bold'
                }

            )
            .setOrigin(0.5);
    }
}