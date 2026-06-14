// Refactorización: Principio de Responsabilidad Única (SRP)

interface Product {
    id: number;
    name: string;
    price: number;
}

// Servicio de persistencia del inventario
class ProductService {

    private products: Product[] = [];

    loadProduct(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }

    saveProduct(product: Product): void {
        this.products.push(product);
    }
}

// Servicio de notificaciones por correo
class Mailer {

    sendEmail(to: string, subject: string, body: string): void {
        console.log(`[Mailer] Para: ${to}`);
        console.log(`[Mailer] Asunto: ${subject}`);
        console.log(`[Mailer] Cuerpo: ${body}`);
    }
}

// Orquestador: coordina ProductService y Mailer
export class ProductBloc {

    constructor(
        private readonly productService: ProductService,
        private readonly mailer: Mailer,
    ) {}

    addProduct(product: Product, notifyEmail: string): void {
        this.productService.saveProduct(product);
        this.mailer.sendEmail(
            notifyEmail,
            'Nuevo producto añadido',
            `"${product.name}" fue registrado en la Reserva Ecológica.`,
        );
    }

    getProduct(id: number): Product | undefined {
        return this.productService.loadProduct(id);
    }
}