import {StyleSheet, View, ActivityIndicator} from 'react-native'

export default function LoadingScreen () {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator color="#000000" size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});