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
      name: "Cupcake",
      calories: 356,
      fat: 16,
      price: 100,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
      price: 100,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
      price: 100,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
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
      text: "white",
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
          style={{ borderBottomColor: "white", borderBottomWidth: 1 }}
        >
          <DataTable.Title
            textStyle={{
              color: Colors.GOLD,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
          >
            Date
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              color: Colors.GOLD,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
            numeric
          >
            User
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              color: Colors.GOLD,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
            numeric
          >
            Item
          </DataTable.Title>
          <DataTable.Title
            textStyle={{
              color: Colors.GOLD,
              fontFamily: "outfit-bold",
              fontSize: 16,
            }}
            numeric
          >
            Price
          </DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row
            key={item.key}
            style={{
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
            //   borderRadius: 10,
            }}
          >
            <DataTable.Cell textStyle={{ color: "#fff" }}>
              {item.name}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{ color: "#fff" }} numeric>
              {item.calories}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{ color: "#fff" }} numeric>
              {item.fat}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{ color: "#fff" }} numeric>
              {item.price}
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
    color: "white",
  },
});

export default BarterProductList;
