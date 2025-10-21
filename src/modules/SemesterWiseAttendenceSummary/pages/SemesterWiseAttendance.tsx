import Container from '../../../common/Container/Container';
import Table from '../../../common/Antd/Table';
import useQueryParams from '../../../hooks/useQueryParams';
import { useGetDepartmentListQuery } from '../../Department/api/departmentApiEndpoints';
import { useGetSemesterWiseAttendanceListQuery } from '../api/semesterWiseAttendanceApiEndpoints';
import { useGetBatchSemesterListQuery } from '../../BatchWiseSemester/api/batchSemesterApiEndpoint';

const SemesterWiseAttendance = () => {
  const [query, setSearchParams] = useQueryParams<{
    limit: string;
    skip: string;
    name: string;
  }>();

  const { data, isLoading } = useGetSemesterWiseAttendanceListQuery({
    ...query,
  });
  const { data: departmentData } = useGetDepartmentListQuery({ status: true });
  const { data: batchSemesterData } = useGetBatchSemesterListQuery({});
  return (
    <Container
      options={{
        showDateRange: true,
        searchKeyName: 'batch_name',
        showSearchFilter: true,
        showStatus1: true,
        showStatus: true,
      }}
      statusOption={{
        placeholder: 'Select Department',
        queryName: 'department_id',
        options: departmentData?.data?.map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
      }}
      statusOption1={{
        placeholder: 'Select Batch(semester)',
        queryName: 'batch_semester_id',
        options: batchSemesterData?.data?.map((item) => ({
          label: `${item.batch_name} (${item.semester_name})`,
          value: String(item.batch_semester_id),
        })),
      }}
      title={`Semester Wise Attendance`}
      content={
        <div style={{ marginTop: '12px' }}>
          <Table
            scroll={{ x: 500 }}
            loading={isLoading}
            bordered
            size='small'
            dataSource={data?.data || []}
            rowKey='id'
            pagination={{
              onChange(current, size) {
                setSearchParams({
                  skip:
                    current === 1
                      ? String(current - 1)
                      : String(
                          current * Number(query.limit) - Number(query.limit)
                        ),
                  limit: String(size),
                });
              },
              showSizeChanger: true,
              defaultPageSize: query.limit ? Number(query.limit) : 100,
              pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
              total: Number(data?.total || 0),
              showTotal: (total) => `Total ${total}`,
            }}
            columns={[
              {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
              },
              {
                title: 'Semester',
                dataIndex: 'semester',
                key: 'semester',
              },
              {
                title: 'Branch Name',
                dataIndex: 'branch_name',
                key: 'branch_name',
              },
              {
                title: 'Subject',
                dataIndex: 'subject',
                key: 'subject',
              },
              {
                title: 'Teacher',
                dataIndex: 'teacher',
                key: 'teacher',
              },
              {
                title: 'Present',
                dataIndex: 'present',
                key: 'present',
              },
              {
                title: 'Absent',
                dataIndex: 'absent',
                key: 'absent',
              },
              {
                title: 'Leave',
                dataIndex: 'leave',
                key: 'leave',
              },
              {
                title: 'Late',
                dataIndex: 'late',
                key: 'late',
              },
            ]}
          />
        </div>
      }
    />
  );
};

export default SemesterWiseAttendance;
