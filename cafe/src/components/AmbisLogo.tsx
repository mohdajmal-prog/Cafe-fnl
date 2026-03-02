import React from 'react';
import { View, Image } from 'react-native';

export const AmbisLogo = ({ size = 32 }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        source={require('../../assets/images/ambi-logo.png')} 
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};
