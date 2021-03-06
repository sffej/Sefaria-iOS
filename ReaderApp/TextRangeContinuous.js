'use strict';

import React, { Component } from 'react';
import { 	AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

var TextSegment = require('./TextSegment');


var TextRangeContinuous = React.createClass({

  render: function() {
    var data = this.props.data;
    var textLanguage = this.props.textLanguage;

    var rows = [];
    for (var i = 0; i < data.length; i++) {

      rows.push(<Text style={styles.verseNumber}>{data[i].segmentNumber}.</Text>)

      if (textLanguage == "english") {
        rows.push(<TextSegment segmentIndexRef={this.props.segmentIndexRef} segmentKey={data[i].segmentNumber} data={data[i].text}
                               textType="english" TextSegmentPressed={ this.props.TextSegmentPressed }
                               generatesegmentIndexRefPositionArray={this.props.generatesegmentIndexRefPositionArray}/>);
        rows.push(<Text> </Text>);
      }

      if (textLanguage == "hebrew") {
        rows.push(<TextSegment segmentIndexRef={this.props.segmentIndexRef} segmentKey={data[i].segmentNumber} data={data[i].he}
                               textType="hebrew" TextSegmentPressed={ this.props.TextSegmentPressed }
                               generatesegmentIndexRefPositionArray={this.props.generatesegmentIndexRefPositionArray}/>);
        rows.push(<Text> </Text>);
      }


    }


    return (
      <View>
        <Text style={textLanguage == "hebrew" ? styles.hebrewText : styles.englishText}>
          {rows}
        </Text>
      </View>
    );
  }
});


var styles = StyleSheet.create({

  englishText: {
    fontFamily: "EB Garamond",
    textAlign: 'left',
    alignSelf: 'stretch',
    fontSize: 16,
    flex: 1
  },
  hebrewText: {
    fontFamily: "Taamey Frank CLM",
    textAlign: 'right',
    alignSelf: 'stretch',
    fontSize: 20,
    flex: 1
  },

  verseNumber: {
    flex: .5,
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontFamily: "Montserrat",
    fontWeight: "100",
  },


});

module.exports = TextRangeContinuous;
