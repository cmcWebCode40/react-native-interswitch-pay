import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  type ModalProps,
  ActivityIndicator,
  type ColorValue,
} from 'react-native';

export interface BackDropProps extends Omit<ModalProps, 'children | visible'> {
  isLoading: boolean;
  color?: ColorValue;
}

export const BackDrop: React.FunctionComponent<BackDropProps> = ({
  color = 'red',
  isLoading,
  ...otherModalProps
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLoading}
      {...otherModalProps}
    >
      <View style={styles.centeredView}>
        <ActivityIndicator color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
