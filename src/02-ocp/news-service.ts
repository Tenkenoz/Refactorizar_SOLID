// Refactorización: Principio Abierto/Cerrado (OCP)

import axios from 'axios';

// Interfaz que abstrae cualquier cliente HTTP
interface IHttpClient {
    get<T>(url: string): Promise<T>;
}

// Adaptador sobre axios
class AxiosAdapter implements IHttpClient {

    async get<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url);
        return response.data;
    }
}

// Adaptador sobre fetch nativo — listo para sustituir AxiosAdapter sin modificar servicios
class FetchAdapter implements IHttpClient {

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json() as Promise<T>;
    }
}

// Servicio de noticias — depende de la abstracción, no de axios
export class NewsService {

    constructor(private readonly http: IHttpClient) {}

    async getLatestNews(): Promise<unknown> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }
}

// Servicio de galería — depende de la abstracción, no de axios
export class PhotosService {

    constructor(private readonly http: IHttpClient) {}

    async getGallery(): Promise<unknown> {
        return this.http.get('https://jsonplaceholder.typicode.com/photos');
    }
}

// Composición — único punto de cambio al migrar de librería HTTP
const httpClient: IHttpClient = new AxiosAdapter();
const newsService = new NewsService(httpClient);
const photosService = new PhotosService(httpClient);

newsService.getLatestNews().then(console.log);
photosService.getGallery().then(data => console.log('Fotos:', Array.isArray(data) ? data.length : 0));