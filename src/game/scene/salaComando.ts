import Phaser from 'phaser';

export class SalaComando extends Phaser.Scene {

    // ==========================================
    // FALAS
    // ==========================================

    private falas: string[] = [
        'Olá, Fulano(a)! Temos uma missão importante para você.',
        'Um de nossos CubeSats precisa ser enviado até Marte para iniciar uma missão de coleta de dados.',
        'Mas existe um problema...',
        'O CubeSat não pode ser controlado diretamente. Precisamos programar sua trajetória.',
        'Sua missão é criar uma sequência de comandos que faça o CubeSat atravessar o espaço e chegar até Marte.',
        'Mas cuidado: existem obstáculos pelo caminho.',
        'Está preparado?'
    ];


    // ==========================================
    // CONTROLE DAS FALAS
    // ==========================================

    private falaAtual = 0;
    private textoCompleto = '';
    private textoAtual = '';
    private escrevendo = false;
    private intervaloTexto?: Phaser.Time.TimerEvent;


    // ==========================================
    // ELEMENTOS DA TELA
    // ==========================================

    private personagem!: Phaser.GameObjects.Image;

    private textoFala!: Phaser.GameObjects.Text;

    private nomePersonagem!: Phaser.GameObjects.Text;

    private botaoProximo!: Phaser.GameObjects.Text;


    constructor() {
        super('CutsceneScene');
    }


    // ==========================================
    // PRELOAD
    // ==========================================

    preload() {

        this.load.image(
            'cenarioSalaComando',
            'src/assets/salaComando/cenario-SalaComando.webp'
        );

        this.load.image(
            'neutra',
            'src/assets/salaComando/neutra.png'
        );

        this.load.image(
            'falando',
            'src/assets/salaComando/falando.png'
        );
    }


    // ==========================================
    // CREATE
    // ==========================================

    create() {

        // ==========================================
        // FUNDO
        // ==========================================

        this.add
            .image(
                this.scale.width / 2,
                this.scale.height / 2,
                'cenarioSalaComando'
            )
            .setDisplaySize(
                this.scale.width,
                this.scale.height
            );


        // ==========================================
        // PERSONAGEM
        // ==========================================

        this.personagem =
            this.add.image(
                this.scale.width / 2,
                this.scale.height / 2 + 20,
                'neutra'
            );

        this.personagem.setScale(0.5);


        // ==========================================
        // CAIXA DE DIÁLOGO
        // ==========================================

        const caixaLargura =
            this.scale.width - 100;

        const caixaAltura = 210;

        const caixaX =
            this.scale.width / 2;

        const caixaY =
            this.scale.height - 125;


        const caixaDialogo =
            this.add.rectangle(
                caixaX,
                caixaY,
                caixaLargura,
                caixaAltura,
                0x0f172a,
                0.97
            );

        caixaDialogo.setStrokeStyle(
            2,
            0x334155
        );


        // ==========================================
        // NOME DA PERSONAGEM
        // ==========================================

        this.nomePersonagem =
            this.add.text(
                70,
                caixaY - 98,
                'Dr. Fulana',
                {
                    fontFamily: 'Arial',
                    fontSize: '22px',
                    color: '#ffffff',
                    fontStyle: 'bold',
                    backgroundColor: '#2563eb',
                    padding: {
                        left: 18,
                        right: 18,
                        top: 8,
                        bottom: 8
                    }
                }
            );


        // ==========================================
        // TEXTO DA FALA
        // ==========================================

        this.textoFala =
            this.add.text(
                75,
                caixaY - 25,
                '',
                {
                    fontFamily: 'Arial',
                    fontSize: '21px',
                    color: '#ffffff',
                    wordWrap: {
                        width:
                            caixaLargura - 330
                    },
                    lineSpacing: 8
                }
            );


        // ==========================================
        // BOTÃO DE CONTINUAR
        // ==========================================

        this.botaoProximo =
            this.add.text(
                caixaX + caixaLargura / 2 - 115,
                caixaY + 65,
                'CONTINUAR',
                {
                    fontFamily: 'Arial',
                    fontSize: '20px',
                    color: '#ffffff',
                    backgroundColor: '#2563eb',
                    fontStyle: 'bold',
                    padding: {
                        left: 24,
                        right: 24,
                        top: 15,
                        bottom: 15
                    }
                }
            )
                .setOrigin(0.5)
                .setInteractive({
                    useHandCursor: true
                });


        // ==========================================
        // SOMBRA DO BOTÃO
        // ==========================================

        this.botaoProximo.setShadow(
            3,
            3,
            '#000000',
            5,
            true,
            true
        );


        // ==========================================
        // EFEITO DO BOTÃO
        // ==========================================

        this.botaoProximo.on(
            'pointerover',
            () => {

                this.botaoProximo
                    .setBackgroundColor(
                        '#3b82f6'
                    );

                this.botaoProximo
                    .setScale(1.05);
            }
        );


        this.botaoProximo.on(
            'pointerout',
            () => {

                if (
                    this.falaAtual ===
                    this.falas.length - 1
                ) {

                    this.botaoProximo
                        .setBackgroundColor(
                            '#16a34a'
                        );

                } else {

                    this.botaoProximo
                        .setBackgroundColor(
                            '#2563eb'
                        );
                }

                this.botaoProximo
                    .setScale(1);
            }
        );


        // ==========================================
        // CLIQUE
        // ==========================================

        this.botaoProximo.on(
            'pointerdown',
            () => {

                this.botaoProximo
                    .setScale(0.97);

                this.clicarProximo();
            }
        );


        // ==========================================
        // COMEÇA A PRIMEIRA FALA
        // ==========================================

        this.iniciarFala();
    }


    // ==========================================
    // INICIAR FALA
    // ==========================================

    private iniciarFala() {

        // Cancela qualquer escrita anterior
        if (this.intervaloTexto) {

            this.intervaloTexto.remove();

            this.intervaloTexto =
                undefined;
        }


        // Pega a fala atual
        this.textoCompleto =
            this.falas[this.falaAtual];

        this.textoAtual = '';

        this.escrevendo = true;


        // ==========================================
        // PERSONAGEM COMEÇA A FALAR
        // ==========================================

        this.personagem
            .setTexture('falando');


        // ==========================================
        // LIMPA TEXTO
        // ==========================================

        this.textoFala
            .setText('');


        // ==========================================
        // BOTÃO
        // ==========================================

        this.botaoProximo
            .setText('CONTINUAR');

        this.botaoProximo
            .setBackgroundColor(
                '#2563eb'
            );


        // ==========================================
        // EFEITO DE DIGITAÇÃO
        // ==========================================

        let indice = 0;

        this.intervaloTexto =
            this.time.addEvent({

                delay: 35,

                loop: true,

                callback: () => {

                    if (
                        indice <
                        this.textoCompleto.length
                    ) {

                        this.textoAtual +=
                            this.textoCompleto[
                                indice
                            ];

                        this.textoFala
                            .setText(
                                this.textoAtual
                            );

                        indice++;

                    } else {

                        this.terminarEscrita();
                    }
                }
            });
    }


    // ==========================================
    // TERMINAR ESCRITA
    // ==========================================

    private terminarEscrita() {

        if (
            this.intervaloTexto
        ) {

            this.intervaloTexto.remove();

            this.intervaloTexto =
                undefined;
        }


        this.textoAtual =
            this.textoCompleto;


        this.textoFala
            .setText(
                this.textoCompleto
            );


        this.escrevendo =
            false;


        // ==========================================
        // PERSONAGEM PARA DE FALAR
        // ==========================================

        this.personagem
            .setTexture('neutra');


        // ==========================================
        // ÚLTIMA FALA
        // ==========================================

        if (
            this.falaAtual ===
            this.falas.length - 1
        ) {

            this.botaoProximo
                .setText(
                    'COMEÇAR'
                );

            this.botaoProximo
                .setBackgroundColor(
                    '#16a34a'
                );
        }
    }


    // ==========================================
    // BOTÃO CONTINUAR
    // ==========================================

    private clicarProximo() {

        // SE AINDA ESTÁ ESCREVENDO
        if (this.escrevendo) {

            this.terminarEscrita();

            return;
        }


        // SE É A ÚLTIMA FALA
        if (
            this.falaAtual ===
            this.falas.length - 1
        ) {

            this.scene.start(
                'FogueteScene'
            );

            return;
        }


        // ==========================================
        // PRÓXIMA FALA
        // ==========================================

        this.falaAtual++;

        this.iniciarFala();
    }


    // ==========================================
    // LIMPEZA
    // ==========================================

    shutdown() {

        if (
            this.intervaloTexto
        ) {

            this.intervaloTexto.remove();

            this.intervaloTexto =
                undefined;
        }
    }
}
