import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import langs from "../lang/langs";
import langDB from "../lang/langDB.json";

const titles = ["Папір", "Скло", "Органіка", "Пластик", "Електроніка", "Метал"];

class Select extends Component {
  state = {
    selectedItems: [],
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    let currentItems = [];
    selectedItems.map((item) => {
      currentItems.push({
        categoryId: parseInt(item),
      });
    });
    this.props.setCategories(currentItems);
  };

  render() {
    const items = [
      {
        id: "1",
        name: this.props.lang == "en" ? langDB.Папір.title : "Папір",
      },
      {
        id: "2",
        name: this.props.lang == "en" ? langDB.Скло.title : "Скло",
      },
      {
        id: "3",
        name: this.props.lang == "en" ? langDB.Органіка.title : "Органіка",
      },
      {
        id: "4",
        name: this.props.lang == "en" ? langDB.Пластик.title : "Пластик",
      },
      {
        id: "5",
        name:
          this.props.lang == "en" ? langDB.Електроніка.title : "Електроніка",
      },
      {
        id: "6",
        name: this.props.lang == "en" ? langDB.Метал.title : "Метал",
      },
    ];
    const { selectedItems } = this.state;

    return (
      <View style={{ marginTop: 20, width: "60%" }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect = component;
          }}
          styleInputGroup={{ backgroundColor: "#fafafa" }}
          styleDropdownMenuSubsection={{
            borderRadius: 6,
          }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText={langs[this.props.lang].chooseWasteType}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedText={langs[this.props.lang].chosen}
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          textInputProps={{ editable: false }}
          searchInputPlaceholderText=""
          searchIcon={false}
          submitButtonColor="#CCC"
          submitButtonText={langs[this.props.lang].accept}
        />
        <View style={styles.selectedCategories}>
          {this.state.selectedItems.map((item) => {
            return (
              <View key={item} style={styles.selectedCategory}>
                <Text>
                  {this.props.lang == "en"
                    ? langDB[titles[item - 1]].title
                    : titles[item - 1]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedCategories: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedCategory: {
    alignSelf: "flex-start",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 6,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default Select;
