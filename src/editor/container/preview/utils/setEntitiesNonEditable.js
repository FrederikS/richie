function* entries(obj) {
    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

export default function (rawContent) {
    const readOnlyEntityMap = {};
    for (const [key, entity] of entries(rawContent.entityMap)) {
        const readOnlyEntity = Object.assign({}, entity, {
            data: Object.assign({}, entity.data, { editable: false })
        });
        readOnlyEntityMap[key] = readOnlyEntity;
    }
    return Object.assign(rawContent, { entityMap: readOnlyEntityMap });
}
