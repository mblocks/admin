import { Form, Space, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const KeyValueFormList = ({ title, name, fields }) => {
  return (
    <Form.List name={name}>
      {(internalFields, { add, remove }) => (
        <>
          {internalFields.map(({ key, name, fieldKey, ...restField }) => (
            <Space
              key={key}
              style={{ display: 'flex', marginBottom: 8 }}
              align="baseline"
            >
              {fields.map((v) => (
                <Form.Item
                  {...restField}
                  key={v.name || name}
                  label={v.label}
                  name={
                    typeof v.name == 'object'
                      ? [name, ...v.name]
                      : v.name
                      ? [name, v.name]
                      : name
                  }
                  fieldKey={[fieldKey, v.name || name]}
                  rules={v.rules}
                >
                  <Input placeholder={v.placeholder} style={v.style} />
                </Form.Item>
              ))}
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add {title}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default KeyValueFormList;
