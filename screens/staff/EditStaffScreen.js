import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import PropTypes from "prop-types";
import { deleteStaff, editStaff } from "../../store/staff/staff-reducer";
import * as RootNavigation from "../../RootNavigation";
import { sendEmail } from "../../utils/sendEmail";

const EditStaffScreen = (props) => {
  const [isLoading, setLoading] = useState(false);

  const defaultStaffNumber = props.route.params.staffNumber;
  const defaultName = props.route.params.name;
  const defaultEmail = props.route.params.email;
  const defaultDepartment = props.route.params.department;
  const defaultSalary = props.route.params.salary;

  console.log(defaultStaffNumber);
  console.log(defaultEmail);
  console.log(defaultName);
  console.log(defaultDepartment);
  console.log(defaultSalary);

  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearInputHandler: clearName,
  } = useInput((val) => val.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearInputHandler: clearEmail,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredDepartment,
    hasError: departmentInputHasError,
    valueChangeHandler: departmentChangeHandler,
    inputBlurHandler: departmentBlurHandler,
    clearInputHandler: clearDepartment,
  } = useInput((val) => val.trim() !== "");

  const {
    value: enteredSalary,
    hasError: salaryInputHasError,
    valueChangeHandler: salaryChangeHandler,
    inputBlurHandler: salaryBlurHandler,
    clearInputHandler: clearSalary,
  } = useInput((val) => val.trim() !== "");



  const dispatch = useDispatch();

  let formIsValid = false;

  if (
    !nameInputHasError &&
    !emailInputHasError &&
    !departmentInputHasError &&
    !salaryInputHasError

  ) {
    formIsValid = true;
  }

  let staff = {
    staffNumber: defaultStaffNumber,
    name: enteredName.length === 0 ? defaultName : enteredName,
    email: enteredEmail.length === 0 ? defaultEmail : enteredEmail,
    department: enteredDepartment.length === 0 ? defaultDepartment : enteredDepartment,
    salary: enteredSalary.length === 0 ? defaultSalary : enteredSalary,
  };

  if (
    staff.staffNumber.length === 0 ||
    staff.name.length === 0 ||
    staff.email.length === 0 ||
    staff.department.length === 0 ||
    staff.salary.length === 0
  ) {
    formIsValid = false;
  }

  const handleSubmit = () => {
    if (
      nameInputHasError ||
      emailInputHasError ||
      departmentInputHasError ||
      salaryInputHasError 
    ) {
      return;
    }
  
    console.log(staff);
    dispatch(editStaff({ staff: staff }));
    alert("Changes saved successfully!");
    let subject = "Profile Notification #Edited";
    let body = `Greeting ${staff.name}, we are glad to inform you that your staff profile has been updated.`;
    sendEmail(staff.email, subject, body);
 
  };

  const handleDelete = () => {
    Alert.alert(
        "DELETE STAFF",
        "Are you sure you want to delete this staff member? \nThis action cannot be undone",
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
          {
            text: "OK",
            onPress: () => {
              let subject = "Profile Notification #Deleted";
              let body = `Greeting ${staff.name}, we are sad to inform you that your staff profile has been deleted.`;
              sendEmail(staff.email, subject, body);
                console.log(defaultStaffNumber);
                dispatch(deleteStaff({ staffNumber: defaultStaffNumber}));
              RootNavigation.replace("Staff");
           
            },
          },
        ],
        { cancelable: false }
      )
    };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.formTitle}>Edit Staff Details</Text>
      <TextInput
        label="Staff Number"
        disabled={true}
        value={defaultStaffNumber}
        
      />

      <TextInput
        label="Staff Name"
        value={enteredName.length === 0 ? defaultName : enteredName}
        onChangeText={(value) => nameChangeHandler(value)}
        onBlur={nameBlurHandler}
        error={nameInputHasError}
      />
      {nameInputHasError && (
        <HelperText type="error" visible={nameInputHasError}>
          {"Staff Name is required"}
        </HelperText>
      )}

      <TextInput
        label="Staff Email"
        value={enteredEmail.length === 0 ? defaultEmail : enteredEmail}
        onChangeText={(value) => emailChangeHandler(value)}
        onBlur={emailBlurHandler}
        error={emailInputHasError}
      />
      {emailInputHasError && (
        <HelperText type="error" visible={emailInputHasError}>
          {"Please enter a valid email"}
        </HelperText>
      )}

      <TextInput
        label="Department"
        value={
          enteredDepartment.length === 0 ? defaultDepartment : enteredDepartment
        }
        onChangeText={(value) => departmentChangeHandler(value)}
        onBlur={departmentBlurHandler}
        error={departmentInputHasError}
      />
      {departmentInputHasError && (
        <HelperText type="error" visible={departmentInputHasError}>
          {"Department is required"}
        </HelperText>
      )}

      <TextInput
        label="Salary"
        value={enteredSalary.length === 0 ? defaultSalary : enteredSalary}
        onChangeText={(value) => salaryChangeHandler(value)}
        onBlur={salaryBlurHandler}
        error={salaryInputHasError}
        inputMode="numeric"
      />
      {salaryInputHasError && (
        <HelperText type="error" visible={salaryInputHasError}>
          {"Salary is required"}
        </HelperText>
      )}
      {isLoading ? (
        <ActivityIndicator size={"large"} animating={true} />
      ) : (
        <Button mode="contained" onPress={handleSubmit} disabled={!formIsValid}>
          Save Changes
        </Button>
      )}

      <Button mode="contained" buttonColor="red" onPress={handleDelete} >
        Delete Staff
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});

EditStaffScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditStaffScreen;
