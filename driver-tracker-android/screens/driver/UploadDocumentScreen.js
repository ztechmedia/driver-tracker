import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import { Container, Content } from "native-base";
import { uploadPhoto } from "../../store/actions/active-jobs";
//components
import ImagePicker from "../../components/ImagePicker";

const UploadDocumentScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();

  const imageTakenHandler = (imgPath) => {
    setSelectedImage(imgPath);
  };

  const uploadImageHandler = useCallback(() => {
    const awbId = navigation.getParam("awbId");
    const position = navigation.getParam("position");
    dispatch(uploadPhoto(awbId, selectedImage, position));
  }, [selectedImage]);

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
