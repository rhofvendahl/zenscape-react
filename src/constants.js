const INIT_VALUES = {
  X_CELLS: 20,
  Z_CELLS: 20,
  CELL_SIZE: 20,
  CLICK_MEMORY: 5,
  UPDATE_INTERVAL: 100,
  WAVE_HEIGHT: 1,
  WAVE_WIDTH: 1,
  WAVE_SPEED: 1
};

const CONTROLS_LIMITS = {
  SIZE: {
    MIN: 10,
    MAX: 40
  },
  HEIGHT: {
    MIN: .25,
    MAX: 2
  },
  WIDTH: {
    MIN: .5,
    MAX: 2
  },
  SPEED: {
    MIN: .1,
    MAX: 10
  }
}

const SCAPE_PALLETES = {
  WATER: {
    light: '#4081F2',
    medium: '#346dC7',
    dark: '#275799'
  },
  SAND: {
    light: '#FFF089',
    medium: '#C1B367',
    dark: '#817847'
  },
  FOLIAGE: {
    light: '#2AA330',
    medium: '#1F8C28',
    dark: '#106E1F'
  },
  ROCK: {
    light: '#BEBEBE',
    medium: '#8E8E8E',
    dark: '#606060'
  },
  SNOW: {
    light: '#FFFFFF',
    medium: '#BEBEBE',
    dark: '#7F7F7F'
  },
  BASE: {
    light: '#9D9D9D',
    medium: '#7F7F7F',
    dark: '#4E4E4E'
  }
};

export { INIT_VALUES, CONTROLS_LIMITS, SCAPE_PALLETES };