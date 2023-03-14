import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllUserDetails,
  setUserDetails,
} from "../../store/auth/auth-reducer";

const HomeScreen = () => {
  //
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      fetch(`https://dummyjson.com/users/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setAllUserDetails({ user: data }));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert("An error occurred. Please try again later.");
        });
    }
  }, [dispatch, user.id]);

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Text style={{ textAlign: "center", marginRight:12 }}>
          Welcome {user.firstName} {user.lastName}
        </Text>
        <Image
          source={{ uri:  user.image ?? null }}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <Text style={{ textAlign: "center" }}>
        Your profile details is as below:
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.profileDetails}>
          <Text style={styles.text}>Age: {user.age}</Text>
          <Text style={styles.text}>Gender: {user.gender}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Phone: {user.phone} </Text>
          <Text style={styles.text}>Birth Date: {user.birthDate} </Text>
          <Text style={styles.text}>Blood Group: {user.bloodGroup} </Text>
          <Text style={styles.text}>Height: {user.height}</Text>
          <Text style={styles.text}>Weight: {user.weight} </Text>
          <Text style={styles.text}>Eye Color: {user.eyeColor}</Text>
        </View>
      )}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  profileDetails: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  text: {
    textAlign: "center",
  },
  imageRow: {
   
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  }
});
