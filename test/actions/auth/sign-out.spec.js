import { expect } from 'chai';
import * as actions from '../../../src/actions/auth-actions';
import * as types from '../../../src/constants/auth';
import cookie from 'react-cookie';

describe('signOut()', () => {
  it('creates an action to sign current user out', () => {
    const expectedAction = {
      type: types.SIGN_OUT,
    };
    expect(actions.signOut()).to.eql(expectedAction);
  });

  it('removes cookie with GitHub token', () => {
    cookie.save('gist_explorer_token', 'old-token');
    actions.signOut();
    expect(cookie.load('gist_explorer_token')).to.be.undefined;
  });
});
