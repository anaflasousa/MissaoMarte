import Phaser from 'phaser';

export interface ObjetosMapaFase1 {
    cubesat: Phaser.GameObjects.Rectangle;
    marte: Phaser.GameObjects.Arc;
    obstaculos: Phaser.GameObjects.Arc[];
}

export function criarMapaFase1(
    scene: Phaser.Scene
): ObjetosMapaFase1 {


    // ÁREA DO MAPA
    scene.add.rectangle(
        scene.scale.width * 0.75,
        scene.scale.height / 2 + 40,
        scene.scale.width * 0.48,
        scene.scale.height - 130,
        0x0f172a
    );

    // CUBESAT
    const cubesat =
        scene.add.rectangle(
            scene.scale.width * 0.55,
            scene.scale.height / 2,
            40,
            40,
            0x38bdf8
        );

    scene.add
        .text(
            cubesat.x,
            cubesat.y + 35,
            'CubeSat',
            {
                fontSize: '16px',
                color: '#ffffff'
            }
        )
        .setOrigin(0.5);

    // MARTE
    const marte =
        scene.add.circle(
            scene.scale.width * 0.9,
            scene.scale.height / 2,
            50,
            0xef4444
        );

    scene.add
        .text(
            marte.x,
            marte.y + 65,
            'MARTE',
            {
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        )
        .setOrigin(0.5);


    // OBSTÁCULOS
    const obstaculo1 =
        scene.add.circle(
            scene.scale.width * 0.63,
            scene.scale.height / 2 - 80,
            30,
            0x64748b
        );

    const obstaculo2 =
        scene.add.circle(
            scene.scale.width * 0.75,
            scene.scale.height / 2 + 90,
            40,
            0x64748b
        );

    const obstaculo3 =
        scene.add.circle(
            scene.scale.width * 0.85,
            scene.scale.height / 2 - 100,
            35,
            0x64748b
        );

    const obstaculos = [
        obstaculo1,
        obstaculo2,
        obstaculo3
    ];

    return {
        cubesat,
        marte,
        obstaculos
    };
}