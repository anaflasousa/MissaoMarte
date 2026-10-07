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

        this.cameras.main.setBackgroundColor('#020617');

        // TÍTULO
        this.add.text(
            25,
            32,
            'CVT-E',
            {
                fontSize: '24px',
                color: '#facc15',
                fontStyle: 'bold'
            }
        ).setOrigin(0, 0.5);

        this.add.text(
            105,
            32,
            'MISSÃO MARTE',
            {
                fontSize: '26px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0, 0.5);

        // MAPA
        this.mapa = criarMapaFase1(this);

        // INTERFACE DO BLOCKLY
        this.interfaceFase1 = new InterfaceFase1(this);
        this.interfaceFase1.criarBlockly();

        // SISTEMA DA FASE
        this.systemFase1 = new SystemFase1(
            this,
            this.mapa.cubesat,
            this.mapa.marte,
            this.mapa.obstaculos,
            this.mapa.tamanhoCelula,
            () => {

                console.log('Fase 1 concluída!');

                this.executando = false;

                this.interfaceFase1.mostrarParabens(() => {
                    this.scene.start('TransicaoScene', {
                        fase: 2
                    });
                });

            },
            (motivo: string) => {

                console.log('Fase 1 falhou:', motivo);

                this.executando = false;

                this.interfaceFase1.mostrarErro(
                    motivo,
                    () => {
                        this.reiniciarFase();
                    }
                );

            }
        );

        // BOTÃO EXECUTAR
        const botaoExecutar = this.add.rectangle(
            this.scale.width * 0.66,
            this.scale.height - 48,
            190,
            58,
            0x2563eb
        );

        botaoExecutar.setStrokeStyle(
            2,
            0x60a5fa
        );

        botaoExecutar.setInteractive({
            useHandCursor: true
        });

        this.add.text(
            this.scale.width * 0.66,
            this.scale.height - 48,
            '▶ EXECUTAR',
            {
                fontSize: '21px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        botaoExecutar.on(
            'pointerover',
            () => {
                botaoExecutar.setFillStyle(0x3b82f6);
            }
        );

        botaoExecutar.on(
            'pointerout',
            () => {
                botaoExecutar.setFillStyle(0x2563eb);
            }
        );

        botaoExecutar.on(
            'pointerdown',
            () => {

                if (this.executando) {
                    return;
                }

                const comandos =
                    this.interfaceFase1.getCommands();

                console.log(
                    'Comandos:',
                    comandos
                );

                if (comandos.length === 0) {
                    return;
                }

                this.executando = true;

                this.systemFase1.executar(
                    comandos
                );
            }
        );
    }

    private reiniciarFase() {

        this.interfaceFase1.esconderBlockly();

        console.log(
            'Reiniciando Fase 1...'
        );

        this.scene.restart();
    }

    shutdown() {

        if (this.interfaceFase1) {
            this.interfaceFase1.destruir();
        }
    }
}