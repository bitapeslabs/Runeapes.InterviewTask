import { assertEvent, assign, setup } from "xstate";

interface AppMachineContext {
  index: number;
  moveX: number;
}

type AppMachineEvent =
  | {
      type: "SET_INDEX";
      index: number;
    }
  | {
      type: "SET_MOVEX";
      xmove: number;
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
    setMove: assign(({ event }) => {
      assertEvent(event, "SET_MOVEX");

      return {
        moveX: event.xmove,
      };
    }),
  },
}).createMachine({
  id: "appMachine",
  context: {
    index: 0,
    moveX: 0,
  },
  on: {
    SET_INDEX: {
      actions: "setIndex",
    },
    SET_MOVEX: {
      actions: "setMove",
    },
  },
});
