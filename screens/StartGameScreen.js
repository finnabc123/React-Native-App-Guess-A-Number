import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableNativeFeedback, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Color from '../constants/colorTheme';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';



const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const cooseNumber = parseInt(enteredValue);
        if (isNaN(cooseNumber) || cooseNumber <= 0 || cooseNumber > 99) {
            Alert.alert('Invalid NUmber!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return
        }
        setConfirmed(true);
        setSelectedNumber(cooseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let consfirmedOutput;

    if (confirmed) {
        consfirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Selected Number</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='Start Game' onPress={() => props.onStartGame(selectedNumber)} />
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.screenTitle}>Start New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.text}>Select a Number</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title='Reset' onPress={() => { resetInputHandler() }} color={Color.accent} /></View>
                        <View style={styles.button}><Button title='Confirm' onPress={() => { confirmInputHandler() }} color={Color.primary} /></View>
                    </View>
                </Card>
                {consfirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 18,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    button: {
        width: 90
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 15,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen;