import React, { useState } from "react";
import { View, Alert, Image } from "react-native";
import { Button } from "native-base";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//components
import Text from "./UI/BodyText";
//constants
import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const loading = useSelector((state) => state.activeJobs.loading1);
  const { onImageTaken, onUploadImage } = props;
  const [pickedImage, setPickedImage] = useState();

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Permission Error",
        "Aplikasi memerlukan izin untuk mengakses kamera & file",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 15 }}>
      <View
        style={{
          width: "100%",
          height: 330,
          marginBottom: 15,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: Colors.primary,
        }}
      >
        {!pickedImage ? (
          <Text>Gambar belum dipilih</Text>
        ) : (
          <Image
            source={{ uri: pickedImage }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </View>
      <Button
        full
        rounded
        style={{
          backgroundColor: Colors.primary,
        }}
        onPress={takeImageHandler}
      >
        <Text style={{ color: "#fff" }}>Ambil Gambar</Text>
      </Button>

      {pickedImage && (
        <Button
          full
          rounded
          style={{
            backgroundColor: "orange",
            marginTop: 15,
          }}
          onPress={onUploadImage}
        >
          <Text style={{ color: "#fff" }}>
            {loading ? "Uploading..." : "Upload Gambar"}
          </Text>
        </Button>
      )}
    </View>
  );
};

export default ImgPicker;
