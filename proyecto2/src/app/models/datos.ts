export class Datos {
    PAGE_NAME: string;
    PAGE_SLOGAN: string;
    PAGE_LOGO: string;
    PAGE_VIDEO: string;
    PAGE_MISSION: string;
    PAGE_VISION: string;
    PAGE_ABOUT: string;
    
    constructor(nombre = '', eslogan = '', logo = '', video = '', mision = '', vision = '', about = ''){
        this.PAGE_NAME = nombre;
        this.PAGE_SLOGAN = eslogan;
        this.PAGE_LOGO = logo;
        this.PAGE_VIDEO = video;
        this.PAGE_MISSION = mision;
        this.PAGE_VISION = vision;
        this.PAGE_ABOUT = about;
    }
}
