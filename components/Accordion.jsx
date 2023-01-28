import { useState } from "react";
import { Dimensions } from "react-native";
import { List } from "react-native-paper";

const Accordion = ({ question, text }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title={question}
        expanded={expanded}
        onPress={handlePress}
        style={{
          backgroundColor: "#f1f1f1",
          width: Dimensions.get("window").width * 0.8,
        }}
        titleNumberOfLines={50}
      >
        <List.Item description={text} descriptionNumberOfLines={50} />
      </List.Accordion>
    </List.Section>
  );
};

export default Accordion;
