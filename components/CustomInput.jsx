import { Text } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

function CustomInput({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  style,
  icon,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            mode="flat"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label={placeholder}
            secureTextEntry={secureTextEntry}
            style={style}
            right={icon}
            activeUnderlineColor={style.color}
          />
          {error && (
            <Text style={{ color: "#ba1a1a", marginTop: 5 }}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
}
export default CustomInput;
