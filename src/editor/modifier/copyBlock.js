import { copyAtomicBlock } from './utils/AtomicBlockUtils';

export default function (contentState, targetSelection, blockKey) {
    const block = contentState.getBlockForKey(blockKey);
    let newContentState;
    switch (block.getType()) {
        case 'atomic':
            newContentState = copyAtomicBlock(contentState, targetSelection, block);
            break;
        default:
            newContentState = contentState;
    }
    return newContentState;
}
