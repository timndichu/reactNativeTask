
import { StyleSheet, Text, View } from "react-native";
import { DataTable, FAB } from "react-native-paper";
import { useSelector } from "react-redux";

import * as RootNavigation from "../../RootNavigation";

// const optionsPerPage = [2, 3, 4];
const StaffScreen = () => {
  // const [page, setPage] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  // useEffect(() => {
  //   setPage(0);
  // }, [itemsPerPage]);

  const allStaff = useSelector((state) => state.staff.allStaff);

  return (
    <View style={styles.container}>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title >Staff No.</DataTable.Title>
        <DataTable.Title >Name</DataTable.Title>
        <DataTable.Title >Email</DataTable.Title>
        <DataTable.Title >Department</DataTable.Title>
        <DataTable.Title numeric>Salary</DataTable.Title>
      </DataTable.Header>

        {allStaff.length>0 ?  allStaff.map((staff) => (
        <DataTable.Row key={staff.staffNumber} onPress={()=>  RootNavigation.navigate("EditStaff", {
          staffNumber: staff.staffNumber,
          name: staff.name,
          email: staff.email,
          department: staff.department,
          salary: staff.salary,
        })}>
          <DataTable.Cell>{staff.staffNumber}</DataTable.Cell>
          <DataTable.Cell>{staff.name}</DataTable.Cell>
          <DataTable.Cell>{staff.email}</DataTable.Cell>
          <DataTable.Cell>{staff.department}</DataTable.Cell>
          <DataTable.Cell numeric>{staff.salary}</DataTable.Cell>
        </DataTable.Row>
      )): <Text style={{textAlign: "center",padding:10, fontSize: 18}}>No Staff Yet</Text>

      
      }

  

    

      {/* <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={"Rows per page"}
      /> */}
    </DataTable>
    <FAB
    style={styles.fab}
    small
    icon="plus"
    onPress={() => RootNavigation.navigate("AddStaff")}
  />

  </View>
  );
};
export default StaffScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
