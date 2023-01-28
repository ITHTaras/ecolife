import { StyleSheet, View } from "react-native";

import Accordion from "../components/Accordion";

const questions = [
  {
    id: 1,
    title: "Чому відповідають різні кольори точок?",
    text: "Кожна точка вирізняє різні види сміття, відображуючи їх різними кольорами, що відповідають кольорам видів сміття, зазначених на головному екрані.",
  },
  {
    id: 2,
    title:
      "Чи є достовірною інформація про місцезнаходження пунктів прийому/сортування?",
    text: "Будь-хто може додати локацію до карти. Достовірність доданої користувачем інформації перевіряється безпосередньо іншими, а вміст - адиіністратором. Отож, якщо у Вас з'явилися підозри щодо коректності інформації — Ви завжди маєте можливість подати скаргу.",
  },
];

function Questions({ navigation }) {
  return (
    <View style={styles.container}>
      {questions.map((item) => {
        return (
          <Accordion key={item.id} question={item.title} text={item.text} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center" },
});

export default Questions;
