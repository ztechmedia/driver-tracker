import React, { useState } from "react";
import { View } from "react-native";
import { Container, Content } from "native-base";
//components
import ImagePicker from "../../components/ImagePicker";

const UploadDocumentScreen = (props) => {
  const { navigation } = props;
  const [selectedImage, setSelectedImage] = useState();

  const imageTakenHandler = (imgPath) => {
    selectedImage(imgPath);
  };

  const uploadImageHandler = () => {
    // const awbId = navigation.getParam("awbId");
  };

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <ImagePicker
            onImageTaken={imageTakenHandler}
            onUploadImage={uploadImageHandler}
          />
        </View>
      </Content>
    </Container>
  );
};

UploadDocumentScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Upload Dokumen",
  };
};

export default UploadDocumentScreen;
