import React, { useEffect, useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  Tag,
  TreeSelect,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  notification,
  Space,
} from 'antd';
import { listDeptTree } from '@/services/upms';
import { TableListItem } from './data';
import { dtoPage, topUp } from './service';

export default () => {
  const [deptTree, setDeptTree] = useState([]);
  const [topUpVisible, setTopUpVisible] = useState<boolean>(false);
  const [walletValues, setWalletValues] = useState<TableListItem | any>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    listDeptTree().then((res) => {
      setDeptTree(res.data);
    });
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      dataIndex: 'walletId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: {
        0: { text: '男', status: 'Default' },
        1: { text: '女', status: 'Processing' },
        2: { text: '保密', status: 'Error' },
      },
    },
    {
      title: '部门',
      search: false,
      dataIndex: 'deptName',
    },
    {
      title: '部门',
      dataIndex: 'deptId',
      hideInTable: true,
      renderFormItem: (_, { type, defaultRender, ...rest }) => {
        return <TreeSelect allowClear placeholder="请选择" treeData={deptTree} />;
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: 'IC卡号',
      dataIndex: 'icNum',
    },
    {
      title: '可用余额',
      align: 'center',
      dataIndex: 'balanceFee',
      render: (text) => <Tag color="success">{text}</Tag>,
    },
    {
      title: '总收入额',
      align: 'center',
      dataIndex: 'walletIncome',
      render: (text) => <Tag color="processing">{text}</Tag>,
    },
    {
      title: '总支出额',
      align: 'center',
      dataIndex: 'walletOutcome',
      render: (text) => <Tag color="warning">{text}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      search: false,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      search: false,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: TableListItem) => (
        <Space>
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              setWalletValues(record);
              setTopUpVisible(true);
            }}
          >
            充
          </Button>
          <Button type="primary" shape="circle">
            入
          </Button>
          <Button type="primary" shape="circle">
            出
          </Button>
        </Space>
      ),
    },
  ];

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        rowKey="walletId"
        actionRef={actionRef}
        columns={columns}
        request={(params, sorter, filter) => dtoPage({ ...params, sorter, filter })}
      />
      <Modal
        destroyOnClose
        title="充值"
        visible={topUpVisible}
        okButtonProps={{ loading: btnLoading }}
        cancelButtonProps={{ loading: btnLoading }}
        onCancel={() => {
          setWalletValues({});
          setTopUpVisible(false);
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          {...layout}
          form={form}
          onFinish={(values) => {
            setBtnLoading(true);
            topUp({ targetId: walletValues.walletId, fee: values.fee, remark: values.remark })
              .then((res) => {
                if (res.code === '00000') {
                  setBtnLoading(false);
                  setWalletValues({});
                  setTopUpVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                  notification.success({
                    message: '充值成功',
                    description: `已成功为该用户充值 ${values.fee} 元`,
                  });
                }
              })
              .catch(() => {
                setBtnLoading(false);
              });
          }}
          initialValues={walletValues}
        >
          <Form.Item label="用户名" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="姓名" name="nickname">
            <Input disabled />
          </Form.Item>
          <Form.Item label="部门" name="deptName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="手机号" name="mobile">
            <Input disabled />
          </Form.Item>
          <Form.Item label="IC卡号" name="icNum">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="充值金额"
            name="fee"
            rules={[{ required: true, message: '请输入充值金额!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              min={1}
              /* parser={value => value?.replace(/\$\s?|(,*)/g, '')} */
            />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            rules={[{ max: 255, message: '最多不能超过255个字符' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </PageHeaderWrapper>
  );
};
