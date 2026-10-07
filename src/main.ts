import Phaser from 'phaser';

import { TelaInicial } from './game/scene/telaInicial';
import { SalaComando } from './game/scene/salaComando';
import { FogueteScene } from './game/scene/fogueteScene';
import { TransicaoScene } from './game/scene/transicoes';
import { Fase1Scene } from './game/scene/fase1/fase1Scene';
 import { Fase2Scene } from './game/scene/fase2Scene';
// import { Fase3Scene } from './game/scene/fase3Scene';

const config: Phaser.Types.Core.GameConfig = {

  type: Phaser.AUTO,

  width: window.innerWidth,
  height: window.innerHeight,

  scale: {
    mode: Phaser.Scale.RESIZE,
  },

  scene: [
    TelaInicial,
    SalaComando,
    FogueteScene,
    TransicaoScene,
    Fase1Scene,
     Fase2Scene,
    // Fase3Scene,
  ]

};

new Phaser.Game(config);