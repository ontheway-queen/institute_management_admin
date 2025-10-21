import { useSearchParams } from 'react-router-dom';

const useQueryParams = <
  T extends Record<string, string | number | boolean>
>() => {
  // const filter = useAppSelector(FilterState);

  const [searchParams, setSearchParams] = useSearchParams();
  const allQueryParams = Object.fromEntries(searchParams.entries());

  // useEffect(() => {
  //   //default value
  //   console.log(allQueryParams);
  //   setSearchParams({ ...allQueryParams /* limit: '100', skip: '0'  */ });
  // }, []);
  // useEffect(() => {
  //   const params: URLSearchParams = new URLSearchParams(searchParams);

  //   Object.keys(filter).forEach((key) => {
  //     const value = filter[key as keyof typeof filter];
  //     if (value) {
  //       params.set(key, value.toString());
  //     } else {
  //       params.delete(key);
  //     }
  //   });
  //   setSearchParams(params.toString());
  // }, [filter, searchParams, setSearchParams]);

  return [
    allQueryParams as unknown as T,
    setSearchParams,
    searchParams,
  ] as const;
};

export default useQueryParams;
