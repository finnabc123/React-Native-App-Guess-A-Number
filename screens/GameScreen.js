import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';



import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';



const generateRandomNUmber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomNUmber(min, max, exclude);
    } else {
        return rndNum;
    }
}



const GameScreen = props => {

    const initialGuess = generateRandomNUmber(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);


    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
        }

    }, [currentGuess, userChoice, onGameOver]);


    const renderGuessList = (listLength, itemData) => {
        return (
            <View style={styles.listItem}>
                <Text> #{listLength - itemData.index} </Text>
                <Text> {itemData.item} </Text>
            </View >
        );
    }

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;

        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomNUmber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRound => curRound + 1);
        setpastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer> {currentGuess} </NumberContainer>
            <Card>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} title='Lower' onPress={() => nextGuessHandler('lower')} />
                    <Button style={styles.button} title='Greater' onPress={() => nextGuessHandler('greater')} />
                </View>
            </Card>
            <View style={styles.list}>
                {/* <ScrollView>
                    {pastGuesses.map((guess, index) => renderGuessList(guess, pastGuesses.length - index))}
                </ScrollView> */}

                <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderGuessList.bind(this, pastGuesses.length)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: 200,
    },
    button: {
        width: '80%'
    },
    list: {
        flex: 1,
        width: '70%'
    },
    listItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        fontFamily: 'open-sans',
        justifyContent: 'space-between'
    }
});

export default GameScreen;