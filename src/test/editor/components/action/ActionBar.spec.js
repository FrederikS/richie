import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import ActionBar from '../../../../main/editor/components/action/ActionBar';
import chaiEnzyme from 'chai-enzyme';

chai.should();
chai.use(chaiEnzyme());

describe('<ActionBar />', () => {
    it('should render a div', () => {
        const actionBar = shallow(
            <ActionBar
              onLeftClicked={() => {}}
              onCenterClicked={() => {}}
              onRightClicked={() => {}}
            />
        );
        actionBar.should.have.tagName('div');
    });

    it('should render controls with prop callbacks', () => {
        const left = () => {};
        const center = () => {};
        const right = () => {};

        const actionBar = shallow(
            <ActionBar
              onLeftClicked={left}
              onCenterClicked={center}
              onRightClicked={right}
            />
        );

        actionBar.should.contain(
            <ul>
                <li onClick={left}>left</li>
                <li onClick={center}>center</li>
                <li onClick={right}>right</li>
            </ul>
        );
    });
});
