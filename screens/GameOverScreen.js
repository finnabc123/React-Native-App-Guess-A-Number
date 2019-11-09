import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text tyle={styles.text}> The Game is Over! </Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    fadeDuration={1000}
                    source={require('../assets/success.png')}
                    // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Summit_of_the_Matterhorn.jpg' }}
                    resizeMode='cover' />
            </View>
            <Text tyle={styles.text}> Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}.</Text>  </Text>
            <Text tyle={styles.text}> Thanks for Playing.</Text>
            <View style={styles.buttonContainer}>
                <Button title='New Game' onPress={props.onRestart} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontFamily: 'open-sans',
        paddingBottom: 10
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'green',
        overflow: 'hidden',
        marginVertical: 21
    },
    image: {
        width: '100%',
        height: '100%',

    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: 'orange',
        fontSize: 14,
        fontWeight: '700'
    }
})

export default GameOverScreen;