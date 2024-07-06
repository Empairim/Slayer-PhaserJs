export const AssetKeys = Object.freeze({
    ENVIORNMENT: {
        BACKGROUND: { MAIN: 'src/assets/background/grass.png', },
    },
    CHARACTER: {

        MOVEMENT: {
            //Movement Pngs
            XROLL: 'src/assets/dude/xRoll.png',
            YROLL: 'src/assets/dude/yRoll.png',
            DWWALK: 'src/assets/dude/dWalk.png',
            UPWALK: 'src/assets/dude/uWalk.png',
            XWALK: 'src/assets/dude/xWalk.png',
            IDLE: 'src/assets/dude/idle.png',
            //Damage Pngs
            GETHIT: 'src/assets/dude/getHit.png',
            DIE: 'src/assets/dude/die.png',
        },
        WEAPON: { BAT: 'src/assets/summons/bat.png', },
    },
    SPELLS: {
        //Spell Pngs
        //fire beats air
        FIRE: {
            FIRE1: 'src/assets/spells/fire/fire1.png',
        },
        //water beats fire
        WATER: {},
        //earth beats water
        EARTH: {},
        //air beats earth
        AIR: {}
    },
    ENIMIES:
    //Enemy Pngs
    {
        GOBLIN:
        {
            PNG:
        
            {
                RUN: 'src/assets/enemies/goblin/goblinBlackrun.png',
                DIE: 'src/assets/enemies/goblin/goblinBlackdie.png',
            },
        },

           
    
        // Add more asset categories here
    }
});
