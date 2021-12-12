import { Form, Button, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AppForm from './AppForm';

const AppDependsForm = (props) => {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <Card
              key={key}
              size="small"
              headStyle={{ borderBottom: 0 }}
              style={{ marginBottom: 24 }}
            >
              <AppForm
                fullName={[...props.name, name]}
                name={[name]}
                remove={remove}
              />
            </Card>
          ))}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Depend
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AppDependsForm;
