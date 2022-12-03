import { CatImage } from './CatImage';

export type Favorite = {
    id: number;
    image_id: string;
    sub_id: string;
    image: CatImage;
};
