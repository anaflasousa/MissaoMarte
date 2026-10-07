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
        this.cameras.main.setBackgroundColor('#020617');

// ESTRELAS
for (let i = 0; i < 100; i++) {
    const x = Phaser.Math.Between(
        0,
        this.scale.width
    );

    const y = Phaser.Math.Between(
        0,
        this.scale.height
    );

    const tamanho =
        Phaser.Math.Between(1, 3);

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

        // PAINEL PRINCIPAL
        const painelLargura = Math.min(
            900,
            this.scale.width - 100
        );

        const painelAltura = 600;

        const painelX = this.scale.width / 2;
        const painelY = this.scale.height / 2;

        const painel = this.add.rectangle(
            painelX,
            painelY,
            painelLargura,
            painelAltura,
            0x0f172a,
            0.97
        );

        painel.setStrokeStyle(
            2,
            0x334155
        );

        // FASE
        this.add.text(
            painelX,
            painelY - 245,
            `FASE ${this.fase}`,
            {
                fontFamily: 'Arial',
                fontSize: '42px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // TÍTULO
        const titulo =
            this.fase === 1
                ? 'LEVE O CUBESAT ATÉ MARTE'
                : `MISSÃO DA FASE ${this.fase}`;

        this.add.text(
            painelX,
            painelY - 175,
            titulo,
            {
                fontFamily: 'Arial',
                fontSize: '30px',
                color: '#facc15',
                fontStyle: 'bold',
                align: 'center'
            }
        ).setOrigin(0.5);

        // LINHA
        this.add.rectangle(
            painelX,
            painelY - 125,
            painelLargura - 100,
            2,
            0x334155
        );

        // CONTEÚDO
        if (this.fase === 1) {

            // Primeira frase
            this.add.text(
                painelX,
                painelY - 80,
                'O foguete chegou ao espaço!',
                {
                    fontFamily: 'Arial',
                    fontSize: '23px',
                    color: '#ffffff',
                    fontStyle: 'bold',
                    align: 'center'
                }
            ).setOrigin(0.5);

            // Instrução
            this.add.text(
                painelX,
                painelY - 5,
                'Use os blocos de programação para criar a sequência correta de comandos.',
                {
                    fontFamily: 'Arial',
                    fontSize: '21px',
                    color: '#e2e8f0',
                    align: 'center',
                    wordWrap: {
                        width: painelLargura - 180
                    },
                    lineSpacing: 8
                }
            ).setOrigin(0.5);

            // Aviso
            this.add.text(
                painelX,
                painelY + 95,
                'Cuidado com os obstáculos pelo caminho',
                {
                    fontFamily: 'Arial',
                    fontSize: '21px',
                    color: '#facc15',
                    fontStyle: 'bold',
                    align: 'center'
                }
            ).setOrigin(0.5);

        } else {

            this.add.text(
                painelX,
                painelY,
                'Prepare-se para a próxima etapa da missão.',
                {
                    fontFamily: 'Arial',
                    fontSize: '23px',
                    color: '#e2e8f0',
                    align: 'center'
                }
            ).setOrigin(0.5);
        }

        // BOTÃO
        const botao = this.add.rectangle(
            painelX,
            painelY + 220,
            260,
            65,
            0xfacc15
        );

        botao.setInteractive({
            useHandCursor: true
        });

        this.add.text(
            painelX,
            painelY + 220,
            'PRÓXIMO',
            {
                fontFamily: 'Arial',
                fontSize: '22px',
                color: '#020617',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        botao.on(
            'pointerover',
            () => {
                botao.setFillStyle(0xfde047);
            }
        );

        botao.on(
            'pointerout',
            () => {
                botao.setFillStyle(0xfacc15);
            }
        );

        botao.on(
            'pointerdown',
            () => {

                if (this.fase === 1) {
                    this.scene.start('Fase1Scene');

                } else if (this.fase === 2) {
                    this.scene.start('Fase2Scene');
                }
            }
        );

        // FADE
        this.cameras.main.fadeIn(
            600,
            2,
            6,
            23
        );
    }
}