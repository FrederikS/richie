import React from 'react';
import chai from 'chai';
import { shallow, mount } from 'enzyme';
import Alignable from '../../../../main/editor/container/align/Alignable';
import ActionBar from '../../../../main/editor/components/action/ActionBar';
import chaiEnzyme from 'chai-enzyme';

chai.should();
chai.use(chaiEnzyme());

describe('<Alignable />', () => {
    it('should render a div tag', () => {
        const alignable = shallow(<Alignable><div>foo</div></Alignable>);
        alignable.should.have.tagName('div');
    });

    it('should render an action bar for alignments', () => {
        const alignable = shallow(<Alignable><div>foo</div></Alignable>);
        alignable.should.contain(
            <ActionBar
              onLeftClicked={alignable.instance().alignLeft}
              onCenterClicked={alignable.instance().alignCenter}
              onRightClicked={alignable.instance().alignRight}
            />
        );
    });

    it('should render children in wrapper element', () => {
        const alignable = mount(<Alignable><div>foo</div></Alignable>);
        alignable.should.contain(
            <div>
                <div>foo</div>
            </div>
        );
        alignable.should.have.ref('alignable');
    });
});
