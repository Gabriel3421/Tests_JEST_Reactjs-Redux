import { runSaga } from 'redux-saga';

import { getTechsSuccess, getTechsFailure } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();
    apiMock.onGet('techs').reply(200, ['node']);

    await runSaga({dispatch}, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['node']));
  });
  it('should fail when api return error', async () => {
    const dispatch = jest.fn();
    apiMock.onGet('techs').reply(500);

    await runSaga({dispatch}, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
})