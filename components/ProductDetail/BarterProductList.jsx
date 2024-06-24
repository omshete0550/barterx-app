import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { StyleSheet, View } from "react-native";

const BarterProductList = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = useState([
    {
      key: 1,
      date: "20 Aug 2010",
      user: "ABC",
      item: "Study Table",
      price: 100,
    },
    {
      key: 2,
      date: "09 July 2021",
      user: "Alex",
      item: "Study Table",
      price: 100,
    },
    {
      key: 3,
      date: "Cupcake",
      user: "356",
      item: "Study Table",
      price: 100,
    },
    {
      key: 4,
      date: "Cupcake",
      user: "356",
      item: "Study Table",
      price: 100,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: Colors.white,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <DataTable
        style={{
          borderColor: Colors.GRAY,
          backgroundColor: Colors.GRAY,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <DataTable.Header
          style={{ borderBottomColor: Colors.white, borderBottomWidth: 1 }}
        >
          <DataTable.Title
            textStyle={{
              color: Colors.orange,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
          >
            Date
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              color: Colors.orange,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
            numeric
          >
            User
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              color: Colors.orange,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
            numeric
          >
            Item
          </DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row
            key={item.key}
            style={{
              borderBottomColor: Colors.white,
              borderBottomWidth: 1,
              //   borderRadius: 10,
            }}
          >
            <DataTable.Cell textStyle={{ color: Colors.white }}>
              {item.date}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{ color: Colors.white }} numeric>
              {item.user}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{ color: Colors.white }} numeric>
              {item.item}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <View style={styles.paginationContainer}>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
            style={styles.pagination}
          />
        </View>
      </DataTable>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    backgroundColor: Colors.GRAY,
  },
  pagination: {
    color: Colors.white,
  },
});

export default BarterProductList;
