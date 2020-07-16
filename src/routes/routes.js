import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardUtama from '../screen/DashboardUtama';
import DashboardMentor from '../screen/DashboardMentor';
import DashboardSantri from '../screen/Santri/DashboardSantri';
import ProfilePondok from '../screen/ProfilePondok';
import ProgramPondok from '../screen/ProgramPondok';
import ProgramPondokContent from '../screen/ProgramPondokContent';
import Register from '../screen/Register';
import Login from '../screen/Login';
import BuatSOP from '../screen/BuatSOP';
import BuatMateriPembelajaran from '../screen/BuatMateriPembelajaran';
import BuatStandarKompetensi from '../screen/BuatStandarKompetensi';
import BuatTugasHarian from '../screen/BuatTugasHarian';
import BuatMiniProject from '../screen/BuatMiniProject';
import BuatVideoCheck from '../screen/BuatVideoCheck';
import DaftarSantri from '../screen/DaftarSantri';
import QRScanner from '../screen/QRScanner';
import BuatMateriPembelajaranCreate from '../screen/BuatMateriPembelajaranCreate';
import BuatKurikulum from '../screen/BuatKurikulum';
import BuatKurikulumCreate from '../screen/BuatKurikulumCreate';
import PreviewKurikulum from '../screen/PreviewKurikulum';

const Stack = createStackNavigator();

function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {/* <Stack.Screen name="DashboardUtama" component={DashboardUtama} /> */}
        <Stack.Screen name="DashboardMentor" component={DashboardMentor} />
        <Stack.Screen name="DashboardSantri" component={DashboardSantri} />
        <Stack.Screen name="ProfilePondok" component={ProfilePondok} />
        <Stack.Screen name="ProgramPondok" component={ProgramPondok} />
        <Stack.Screen
          name="ProgramPondokContent"
          component={ProgramPondokContent}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BuatSOP" component={BuatSOP} />
        <Stack.Screen
          name="BuatMateriPembelajaran"
          component={BuatMateriPembelajaran}
        />
        <Stack.Screen name="BuatKurikulum" component={BuatKurikulum} />
        <Stack.Screen name="PreviewKurikulum" component={PreviewKurikulum} />
        <Stack.Screen
          name="BuatKurikulumCreate"
          component={BuatKurikulumCreate}
        />
        <Stack.Screen
          name="BuatMateriPembelajaranCreate"
          component={BuatMateriPembelajaranCreate}
        />
        <Stack.Screen
          name="BuatStandarKompetensi"
          component={BuatStandarKompetensi}
        />
        <Stack.Screen name="BuatTugasHarian" component={BuatTugasHarian} />
        <Stack.Screen name="BuatMiniProject" component={BuatMiniProject} />
        <Stack.Screen name="BuatVideoCheck" component={BuatVideoCheck} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="DaftarSantri" component={DaftarSantri} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationScreen;
