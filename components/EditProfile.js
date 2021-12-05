import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  Input,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import KeyboardAvoidingWrapper from "./Views/KeyboardAvoidingWrapper";
import * as ImagePicker from "expo-image-picker";

import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { Camera } from "expo-camera";
import * as firebase from "firebase";
import { AuthenticatedUserContext } from "../Navigation/AuthenticatedUserProvider";
import Firebase from "../config/firebase";
const auth = Firebase.auth();

const EditProfile = ({ navigation, route }) => {
  console.log(auth.currentUser);

  const [image, setImage] = useState(
    "https://trishuliriversideresort.com/wp-content/uploads/2020/01/no-profile-picture.jpg"
  );
  const [firstname, setFirstname] = useState("John");
  const [lastname, setLastname] = useState("Doe");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(
    auth.currentUser ? auth.currentUser.email : ""
  );
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [phoneNumber, setPhoneNumber] = useState();

  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { colors } = useTheme();
  const bs = useRef();
  const cameraRef = useRef(null);
  const fall = new Animated.Value(1);
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const writeUserData = (
    userId,
    username,
    firstname,
    lastname,
    imageUrl,
    phone,
    address,
    email
  ) => {
    Firebase.database()
      .ref("users/" + userId)
      .set({
        displayName: username,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        profile_picture: imageUrl,
        address: address,
        created_at: Date.now(),
      });
  };
  useEffect(() => {
    // fetch profile here to display as default value in edit form
    const users = Firebase.database().ref("users/" + auth.currentUser.uid);
    users.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("data: ******* ", data);
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setUsername(data.displayName);
      setImage(data.profile_picture);
      setPhoneNumber(data.phone);
      setEmail(data.email);
      setAddress(data.address);
    });
    console.log("users:", users);
  }, []);

  const takePhotoFromCamera = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowEditing: true,
          aspect: [4, 3],
          quality: 1,
          cropping: true,
        });
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const choosePhotoFromLibrary = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);

    bs.current.snapTo(1);
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => setShowCamera(true)}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const handleSubmitProfile = () => {
    // auth.currentUser
    //   .updateProfile({
    //     displayName: firstname + " " + lastname,
    //     photoURL: image,
    //   })

    //   .catch(function (error) {
    //     console.error(error);
    //   });

    writeUserData(
      auth.currentUser.uid,
      firstname,
      firstname,
      lastname,
      image,
      phoneNumber,
      address,
      email
    );
    navigation.navigate("Profile");
  };
  if (showCamera) {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const result = await takePhotoFromCamera();
                if (!result.cancelled) {
                  setImage(result.uri);
                }
                setShowCamera(false);
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowCamera(false);
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{ uri: image }}
                  style={{ height: 120, width: 120 }}
                  imageStyle={{ borderRadius: 100 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: 4,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      size={30}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>
              {`${firstname} ${lastname}`}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user" color={colors.text} size={20} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={firstname}
              onChangeText={setFirstname}
            />
            <FontAwesome name="user" color={colors.text} size={20} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={lastname}
              onChangeText={setLastname}
            />
          </View>
          {/* <View style={styles.action}>
              <FontAwesome name="user" color={colors.text} size={20} />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View> */}
          <View style={styles.action}>
            <FontAwesome name="phone" color={colors.text} size={25} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope" color={colors.text} size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.action}>
            {/* <MaterialCommunityIcons
              name="map-marker"
              color={colors.text}
              size={20}
            /> */}
            <FontAwesome5 name="map-marker-alt" color={colors.text} size={20} />
            <TextInput
              placeholder="Street Address"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={address.street}
              onChangeText={(val) => setAddress({ ...address, street: val })}
            />
          </View>
          <View style={styles.action}>
            {/* <FontAwesome5 name="map-marker-alt" color={colors.text} size={20} /> */}
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                  marginLeft: 23,
                },
              ]}
              value={address.city}
              onChangeText={(val) => setAddress({ ...address, city: val })}
            />
            <TextInput
              placeholder="State"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={address.state}
              onChangeText={(val) => setAddress({ ...address, state: val })}
            />
            <TextInput
              placeholder="ZIP Code"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              onBlur={Keyboard.dismiss}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              value={address.zipCode}
              onChangeText={(val) => setAddress({ ...address, zipCode: val })}
            />
          </View>

          <TouchableOpacity
            style={styles.commandButton}
            onPress={handleSubmitProfile}
          >
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    margin: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "grey",
    // paddingBottom: 2,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    // paddingLeft: 10,
    // marginLeft: 10,
    marginHorizontal: 10,
    color: "#05375a",
    borderBottomWidth: 1,
    // marginHorizontal: 2,
    borderBottomColor: "grey",
    paddingBottom: 2,
  },
  // styles related to camera
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 30,
    paddingBottom: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default EditProfile;
