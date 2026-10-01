import Phaser from 'phaser';

import { SystemFase1 } from './SystemFase1';
import { criarMapaFase1 } from './mapaFase1';
import type { ObjetosMapaFase1 } from './mapaFase1';
import { InterfaceFase1 } from './interfacesFase1';


export class Fase1Scene extends Phaser.Scene {
    private mapa!: ObjetosMapaFase1;
    private interfaceFase1!: InterfaceFase1;
    private systemFase1!: SystemFase1;
    private executando = false;

    constructor() {
        super('Fase1Scene');
    }

    create() {


        // FUNDO
        this.cameras.main
            .setBackgroundColor(
                '#020617'
            );

        // TÍTULO
        // CABEÇALHO
        this.add
            .text(
                25,
                32,
                'CVT-E',
                {
                    fontSize: '24px',
                    color: '#facc15',
                    fontStyle: 'bold'
                }
            )
            .setOrigin(0, 0.5);

        this.add
            .text(
                105,
                32,
                'MISSÃO MARTE',
                {
                    fontSize: '26px',
                    color: '#ffffff',
                    fontStyle: 'bold'
                }
            )
            .setOrigin(0, 0.5);



        // CRIA MAPA
        this.mapa =
            criarMapaFase1(this);

        // CRIA INTERFACE
        this.interfaceFase1 =
            new InterfaceFase1(this);
        this.interfaceFase1
            .criarBlockly();

        // CRIA SISTEMA DA FASE
        this.systemFase1 =
            new SystemFase1(
                this,
                this.mapa.cubesat,
                this.mapa.marte,
                this.mapa.obstaculos,

                // SUCESSO
                () => {
                    console.log(
                        'Fase 1 concluída!'
                    );
                    this.executando =
                        false;
                    this.interfaceFase1
                        .mostrarParabens(
                            () => {
                                this.scene.start(
                                    'TransicaoScene',
                                    {
                                        fase: 2
                                    }
                                );
                            }
                        );
                },

                // FALHA
                (motivo: string) => {
                    console.log(
                        'Fase 1 falhou:',
                        motivo
                    );
                    this.executando =
                        false
                    this.interfaceFase1
                        .mostrarErro(
                            motivo,
                            () => {
                                this.reiniciarFase();
                            }
                        );
                }
            );

        // ==========================================
// BOTÃO EXECUTAR
// ==========================================

const executarX =
    this.scale.width * 0.66;

const executarY =
    this.scale.height - 48;


// SOMBRA
const sombra =
    this.add.rectangle(
        executarX + 4,
        executarY + 4,
        190,
        58,
        0x000000,
        0.35
    );


// BOTÃO
const executar =
    this.add.rectangle(
        executarX,
        executarY,
        190,
        58,
        0x2563eb
    )
    .setStrokeStyle(
        2,
        0x60a5fa
    )
    .setInteractive({
        useHandCursor: true
    });


// TEXTO
const textoExecutar =
    this.add.text(
        executarX,
        executarY,
        '▶  EXECUTAR',
        {
            fontSize: '21px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }
    )
    .setOrigin(0.5);


// PASSAR O MOUSE
executar.on(
    'pointerover',
    () => {

        executar.setFillStyle(
            0x3b82f6
        );

        executar.setStrokeStyle(
            2,
            0x93c5fd
        );

        textoExecutar.setScale(
            1.04
        );
    }
);


// SAIR DO BOTÃO
executar.on(
    'pointerout',
    () => {

        executar.setFillStyle(
            0x2563eb
        );

        executar.setStrokeStyle(
            2,
            0x60a5fa
        );

        textoExecutar.setScale(
            1
        );
    }
);


// CLICAR
executar.on(
    'pointerdown',
    () => {

        executar.setFillStyle(
            0x1d4ed8
        );

        textoExecutar.setScale(
            0.97
        );
    }
);


// SOLTAR
executar.on(
    'pointerup',
    () => {

        executar.setFillStyle(
            0x2563eb
        );

        textoExecutar.setScale(
            1
        );

        if (this.executando) {
            return;
        }

        const comandos =
            this.interfaceFase1
                .getCommands();

        if (comandos.length === 0) {
            return;
        }

               this.executando = true;

        this.systemFase1.executar(
            comandos
        );
    }
); // fecha executar.on


} // fecha create()


// REINICIAR FASE
private reiniciarFase() {

    this.interfaceFase1
        .esconderBlockly();

    console.log(
        'Reiniciando Fase 1...'
    );

    this.scene.restart();
}


// LIMPEZA
shutdown() {

    if (this.interfaceFase1) {
        this.interfaceFase1.destruir();
    }
}

} // fecha a classe Fase1Scene