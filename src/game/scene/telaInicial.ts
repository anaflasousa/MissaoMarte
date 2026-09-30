import Phaser from 'phaser';

export class TelaInicial extends Phaser.Scene {

    constructor() {
        super('TelaInicial');
    }

    preload() {

        this.load.image(
            'terra',
            'src/assets/capa/terra.png'
        );

    }

    create() {

        // FUNDO
        this.cameras.main.setBackgroundColor('#07133A');


        // BOTÃO ''COMEÇAR''
        const botao = this.add.graphics();
        botao.fillStyle(0x020617, 1); //COR
        botao.lineStyle(2, 0x172554, 1);

        const larguraBotao = 240;
        const alturaBotao = 70;
        const raioCanto = 15;
        const altura = this.scale.height * 0.58;

        const posX = (this.scale.width / 2) - (larguraBotao / 2);
        const posY = altura - (alturaBotao / 2);

        botao.fillRoundedRect(posX, posY, larguraBotao, alturaBotao, raioCanto);
        botao.strokeRoundedRect(posX, posY, larguraBotao, alturaBotao, raioCanto);

        const areaClique = this.add.zone(
            this.scale.width / 2, // Centro X
            altura,                  // Centro Y
            larguraBotao,
            alturaBotao
        ).setInteractive({ useHandCursor: true });


        const textoBotao = this.add
            .text(
                this.scale.width / 2,
                altura,
                'Começar',
                {
                    fontFamily: 'Arial',
                    fontSize: '32px',
                    color: '#f5e51b',
                    fontStyle: 'bold'
                }
            )
            .setOrigin(0.5);


        // EFEITO DO BOTÃO
        areaClique.on('pointerover', () => {
            botao.clear();
            botao.fillStyle(0x111827, 1);
            botao.lineStyle(2, 0x172554, 1);
            botao.fillRoundedRect(posX, posY, larguraBotao, alturaBotao, raioCanto);
            botao.strokeRoundedRect(posX, posY, larguraBotao, alturaBotao, raioCanto);

        });
        areaClique.on('pointerout', () => {

            botao.clear();
            botao.fillStyle(0x020617, 1);
            botao.lineStyle(2, 0x172554, 1);
            botao.fillRoundedRect(posX, posY, larguraBotao, alturaBotao, raioCanto);
            botao.strokeRoundedRect(posX, posY, larguraBotao, alturaBotao, raioCanto);

            textoBotao.setScale(1); 
        });
        // CLIQUE NO BOTÃO
        areaClique.on('pointerdown', () => {

            this.scene.start('CutsceneScene');

        });

    }

}