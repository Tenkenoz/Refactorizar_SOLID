// Refactorización: Principio de Sustitución de Liskov (LSP)

// Contrato común para todos los vehículos de la flota
interface IVehicle {
    readonly model: string;
    getDetails(): string;
}

// Implementación Tesla
class Tesla implements IVehicle {

    constructor(public readonly model: string) {}

    getDetails(): string {
        return `Tesla ${this.model} — Carga eléctrica al 100%`;
    }
}

// Implementación Audi
class Audi implements IVehicle {

    constructor(public readonly model: string) {}

    getDetails(): string {
        return `Audi ${this.model} — Tracción Quattro activada`;
    }
}

// Implementación Toyota
class Toyota implements IVehicle {

    constructor(public readonly model: string) {}

    getDetails(): string {
        return `Toyota ${this.model} — Motor híbrido listo`;
    }
}

// Implementación Honda
class Honda implements IVehicle {

    constructor(public readonly model: string) {}

    getDetails(): string {
        return `Honda ${this.model} — VTEC activado`;
    }
}

// Implementación Ford
class Ford implements IVehicle {

    constructor(public readonly model: string) {}

    getDetails(): string {
        return `Ford ${this.model} — Built Tough`;
    }
}

// Nuevo vehículo agregado sin modificar VehicleManager
class Dron implements IVehicle {

    constructor(public readonly model: string) {}

    getDetails(): string {
        return `Dron ${this.model} — Vigilancia aérea activa`;
    }
}

// Manager — opera sobre la abstracción sin usar instanceof
export class VehicleManager {

    static printVehicleDetails(vehicles: IVehicle[]): void {
        vehicles.forEach(vehicle => {
            console.log(`[VehicleManager] ${vehicle.getDetails()}`);
        });
    }
}

// Composición
VehicleManager.printVehicleDetails([
    new Tesla('Model X'),
    new Audi('Q7'),
    new Toyota('Land Cruiser'),
    new Honda('CR-V'),
    new Ford('F-150'),
    new Dron('DJI-Mavic'),
]);