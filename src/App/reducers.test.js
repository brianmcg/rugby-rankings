import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';
import { addWeeks, getPreviousMonday } from '@utils/date';
import { fetchData, fetchRankings } from '@utils/api';
import { formatPoints } from '@utils/number';
import { SPORTS } from '@constants/data';

describe('rankingsReducer', async () => {
  const initialState = {
    data: null,
    initialData: null,
    isError: null,
    isLoading: true,
    selectedMatch: null,
    sport: SPORTS.VALUES.MENS,
  };

  const startDate = new Date('2024-02-01');

  const dates = Array.from(Array(6).keys()).reduce((memo, i) => ([...memo, addWeeks(startDate, i + 1).toDate()]), [startDate]);

  const sports = Object.values(SPORTS.VALUES);

  const testData = sports.reduce(
    (outerMemo, sport) => (dates.reduce(
      (innerMemo, date) => ([
        ...innerMemo,
        { sport, currentDate: date, nextDate: addWeeks(date, 1).toDate() },
      ]),
      outerMemo,
    )),
    [],
  );

  try {
    test.each(testData)('should produce state of next weeks rankings for $sport on $currentDate', async ({ sport, currentDate, nextDate }) => {
      const data = await fetchData(sport, currentDate);

      const state = rankingsReducer(initialState, {
        type: ACTIONS.FETCH_SUCCESS,
        payload: { data },
      });


      const { entries: nextRankings } = await fetchRankings(sport, getPreviousMonday(nextDate));

      state.data.rankings.forEach((entry) => {
        const nextEntry = nextRankings.find(r => r.team.id === entry.team.id);
        const currentPoints = formatPoints(entry.pts);
        const nextPoints = formatPoints(nextEntry.pts);

        expect(`${entry.team.name}: ${currentPoints}`).toBe(`${nextEntry.team.name}: ${nextPoints}`);
      });
    });

  } catch (error) {
    console.log(error);
  }
});