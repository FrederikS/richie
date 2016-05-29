function isSelectionSame({ anchorKey: ak1, focusKey: fk1 }, { anchorKey: ak2, focusKey: fk2 }) {
    return ak1 === ak2 && fk1 === fk2;
}

export { isSelectionSame };
