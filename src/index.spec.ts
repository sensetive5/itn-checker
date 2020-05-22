import { checkItn } from './index'

describe('Check ITN Number', () => {
  it('Should throw error when number is shorter than 10', () => {
    const ITN_NUMBER = '1234567';

    expect(() => checkItn(ITN_NUMBER)).toThrow();
  })

  it('Should throw error when number is longer than 12', () => {
    const ITN_NUMBER = '1234567891234';

    expect(() => checkItn(ITN_NUMBER)).toThrow();
  })

  it('Should validate 10 dig ITN number when its correct', () => {
    const CORRECT_ITN_NUMBER = '7710140679';

    expect(checkItn(CORRECT_ITN_NUMBER)).toBeTruthy();
  })

  it('Should validate 12 dig ITN number when its correct', () => {
    const CORRECT_ITN_NUMBER = '444100216310';

    expect(checkItn(CORRECT_ITN_NUMBER)).toBeTruthy();
  })

  it('Should return false when 10 dig ITN number is not correct', () => {
    const INCORRECT_ITN_NUMBER = '7710140672';

    expect(checkItn(INCORRECT_ITN_NUMBER)).toBeFalsy();
  })

  it('Should return false when 11th number in 12 dig ITN number is not correct', () => {
    const INCORRECT_ITN_NUMBER = '444100216320';

    expect(checkItn(INCORRECT_ITN_NUMBER)).toBeFalsy();
  })

  it('Should return false when last number in 12 dig ITN number is not correct', () => {
    const INCORRECT_ITN_NUMBER = '444100216311';

    expect(checkItn(INCORRECT_ITN_NUMBER)).toBeFalsy();
  })
});
