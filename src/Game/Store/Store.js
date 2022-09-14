import create from "zustand";
import { clamp } from "lodash-es";
import brick1 from "sounds/bricks/brick-1.mp3";
// import brick2 from "sounds/bricks/brick-2.mp3";
// import brick3 from "sounds/bricks/brick-3.mp3";
// import brick4 from "sounds/bricks/brick-4.mp3";
// import brick5 from "sounds/bricks/brick-5.mp3";
// import brick6 from "sounds/bricks/brick-6.mp3";

// const soundList = [brick1, brick2, brick3, brick4, brick5, brick6];

const ping = new Audio(brick1);

const useStore = create((set) => ({
  setScore(score) {
    ping.currentTime = 0;
    ping.volume = clamp(score / 20, 0, 1);
    ping.play();
    set((state) => ({ score: state.score + score }));
  },
  toggleIsDebug() {
    set((state) => {
      return { isDebug: !state.isDebug };
    });
  },
  setHasJumped(value) {
    set(() => {
      return { hasJumped: value };
    });
  },
  toggleIsPaused() {
    set((state) => {
      return { isPaused: !state.isPaused };
    });
  },
  setStart() {
    set(() => ({ hasStarted: true, score: 0 }));
  },
  setSpeed(value) {
    set(() => ({ speed: value }));
  },
  setJump(value) {
    set(() => ({ jump: value }));
  },
  isPaused: false,
  hasJumped: false,
  isDebug: true,
  hasStarted: false,
  // level: 0,
  score: 0,
  speed: 2,
  jump: 2,
}));

export default useStore;
