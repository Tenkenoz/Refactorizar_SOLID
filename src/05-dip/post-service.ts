// Refactorización: Principio de Inversión de Dependencias (DIP)

// Tipo de dato de una publicación
interface Post {
    id: number;
    title: string;
    body: string;
}

// Abstracción: contrato de proveedor de base de datos
interface IDatabaseProvider {
    getFakePosts(): Promise<Post[]>;
}

// Implementación concreta: base de datos local
class LocalDatabaseService implements IDatabaseProvider {

    async getFakePosts(): Promise<Post[]> {
        return [
            { id: 1, title: 'Avistamiento de Jaguar', body: 'Se reportó un jaguar cerca del río.' },
            { id: 2, title: 'Nuevas Orquídeas', body: 'Florecieron especies raras en el jardín botánico.' },
        ];
    }
}

// Implementación concreta: base de datos JSON
class JsonDatabaseService implements IDatabaseProvider {

    async getFakePosts(): Promise<Post[]> {
        return [
            { id: 1, title: 'JSON Post 1', body: 'Contenido cargado desde JSON.' },
        ];
    }
}

// Mock para pruebas unitarias — sin infraestructura real
class MockDatabaseService implements IDatabaseProvider {

    async getFakePosts(): Promise<Post[]> {
        return [
            { id: 99, title: 'Post de prueba', body: 'Datos controlados para el test.' },
        ];
    }
}

// Servicio de publicaciones — depende de la abstracción inyectada
export class PostService {

    constructor(private readonly databaseProvider: IDatabaseProvider) {}

    async getPosts(): Promise<Post[]> {
        return this.databaseProvider.getFakePosts();
    }
}

// Producción
const prodService = new PostService(new LocalDatabaseService());
prodService.getPosts().then(console.log);

// Testing — sin levantar infraestructura
const testService = new PostService(new MockDatabaseService());
testService.getPosts().then(console.log);