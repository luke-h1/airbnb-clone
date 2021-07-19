import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { Text } from 'react-native';
import client from './src/utils/withApollo';

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <StatusBar />
        <Text>Hello world</Text>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};
export default App;
