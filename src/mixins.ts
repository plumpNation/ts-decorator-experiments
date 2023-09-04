class Disposable {
    isDisposed: boolean = false;
    dispose() {
        this.isDisposed = true;
    }
}

class Activatable {
    isActive: boolean = false;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    // These are required to satisfy the compiler that SmartObject has the
    // members of the mixin classes. They are not really needed at runtime.
    isDisposed: boolean = false;
    dispose: () => void;
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}

applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.activate(), 1000);
setTimeout(() => smartObj.dispose(), 2000);

// Helper function to do the mixing
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!);
        });
    });
}