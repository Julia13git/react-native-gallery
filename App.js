import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { s } from "./App.style";
import { useState } from "react";

export default function App() {
  const [imageURIList, setImageURIList] = useState([]);
  async function pickImageAsync() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
      alert("Aucune image selectionnée");
    } else {
      // console.log(result.assets[0].uri);
      setImageURIList([...imageURIList, result.assets[0].uri]);
    }
  }
  console.log("***", imageURIList);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={s.title}>My favorite pictures</Text>
        <View style={s.body}>
          <ScrollView>
            {imageURIList.map((imageURI, i) => (
              <Image
                style={{ height: 300, marginVertical: 30, width: "100%" }}
                key={imageURI + 1}
                source={{ uri: imageURI }}
              />
            ))}
          </ScrollView>
        </View>
        <View style={s.footer}>
          <TouchableOpacity style={s.btn} onPress={pickImageAsync}>
            <Text style={s.btnTxt}>Add picture</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
