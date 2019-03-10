import React from 'react';
import {mount, shallow} from 'enzyme';
import Login from '../components/login';

const setup = propOverrides => {
    const props = Object.assign({
        fetchToken: jest.fn(({email, password})=> true)
    }, propOverrides);

    const wrapper = mount(<Login {...props} />);

    return {
        props,
        wrapper,
        form: wrapper.find("form")
    }
};

describe('Login Render', () => {
    it('Login renders correctly', () => {
        const component = shallow(<Login />);
        expect(component).toMatchSnapshot();
    });
    it('form submits to fetch token',()=>{
        const component = setup();
        component.form.simulate('submit');
        expect(component.props.fetchToken).toHaveBeenCalledTimes(1);
        expect(component.props.fetchToken).toHaveBeenCalledWith( {"email": "test@test.com", "password": "123"});

    })
});
