import { RadioGroup, YStack, Text, XStack } from "tamagui";

type ConditionRadioProps = {
  condition: string;
  setCondition: (value: string) => void;
};

const ConditionRadio: React.FC<ConditionRadioProps> = ({
  condition,
  setCondition,
}) => {
  const radioItemStyle = {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  };

  const indicatorStyle = {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#a68fcc",
  };

  const textStyle = {
    marginLeft: 10,
    color: "#000",
    fontSize: 16,
  };
  return (
    <RadioGroup value={condition} onValueChange={setCondition} gap="$4">
      {["New", "Like New", "Very Good", "Good", "Acceptable"].map((value) => (
        <YStack key={value} style={radioItemStyle}>
          <XStack>
            <RadioGroup.Item
              value={value}
              id={`${value.toLowerCase()}-radio-item`}
            >
              <RadioGroup.Indicator style={indicatorStyle} />
            </RadioGroup.Item>
            <Text style={textStyle}>{value}</Text>
          </XStack>
        </YStack>
      ))}
    </RadioGroup>
  );
};

export default ConditionRadio;
