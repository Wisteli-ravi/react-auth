import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef, MenuProps } from 'antd';
import { Button, Dropdown, Input, Space, Table, message } from 'antd';
import  CreateClientForm  from 'compoents/client/add-client-form';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { Avatar } from 'antd';


interface DataType {
  key: string;
  name: string;
  identifier: string;
  displayName: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    identifier: "32",
    displayName: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    identifier: "42",
    displayName: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    identifier: "32",
    displayName: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    identifier: "32",
    displayName: 'London No. 2 Lake Park',
  },
];

const ClientListPidentifier: React.FC = () => {
    const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      danger: true,
      disabled: true,
    },
  ];

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Display Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => (
        <>
          {
            <Avatar style={{ verticalAlign: 'middle' }} shape="square" size="large" >
                {name.charAt(0)}
            </Avatar>
            
          }
          <span style={{marginLeft: 5}}>{name}</span>
          
        </>
      )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        
      },
      {
        title: 'Identifier',
        dataIndex: 'identifier',
        key: 'identifier',
        
      },

      {
        title: 'Action',
        key: 'identifier',
        render: (_, { identifier }) => (
            <>
             <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                
             </Dropdown.Button>
              
            </>
          )
        
      },
  ];

  return (
  <>
  <div className='dumi-default-table'>
  <h2>Table</h2>
  <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Client
      </Button>
      <CreateClientForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
    <Table columns={columns} dataSource={data} ></Table>
  </div>
  </>
  )
  ;
};

export default ClientListPidentifier;