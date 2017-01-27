import React, {Component} from 'react';
import {AppRegistry, ListView, Text, TextInput, StyleSheet, View} from 'react-native';
import Row from './components/Row';
import sampleData from './SampleData';

// 入力値からレコードを引き当てて一覧表示するサンプル
class HelloWorldApp extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          dataSource: ds.cloneWithRows([]),
        };
    }

    formatData(data) { // 必要に応じて cloneWithRows に渡す形式に整形
        return data;
    }

    updateDataSource(text) {
        const found = sampleData.find((item) => item.ingredient === text)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        if (found === null || found === undefined || found.recipeTitles.length === 0) {
            this.setState({ dataSource: ds.cloneWithRows([]) })
            return;
        }

        this.setState({ dataSource: ds.cloneWithRows(this.formatData(found.recipeTitles)) })
    }

    render() {
        return (
            <View style={ styles.container }>
                <TextInput
                    style={ styles.textInput }
                    placeholder="食材を入力してください"
                    onChangeText={ (input) => this.updateDataSource(input) }
                />
                <ListView
                    dataSource={ this.state.dataSource }
//                    renderRow={ (data) => <View><Text>{data.menu_name}</Text></View> }
                    renderRow={ (data) => <Row {...data} /> }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    textInput: {
        height: 80,
        fontSize: 30
    }

})

AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
