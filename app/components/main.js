import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
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
            imageUri: null,
            decorationUri: null,
            noteColor: '#FFFFFF',
            fontSize: 16,
            fontColor: '#333333',
            fontStyle: 'normal',
            fontWeight: 'normal',
        };
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
                    fontSize={this.state.fontSize}
                    fontColor={this.state.fontColor}
                    fontWeight={this.state.fontWeight}
                    fontStyle={this.state.fontStyle}
                    editMethod={(field, text) => this.updateNoteText(key, field, text)}
                    toggleEditMode={() => this.toggleEditMode(key)}  // Pass toggleEditMode to each Note
                />
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Birthday Card Notes</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

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
                    <Text style={styles.addButtonText}>Add Birthday</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.selectImage.bind(this)} style={styles.addImageButton}>
                    <Text style={styles.addButtonText}>Pick Image</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.selectDecoration.bind(this)} style={styles.addDecorationButton}>
                    <Text style={styles.addButtonText}>Pick Decoration</Text>
                </TouchableOpacity>

                {this.state.imageUri && <Image source={{ uri: this.state.imageUri }} style={styles.imagePreview} />}
                {this.state.decorationUri && <Image source={{ uri: this.state.decorationUri }} style={styles.decorationPreview} />}
                
                <View style={styles.formattingContainer}>
                    {/* <Text>Font Size:</Text>
                    <TouchableOpacity onPress={() => this.setState({ fontSize: this.state.fontSize + 2 })}>
                        <Text style={styles.button}>A+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ fontSize: this.state.fontSize - 2 })}>
                        <Text style={styles.button}>A-</Text>
                    </TouchableOpacity> */}

                    <Text>Font Color:</Text>
                    <TouchableOpacity onPress={() => this.setState({ fontColor: '#FF6347' })}>
                        <Text style={[styles.button, { color: '#FF6347' }]}>Red</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ fontColor: '#4A90E2' })}>
                        <Text style={[styles.button, { color: '#4A90E2' }]}>Blue</Text>
                    </TouchableOpacity>

                    <Text>Style:</Text>
                    <TouchableOpacity onPress={() => this.setState({ fontWeight: this.state.fontWeight === 'bold' ? 'normal' : 'bold' })}>
                        <Text style={[styles.button, { fontWeight: 'bold' }]}>Bold</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ fontStyle: this.state.fontStyle === 'italic' ? 'normal' : 'italic' })}>
                        <Text style={[styles.button, { fontStyle: 'italic' }]}>Italic</Text>
                    </TouchableOpacity>
                </View>
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
                'decoration': this.state.decorationUri,
                'color': this.state.noteColor,
                'isEditing': false,  // Initially, notes are not in editing mode
            });

            this.setState({ noteArray: this.state.noteArray });
            this.setState({ noteText: '', birthdayMonth: '', wish: '', goals: '', imageUri: null, decorationUri: null });
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key, 1);
        this.setState({ noteArray: this.state.noteArray });
    }

    // Function for image selection in the gallery 
    selectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            this.setState({ imageUri: result.uri });
        }
    };
    
    selectDecoration = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            this.setState({ decorationUri: result.uri });
        }
    };

    toggleEditMode(key) {
        const newNotes = [...this.state.noteArray];
        newNotes[key].isEditing = !newNotes[key].isEditing;  // Toggle the isEditing property
        this.setState({ noteArray: newNotes });
    }

    updateNoteText(key, field, text) {
        const updatedNotes = [...this.state.noteArray];
        updatedNotes[key][field] = text; // Update the specific field in the note
        this.setState({ noteArray: updatedNotes });
    }

    changeNoteColor(key) {
        const newNoteArray = [...this.state.noteArray];
        newNoteArray[key].color = '#FFD700'; // Update the note color
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
        shadowRadius: 5,
    },
    addButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        margin: 10,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    addImageButton: {
        backgroundColor: '#4A90E2',
        padding: 15,
        borderRadius: 10,
        margin: 10,
    },
    addDecorationButton: {
        backgroundColor: '#FF9F00',
        padding: 15,
        borderRadius: 10,
        margin: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    decorationPreview: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    formattingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        color: '#4A90E2',
        fontSize: 18,
        padding: 5,
        margin: 5,
    },
});
