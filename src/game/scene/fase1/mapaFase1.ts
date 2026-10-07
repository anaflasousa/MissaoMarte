import Phaser from 'phaser';

export interface ObjetosMapaFase1 {
    cubesat: Phaser.GameObjects.Rectangle;
    marte: Phaser.GameObjects.Arc;
    obstaculos: Phaser.GameObjects.Arc[];

    tamanhoCelula: number;
    inicioX: number;
    inicioY: number;
}

export function criarMapaFase1(
    scene: Phaser.Scene
): ObjetosMapaFase1 {

    // ==========================================
    // TAMANHO E POSIÇÃO DO MAPA
    // ==========================================

    const margemEsquerda =
        scene.scale.width * 0.32;

    const margemDireita = 20;

    const mapaEsquerda =
        margemEsquerda;

    const mapaDireita =
        scene.scale.width - margemDireita;

    const mapaX =
        (mapaEsquerda + mapaDireita) / 2;

    const mapaY =
        scene.scale.height / 2;

    const mapaLargura =
        mapaDireita - mapaEsquerda;

    const mapaAltura =
        scene.scale.height - 140;

        


    // ==========================================
    // FUNDO DO MAPA
    // ==========================================

    scene.add.rectangle(
        mapaX,
        mapaY,
        mapaLargura,
        mapaAltura,
        0x111111
    );


    // ==========================================
    // GRADE DO ESPAÇO
    // ==========================================

    const tamanhoCelula = 86;

    const inicioX =
        mapaEsquerda;

    const inicioY =
        mapaY - mapaAltura / 2;
    // ==========================================
    // CENTRO DAS CÉLULAS DA GRADE
    // ==========================================

    const centroCelula = (
        coluna: number,
        linha: number
    ) => {

        return {
            x: inicioX +
                tamanhoCelula / 2 +
                coluna * tamanhoCelula,

            y: inicioY +
                tamanhoCelula / 2 +
                linha * tamanhoCelula
        };
    };


    // LINHAS VERTICAIS
    for (
        let x = inicioX;
        x <= mapaDireita;
        x += tamanhoCelula
    ) {

        scene.add.rectangle(
            x,
            mapaY,
            2,
            mapaAltura,
            0x252525,
            0.8
        );
    }


    // LINHAS HORIZONTAIS
    for (
        let y = inicioY;
        y <= mapaY + mapaAltura / 2;
        y += tamanhoCelula
    ) {

        scene.add.rectangle(
            mapaX,
            y,
            mapaLargura,
            2,
            0x252525,
            0.8
        );
    }


    // ==========================================
    // LIMITES INTERNOS DO MAPA
    // ==========================================

    const esquerda =
        mapaEsquerda + 60;

    const direita =
        mapaDireita - 60;

    const cima =
        mapaY - mapaAltura / 2 + 60;

    const baixo =
        mapaY + mapaAltura / 2 - 60;


    // ==========================================
    // CUBESAT
    // ==========================================

    // ==========================================
    // CUBESAT
    // ==========================================

    const posicaoCubeSat =
        centroCelula(7, 6);

    const cubesat =
        scene.add.rectangle(
            posicaoCubeSat.x,
            posicaoCubeSat.y,
            42,
            42,
            0x38bdf8
        );

    scene.add.text(
        cubesat.x,
        cubesat.y + 32,
        'CubeSat',
        {
            fontSize: '14px',
            color: '#ffffff'
        }
    ).setOrigin(0.5);


    // ==========================================
    // MARTE
    // ==========================================

    const posicaoMarte =
        centroCelula(0, 0);

    const marte =
        scene.add.circle(
            posicaoMarte.x,
            posicaoMarte.y,
            30,
            0xef4444
        );

    scene.add.text(
        marte.x,
        marte.y + 43,
        'MARTE',
        {
            fontSize: '17px',
            color: '#ffffff',
            fontStyle: 'bold'
        }
    ).setOrigin(0.5);


    // ==========================================
    // OBSTÁCULOS
    // ==========================================

    const posicaoObstaculo1 =
        centroCelula(2, 1);

    const obstaculo1 =
        scene.add.circle(
            posicaoObstaculo1.x,
            posicaoObstaculo1.y,
            27,
            0x64748b
        );


    const posicaoObstaculo2 =
        centroCelula(4, 1);

    const obstaculo2 =
        scene.add.circle(
            posicaoObstaculo2.x,
            posicaoObstaculo2.y,
            27,
            0x64748b
        );


    const posicaoObstaculo3 =
        centroCelula(2, 3);

    const obstaculo3 =
        scene.add.circle(
            posicaoObstaculo3.x,
            posicaoObstaculo3.y,
            27,
            0x64748b
        );


    const posicaoObstaculo4 =
        centroCelula(5, 4);

    const obstaculo4 =
        scene.add.circle(
            posicaoObstaculo4.x,
            posicaoObstaculo4.y,
            27,
            0x64748b
        );


    const obstaculos = [
        obstaculo1,
        obstaculo2,
        obstaculo3,
        obstaculo4
    ];


    // ==========================================
    // RETORNO
    // ==========================================

    return {
        cubesat,
        marte,
        obstaculos,
        tamanhoCelula,
        inicioX,
        inicioY
    };
}