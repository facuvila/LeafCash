import React, {useContext} from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function Transaction({data}) {
  return(
      <Text>Cantidad: ${data.amount} {data.committed ? 'Plantado en ' + data.committed : 'No plantado aún'} {data.plantedTrees}</Text>
  );
}