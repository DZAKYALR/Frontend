import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Header from "../components/Header";
import Flipcard from "../components/FlipCard";

import { StyleSheet, View, Dimensions, Modal, Text, Image } from "react-native";
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import Swipes from "../components/Swipes";
import { useDispatch, useSelector } from "react-redux";
import { fetchingCardBySetCardId } from "../store/actions/cardAction";
import { getAccess } from "../helpers/AsyncStorage";
// const windowHeight = Dimensions.get("window").height;
// const windowWidth = Dimensions.get("window").width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Flip({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  const access_token = useSelector((state) => state.user.access_token);
  const data = useSelector((state) => state.card.cards);
  const isLoading = useSelector((state) => state.card.loading);
  const [cards, setCards] = useState(data);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    console.log(modalVisible);
    setModalVisible(true)
  }, [])

  useEffect(() => {
    setCards(data)
  }, [data])

  useEffect(() => {
    if (id) {
      dispatch(fetchingCardBySetCardId(id, access_token));
    }
  },[id]);

  function handleSwipeRight() {
    console.log("right");
    nextCard();
  }
  function handleSwipeLeft() {
    console.log("left");
    nextCard();
  }
  const handleCloseModal = () => {
    console.log(modalVisible)
    setModalVisible(!modalVisible)
  }
  function nextCard() {
    const nextIndex = cards.length - 2 === currentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }

  if (isLoading) {
    return (
        // <View style={[styles.container, { backgroundColor: '#191F26' }]}>
        <>
        <Header navigation={navigation}></Header>
        <View style={styles.loadingContainer}>
          <Image source={require("../../assets/loading.gif")}/>
        </View>
      <Appbar navigation={navigation}></Appbar>
    </>
    )
}
  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.container}>

        <View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.modalTextTitle}>How to Use Flipcard: </Text>
                <Text style={styles.modalText}>Swipe Left to review the card later and Swipe Right when you're finished</Text>

                <View onPress={handleCloseModal}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}>
                        <Text
                        onPress={handleCloseModal}
                        style={styles.textStyle}>OK !</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.swipes}>
          {cards.length > 1 &&
            cards.map((u, i) =>
                currentIndex === i && (
                  <Swipes
                  key={i}
                  currentIndex={currentIndex}
                  cards={cards}
                  card={cards[currentIndex]}
                  handleSwipeRight={handleSwipeRight}
                  handleSwipeLeft={handleSwipeLeft}
                  navigation={navigation}></Swipes>
                )
            )
          }
        </View>
      </View>
      <Appbar navigation={navigation}></Appbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    height: hp("100%"),
    justifyContent: 'center',
    marginBottom: hp("9%")
  },
  loadingContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  swipes: {
    backgroundColor: "#fff",
    height: hp("90%"),
    width: wp("100%"),
    justifyContent: 'center',
    alignContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: wp("5%"),
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    height: 40,
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: wp("30%"),
  },
  modalTextTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});