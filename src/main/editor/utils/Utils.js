function* values(obj) {
    for (const prop of Object.keys(obj)) {
        yield obj[prop];
    }
}

const valuesAsArray = (obj) => Array.from(values(obj));

export { valuesAsArray };
