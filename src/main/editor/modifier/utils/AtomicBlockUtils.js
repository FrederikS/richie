import {
    Modifier,
    CharacterMetadata,
    ContentBlock,
    BlockMapBuilder,
    genKey
} from 'draft-js';
import { List, Repeat } from 'immutable';

const copyAtomicBlock = (contentState, targetSelection, block) => {
    const entityKey = block.getEntityAt(0);

    const afterRemoval = Modifier.removeRange(contentState, targetSelection, 'backward');
    const afterSplit = Modifier.splitBlock(afterRemoval, afterRemoval.getSelectionAfter());
    const insertionTarget = afterSplit.getSelectionAfter();
    const asAtomicBlock = Modifier.setBlockType(afterSplit, insertionTarget, 'atomic');

    const charData = CharacterMetadata.create({ entity: entityKey });
    const fragmentArray = [new ContentBlock({
        key: genKey(),
        type: 'atomic',
        text: block.getText(),
        characterList: List(Repeat(charData, block.getText().length)) // eslint-disable-line new-cap
    }), new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: '',
        characterList: List() // eslint-disable-line new-cap
    })];

    const fragment = BlockMapBuilder.createFromArray(fragmentArray);
    const withAtomicBlock = Modifier.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);
    const newContent = withAtomicBlock.merge({
        selectionBefore: targetSelection,
        selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    return newContent;
};

export { copyAtomicBlock };
