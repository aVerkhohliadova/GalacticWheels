import { View, Image } from "react-native";

function Logo({ viewStyle = {}, imageStyle = {} }) {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        viewStyle,
      ]}
    >
      <Image
        // eslint-disable-next-line global-require
        source={require("../../assets/logo.png")}
        style={[{ width: 200, height: 200 }, imageStyle]}
      />
    </View>
  );
}

export default Logo;
