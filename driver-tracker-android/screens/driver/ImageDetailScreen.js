import React, { useEffect } from "react";
import { Container, Content } from "native-base";
import { View, Image } from "react-native";

const ImageDetailScreen = (props) => {
  const { navigation } = props;
  const imgUrl = navigation.getParam("imgUrl");

  useEffect(() => {
    const awbNo = navigation.getParam("awbNo");
    navigation.setParams("awbNo", awbNo);
  }, []);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, height: "100%", width: "100%" }}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{ uri: imgUrl }}
          />
        </View>
      </Content>
    </Container>
  );
};

ImageDetailScreen.navigationOptions = (navData) => {
  const AWB_No = navData.navigation.getParam("awbNo");
  return {
    headerTitle: AWB_No,
  };
};

export default ImageDetailScreen;
