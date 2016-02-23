/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    } = React;

var API_URL = 'http://api.xnnye.cn/money/index';
var PAGE = 1;
var REQUEST_URL = API_URL + '?page=' + PAGE;
var images = "http://resizing.flixster.com/6xF9PyshnlqT6g4OU9xVQFLnr9g=/54x80/dkpu1ddg7pbsk.cloudfront.net/movie/11/20/33/11203306_ori.jpg";
//var image = getImage({
//  width: 200 * PixelRatio.get(),
//  height: 100 * PixelRatio.get()
//});
var money = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.money),
                    loaded: true,
                });
            })
            .done();
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>
                    加载中。。。
                </Text>
            </View>
        );
    },

    renderMovie: function(money) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: images}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.time}>{money.time}</Text>
                    <Text style={styles.cate_name}>{money.cate_name}</Text>
                    <Text style={styles.name}>{money.name}</Text>
                </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'left',
    },
    time: {
        flex: 1,
        width: 200,
        textAlign: 'left',
    },
    cate_name: {
        flex: 1,
        width: 200,
        textAlign: 'left',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('money', () => money);
