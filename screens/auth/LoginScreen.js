import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import * as RootNavigation from "../../RootNavigation";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/auth/auth-reducer";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!passwordError && !usernameError) {
      setLoading(true);
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          // expiresInMins: 60, // optional
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
        
          setLoading(false);
          if (!data.token) {
            alert(`${data.message}.\nPlease check your username and password and try again. `);
          } else {
            dispatch(setUserDetails({user: data}));
            RootNavigation.replace("Landing");
          }
        }).catch((err) => {
          setLoading(false);
          console.log(err);
          alert("An error occurred. Please try again later.");
        });
    }
  };

  const handleUsernameBlur = () => {
    if (username.length === 0) {
      setUsernameErrMsg("Username is required");
      setUsernameError(true);
    }
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      setPasswordErrMsg("Password is required");
      setPasswordError(true);
    }
  };

  const handleChangeUsername = (text) => {
    setUsername(text);
    setUsernameError(false);
  };

  const handleChangePassword = (text) => {
    setPassword(text);
    setPasswordError(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.form}>
        <Text style={styles.formTitle}>Login</Text>
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => handleChangeUsername(text)}
          onBlur={handleUsernameBlur}
          error={usernameError}
        />
        {usernameError && (
          <HelperText type="error" visible={usernameError}>
            {usernameErrMsg}
          </HelperText>
        )}
        <TextInput
          label="Password"
          value={password}
          onChangeText={(password) => handleChangePassword(password)}
          onBlur={handlePasswordBlur}
          error={passwordError}
        />
        {passwordError && (
          <HelperText type="error" visible={passwordError}>
            {passwordErrMsg}
          </HelperText>
        )}
        {isLoading ? (
          <ActivityIndicator size={"large"} animating={true} />
        ) : (
          <Button mode="contained" onPress={handleLogin}>
            Login
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

LoginScreen.propTypes = {
  children: PropTypes.any,
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    flexGrow: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    gap: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
