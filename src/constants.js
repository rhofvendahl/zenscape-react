const INIT_VALUES = {
  X_CELLS: 20,
  Z_CELLS: 20,
  CELL_SIZE: 20,
  CLICK_MEMORY: 5,
  UPDATE_INTERVAL: 100,
  WAVE_HEIGHT: 1,
  WAVE_WIDTH: 1,
  WAVE_SPEED: 1,
};

const CONTROLS_LIMITS = {
  SIZE: {
    MIN: 10,
    MAX: 40,
  },
  HEIGHT: {
    MIN: .25,
    MAX: 2,
  },
  WIDTH: {
    MIN: .5,
    MAX: 2,
  },
  SPEED: {
    MIN: .1,
    MAX: 10,
  },
}

export { INIT_VALUES, CONTROLS_LIMITS };