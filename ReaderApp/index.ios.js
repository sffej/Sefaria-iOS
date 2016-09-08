/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
	StyleSheet,
	ScrollView,
	Text,
	View,
	ListView,
	Modal,
	TextInput,
	TouchableOpacity,
	ActivityIndicatorIOS,
    StatusBar
} from 'react-native';

var styles  = require('./Styles.js');
var Sefaria = require('./sefaria');

var ReaderPanel = require('./ReaderPanel');

var {
  LoadingView,
  CategoryColorLine,
} = require('./Misc.js');

var ReaderApp = React.createClass({
    getInitialState: function () {
        Sefaria.init().then(function() {
            this.setState({loaded: true});
        }.bind(this));

        return {
            segmentRef: 0,
            links: [],
            ref: "",
            textReference: "",
            textTitle: "",
            loaded: false,
            menuOpen: "navigation",
            navigationCategories: [],
            loadingTextTail: false,
            textListVisible: false,
            interfaceLang: "english" // TODO check device settings for Hebrew: ### import {NativeModules} from 'react-native'; console.log(NativeModules.SettingsManager.settings.AppleLocale);
        };
    },
    componentDidMount: function () {
      Sefaria._deleteAllFiles().then(function() {
          // this.loadNewText(this.state.ref);
         }.bind(this)).catch(function(error) {
          console.log('oh no', error);
        });
    },
    TextSegmentPressed: function(section,segment,shouldToggle) {
        var links = Sefaria.links.linkSummary(this.state.data[section][segment].links);

        let stateObj = {segmentRef: segment,links:links};
        if (shouldToggle)
          stateObj.textListVisible = !this.state.textListVisible;

        this.setState(stateObj);
    },
    loadNewText: function(ref) {
        Sefaria.data(ref).then(function(data) {
            var links = [];
            if (data.content) {
                links = Sefaria.links.linkSummary(data.content[this.state.segmentRef].links);
            }

            this.setState({
                data:      [data.content],
                links:     links,
                textTitle: data.indexTitle,
                next:      data.next,
                prev:      data.prev,
                loaded:    true
            });
            Sefaria.saveRecentItem({ref: ref, heRef: data.heRef, category: data.categories[0]});
        }.bind(this)).catch(function(error) {
          console.log('oh no', error);
        });

    },
    updateData: function(data, ref, next, prev) {
        //var links = Sefaria.links.linkSummary(data[this.state.segmentRef].links);
        this.setState({
            data:            data,
            textReference:   ref,
            loaded:          true,
            loadingTextTail: false,
            next:            next,
            prev:            prev
        });
    },
    updateTitle: function(ref) {
        this.setState({
          textReference:   ref
        });

    },
    openRef: function(ref) {
        this.setState({
            loaded: false,
            textReference: ref
        });
        this.closeMenu();
        this.loadNewText(ref);
    },
    openMenu: function(menu) {
        this.setState({menuOpen: menu});
    },
    closeMenu: function() {
        this.clearMenuState();
        this.openMenu(null);
    },
    openNav: function() {
        this.openMenu("navigation");
    },
    setNavigationCategories: function(categories) {
        this.setState({navigationCategories: categories});
    },
    openTextToc: function() {
        this.openMenu("text toc");
    },
    openSearch: function(query) {
        this.openMenu("search");
    },
    clearMenuState: function() {
        this.setState({
            navigationCategories: []
        });
    },
    setLoadTextTail: function(setting) {
        this.setState({
            loadingTextTail: setting
        });
    },
    render: function () {
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content" />
                { this.state.loaded ? 
                <ReaderPanel
                    textReference={this.state.textReference}
                    textTitle={this.state.textTitle}
                    data={this.state.data}
                    links={this.state.links}
                    next={this.state.next}
                    prev={this.state.prev}
                    segmentRef={this.state.segmentRef}
                    textList={0}
                    menuOpen={this.state.menuOpen}
                    navigationCategories={this.state.navigationCategories}
                    style={styles.mainTextPanel}
                    updateData={this.updateData}
                    updateTitle={this.updateTitle}
                    TextSegmentPressed={ this.TextSegmentPressed }
                    openRef={ this.openRef }
                    interfaceLang={this.state.interfaceLang}
                    openMenu={this.openMenu}
                    closeMenu={this.closeMenu}
                    openNav={this.openNav}
                    setNavigationCategories={this.setNavigationCategories}
                    openTextToc={this.openTextToc}
                    openSearch={this.openSearch}
                    loadingTextTail={this.state.loadingTextTail}
                    setLoadTextTail={this.setLoadTextTail}
                    textListVisible={this.state.textListVisible}
                    Sefaria={Sefaria} /> 
                : <LoadingView /> }
            </View>
        );
    },
});

//this warning was really annoying me. There doesn't seem to be anything wrong with the code, so I'm ignoring it for now
console.ignoredYellowBox = ['Warning: Each child in an array or iterator should have a unique "key" prop.'];
AppRegistry.registerComponent('ReaderApp', () => ReaderApp);
