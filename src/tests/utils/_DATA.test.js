import { _getUsers, _savePoll, _saveVote } from '../../utils/_DATA';

describe('Test function _getUsers', () => {
  it('Will return users data in case get data success', async () => {
    await expect(_getUsers()).resolves.not.toBeNull();
  });
});

// Test the _saveQuestion
describe('Test function _savePoll', () => {
  it('Will return new poll in case save success', async () => {
    const newPoll = await _savePoll('1st Question', '2nd Question', 'author');
    expect(newPoll).not.toBeNull();
  });

  it('Will throw error in case one of 3 parameters is missing', async () => {
    await expect(_savePoll()).rejects.toEqual(
      'The questions and author are required'
    );

    await expect(_savePoll('1st Question')).rejects.toEqual(
      'The questions and author are required'
    );

    await expect(_savePoll('1st Question', '2nd Question')).rejects.toEqual(
      'The questions and author are required'
    );
  });
});

// Test the _saveQuestionAnswer
describe('Test function _saveVote', () => {
  it('Will return nothing in case save success', async () => {
    await expect(
      _saveVote({
        id: '8xf0y6ziyjabvozdd253nd',
        answer: { choose: 1, user: '123' },
      })
    ).resolves.toBeUndefined();
  });

  it('Will throw error in case incorrect data', async () => {
    await expect(
      _saveVote({
        id: 'dung_heo',
        answer: { choose: 1, user: '123' },
      })
    ).rejects.toEqual('Can not find poll');
  });
});
