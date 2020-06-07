import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TechList from '~/components/TechList';
import { useSelector, useDispatch } from 'react-redux';
import { addTech } from '~/store/modules/techs/actions';
jest.mock('react-redux')

describe('TechList component', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation(cb => cb({
      techs: ['node', 'react']
    }));
    const { getByTestId, getByText } = render(<TechList/>);
    expect(getByTestId('tech-list')).toContainElement(getByText('node'));
    expect(getByTestId('tech-list')).toContainElement(getByText('react'));
  })
  it('should be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechList/>);
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    fireEvent.change(getByLabelText('Tech'), { target: { value: 'node' } });
    fireEvent.submit(getByTestId('tech-form'));

    expect(dispatch).toHaveBeenCalledWith(addTech('node'));
  })
})