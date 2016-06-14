import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default function (component) {
    const node = ReactDOM.findDOMNode(component.node);
    return ReactTestUtils.Simulate.touchTap(node);
}
