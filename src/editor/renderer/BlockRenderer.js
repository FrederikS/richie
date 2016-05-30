import Atomic from '../components/blocks/Atomic';

export function blockRenderer(block) {
    switch (block.getType()) {
        case 'atomic':
            return {
                component: Atomic,
                editable: false
            };
        default:
            return null;
    }
}
