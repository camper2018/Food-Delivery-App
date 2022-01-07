import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import Firebase from "../config/firebase";
import ProfilePic from "../assets/profile-image.png";
import Card from "./Views/Card";
import { formatPhone } from "../utils/formatPhone";
const auth = Firebase.auth();
const Profile = () => {
  // const [imageUrl, setImageUrl] = useState(ProfilePic);
  const [imageUrl, setImageUrl] = useState(
    "https://trishuliriversideresort.com/wp-content/uploads/2020/01/no-profile-picture.jpg"
  );
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch profile name,nickname, email, address, image, phone number here.
    const users = Firebase.database().ref("users/" + auth.currentUser.uid);
    if (users) {
      users.on("value", (snapshot) => {
        const data = snapshot.val();
        setImageUrl(data.profile_picture);
        setUsername(data.displayName);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setPhone(formatPhone(data.phone));
        setAddress(data.address);
      });
    }
  }, []);
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <Card
          style={{
            borderRadius: 25,
            width: "80%",
            padding: 35,
            margin: 20,
            marginTop: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginBottom: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{ uri: imageUrl }}
              style={{ height: 200, width: 200 }}
              imageStyle={{ borderRadius: 100 }}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            {firstname} {lastname}
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 10,
              }}
            >
              <FontAwesome5 name="envelope" size={20} />
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                {email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 10,
              }}
            >
              <FontAwesome5 name="phone" size={20} />
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                {phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 10,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={20} />
              <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                {address.street}
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", marginLeft: 35 }}>
              {address.city} {address.state}, {address.zipCode}
            </Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
