import * as React from 'react';
import * as enzyme from 'enzyme';
import Hello from './Hello';
import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

it('renders the correct text when no login has been made', () => {
  const hello = enzyme.shallow(<Hello />);
  expect(hello.find('.greeting').text()).toEqual('Hello Stranger!')
});