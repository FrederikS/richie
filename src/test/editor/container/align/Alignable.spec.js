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

    it('should have showActionBar-state set false and no ActionBar rendered', () => {
        const alignable = shallow(<Alignable><div>foo</div></Alignable>);

        alignable.state('showActionBar').should.be.false;
        alignable.should.not.contain(
            <ActionBar
              onLeftClicked={alignable.instance().alignLeft}
              onCenterClicked={alignable.instance().alignCenter}
              onRightClicked={alignable.instance().alignRight}
            />
        );
    });

    it('should render an ActionBar on children-wrapper clicked', () => {
        const alignable = mount(<Alignable><div>foo</div></Alignable>);
        alignable.ref('alignable').simulate('click');

        alignable.state('showActionBar').should.be.true;
        alignable.should.contain(
            <ActionBar
              onLeftClicked={alignable.instance().alignLeft}
              onCenterClicked={alignable.instance().alignCenter}
              onRightClicked={alignable.instance().alignRight}
            />
        );
    });

    it('should render children in wrapper element with showActionBar callback on click', () => {
        const alignable = mount(<Alignable><div>foo</div></Alignable>);

        alignable.should.contain(
            <div onClick={alignable.instance().showActionBar}>
                <div>foo</div>
            </div>
        );
        alignable.should.have.ref('alignable');
    });
});
