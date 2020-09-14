import React from 'react';
import { shallow , mount, render } from 'enzyme';
import Root from '../components/root';

const setup = propOverrides => {
    const props = Object.assign({
        authorized: false
    }, propOverrides);

    const wrapper = render(<Root {...props} />);

    return {
        props,
        wrapper,
        login: wrapper.find("#login-panel").length
    }
};

describe('UI Tests', () => {
    it('Snapshot test', () => {
        const component = shallow(<Root />);
        expect(component).toMatchSnapshot();
    });
    it('Load login screen when no valid token',()=>{
        const component = setup();
        expect(component.login).toEqual(1);
    });
});
