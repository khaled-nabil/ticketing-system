import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/login';

describe('Login Render', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Login />);

        expect(component).toMatchSnapshot();
    });
});
