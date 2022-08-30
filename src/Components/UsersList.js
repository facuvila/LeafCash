import { Box, Button, FlatList, HStack, Spacer, Text, View, VStack } from 'native-base';
import { normalizeEmail } from '../helpers.js';
import { useNavigation } from '@react-navigation/native';

export default function UsersList (data) {
  const navigation = useNavigation();

  return (
      <Box height={100}>
        <FlatList data={data.data} renderItem={({
        item
      }) => <Box width={250} borderBottomWidth="1" borderColor="muted.800">
              <HStack space={[2, 3]} justifyContent="space-between">
                <VStack>
                  <Text color="coolGray.800" bold>
                    {normalizeEmail(item.email)}
                  </Text>
                  <Text color="coolGray.600">
                    {item.isVendor ?
                        "Vendedor"
                    : "No vendedor"
                    }
                  </Text>
                </VStack>
                <Spacer />
              <Button style={{alignSelf: 'flex-end'}} onPress={() => {
                navigation.navigate({
                  name: 'Amount',
                  params: { target: item },
              })
              }}>Transferir</Button>
              </HStack>
            </Box>} keyExtractor={item => item.uid} />
      </Box>
    );
  };