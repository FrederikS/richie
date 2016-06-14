import React from 'react';
import chai from 'chai';
import ActionBar from '../../../../main/editor/components/action/ActionBar';
import chaiEnzyme from 'chai-enzyme';
import chaiSinon from 'sinon-chai';
import sinon from 'sinon';
import { mountWithMuiContext, simulateTouchTap } from '../../../utils/TestUtils';

chai.should();
chai.use(chaiEnzyme());
chai.use(chaiSinon);

describe('<ActionBar />', () => {
    it('should render actionbar with left center right buttons', () => {
        const actionBar = mountWithMuiContext(
            <ActionBar
              onLeftClicked={() => {}}
              onCenterClicked={() => {}}
              onRightClicked={() => {}}
            />
        );

        actionBar.find('button').should.have.length(3);
        actionBar.find('button').at(0).should.have.text('left');
        actionBar.find('button').at(1).should.have.text('center');
        actionBar.find('button').at(2).should.have.text('right');
    });

    it('should invoke left-callback on left-click', () => {
        const left = sinon.spy();

        const actionBar = mountWithMuiContext(
            <ActionBar
              onLeftClicked={left}
              onCenterClicked={() => {}}
              onRightClicked={() => {}}
            />
        );

        simulateTouchTap(actionBar.find('button').at(0));
        left.should.have.been.calledOnce;
    });

    it('should invoke center-callback on center-click', () => {
        const center = sinon.spy();

        const actionBar = mountWithMuiContext(
            <ActionBar
              onLeftClicked={() => {}}
              onCenterClicked={center}
              onRightClicked={() => {}}
            />
        );

        simulateTouchTap(actionBar.find('button').at(1));
        center.should.have.been.calledOnce;
    });

    it('should invoke right-callback on right-click', () => {
        const right = sinon.spy();

        const actionBar = mountWithMuiContext(
            <ActionBar
              onLeftClicked={() => {}}
              onCenterClicked={() => {}}
              onRightClicked={right}
            />
        );

        simulateTouchTap(actionBar.find('button').at(2));
        right.should.have.been.calledOnce;
    });
});
