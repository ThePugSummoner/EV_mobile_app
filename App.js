
import { NavigationContainer } from '@react-navigation/native';

import { useState } from 'react';
import RootNavigator from "./components/RootStack"

export default function App() {
  
  const [userUid, setUserUid] = useState(null);
  
  return (
    <NavigationContainer>
      <RootNavigator userUid={userUid} />
    </NavigationContainer>

  );
}