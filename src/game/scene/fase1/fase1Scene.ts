import Phaser from 'phaser';

import{SystemFase1 } from './SystemFase1';
import{criarMapaFase1} from './mapaFase1';
import type {ObjetosMapaFase1} from './mapaFase1';
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
        this.add
            .text(
                this.scale.width / 2,
                30,
                'MISSÃO MARTE',
                {
                    fontSize: '28px',
                    color: '#ffffff',
                    fontStyle: 'bold'
                }
            )
            .setOrigin(0.5);



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

        // BOTÃO EXECUTAR
        const executar =
            this.add
                .rectangle(
                    this.scale.width * 0.75,
                    this.scale.height - 50,
                    180,
                    55,
                    0x22c55e
                )
                .setInteractive({
                    useHandCursor: true
                });

        this.add
            .text(
                this.scale.width * 0.75,
                this.scale.height - 50,
                'EXECUTAR',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    fontStyle: 'bold'
                }
            )
            .setOrigin(0.5);

        // EXECUTAR PROGRAMA
        executar.on(
            'pointerdown',
            () => {
                if (this.executando) {
                    return;
                }

                const comandos =
                    this.interfaceFase1
                        .getCommands();
                if (
                    comandos.length === 0
                ) {
                    return;
                }

                this.executando =
                    true;
                this.systemFase1
                    .executar(
                        comandos
                    );
            }
        );
    }

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
            this.interfaceFase1
                .destruir();
        }
    }
}