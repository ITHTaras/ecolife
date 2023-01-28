import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  Button,
  Dialog,
  Divider,
  Portal,
  Provider,
  RadioButton,
  Snackbar,
} from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { complain } from "../features/categories/categorySlice";

import langs from "../lang/langs";

function Complaint({ modal, setModal, pointId }) {
  const { user, lang } = useSelector((store) => store.user);
  const { isError, isSuccess, message } = useSelector(
    (store) => store.category
  );
  const complainTitles = {
    fake: langs[lang].fakeInfo,
    badcontent: langs[lang].badContent,
  };

  const dispatch = useDispatch();

  const [done, setDone] = useState(false);
  const [value, setValue] = useState("fake");
  const [text, setText] = useState("");

  const [snack, setSnack] = useState(true);

  const onSubmit = () => {
    dispatch(
      complain({
        email: user.email,
        name: user.name,
        subject: complainTitles[value],
        text: text,
        pointId: pointId,
      })
    );
    setDone(true);
    setModal(true);
  };

  useEffect(() => {
    if (isError) {
      console.log("error!!!!!");
      setSnack(true);
    }
  }, [isError]);

  return (
    <Provider>
      <View>
        <Portal>
          {!done ? (
            <Dialog visible={modal} onDismiss={() => setModal(false)}>
              <Dialog.Title>{langs[lang].putComplaint}</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={(newValue) => setValue(newValue)}
                  value={value}
                >
                  <View style={styles.radio}>
                    <RadioButton value="badcontent" />
                    <Text>{langs[lang].badContent}</Text>
                  </View>
                  <View style={styles.radio}>
                    <RadioButton value="fake" />
                    <Text>{langs[lang].fakeInfo}</Text>
                  </View>
                </RadioButton.Group>
                <Text style={styles.additional}>
                  {langs[lang].additionalInfo}
                </Text>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  onChangeText={(text) => setText(text)}
                  value={text}
                />
                {text.length > 500 ? (
                  <Text style={styles.error}>
                    {langs[lang].tooBigComplaint}
                  </Text>
                ) : (
                  ""
                )}
              </Dialog.Content>
              <Divider style={styles.divider} />
              <Dialog.Actions>
                <Button onPress={() => onSubmit()}>
                  {langs[lang].complain}
                </Button>
              </Dialog.Actions>
            </Dialog>
          ) : done && isSuccess ? (
            <Dialog visible={modal} onDismiss={() => setModal(false)}>
              <Dialog.Title>{langs[lang].putComplaint}</Dialog.Title>
              <Dialog.Content>
                <View>
                  <Text>{langs[lang].thanks}</Text>
                  <Text>
                    {langs[lang].problem} {complainTitles[value]}
                  </Text>
                  <Text>
                    {langs[lang].additionalInfo} {text}
                  </Text>
                </View>
              </Dialog.Content>
              <Divider style={styles.divider} />
              <Dialog.Actions>
                <Button onPress={() => setModal(false)}>
                  {langs[lang].close}
                </Button>
              </Dialog.Actions>
            </Dialog>
          ) : isError ? (
            <View style={styles.popupContainer}>
              <Snackbar
                visible={snack}
                onDismiss={() => setSnack(false)}
                style={styles.popup}
              >
                {langs[lang].complaintAlreadyExists}
                {toString(message.message)}
                {langs[lang].daysMore}
              </Snackbar>
            </View>
          ) : (
            ""
          )}
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginTop: 15,
  },
  input: {
    borderColor: "#cdcdcd",
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    minHeight: 150,
    textAlignVertical: "top",
  },
  additional: {
    marginVertical: 10,
    fontSize: 16,
  },
  popupContainer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 65,
    flexDirection: "row",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#ba1a1a",
    fontSize: 13,
  },
});

export default Complaint;
