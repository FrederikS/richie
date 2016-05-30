import { Entity, CompositeDecorator } from 'draft-js';
import Link from '../components/entities/Link';
import Types from '../components/entities/constants/Types';

export function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (entityKey !== null && Entity.get(entityKey).getType() === Types.LINK);
    }, callback);
}

const linkDecorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link
    }
]);

export default linkDecorator;
