import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ImageBackground } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Firebase from "../config/firebase";
// import ProfilePic from "../assets/profile-image.png";
import Card from "./Views/Card";
import { formatPhone } from "../utils/formatPhone";
const auth = Firebase.auth();
const Profile = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://trishuliriversideresort.com/wp-content/uploads/2020/01/no-profile-picture.jpg"
  );
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const handleImageError = (e) => {
    setError(e.nativeEvent.error);
  };

  useEffect(() => {
    // Fetch profile name,nickname, email, address, image, phone number here.
    const users = Firebase.database().ref("users/" + auth.currentUser.uid);
    if (users) {
      users.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setImageUrl(
            data.profile_picture && !error
              ? data.profile_picture
              : "https://trishuliriversideresort.com/wp-content/uploads/2020/01/no-profile-picture.jpg"
          );
          setUsername(data.displayName);
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setEmail(data.email);
          setPhone(formatPhone(data.phone));
          setAddress(data.address);
        }
      });
    }
  }, []);
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",

            marginVertical: "10%",
          }}
        >
          <ImageBackground
            source={{ uri: imageUrl }}
            style={{ height: 160, width: 160 }}
            imageStyle={{ borderRadius: 100 }}
            onError={handleImageError}
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
            {email ? <FontAwesome5 name="envelope" size={24} /> : null}
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
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
            {phone ? <FontAwesome5 name="phone" size={24} /> : null}
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              {phone}
            </Text>
          </View>
          {address.street ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 10,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={24} />

              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
              >
                {address.street}
              </Text>
            </View>
          ) : null}
          {address.city && address.state ? (
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 39 }}>
              {address.city} {address.state}, {address.zipCode}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
