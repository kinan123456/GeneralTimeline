import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    public createImage(width: number, height: number, path: string): HTMLImageElement {
        let image = new Image(width, height);
        image.src = path;
        return image;
    }
}