import { Image, View } from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import langs from "../lang/langs";

const LandfillModal = ({ modal, setModal, modalImage }) => {
  let { lang } = useSelector((store) => store.user);

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={modal} onDismiss={() => setModal(false)}>
            <Dialog.Content style={{ display: "flex", alignItems: "center" }}>
              <Image
                source={{ uri: modalImage }}
                style={{ width: 230, height: 230, borderRadius: 5 }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setModal(false)}>
                {langs[lang].close}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default LandfillModal;
