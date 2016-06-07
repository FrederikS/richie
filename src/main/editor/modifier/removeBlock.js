import { Modifier } from 'draft-js';
import { getBlockRange } from './utils/BlockUtils';

export default function (contentState, blockKey) {
    const blockRange = getBlockRange(contentState, blockKey);

    const contentWithResettedBlock = Modifier.setBlockType(
        contentState,
        blockRange,
        'unstyled'
    );

    return Modifier.removeRange(
        contentWithResettedBlock,
        blockRange,
        'backward'
    );
}
