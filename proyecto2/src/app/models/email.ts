export class Email {
    asunto: string;
    destino: string;
    password: string;
    username: string;
    page_name: string;
    page_logo: string;

    constructor(_user = '', _destino = '', _asunto = '', _pass = '', _page = '', _logo = ''){
        this.username =  _user;
        this.destino = _destino;
        this.asunto = _asunto;
        this.password = _pass;
        this.page_name = _page;
        this.page_logo = _logo;
    }
}
