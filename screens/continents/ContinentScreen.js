import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, DataTable, FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import axios, { isCancel, AxiosError } from "axios";
import xml2js from "xml2js";

const ContinentScreen = () => {
  const allStaff = useSelector((state) => state.staff.allStaff);
  const wsdl =
    "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL";

  const [continents, setContinents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let xmls =
      '<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
                          <soap12:Body>\
                            <ListOfContinentsByName xmlns="http://www.oorsprong.org/websamples.countryinfo">\
                            </ListOfContinentsByName>\
                            </soap12:Body>\
                            </soap12:Envelope>';
    setLoading(true);

    axios
      .post(wsdl, xmls, { headers: { "Content-Type": "text/xml" } })
      .then((res) => {
        const parser = new xml2js.Parser();

        parser.parseString(res.data, function (error, result) {
          if (error) {
            loading(false);
            throw new Error(error);
          }

          let soapBody = JSON.stringify(
            result["soap:Envelope"]["soap:Body"][0][
              "m:ListOfContinentsByNameResponse"
            ][0]["m:ListOfContinentsByNameResult"][0]["m:tContinent"]
          );

          let parsedContinents = JSON.parse(soapBody);

          let listOfContinents = parsedContinents.map((continent) => {
            return {
              name: continent["m:sName"][0],
              code: continent["m:sCode"][0],
            };
          });
          setContinents(listOfContinents);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Code</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>
        {loading ? (
          <ActivityIndicator style={{
            marginTop: 20,
          }} size={"large"} />
        ) : continents.length > 0 ? (
          continents.map((continent) => (
            <DataTable.Row key={continent.code}>
              <DataTable.Cell>{continent.code}</DataTable.Cell>
              <DataTable.Cell>{continent.name}</DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Text style={{ textAlign: "center", padding: 10, fontSize: 18 }}>
            No Continents Added Yet
          </Text>
        )}
      </DataTable>
    </View>
  );
};
export default ContinentScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
