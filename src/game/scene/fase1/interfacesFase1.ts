import Phaser from 'phaser';
import { BlocklyWorkspace } from '../../../blocos/blockly';

export class InterfaceFase1 {

    private scene: Phaser.Scene;

    private blocklyDiv!: HTMLDivElement;
    private blockly!: BlocklyWorkspace;


    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    // CRIAR BLOCKLY
criarBlockly() {

    this.blocklyDiv =
        document.createElement('div');

    this.blocklyDiv.style.position =
        'absolute';

    this.blocklyDiv.style.left =
        '20px';

    this.blocklyDiv.style.top =
        '75px';

    // JANELA MENOR
    this.blocklyDiv.style.width =
        '30%';

    this.blocklyDiv.style.height =
        'calc(100vh - 100px)';

    this.blocklyDiv.style.backgroundColor =
        '#0f172a';

    this.blocklyDiv.style.border =
        '2px solid #334155';

    this.blocklyDiv.style.borderRadius =
        '16px';

    this.blocklyDiv.style.overflow =
        'hidden';

    this.blocklyDiv.style.zIndex =
        '5';

    document.body.appendChild(
        this.blocklyDiv
    );

    this.blockly =
        new BlocklyWorkspace(
            this.blocklyDiv
        );
}

    // PEGAR COMANDOS
    getCommands(): string[] {
        if (!this.blockly) {
            return [];
        }
        return this.blockly.getCommands();
    }

    // ESCONDER BLOCKLY
    esconderBlockly() {
        if (this.blocklyDiv) {
            this.blocklyDiv.style.display =
                'none';
        }
    }

    // MOSTRAR BLOCKLY
    mostrarBlockly() {
        if (this.blocklyDiv) {
            this.blocklyDiv.style.display =
                'block';
        }
    }


    // TELA DE PARABÉNS
    mostrarParabens(
        aoContinuar: () => void
    ) {

        this.esconderBlockly();

        const fundo =
            this.scene.add.rectangle(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2,
                this.scene.scale.width,
                this.scene.scale.height,
                0x020617,
                0.96
            );

        fundo.setDepth(100);
        const titulo =
            this.scene.add.text(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2 - 100,
                'PARABÉNS!',
                {
                    fontSize: '52px',
                    color: '#ffffff',
                    fontStyle: 'bold'
                }
            )
                .setOrigin(0.5)
                .setDepth(101);

        const mensagem =
            this.scene.add.text(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2 - 20,
                'Você concluiu a Missão Marte!\n\nO CubeSat chegou ao destino com sucesso.',
                {
                    fontSize: '24px',
                    color: '#ffffff',
                    align: 'center',
                    lineSpacing: 8
                }
            )
                .setOrigin(0.5)
                .setDepth(101);

        const continuar =
            this.scene.add.text(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2 + 100,
                'CONTINUAR  →',
                {
                    fontSize: '24px',
                    color: '#ffffff',
                    backgroundColor: '#2563eb',
                    padding: {
                        left: 35,
                        right: 35,
                        top: 15,
                        bottom: 15
                    }
                }
            )
                .setOrigin(0.5)
                .setDepth(101)
                .setInteractive({
                    useHandCursor: true
                });

        continuar.on(
            'pointerover',
            () => {
                continuar.setBackgroundColor(
                    '#1d4ed8'
                );
            }
        );

        continuar.on(
            'pointerout',
            () => {
                continuar.setBackgroundColor(
                    '#2563eb'
                );
            }
        );

        continuar.on(
            'pointerdown',
            () => {
                aoContinuar();
            }
        );
    }

    // TELA DE ERRO
    mostrarErro(
        motivo: string,
        aoTentarNovamente: () => void
    ) {

        this.esconderBlockly();
        let titulo = 'OPS!';
        let mensagem =
            'Algo deu errado na missão.';

        // COLISÃO
        if (motivo === 'colisao') {
            titulo = 'OPS!';
            mensagem =
                'Ahh! Você colidiu com um cometa!\n\n' +
                'Tente programar uma nova rota.';
        }

        // SAIU DO MAPA
        else if (motivo === 'fora') {
            titulo = 'OPS!';
            mensagem =
                'O CubeSat saiu da rota!\n\n' +
                'Tente programar um caminho diferente.';
        }


        // NÃO CHEGOU EM MARTE
        else if (motivo === 'incompleto') {
            titulo = 'QUASE!';
            mensagem =
                'O CubeSat não chegou em Marte.\n\n' +
                'Revise seus comandos e tente novamente.';
        }


        // FUNDO
        const fundo =
            this.scene.add.rectangle(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2,
                this.scene.scale.width,
                this.scene.scale.height,
                0x020617,
                0.97
            );

        fundo.setDepth(100);

        // CAIXA
        const caixa =
            this.scene.add.rectangle(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2,
                Math.min(
                    650,
                    this.scene.scale.width * 0.75
                ),
                330,
                0x0f172a
            );


        caixa.setStrokeStyle(
            2,
            0x334155
        );

        caixa.setDepth(101);

        // TÍTULO
        this.scene.add.text(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2 - 95,
            titulo,
            {
                fontSize: '42px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        )
            .setOrigin(0.5)
            .setDepth(102);



        // MENSAGEM
        this.scene.add.text(
            this.scene.scale.width / 2,
            this.scene.scale.height / 2 - 20,
            mensagem,
            {
                fontSize: '21px',
                color: '#cbd5e1',
                align: 'center',
                lineSpacing: 8,
                wordWrap: {
                    width: 500
                }
            }
        )
            .setOrigin(0.5)
            .setDepth(102);


  
        // TENTAR NOVAMENTE
        const tentarNovamente =
            this.scene.add.text(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2 + 100,
                '↓  TENTAR NOVAMENTE',
                {
                    fontSize: '24px',
                    color: '#ffffff',
                    backgroundColor: '#2563eb',
                    padding: {
                        left: 30,
                        right: 30,
                        top: 14,
                        bottom: 14
                    }
                }
            )
                .setOrigin(0.5)
                .setDepth(102)
                .setInteractive({
                    useHandCursor: true
                });


        tentarNovamente.on(
            'pointerover',
            () => {
                tentarNovamente
                    .setBackgroundColor(
                        '#1d4ed8'
                    );
            }
        );


        tentarNovamente.on(
            'pointerout',
            () => {
                tentarNovamente
                    .setBackgroundColor(
                        '#2563eb'
                    );
            }
        );


        tentarNovamente.on(
            'pointerdown',
            () => {

                aoTentarNovamente();
            }
        );
    }

    // LIMPEZA
    destruir() {

        if (this.blocklyDiv) {
            this.blocklyDiv.remove();
        }
    }
}