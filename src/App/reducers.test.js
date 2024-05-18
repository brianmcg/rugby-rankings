// import { rankingsReducer } from './reducers';
import { fetchData } from '@utils/api';
import { addWeeks, formatApiDate } from '@utils/date';
import { VALUES } from '@constants/sports';

describe ('rankingsReducer',  () => {
  test('adds 1 + 2 to equal 3', async () => {
    const startDate = new Date('2023-01-01');

    const dates = Array.from(Array(52).keys()).reduce((memo, i) => ([...memo, addWeeks(startDate, i + 1)]), [startDate]);

    dates.forEach((date, i) => {
      console.log('date', formatApiDate(date));

      // const
    });

    try {
      // const data = await fetchData(VALUES.MENS);
      // console.log(data);

    } catch (error) {
      console.error('Failed to fetch data');
    }

    // console.log(data);


    expect(1 + 2).toBe(3);
  });
});