import React, {  useState } from 'react';
import { Button, } from 'antd';
import  CreateClientForm  from 'compoents/client/add-client-form';
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import ClientTable from 'compoents/client/client-table';
import { createApiClient } from "api/apiClient";
import { useMutation, useQuery } from 'react-query';

const accessToken = localStorage.getItem("access_token");

const apiClient = createApiClient(accessToken!);
const { Title } = Typography;


const ClientListPidentifier: React.FC = () => {
    const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    apiClient.postClient(values);
    setOpen(false);
  };

  const { data, error, isLoading } = useQuery("get-client-list", () =>
    apiClient.getClients()
  );

 
  
  // const { mutate: addTodo, isLoading, error } = useMutation(onCreate, {
  //   onSuccess: () => {
  //     // Success actions
  //   },
  //   onError: (error) => {
  //     // Error actions
  //   },
  // });

  

  return (
  <>
  <div className='dumi-default-table'>
  <Row justify="space-around" align="middle">
      <Col span={12}><Title>Clients</Title></Col>
      <Col span={2} offset={8}> 
      <Button
        type="primary"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Client
      </Button>
      </Col>
    </Row>
 
  <div>
      <CreateClientForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
    <ClientTable data={data}></ClientTable>
  </div>
  </>
  )
  ;
};

export default ClientListPidentifier;