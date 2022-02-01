import { useState, useEffect } from 'react';
import { history } from 'umi';
import { Avatar, Modal, Button, message, Alert } from 'antd';
import { CheckCard } from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { itemRender } from '@/layouts/index';
import { queryTemplates, deployApp } from '@/services';

const routes = [
  {
    path: '/',
    breadcrumbName: 'Admin',
  },
  {
    path: '/templates',
    breadcrumbName: 'Templates',
  },
];

const Templates = () => {
  const [apps, setApps] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [deployErrors, setDeployErrors] = useState([]);

  useEffect(() => {
    queryTemplates({ params: {} }).then((res) => {
      setApps(res);
    });
  }, []);
  return (
    <PageContainer
      title="Templates"
      header={{
        breadcrumb: { itemRender, routes },
      }}
    >
      <Modal
        visible={modalVisible}
        title={selectedTemplate.title}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="deploy"
            type="primary"
            onClick={async () => {
              const { id, ...data } = selectedTemplate;
              const result = await deployApp(data);
              if (result.errors) {
                setDeployErrors(result.errors.map((v) => v.errors.join('')));
              }
              if (result.id) {
                message.success('Deploy success');
                history.push(`/apps/${result.id}`);
              }
            }}
          >
            Deploy
          </Button>,
          <Button
            key="custom"
            type="primary"
            onClick={() => {
              history.push(`/apps/new?template=${selectedTemplate.name}`);
            }}
          >
            Custom
          </Button>,
        ]}
      >
        {selectedTemplate.description}
        {deployErrors.length > 0 && (
          <Alert
            type="error"
            message={deployErrors}
            banner
            style={{ marginTop: 24 }}
          />
        )}
      </Modal>
      <CheckCard.Group
        style={{ width: '100%' }}
        onChange={(checked) => {
          if (!checked) {
            setModalVisible(true);
            return;
          }
          if (checked == 'empty') {
            history.push(`/apps/new`);
          } else {
            setModalVisible(true);
            setSelectedTemplate(
              apps
                .filter((v) => v.name == checked)
                .map((v) => v)
                .pop(),
            );
          }
        }}
      >
        {apps.map((v) => (
          <CheckCard
            key={v.name}
            title={v.title}
            description={v.description}
            value={v.name}
            avatar={
              v.logo ? (
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                  size="large"
                />
              ) : null
            }
          />
        ))}
      </CheckCard.Group>
    </PageContainer>
  );
};

export default Templates;
