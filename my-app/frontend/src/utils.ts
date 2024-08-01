/* eslint-disable @typescript-eslint/no-explicit-any */
import { Diary } from "./types";

export const  isDiary = (entry : any): entry is Diary => {
    return entry && typeof entry === 'object' && 'date' in entry && 'comment' in entry && 'visibility' in entry && 'weather' in entry;
  }
