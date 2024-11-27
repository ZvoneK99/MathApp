import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function Igrica() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputSum, setInputSum] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isRestartVisible, setIsRestartVisible] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  // Funkcija za generiranje brojeva
  const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 10) {
      const newNumber = Math.floor(Math.random() * 9) + 1;
      if (numbers.length === 0 || newNumber !== numbers[numbers.length - 1]) {
        numbers.push(newNumber);
      }
    }
    return numbers;
  };

  // Funkcija za pokretanje igre
  const startGame = () => {
    setIsGameStarted(true);
    setRandomNumbers(generateRandomNumbers());
    setDisplayedNumber(null);
    setCurrentIndex(0);
    setInputSum("");
    setResultMessage("");
    setIsInputVisible(false);
    setIsRestartVisible(false);
    setIsSubmitDisabled(false); // Resetiraj stanje za ponovni unos
  };

  // Prikazivanje brojeva jedan po jedan svakih 800ms
  useEffect(() => {
    if (isGameStarted && currentIndex < randomNumbers.length) {
      const timeout = setTimeout(() => {
        setDisplayedNumber(randomNumbers[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 800);

      return () => clearTimeout(timeout);
    } else if (isGameStarted && currentIndex === randomNumbers.length) {
      // Prikaz zadnjeg broja prije prelaska na input
      const timeout = setTimeout(() => {
        setDisplayedNumber(null);
        setIsInputVisible(true); // Prikazivanje inputa nakon svih brojeva
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, randomNumbers, isGameStarted]);

  // Funkcija za provjeru unosa
  const handleSubmit = () => {
    const userSum = parseInt(inputSum);
    const correctSum = randomNumbers.reduce((acc, num) => acc + num, 0);

    if (userSum === correctSum) {
      setResultMessage("To ika! Svaka ćast! 🎉");
    } else {
      setResultMessage(`Ne valja. Radi opet! ${correctSum}.`);
    }
    setIsSubmitDisabled(true); // Onemogući ponovni unos
    setIsRestartVisible(true); // Prikaz gumb "Započni ponovno" nakon provjere
  };

  // Funkcija za ponovno pokretanje
  const restartGame = () => {
    setIsGameStarted(false);
    setDisplayedNumber(null);
    setRandomNumbers([]);
    setCurrentIndex(0);
    setInputSum("");
    setResultMessage("");
    setIsInputVisible(false);
    setIsRestartVisible(false);
    setIsSubmitDisabled(false); // Resetiraj stanje za ponovni unos
  };

  return (
    <View style={styles.container}>
      {!isGameStarted && !isRestartVisible && (
        <Button title="POČETAK" onPress={startGame} />
      )}

      {isGameStarted && displayedNumber !== null && (
        <Text style={styles.number}>{displayedNumber}</Text>
      )}

      {isInputVisible && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Unesite zbroj"
            value={inputSum}
            onChangeText={setInputSum}
            editable={!isSubmitDisabled} // Onemogući unos nakon prve provjere
          />
          <Button
            title="Provjeri"
            onPress={handleSubmit}
            disabled={isSubmitDisabled} // Onemogući gumb nakon prve provjere
          />
        </View>
      )}

      {resultMessage ? <Text style={styles.resultMessage}>{resultMessage}</Text> : null}

      {isRestartVisible && (
        <Button title="Započni ponovno" onPress={restartGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  number: {
    fontSize: 40,
    color: "darkblue",
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  resultMessage: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});
