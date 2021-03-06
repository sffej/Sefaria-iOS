'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

var Sefaria = require('./sefaria');

var styles = require('./Styles.js');


var TwoBox = React.createClass({
    propTypes: {
        content:  React.PropTypes.array.isRequired,
        language: React.PropTypes.oneOf(["hebrew","english"]),
    },
    render: function() {
        var content = this.props.content.map(function(item, i) {
            return (<View style={styles.twoBoxItem} key={i}>{item}</View>);
        });
        if (content.length % 2 !== 0) {
          content.push(<View style={styles.twoBoxItem} key={i+1}></View>);
        }
        var rows = [];
        var rowStyle = this.props.language == "hebrew" ? [styles.twoBoxRow, styles.rtlRow] : [styles.twoBoxRow];

        for (var i=0; i < content.length; i += 2) {
          var items = [content[i], content[i+1]];
          rows.push(<View style={rowStyle} key={i}>{items}</View>);
        }
        return (<View style={styles.twoBox}>{rows}</View>);
    }
});


var CategoryColorLine = React.createClass({
  render: function() {
    var style = {backgroundColor: Sefaria.palette.categoryColor(this.props.category)};
    return (<View style={[styles.categoryColorLine, style]}></View>);
  }
});


var LanguageToggleButton = React.createClass({
  propTypes: {
    theme:          React.PropTypes.object.isRequired,
    language:       React.PropTypes.string.isRequired,
    toggleLanguage: React.PropTypes.func.isRequired,
    margin:         React.PropTypes.bool
  },
  render: function() {
    var content = this.props.language == "hebrew" ?
        (<Text style={[styles.languageToggleTextEn, this.props.theme.languageToggleText, styles.en]}>A</Text>) :
        (<Text style={[styles.languageToggleTextHe, this.props.theme.languageToggleText, styles.he]}>א</Text>);
    var style = [styles.languageToggle, this.props.theme.languageToggle];
    return (<TouchableOpacity style={style} onPress={this.props.toggleLanguage}>
              {content}
            </TouchableOpacity>);
  }
});


var SearchButton = React.createClass({
  render: function() {
    return (<TouchableOpacity style={[styles.headerButton, styles.headerButtonSearch]} onPress={this.props.onPress}>
                <Image source={this.props.themeStr == "white" ? require('./img/search.png'): require('./img/search-light.png') }

                     style={styles.searchButton}
                     resizeMode={Image.resizeMode.contain} />
              </TouchableOpacity>);
  }
});


var MenuButton = React.createClass({
  render: function() {
    return (<TouchableOpacity style={[styles.headerButton, styles.leftHeaderButton]} onPress={this.props.onPress}>
              <Image source={this.props.themeStr == "white" ? require('./img/menu.png'): require('./img/menu-light.png') }
                     style={styles.menuButton}
                     resizeMode={Image.resizeMode.contain} />
            </TouchableOpacity>);
  }
});

var GoBackButton = React.createClass({
  render: function() {
    return (<TouchableOpacity style={[styles.headerButton, styles.leftHeaderButton]} onPress={this.props.onPress}>
              <Image source={this.props.themeStr == "white" ? require('./img/back.png'): require('./img/back-light.png') }
                     style={styles.menuButton}
                     resizeMode={Image.resizeMode.contain} />
            </TouchableOpacity>);
  }
});


var CloseButton = React.createClass({
  render: function() {
    return (<TouchableOpacity style={[styles.headerButton, styles.leftHeaderButton]} onPress={this.props.onPress}>
              <Image source={this.props.themeStr == "white" ? require('./img/close.png'): require('./img/close-light.png') }
                 style={styles.closeButton}
                 resizeMode={Image.resizeMode.contain} />
            </TouchableOpacity>);
  }
});

var TripleDots = React.createClass({
  render: function() {
    return (<TouchableOpacity style={styles.tripleDotsContainer} onPress={this.props.onPress}>
              <Image style={styles.tripleDots} source={this.props.themeStr == "white" ? require('./img/dots.png'): require('./img/dots-light.png') } />
            </TouchableOpacity>);
  }
});


var DisplaySettingsButton = React.createClass({
  render: function() {
    return (<TouchableOpacity style={[styles.headerButton]} onPress={this.props.onPress}>
              <Image source={this.props.themeStr == "white" ? require('./img/a-aleph.png'): require('./img/a-aleph-light.png') }
                     style={styles.displaySettingsButton}
                     resizeMode={Image.resizeMode.contain} />
            </TouchableOpacity>);
  }
});


var ToggleSet = React.createClass({
  propTypes: {
    theme:       React.PropTypes.object.isRequired,
    options:     React.PropTypes.array.isRequired, // array of object with `name`. `text`, `heText`, `onPress`
    contentLang: React.PropTypes.string.isRequired,
    active:      React.PropTypes.string.isRequired
  },
  render: function() {
    var showHebrew = this.props.contentLang == "hebrew";
    var options = this.props.options.map(function(option, i) {
      var style = [styles.navToggle, this.props.theme.navToggle].concat(this.props.active === option.name ? [styles.navToggleActive, this.props.theme.navToggleActive] : []);
      return (
        <TouchableOpacity onPress={option.onPress} key={i} >
          {showHebrew ?
            <Text style={[style, styles.heInt]}>{option.heText}</Text> :
            <Text style={[style, styles.enInt]}>{option.text}</Text> }
        </TouchableOpacity>
      );
    }.bind(this));

    var dividedOptions = [];
    for (var i = 0; i < options.length; i++) {
      dividedOptions.push(options[i])
      dividedOptions.push(<Text style={[styles.navTogglesDivider,this.props.theme.navTogglesDivider]} key={i+"d"}>|</Text>);
    }
    dividedOptions = dividedOptions.slice(0,-1);

    return (<View style={styles.navToggles}>
              {dividedOptions}
            </View>);
  }
});



var ButtonToggleSet = React.createClass({
  propTypes: {
    theme:       React.PropTypes.object.isRequired,
    options:     React.PropTypes.array.isRequired, // array of object with `name`. `text`, `heText`, `onPress`
    contentLang: React.PropTypes.string.isRequired,
    active:      React.PropTypes.string.isRequired
  },
  render: function() {
    var showHebrew = this.props.contentLang == "hebrew";
    var options = this.props.options.map(function(option, i) {
      
      let alignStyle;
      if (i == this.props.options.length -1) { alignStyle = styles.readerDisplayOptionsMenuItemRight; }
      else if (i == 0)                       { alignStyle = styles.readerDisplayOptionsMenuItemLeft; }
      else                                   { alignStyle = styles.readerDisplayOptionsMenuItemCenter; }

      var itemStyles = [styles.readerDisplayOptionsMenuItem, this.props.theme.readerDisplayOptionsMenuItem, alignStyle];
      itemStyles = itemStyles.concat(this.props.active === option.name ? [this.props.theme.readerDisplayOptionsMenuItemSelected] : []);
      return (
        <TouchableOpacity onPress={option.onPress} key={i} style={itemStyles} >
          {showHebrew ?
            <Text style={[styles.heInt, this.props.theme.tertiaryText]}>{option.heText}</Text> :
            <Text style={[styles.enInt, this.props.theme.tertiaryText]}>{option.text}</Text> }
        </TouchableOpacity>
      );
    }.bind(this));

    return (<View style={[styles.readerDisplayOptionsMenuRow, 
                          styles.readerDisplayOptionMenuRowNotColor, 
                          this.props.theme.readerDisplayOptionsMenuDivider, 
                          styles.buttonToggleSet]}>
              {options}
            </View>);
  }
});


var LoadingView = React.createClass({
    render: function() {
      return ( <View style={styles.loadingViewBox}>
                  <ActivityIndicator
                    animating={true}
                    style={styles.loadingView}
                    size="large" />
               </View> );
    }
});


module.exports.TwoBox = TwoBox;
module.exports.CategoryColorLine = CategoryColorLine;
module.exports.LanguageToggleButton = LanguageToggleButton;
module.exports.SearchButton = SearchButton;
module.exports.MenuButton = MenuButton;
module.exports.GoBackButton = GoBackButton;
module.exports.CloseButton = CloseButton;
module.exports.TripleDots = TripleDots;
module.exports.DisplaySettingsButton = DisplaySettingsButton;
module.exports.ToggleSet = ToggleSet;
module.exports.ButtonToggleSet = ButtonToggleSet;
module.exports.LoadingView = LoadingView;
