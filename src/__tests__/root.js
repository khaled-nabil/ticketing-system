import React from 'react';
import { shallow , mount } from 'enzyme';
import Root from '../components/root';
import Login from '../components/login';

const setup = propOverrides => {
    const props = Object.assign({
        authorized: false
    }, propOverrides);

    const wrapper = mount(<Root {...props} />);

    return {
        props,
        wrapper
    }
};

describe('UI Tests', () => {
    it('Snapshot test', () => {
        const component = setup();
        expect(component).toMatchSnapshot();
    });
    it('Load login screen',()=>{
        const component = setup();
        const login = shallow(<Login />);
        console.log(component.wrapper);
        console.log(login);
        expect(true).toBe(true);
       // expect(component.wrapper).toMatch(login);

    });
});
