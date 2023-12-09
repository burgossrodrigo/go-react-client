export type InputState = {
    x: string;
    y: string;
    z: string;
};

export type JugState = {
    x: number;
    y: number;
    z: number;
};

export type Step = {
    description: string;
    state: JugState;
};
