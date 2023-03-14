import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      token: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      birthDate: "",
      image: "",
      bloodGroup: "",
      height: "",
      weight: "",
      eyeColor: "",
    },
  },
  reducers: {
    setAllUserDetails(state, action) {
      const {
        id,
        username,
        email,
        age,
        firstName,
        lastName,
        gender,
        image,
        phone,
        birthDate,
        bloodGroup,
        height,
        weight,
        eyeColor,
      } = action.payload.user;
      state.user.id = id;
      state.user.username = username;
      state.user.email = email;
      state.user.age = age;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.user.gender = gender;
      state.user.image = image;
      state.user.phone = phone;
      state.user.birthDate = birthDate;
      state.user.bloodGroup = bloodGroup;
      state.user.height = height;
      state.user.weight = weight;
      state.user.eyeColor = eyeColor;
    },

    setUserDetails(state, action) {
      const { id, username, email, token, firstName, lastName, gender, image } =
        action.payload.user;
      state.user.id = id;
      state.user.username = username;
      state.user.email = email;
      state.user.token = token;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.user.gender = gender;
      state.user.image = image;
    },

    signOut(state) {
      state.user.id = '';
      state.user.username = '';
      state.user.email = '';
      state.user.age = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.gender = '';
      state.user.image = '';
      state.user.phone = '';
      state.user.birthDate = '';
      state.user.bloodGroup = '';
      state.user.height = '';
      state.user.weight = '';
      state.user.eyeColor = '';
    },
  },
});

export const { setUserDetails, setAllUserDetails, signOut } = authSlice.actions;
export default authSlice.reducer;
