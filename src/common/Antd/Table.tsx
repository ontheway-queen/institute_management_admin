import { Table as AntTable, TableColumnType, type TableProps } from "antd";
import useQueryParams from "../../hooks/useQueryParams";

interface Props<T> extends TableProps<T> {
  // rowKey: keyof T | ((record: T) => React.Key);
  total?: number | undefined;
  columns: Array<TableColumnType<T>>;
}

const Table = <T extends object>({
  // rowKey,
  total,
  columns,
  ...rest
}: Props<T>) => {
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();
  // const { limit, skip } = useAppSelector(FilterState);
  // const dispatch = useAppDispatch();
  const showPagination: boolean = total !== undefined && total >= 100;

  return (
    <AntTable
      {...rest}
      bordered
      // rowKey={rowKey}
      size="small"
      scroll={{ x: true /*  y: Number(total) * 13 >= 650 ? 650 : undefined */ }}
      columns={[
        {
          title: "SL",
          width: 30,
          render: (_: unknown, __: unknown, index: number) =>
            index + 1 + Number(query?.skip || 0),
        },
        ...columns,
      ]}
      pagination={
        showPagination && !rest?.loading
          ? {
              onChange(current, size) {
                setSearchParams({
                  skip: String((current - 1) * Number(size)),
                  limit: String(size),
                });
              },
              current:
                query.skip && query.limit
                  ? Math.floor(Number(query.skip) / Number(query.limit)) + 1
                  : 1,
              showSizeChanger: true,
              pageSize: Number(query.limit) || 100,
              defaultPageSize: query?.limit ? Number(query.limit) : 100,
              pageSizeOptions: ["50", "100", "200", "300", "400", "500"],
              total: total ? Number(total) : 0,
              showTotal: (total) => `Total ${total}`,
            }
          : false
      }

      // pagination={
      //   showPagination && !rest?.loading
      //     ? {
      //         onChange(current, size) {
      //           setSearchParams({
      //             skip:
      //               current === 1
      //                 ? String(Number(current) - 1)
      //                 : String(current * Number(size) - Number(size)),
      //             limit: String(size),
      //           });
      //         },
      //         current: Math.floor(
      //           Number(query.skip) / Number(query.limit) + 1 || 1
      //         ),
      //         showSizeChanger: true,
      //         pageSize: Number(query.limit) || 100,
      //         defaultPageSize: query?.limit ? Number(query.limit) : 100,
      //         pageSizeOptions: ["50", "100", "200", "300", "400", "500"],
      //         total: total ? Number(total) : 0,
      //         showTotal: (total) => `Total ${total} `,
      //       }
      //     : false
      // }
    />
  );
};

export default Table;
