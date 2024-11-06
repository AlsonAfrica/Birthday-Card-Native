import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Add image picker
import Note from './note';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noteArray: [],
            noteText: '',
            birthdayMonth: '',
            wish: '',
            goals: '',
            imageUri: null, // Store selected image URI
            noteColor: '#FFFFFF', // Default color for note
        }
    }

    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return (
                <Note
                    key={key}
                    keyval={key}
                    val={val}
                    deleteMethod={() => this.deleteNote(key)}
                    changeColorMethod={() => this.changeNoteColor(key)}
                />
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Birthday Card</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                {/* Note Input Fields */}
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({ noteText })}
                        value={this.state.noteText}
                        placeholder='Name and Surname'
                        placeholderTextColor='#B0B0B0'
                    />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(birthdayMonth) => this.setState({ birthdayMonth })}
                        value={this.state.birthdayMonth}
                        placeholder='Birthday Month'
                        placeholderTextColor='#B0B0B0'
                    />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(wish) => this.setState({ wish })}
                        value={this.state.wish}
                        placeholder='What is your wish?'
                        placeholderTextColor='#B0B0B0'
                    />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(goals) => this.setState({ goals })}
                        value={this.state.goals}
                        placeholder='Your Goals'
                        placeholderTextColor='#B0B0B0'
                    />
                </View>

                <TouchableOpacity onPress={this.addTask.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Task</Text>
                </TouchableOpacity>

                {/* Add button to pick an image */}
                <TouchableOpacity onPress={this.selectImage.bind(this)} style={styles.addImageButton}>
                    <Text style={styles.addButtonText}>Pick Image</Text>
                </TouchableOpacity>

                {/* Display selected image */}
                {this.state.imageUri && <Image source={{ uri: this.state.imageUri }} style={styles.imagePreview} />}
            </View>
        );
    }

    addTask() {
        if (this.state.noteText) {
            var date = new Date();
            this.state.noteArray.push({
                'date': date.getFullYear() +
                    '/' + (date.getMonth() + 1) +
                    '/' + date.getDate(),
                'note': this.state.noteText,
                'birthdayMonth': this.state.birthdayMonth,
                'wish': this.state.wish,
                'goals': this.state.goals,
                'image': this.state.imageUri,
                'color': this.state.noteColor // Save the selected color for each note
            });

            this.setState({ noteArray: this.state.noteArray });
            this.setState({ noteText: '', birthdayMonth: '', wish: '', goals: '', imageUri: null }); // Reset the input fields
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({ noteArray: this.state.noteArray });
    }

    selectImage() {
        launchImageLibrary({}, (response) => {
            if (!response.didCancel) {
                this.setState({ imageUri: response.assets[0].uri });
            }
        });
    }

    // Change color of the selected note
    changeNoteColor(key) {
        const newNoteArray = [...this.state.noteArray];
        newNoteArray[key].color = '#FFD700'; // Change the color to gold as an example
        this.setState({ noteArray: newNoteArray });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#4A90E2',
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    scrollContainer: {
        marginBottom: 100,
        marginTop: 20,
    },
    footer: {
        padding: 20,
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    addButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 15,
        alignItems: 'center',
        marginHorizontal: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addImageButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 15,
        alignItems: 'center',
        marginHorizontal: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    imagePreview: {
        width: 150,
        height: 150,
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
});
