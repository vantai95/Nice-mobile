import React from 'react';
import {
  Text
} from 'native-base';
import {
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import colors from '../../../../../constants/colors';

class CategoryItem extends React.PureComponent {
  render() {
    const {
      item, index, currentIndex, onPress
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => { onPress(); }}
        style={[
          styles.category, {
            backgroundColor: index === currentIndex
              ? colors.themeColor
              : '#fff'
          }
        ]}
      >
        <Text style={index === currentIndex ? styles.categoryTextSelected : styles.categoryText}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default CategoryItem;
