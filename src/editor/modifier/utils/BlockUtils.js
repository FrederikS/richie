import { SelectionState } from 'draft-js';

const getBlockRange = (contentState, blockKey) => {
    const block = contentState.getBlockForKey(blockKey);

    return new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
        isBackward: false
    });
};

export { getBlockRange };
