import Phaser from 'phaser';

export class SystemFase1 {

    private scene: Phaser.Scene;

    private cubesat: Phaser.GameObjects.Rectangle;

    private marte: Phaser.GameObjects.Arc;

    private obstaculos: Phaser.GameObjects.Arc[];

    private direcao = 0;

    private executando = false;

    private aoSucesso: () => void;

    private aoFalhar: (motivo: string) => void;


    constructor(
        scene: Phaser.Scene,
        cubesat: Phaser.GameObjects.Rectangle,
        marte: Phaser.GameObjects.Arc,
        obstaculos: Phaser.GameObjects.Arc[],
        aoSucesso: () => void,
        aoFalhar: (motivo: string) => void
    ) {

        this.scene = scene;

        this.cubesat = cubesat;

        this.marte = marte;

        this.obstaculos = obstaculos;

        this.aoSucesso = aoSucesso;

        this.aoFalhar = aoFalhar;
    }


    // ==========================================
    // EXECUTAR PROGRAMA
    // ==========================================

    executar(comandos: string[]) {

        if (this.executando) {
            return;
        }

        if (comandos.length === 0) {
            return;
        }

        this.executando = true;

        this.executarComando(
            comandos,
            0
        );
    }


    // ==========================================
    // EXECUTA OS COMANDOS EM SEQUÊNCIA
    // ==========================================

    private executarComando(
        comandos: string[],
        indice: number
    ) {

        // Terminou todos os comandos
        if (indice >= comandos.length) {

            // Terminou a programação,
            // mas não chegou em Marte
            if (!this.chegouEmMarte()) {

                this.falha(
                    'incompleto'
                );

                return;
            }

            this.sucesso();

            return;
        }


        const comando =
            comandos[indice];


        // ======================================
        // AVANÇAR
        // ======================================

        if (comando === 'avancar') {

            this.avancar(() => {

                // Colisão
                if (this.verificarColisao()) {

                    this.falha(
                        'colisao'
                    );

                    return;
                }


                // Saiu do mapa
                if (this.saiuDaArea()) {

                    this.falha(
                        'fora'
                    );

                    return;
                }


                // Chegou em Marte
                if (this.chegouEmMarte()) {

                    this.sucesso();

                    return;
                }


                // Próximo comando
                this.executarComando(
                    comandos,
                    indice + 1
                );

            });

            return;
        }


        // ======================================
        // DIREITA
        // ======================================

        if (comando === 'direita') {

            this.virarDireita(() => {

                this.executarComando(
                    comandos,
                    indice + 1
                );

            });

            return;
        }


        // ======================================
        // ESQUERDA
        // ======================================

        if (comando === 'esquerda') {

            this.virarEsquerda(() => {

                this.executarComando(
                    comandos,
                    indice + 1
                );

            });

            return;
        }
    }


    // ==========================================
    // AVANÇAR
    // ==========================================

    private avancar(
        proximo: () => void
    ) {

        const distancia = 100;

        let novoX = this.cubesat.x;

        let novoY = this.cubesat.y;


        if (this.direcao === 0) {

            novoX += distancia;

        } else if (this.direcao === 90) {

            novoY += distancia;

        } else if (this.direcao === 180) {

            novoX -= distancia;

        } else if (this.direcao === 270) {

            novoY -= distancia;
        }


        this.scene.tweens.add({

            targets: this.cubesat,

            x: novoX,

            y: novoY,

            duration: 700,

            ease: 'Power1',

            onComplete: () => {

                proximo();

            }
        });
    }


    // ==========================================
    // VIRAR DIREITA
    // ==========================================

    private virarDireita(
        proximo: () => void
    ) {

        this.direcao += 90;


        if (this.direcao >= 360) {

            this.direcao = 0;
        }


        this.scene.tweens.add({

            targets: this.cubesat,

            angle:
                this.cubesat.angle + 90,

            duration: 400,

            onComplete: () => {

                proximo();

            }
        });
    }


    // ==========================================
    // VIRAR ESQUERDA
    // ==========================================

    private virarEsquerda(
        proximo: () => void
    ) {

        this.direcao -= 90;


        if (this.direcao < 0) {

            this.direcao = 270;
        }


        this.scene.tweens.add({

            targets: this.cubesat,

            angle:
                this.cubesat.angle - 90,

            duration: 400,

            onComplete: () => {

                proximo();

            }
        });
    }


    // ==========================================
    // VERIFICA COLISÃO
    // ==========================================

    private verificarColisao(): boolean {

        for (
            const obstaculo
            of this.obstaculos
        ) {

            const distancia =
                Phaser.Math.Distance.Between(

                    this.cubesat.x,
                    this.cubesat.y,

                    obstaculo.x,
                    obstaculo.y

                );


            const limite =
                40 + obstaculo.radius;


            if (
                distancia < limite
            ) {

                return true;
            }
        }


        return false;
    }


    // ==========================================
    // VERIFICA SE SAIU DO MAPA
    // ==========================================

    private saiuDaArea(): boolean {

        const limiteEsquerdo =
            this.scene.scale.width * 0.43;

        const limiteDireito =
            this.scene.scale.width;

        const limiteSuperior = 80;

        const limiteInferior =
            this.scene.scale.height - 100;


        return (

            this.cubesat.x <
                limiteEsquerdo ||

            this.cubesat.x >
                limiteDireito ||

            this.cubesat.y <
                limiteSuperior ||

            this.cubesat.y >
                limiteInferior

        );
    }


    // ==========================================
    // VERIFICA MARTE
    // ==========================================

    private chegouEmMarte(): boolean {

        const distancia =
            Phaser.Math.Distance.Between(

                this.cubesat.x,
                this.cubesat.y,

                this.marte.x,
                this.marte.y

            );


        return distancia < 70;
    }


    // ==========================================
    // SUCESSO
    // ==========================================

    private sucesso() {

        if (!this.executando) {
            return;
        }


        this.executando = false;


        console.log(
            'MISSÃO CONCLUÍDA!'
        );


        this.aoSucesso();
    }


    // ==========================================
    // FALHA
    // ==========================================

    private falha(
        motivo: string
    ) {

        if (!this.executando) {
            return;
        }


        this.executando = false;


        this.scene.tweens.killTweensOf(
            this.cubesat
        );


        console.log(
            'MISSÃO FALHOU:',
            motivo
        );


        this.aoFalhar(
            motivo
        );
    }
}