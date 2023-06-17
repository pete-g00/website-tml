export class Graphviz {
    static load() {
        return new Promise((res) => {
            res({
                dot: () => "<svg><g></g></svg>"
            });
        });
    }
}