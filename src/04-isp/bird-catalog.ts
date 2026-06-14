// Refactorización: Principio de Segregación de Interfaces (ISP)

// Capacidad: puede comer
interface IEatable {
    eat(): void;
}

// Capacidad: puede volar
interface IFlyable {
    fly(): void;
}

// Capacidad: puede nadar
interface ISwimmable {
    swim(): void;
}

// Tucán — vuela y come, no nada
export class Toucan implements IEatable, IFlyable {

    eat(): void {
        console.log('[Tucán] Comiendo frutas tropicales.');
    }

    fly(): void {
        console.log('[Tucán] Volando sobre el dosel de la selva.');
    }
}

// Colibrí — vuela y come, no nada
export class Hummingbird implements IEatable, IFlyable {

    eat(): void {
        console.log('[Colibrí] Bebiendo néctar de orquídeas.');
    }

    fly(): void {
        console.log('[Colibrí] Aleteando a 80 veces por segundo.');
    }
}

// Avestruz — come y nada, no vuela (sin método fly() en su tipo)
export class Ostrich implements IEatable, ISwimmable {

    eat(): void {
        console.log('[Avestruz] Comiendo hierbas de la sabana.');
    }

    swim(): void {
        console.log('[Avestruz] Cruzando el río a nado.');
    }
}

// Pingüino — come y nada, no vuela (sin método fly() en su tipo)
export class Penguin implements IEatable, ISwimmable {

    eat(): void {
        console.log('[Pingüino] Atrapando peces en el río.');
    }

    swim(): void {
        console.log('[Pingüino] Nadando a alta velocidad.');
    }
}

// Uso por capacidades segregadas
const voladoras: IFlyable[] = [new Toucan(), new Hummingbird()];
const nadadoras: ISwimmable[] = [new Ostrich(), new Penguin()];

voladoras.forEach(ave => ave.fly());
nadadoras.forEach(ave => ave.swim());