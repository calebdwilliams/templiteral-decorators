export function Observe(target, prop, descriptor) {
    const { enumerable, configurable, writable, value, initializer } = descriptor;
    let currentValue = initializer();

    function set(newValue) {
        if (currentValue !== newValue) {
            currentValue = newValue;
            target._render();
        }
    }

    function get() {
        return currentValue;
    }

    return { enumerable, configurable, set, get };
}
