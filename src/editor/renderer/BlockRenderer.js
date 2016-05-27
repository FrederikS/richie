import Image from '../components/entities/Image';

export function blockRenderer(block) {
    switch (block.getType()) {
        case 'atomic':
            return {
                component: Image,
                editable: false
            };
        default:
            return null;
    }
}
