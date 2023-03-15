import { useState } from "react";
import { StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, HelperText, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/use-input";
import { addStaff } from "../../store/staff/staff-reducer";
import { sendEmail } from "../../utils/sendEmail";

const AddStaffScreen = () => {
    const [isLoading, setLoading] = useState(false);
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

  const {
    value: staffNumber,
    hasError: staffNumberInputHasError,
    valueChangeHandler: staffNumberChangeHandler,
    inputBlurHandler: staffNumberBlurHandler,
    clearInputHandler: clearStaffNumber,
  } = useInput((val) => val.trim() !== "");

  
  const dispatch = useDispatch();

  let formIsValid = false;

  if (!nameInputHasError && !emailInputHasError && !departmentInputHasError && !salaryInputHasError && !staffNumberInputHasError) {
    formIsValid = true;
  }

  if(staffNumber.length === 0 || enteredName.length === 0 || enteredEmail.length === 0 || enteredDepartment.length === 0 || enteredSalary.length === 0) {
    formIsValid = false;
    }

  const handleSubmit = () => {
    if (nameInputHasError || emailInputHasError || departmentInputHasError || salaryInputHasError || staffNumberInputHasError) {
        return;
      }
    const staff = {
        staffNumber: staffNumber,
        name: enteredName,
        email: enteredEmail,
        department: enteredDepartment,
        salary: enteredSalary
    }
    console.log(staff);
    let subject = "Profile Notification #Created";
    let body = `Greeting ${staff.name}, we are glad to inform you that your staff profile has been created.`;
    sendEmail(staff.email, subject, body);
    dispatch(addStaff({staff: staff}))
    alert("Staff Added Successfully!");
    clearDepartment();
    clearEmail();
    clearName();
    clearSalary();
    clearStaffNumber();


  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
          <Text style={styles.formTitle}>Enter Staff Details</Text>
      <TextInput
        label="Staff Number"
        value={staffNumber}
        onChangeText={(value)=> staffNumberChangeHandler(value)}
        onBlur={staffNumberBlurHandler}
        error={staffNumberInputHasError}
      />
      {staffNumberInputHasError && (
        <HelperText type="error" visible={staffNumberInputHasError}>
          {"Staff Number is required"}
        </HelperText>
      )}

      <TextInput
        label="Staff Name"
        value={enteredName}
        onChangeText={(value)=> nameChangeHandler(value)}
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
        value={enteredEmail}
        onChangeText={(value)=> emailChangeHandler(value)}
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
        value={enteredDepartment}
        onChangeText={(value)=> departmentChangeHandler(value)}
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
        value={enteredSalary}
        onChangeText={(value)=> salaryChangeHandler(value)}
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
            Add Staff
          </Button>
        )}
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

export default AddStaffScreen;
