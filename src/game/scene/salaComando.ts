import Phaser from 'phaser';

export class SalaComando extends Phaser.Scene {

    // FALAS
    private falas: string[] = [
        'Olá, Fulano(a)! Temos uma missão importante para você.',
        'Um de nossos CubeSats precisa ser enviado até Marte para iniciar uma missão de coleta de dados.',
        'Mas existe um problema...',
        'O CubeSat não pode ser controlado diretamente. Precisamos programar sua trajetória.',
        'Sua missão é criar uma sequência de comandos que faça o CubeSat atravessar o espaço e chegar até Marte.',
        'Mas cuidado: existem obstáculos pelo caminho.',
        'Está preparado?'
    ];

    // CONTROLE DAS FALAS
    private falaAtual = 0;
    private textoCompleto = '';
    private textoAtual = '';
    private escrevendo = false;
    private intervaloTexto?: Phaser.Time.TimerEvent;


    // ELEMENTOS DA TELA
    private personagem!:
        Phaser.GameObjects.Image;
    private textoFala!:
        Phaser.GameObjects.Text;
    private nomePersonagem!:
        Phaser.GameObjects.Text;
    private botaoProximo!:
        Phaser.GameObjects.Text;

    constructor() {
        super('CutsceneScene');
    }

    // PRELOAD
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

    // CREATE
    create() {
        // FUNDO
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


        // PERSONAGEM
        this.personagem =
            this.add.image(
                this.scale.width / 2,
                this.scale.height / 2 + 20,
                'neutra'
            );

        // IMPORTANTE: setScale mantém a proporção originalda imagem e evita que a personagem fique achatada.
        this.personagem.setScale(0.5);

        // CAIXA DE DIÁLOGO
        const caixaDialogo =
            this.add.rectangle(
                this.scale.width / 2,
                this.scale.height - 105,
                this.scale.width - 100,
                170,
                0x0f172a,
                0.96
            );
        caixaDialogo.setStrokeStyle(
            1,
            0x1e293b
        );

        // NOME DA PERSONAGEM
        this.nomePersonagem =
            this.add.text(
                80,
                this.scale.height - 150,
                'Dr. Fulana',
                {
                    fontFamily: 'monospace',
                    fontSize: '20px',
                    color: '#60a5fa',
                    fontStyle: 'bold'
                }
            );

        // TEXTO DA FALA
        this.textoFala =
            this.add.text(
                80,
                this.scale.height - 110,
                '',
                {
                    fontFamily: 'monospace',
                    fontSize: '19px',
                    color: '#ffffff',
                    wordWrap: {
                        width:
                            this.scale.width - 280
                    },
                    lineSpacing: 8
                }
            );

        // BOTÃO
        this.botaoProximo =
            this.add.text(
                this.scale.width - 150,
                this.scale.height - 105,
                'PRÓXIMO',
                {
                    fontFamily: 'Arial',
                    fontSize: '17px',
                    color: '#ffffff',
                    backgroundColor: '#3b82f6',
                    fontStyle: 'bold',
                    padding: {
                        left: 22,
                        right: 22,
                        top: 14,
                        bottom: 14
                    }
                }
            )
                .setOrigin(0.5)
                .setInteractive({
                    useHandCursor: true
                });

        // EFEITO DO BOTÃO
        this.botaoProximo.on(
            'pointerover',
            () => {

                this.botaoProximo
                    .setBackgroundColor(
                        '#2563eb'
                    );
            }
        );
        this.botaoProximo.on(
            'pointerout',
            () => {
                this.botaoProximo
                    .setBackgroundColor(
                        '#3b82f6'
                    );
            }
        );

        // CLIQUE
        this.botaoProximo.on(
            'pointerdown',
            () => {

                this.clicarProximo();
            }
        );
        // COMEÇA A PRIMEIRA FALA
        this.iniciarFala();
    }


    // INICIAR FALA
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

        // PERSONAGEM COMEÇA A FALAR
        this.personagem
            .setTexture('falando');

        // LIMPA TEXTO
        this.textoFala
            .setText('');

        // BOTÃO
        this.botaoProximo
            .setText('PRÓXIMO');

        // EFEITO DE DIGITAÇÃO
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
                            this.textoCompleto[indice];
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

    // TERMINAR ESCRITA
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

        // PERSONAGEM PARA DE FALAR
        this.personagem
            .setTexture('neutra');

        // ÚLTIMA FALA
        if (
            this.falaAtual ===
            this.falas.length - 1
        ) {
            this.botaoProximo
                .setText('COMEÇAR');
            this.botaoProximo
                .setBackgroundColor(
                    '#22c55e'
                );
        }
    }


    // BOTÃO PRÓXIMO
    private clicarProximo() {
        // SE AINDA ESTÁ ESCREVENDO
        if (this.escrevendo) {
            // Primeiro clique:
            // termina a frase imediatamente.
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

        // PRÓXIMA FALA
        this.falaAtual++;
        this.iniciarFala();
    }

    // LIMPEZA
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