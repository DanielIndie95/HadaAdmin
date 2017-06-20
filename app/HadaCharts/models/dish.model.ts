/**
 * Created by sdani on 19/06/2017.
 */
import {DishType} from './dishtype.model';
export class Dish{
    id: number;
    picture: string;
    name: string;
    description: string;
    rank: number;
    type: DishType;
    isGlat: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    ingredients:string[];
    date:string;
}