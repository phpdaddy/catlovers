import { Breed } from './Breed';

export type CatImage = {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: Breed[];
};
