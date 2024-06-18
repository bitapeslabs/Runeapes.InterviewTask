import { assertEvent, assign, setup } from "xstate";

interface AppMachineContext {
  index: number;
  speed: number;
  moveX: number;
  leaveX: number;
}

type AppMachineEvent =
  | {
      type: "SET_INDEX";
      index: number;
    }
  | {
      type: "SET_SPEED";
      speed: number;
    }
  | {
      type: "SET_MOVEX";
      xmove: number;
    }
  | {
      type: "LEAVE_SLIDE";
      xleave: number;
    };

export const appMachine = setup({
  types: { context: {} as AppMachineContext, events: {} as AppMachineEvent },
  actions: {
    setIndex: assign(({ event }) => {
      assertEvent(event, "SET_INDEX");

      return {
        index: event.index,
      };
    }),
    setSpeed: assign(({ event }) => {
      assertEvent(event, "SET_SPEED");

      return {
        speed: event.speed,
      };
    }),
    setMove: assign(({ event }) => {
      assertEvent(event, "SET_MOVEX");

      return {
        moveX: event.xmove,
      };
    }),
    leaveSlide: assign(({ event }) => {
      assertEvent(event, "LEAVE_SLIDE");

      return {
        leaveX: event.xleave,
      };
    }),
  },
}).createMachine({
  id: "appMachine",
  context: {
    index: 0,
    speed: 0,
    moveX: 0,
    leaveX: 0,
  },
  on: {
    SET_INDEX: {
      actions: "setIndex",
    },
    SET_SPEED: {
      actions: "setSpeed",
    },
    SET_MOVEX: {
      actions: "setMove",
    },
    LEAVE_SLIDE: {
      actions: "leaveSlide",
    },
  },
});
