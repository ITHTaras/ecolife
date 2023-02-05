import { useEffect } from "react";
import { View, Text } from "react-native";
import { Callout } from "react-native-maps";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import langs from "../lang/langs";
import { getDownloadURL, ref } from "firebase/storage";

const LandfillCallout = (props) => {
  const { user, lang } = useSelector((store) => store.user);
  const { styles, point, setModal, setModalImage } = props;

  useEffect(() => {
    if (point.image) {
      getDownloadURL(
        ref(
          storage,
          `points/${
            point.image.substring(user.image.lastIndexOf("/") + 1) + user.email
          }`
        )
      ).then((url) => {
        setModalImage(url);
      });
    }
  }, []);

  return (
    <Callout tooltip onPress={point.image ? () => setModal(true) : () => {}}>
      <View style={styles.tooltip}>
        <Text style={styles.tooltipTitle}>{langs[lang].dump}</Text>

        {point.user ? (
          <Text style={styles.author}>
            {langs[lang].posted}
            {point.user.name}
          </Text>
        ) : (
          ""
        )}
      </View>
    </Callout>
  );
};

export default LandfillCallout;
