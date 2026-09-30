import * as Blockly from 'blockly';

export class BlocklyWorkspace {

    private workspace!: Blockly.WorkspaceSvg;

    constructor(element: HTMLElement) {

 
        // BLOCO AVANÇAR
        Blockly.Blocks['avancar'] = {
            init: function () {

                this.appendDummyInput()
                    .appendField('AVANÇAR');

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);

                this.setColour(200);
            }
        };

        // BLOCO DIREITA
        Blockly.Blocks['direita'] = {
            init: function () {

                this.appendDummyInput()
                    .appendField('VIRAR PARA DIREITA');

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);

                this.setColour(45);
            }
        };

        // BLOCO ESQUERDA
        Blockly.Blocks['esquerda'] = {
            init: function () {

                this.appendDummyInput()
                    .appendField('VIRAR PARA ESQUERDA');

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);

                this.setColour(25);
            }
        };


        // BLOCO REPETIR
        Blockly.Blocks['repetir'] = {
            init: function () {

                this.appendDummyInput()
                    .appendField('REPETIR');

                this.appendStatementInput('COMANDOS')
                    .appendField('faça');

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);

                this.setColour(280);
            }
        };


        // TOOLBOX
        const toolbox = {
            kind: 'flyoutToolbox',

            contents: [
                {
                    kind: 'block',
                    type: 'avancar'
                },
                {
                    kind: 'block',
                    type: 'direita'
                },
                {
                    kind: 'block',
                    type: 'esquerda'
                },
                {
                    kind: 'block',
                    type: 'repetir'
                }
            ]
        };



        // WORKSPACE
        this.workspace = Blockly.inject(element, {

            toolbox: toolbox,

            trashcan: true,

            scrollbars: true,

            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            },

            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 1.5,
                minScale: 0.5,
                scaleSpeed: 1.1
            }
        });
    }


    // PEGAR COMANDOS
    getCommands(): string[] {

        const comandos: string[] = [];

        const blocosIniciais =
            this.workspace.getTopBlocks(true);

        for (const bloco of blocosIniciais) {

            this.lerBloco(
                bloco,
                comandos
            );
        }

        return comandos;
    }

    // LER BLOCOS
    private lerBloco(
        bloco: Blockly.Block,
        comandos: string[]
    ) {

        let blocoAtual:
            Blockly.Block | null = bloco;

        while (blocoAtual) {

            if (blocoAtual.type === 'avancar') {

                comandos.push('avancar');

            }

            else if (blocoAtual.type === 'direita') {

                comandos.push('direita');

            }

            else if (blocoAtual.type === 'esquerda') {

                comandos.push('esquerda');

            }

            else if (blocoAtual.type === 'repetir') {

                const dentro =
                    blocoAtual.getInputTargetBlock(
                        'COMANDOS'
                    );

                if (dentro) {

                    const comandosRepetidos: string[] = [];

                    this.lerBloco(
                        dentro,
                        comandosRepetidos
                    );

                    // REPETIR executa duas vezes
                    comandos.push(
                        ...comandosRepetidos,
                        ...comandosRepetidos
                    );
                }
            }

            blocoAtual =
                blocoAtual.getNextBlock();
        }
    }

    getWorkspace() {

        return this.workspace;
    }
}