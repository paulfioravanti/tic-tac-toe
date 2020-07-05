import { Dispatch, SetStateAction } from "react";

export type MaybeNull<T> = T | null;
export type Hooks<T> = [T, Dispatch<SetStateAction<T>>];
export type HandleMouseClickFn = () => void;
