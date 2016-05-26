import { Entity, CompositeDecorator } from 'draft-js';
import Link from '../components/entities/Link';

export function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (entityKey !== null && Entity.get(entityKey).getType() === 'LINK');
    }, callback);
}

const linkDecorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link
    }
]);

export default linkDecorator;
