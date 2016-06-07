import copyBlock from './copyBlock';
import removeBlock from './removeBlock';
import { getBlockRange } from './utils/BlockUtils';
import { isSelectionSame } from './utils/SelectionUtils';

export default function (contentState, targetSelection, blockKey) {
    let newContentState;
    const blockRange = getBlockRange(contentState, blockKey);
    if (!isSelectionSame(targetSelection, blockRange)) {
        const contentWithCopiedBlock = copyBlock(contentState, targetSelection, blockKey);
        newContentState = removeBlock(contentWithCopiedBlock, blockKey);
    } else {
        newContentState = contentState;
    }
    return newContentState;
}
