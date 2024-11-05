import { rankingsReducer } from '../reducers';
import { ACTIONS } from '../actions';
import { formatPoints } from '@utils/number';
import { SportEnum } from '@constants/enums';
import data from './fixtures/data';
import rankings from './fixtures/rankings';

describe('rankingsReducer', async () => {
  const initialState = {
    data: null,
    initialData: null,
    isError: null,
    isLoading: true,
    selectedMatch: null,
    sport: SportEnum.MENS,
  };

  it('should produce state of next weeks rankings', () => {
    const state = rankingsReducer(initialState, {
      type: ACTIONS.FETCH_SUCCESS,
      payload: { data },
    });

    state.data.rankings.forEach(entry => {
      const nextEntry = rankings.entries.find(r => r.team.id === entry.team.id);
      const currentPoints = formatPoints(entry.pts);
      const nextPoints = formatPoints(nextEntry.pts);

      expect(`${entry.team.name}: ${currentPoints}`).toBe(
        `${nextEntry.team.name}: ${nextPoints}`,
      );
    });
  });
});
