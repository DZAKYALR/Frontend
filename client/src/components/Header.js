import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import {goBack} from '@react-navigation/stack'
import { SearchBar } from 'react-native-elements';
import { useDispatch } from "react-redux";
import { findSetCardByTitle } from "../store/actions/setCardAction";
import { useDebouncedEffect } from '../helpers/debounce'
const Header = ({navigation}) => {
  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = React.useState('')
  const [searchBar, setSearchBar] = React.useState(false)
  const _goBack = () => {
    navigation.goBack()
  };

  const _handleSearch = () => setSearchBar(true);
  useDebouncedEffect(() => dispatch(findSetCardByTitle(searchKey)), 500, [searchKey])
  const handleOnSubmit = () => {
    setSearchBar(false);
    dispatch(findSetCardByTitle(searchKey))
  }
  return (
    <>
    {searchBar === false ? (
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
        onPress={_goBack}/>
        <Appbar.Content title="FlipCard">
        </Appbar.Content>
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
    ) : (
      <SearchBar
      onChangeText={text => {setSearchKey(text)}}
      onSubmitEditing={handleOnSubmit}
      inputStyle={{backgroundColor: 'white', paddingLeft: 20, marginLeft: 20, marginRight: 20, height: 20}}
      inputContainerStyle={{backgroundColor: '#444444'}}
      containerStyle={{backgroundColor: '#444444', borderWidth: 0, paddingTop: 22}}
      placeholder="Type Here..."
      value={searchKey}/>
    )}
    </>
  )
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#444444',
  },
});

export default Header;