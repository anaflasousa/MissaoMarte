import Phaser from 'phaser';

export class TransicaoScene extends Phaser.Scene {

    private fase!: number;

    constructor() {
        super('TransicaoScene');
    }

    init(data: { fase: number }) {
        this.fase = data.fase;
    }

    create() {

        // ==========================================
        // FUNDO
        // ==========================================

        this.cameras.main.setBackgroundColor('#020617');


        // ==========================================
        // ESTRELAS
        // ==========================================

        for (let i = 0; i < 80; i++) {

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
        // TÍTULO DA FASE
        // ==========================================

        this.add.text(
            this.scale.width / 2,
            120,
            `FASE ${this.fase}`,
            {
                fontFamily: 'Arial',
                fontSize: '48px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);


        // ==========================================
        // TÍTULO DA MISSÃO
        // ==========================================

        this.add.text(
            this.scale.width / 2,
            200,
            this.fase === 1
                ? 'LEVE O CUBESAT ATÉ MARTE'
                : `MISSÃO DA FASE ${this.fase}`,
            {
                fontFamily: 'Arial',
                fontSize: '32px',
                color: '#facc15',
                fontStyle: 'bold',
                align: 'center'
            }
        ).setOrigin(0.5);


        // ==========================================
        // TEXTO
        // ==========================================

        let mensagem = '';

        if (this.fase === 1) {

            mensagem =
                'O foguete chegou ao espaço!\n\n' +
                'Agora precisamos programar o CubeSat\n' +
                'para atravessar o espaço e chegar até Marte.\n\n' +
                'Use os blocos de programação para criar\n' +
                'a sequência correta de comandos.\n\n' +
                'Mas cuidado com os obstáculos pelo caminho!';

        } else {

            mensagem =
                'Prepare-se para a próxima etapa\n' +
                'da missão.';
        }


        this.add.text(
            this.scale.width / 2,
            360,
            mensagem,
            {
                fontFamily: 'Arial',
                fontSize: '22px',
                color: '#e2e8f0',
                align: 'center',
                lineSpacing: 10
            }
        ).setOrigin(0.5);


        // ==========================================
        // BOTÃO
        // ==========================================

        const botao = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height - 120,
            230,
            65,
            0xfacc15
        );

        botao.setInteractive({
            useHandCursor: true
        });


        const textoBotao = this.add.text(
            this.scale.width / 2,
            this.scale.height - 120,
            'PRÓXIMO',
            {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#020617',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);


        // ==========================================
        // EFEITO DO BOTÃO
        // ==========================================

        botao.on('pointerover', () => {

            botao.setFillStyle(0xfde047);

        });

        botao.on('pointerout', () => {

            botao.setFillStyle(0xfacc15);

        });


        // ==========================================
        // IR PARA A FASE
        // ==========================================

        botao.on('pointerdown', () => {

            console.log('CLIQUEI NO PRÓXIMO');

            this.scene.start('Fase1Scene');

        });


        // ==========================================
        // ENTRADA DA TELA
        // ==========================================

        this.cameras.main.fadeIn(
            600,
            2,
            6,
            23
        );
    }
}