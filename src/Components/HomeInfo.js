import { AspectRatio, Box, Center, Heading, HStack, Stack } from 'native-base';
import React, {useContext} from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useDispatch, useStore } from "../store/StoreProvider";

export default function HomeInfo() {
  const userData = useStore();
  const dispatch = useDispatch();
  
  return <Box alignItems="center">
      <Box width="300" borderBottomWidth="7" rounded="xl" overflow="hidden" borderColor="coolGray.200" borderWidth="1"
      _light={{
        backgroundColor: "gray.50"
      }} >
        <Stack direction="row" p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              ${userData.balance.toFixed(2)}
            </Heading>
            <Text fontSize="xs" _light={{
            color: "green.500"
            }} 
            fontWeight="500" ml="-0.5" mt="-1">
              asd
            </Text>
          </Stack>
          <Stack space={2}>
            <Text>Árboles plantados: {userData.contributedTrees.total}</Text>
          </Stack>
        </Stack>
      </Box>
    </Box>;
}