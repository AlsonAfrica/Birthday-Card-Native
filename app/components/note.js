import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Note extends React.Component {
    render() {
        return (
            <View key={this.props.keyval} style={[styles.note, { backgroundColor: this.props.val.color }]}>
                <Text style={styles.noteText}>{this.props.val.date}</Text>
                <Text style={styles.noteText}>{this.props.val.note}</Text>
                {this.props.val.image && <Image source={{ uri: this.props.val.image }} style={styles.imagePreview} />}
                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>Del</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.changeColorMethod} style={styles.changeColorButton}>
                    <Text style={styles.changeColorText}>Change Color</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white',
    },
    changeColorButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        backgroundColor: '#f39c12',
        padding: 5,
    },
    changeColorText: {
        color: 'white',
    }
});
