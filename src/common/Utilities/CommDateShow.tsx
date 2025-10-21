import dayjs from 'dayjs';

interface CommDateShowProps {
  nameKey?: string; // which field contains name
}

const CommDateShow =
  ({ nameKey = 'date' }: CommDateShowProps) =>
  (_: any, record: any) => {
    return (
      <>
        {(record[nameKey] && dayjs(record[nameKey]).format('DD-MMM-YYYY')) ||
          '-'}
      </>
    );
  };

export default CommDateShow;
