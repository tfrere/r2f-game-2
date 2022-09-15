import create from "zustand";

import dayjs from "dayjs";

const useStore = create((set) => ({
  // vars
  isPaused: false,
  hasJumped: false,
  isDebug: false,
  hasStarted: false,
  level: 0,
  time: dayjs(),
  speed: 2,
  gravity: [0, -50, 0],
  jump: 200,
  mass: 2,
  // set
  setTime(value) {
    set(() => ({ time: value }));
  },
  setLevel(value) {
    set(() => ({ level: value }));
  },
  setMass(value) {
    set(() => ({ mass: value }));
  },
  setHasJumped(value) {
    set(() => {
      return { hasJumped: value };
    });
  },
  setSpeed(value) {
    set(() => ({ speed: value }));
  },
  setGravity(value) {
    set(() => ({ gravity: value }));
  },
  setJump(value) {
    set(() => ({ jump: value }));
  },
  // toggle
  toggleIsDebug() {
    set((state) => {
      return { isDebug: !state.isDebug };
    });
  },
  toggleIsPaused() {
    set((state) => {
      return { isPaused: !state.isPaused };
    });
  },
  // complex
  setStart() {
    set(() => ({ hasStarted: true, time: dayjs(), gravity: [0, -50, 0] }));
  },
}));

export default useStore;
