import { AspectRatio, Box, Center, Heading, HStack, Stack } from 'native-base';
import React, {useContext} from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function Transaction({data}) {
  return <Box alignItems="center">
      <Box width="300" rounded="xl" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Stack direction="row" p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              ${data.amount}
            </Heading>
            <Text fontSize="xs" _light={{
            color: "green.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {data.treeAmount != 1 ?
                `${data.treeAmount} árboles aportados`
              :
                `${data.treeAmount} árbol aportado`
              }
            </Text>
          </Stack>
          <Stack space={2}>
            <Text>{data.idTarget}</Text>
            {data.treeAmount ?
              data.committed ?
                <Text>
                  Plantado en {data.committed}
                </Text>
              :
                <Text>
                  No plantado aún
                </Text>
            : null
            }
          </Stack>
        </Stack>
      </Box>
    </Box>;
}