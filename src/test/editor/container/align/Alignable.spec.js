import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import Alignable from '../../../../main/editor/container/align/Alignable';
import ActionBar from '../../../../main/editor/components/action/ActionBar';
import chaiEnzyme from 'chai-enzyme';
import { mountWithMuiContext, simulateTouchTap } from '../../../utils/TestUtils';
import chaiSinon from 'sinon-chai';
import sinon from 'sinon';

chai.should();
chai.use(chaiEnzyme());
chai.use(chaiSinon);

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
        const alignable = mountWithMuiContext(<Alignable><div>foo</div></Alignable>);
        alignable.ref('alignable').simulate('click');

        alignable.state('showActionBar').should.be.true;
        alignable.find(ActionBar).should.have.length(1);
    });

    it('should render children in wrapper element with showActionBar callback on click', () => {
        const alignable = mountWithMuiContext(<Alignable><div>foo</div></Alignable>);

        alignable.should.contain(
            <div onClick={alignable.instance().showActionBar}>
                <div>foo</div>
            </div>
        );
        alignable.should.have.ref('alignable');
    });

    it('should invoke onAlign with left on left button click', () => {
        const onAlign = sinon.spy();
        const alignable = mountWithMuiContext(
            <Alignable onAlign={onAlign}>
                <div>foo</div>
            </Alignable>
        );
        alignable.setState({ showActionBar: true });
        simulateTouchTap(alignable.find(ActionBar).find('button').at(0));

        onAlign.should.have.been.calledWith('left');
    });

    it('should invoke onAlign with center on center button click', () => {
        const onAlign = sinon.spy();
        const alignable = mountWithMuiContext(
            <Alignable onAlign={onAlign}>
                <div>foo</div>
            </Alignable>
        );
        alignable.setState({ showActionBar: true });
        simulateTouchTap(alignable.find(ActionBar).find('button').at(1));

        onAlign.should.have.been.calledWith('center');
    });

    it('should invoke onAlign with right on right button click', () => {
        const onAlign = sinon.spy();
        const alignable = mountWithMuiContext(
            <Alignable onAlign={onAlign}>
                <div>foo</div>
            </Alignable>
        );
        alignable.setState({ showActionBar: true });
        simulateTouchTap(alignable.find(ActionBar).find('button').at(2));

        onAlign.should.have.been.calledWith('right');
    });
});
