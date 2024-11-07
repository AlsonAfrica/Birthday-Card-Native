import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

export default class Note extends React.Component {
    render() {
        return (
            <View key={this.props.keyval} style={[styles.note, { backgroundColor: this.props.val.color }]}>
                <Text style={styles.noteDate}>{this.props.val.date}</Text>

                {/* Edit Mode: Show TextInput fields when editing */}
                {this.props.val.isEditing ? (
                    <View>
                        <TextInput
                            style={[styles.noteText, { fontSize: this.props.fontSize, fontWeight: this.props.fontWeight, fontStyle: this.props.fontStyle }]}
                            value={this.props.val.note}
                            onChangeText={(text) => this.props.editMethod('note', text)}
                        />
                        <TextInput
                            style={styles.noteInfo}
                            value={this.props.val.birthdayMonth}
                            onChangeText={(text) => this.props.editMethod('birthdayMonth', text)}
                        />
                        <TextInput
                            style={styles.noteInfo}
                            value={this.props.val.wish}
                            onChangeText={(text) => this.props.editMethod('wish', text)}
                        />
                        <TextInput
                            style={styles.noteInfo}
                            value={this.props.val.goals}
                            onChangeText={(text) => this.props.editMethod('goals', text)}
                        />
                    </View>
                ) : (
                    <View>
                        <Text style={[styles.noteText, { fontSize: this.props.fontSize, color: this.props.fontColor, fontWeight: this.props.fontWeight, fontStyle: this.props.fontStyle }]}>
                            {this.props.val.note}
                        </Text>
                        <Text style={styles.noteInfo}>Birthday Month: {this.props.val.birthdayMonth}</Text>
                        <Text style={styles.noteInfo}>Wish: {this.props.val.wish}</Text>
                        <Text style={styles.noteInfo}>Goals: {this.props.val.goals}</Text>
                    </View>
                )}

                {this.props.val.image && <Image source={{ uri: this.props.val.image }} style={styles.imagePreview} />}
                {this.props.val.decoration && <Image source={{ uri: this.props.val.decoration }} style={styles.decorationPreview} />}

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.changeColorMethod} style={styles.changeColorButton}>
                    <Text style={styles.changeColorText}>Change Color</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.toggleEditMode} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    noteDate: {
        fontSize: 14,
        color: '#B0B0B0',
        marginBottom: 10,
    },
    noteText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    noteInfo: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    noteDelete: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#E74C3C',
        padding: 10,
        borderRadius: 5,
    },
    noteDeleteText: {
        color: 'white',
        fontSize: 14,
    },
    changeColorButton: {
        position: 'absolute',
        top: 10,
        right: 100,
        backgroundColor: '#F39C12',
        padding: 10,
        borderRadius: 5,
    },
    changeColorText: {
        color: 'white',
        fontSize: 14,
    },
    imagePreview: {
        width: 120,
        height: 120,
        marginTop: 10,
        borderRadius: 8,
    },
    decorationPreview: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 50,
        right: 10,
        borderRadius: 8,
    },
    editButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
