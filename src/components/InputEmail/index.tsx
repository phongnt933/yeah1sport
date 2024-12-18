import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Tag } from "antd";
import { useState } from "react";

interface InputEmailProps {
  value: string[];
  onChange: (value: string[]) => void;
}

function InputEmail(props: InputEmailProps) {
  const { value, onChange } = props;

  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleDelete = (item: string) => () => {
    onChange?.(value.filter((i) => i !== item));
  };

  const handleAdd = () => {
    if (inputValue && !value.includes(inputValue)) {
      onChange?.([...value, inputValue]);
    }
    setInputValue("");
  };
  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <Input
          value={inputValue}
          placeholder="Nhập email"
          onChange={handleChangeInput}
        />
        <Button
          onClick={handleAdd}
          type="default"
          icon={<PlusSquareOutlined />}
        />
      </Flex>
      <Flex wrap gap={8}>
        {value?.map((item) => (
          <Tag closable onClose={handleDelete(item)} style={{ margin: 0 }}>
            {item}
          </Tag>
        ))}
      </Flex>
    </Flex>
  );
}

export default InputEmail;
