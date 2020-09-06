// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import DashboardUtama from '../screen/DashboardUtama';
// import DashboardMentor from '../screen/DashboardMentor';
// import DashboardSantri from '../screen/Santri/DashboardSantri';
// import ProfilePondok from '../screen/ProfilePondok';
// import ProgramPondok from '../screen/ProgramPondok';
// import ProgramPondokContent from '../screen/ProgramPondokContent';
// import Register from '../screen/Register';
// import Login from '../screen/Login';
// import BuatSOP from '../screen/BuatSOP';
// import BuatMateriPembelajaran from '../screen/BuatMateriPembelajaran';
// import BuatStandarKompetensi from '../screen/BuatStandarKompetensi';
// import BuatTugasHarian from '../screen/BuatTugasHarian';
// import BuatMiniProject from '../screen/BuatMiniProject';
// import BuatVideoCheck from '../screen/BuatVideoCheck';
// import DaftarSantri from '../screen/DaftarSantri';
// import QRScanner from '../screen/QRScanner';
// import BuatMateriPembelajaranCreate from '../screen/BuatMateriPembelajaranCreate';
// import BuatKurikulum from '../screen/BuatKurikulum';
// import BuatKurikulumCreate from '../screen/BuatKurikulumCreate';
// import PreviewKurikulum from '../screen/PreviewKurikulum';

// // Dashboard Santri
// import DompetSaya from '../components/Santri/DS';
// import Toko from '../components/Santri/Toko';
// import IDCard from '../components/Santri/IDC';
// import SOP from '../components/Santri/SOP';
// import Kurikulum from '../components/Santri/Kurikulum';
// import MateriDasar from '../components/Santri/PMD';
// import TugasHarian from '../components/Santri/TH';
// import MiniProject from '../components/Santri/MP';
// import VideoCheck from '../components/Santri/VC';
// import Portofolio from '../components/Santri/Portofolio';
// import CatatanPelanggaran from '../components/Santri/CP';
// import Raport from '../components/Santri/Raport';
// import ImpianSaya from '../components/Santri/IM';
// import DetailMateriDasar from '../components/Santri/PMD/detail';
// import dailyTask from '../components/Santri/TH/detail';
// import DetailMiniProject from '../components/Santri/MP/detail';
// import DetailVideoCheck from '../components/Santri/VC/detail';

// const Stack = createStackNavigator();

// function NavigationScreen() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//           animationEnabled: false,
//         }}>
//         <Stack.Screen name="DashboardUtama" component={DashboardUtama} />
//         <Stack.Screen name="DashboardMentor" component={DashboardMentor} />
//         <Stack.Screen name="DashboardSantri" component={DashboardSantri} />
//         <Stack.Screen name="ProfilePondok" component={ProfilePondok} />
//         <Stack.Screen name="ProgramPondok" component={ProgramPondok} />
//         <Stack.Screen
//           name="ProgramPondokContent"
//           component={ProgramPondokContent}
//         />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="BuatSOP" component={BuatSOP} />
//         <Stack.Screen
//           name="BuatMateriPembelajaran"
//           component={BuatMateriPembelajaran}
//         />
//         <Stack.Screen name="BuatKurikulum" component={BuatKurikulum} />
//         <Stack.Screen name="PreviewKurikulum" component={PreviewKurikulum} />
//         <Stack.Screen
//           name="BuatKurikulumCreate"
//           component={BuatKurikulumCreate}
//         />
//         <Stack.Screen
//           name="BuatMateriPembelajaranCreate"
//           component={BuatMateriPembelajaranCreate}
//         />
//         <Stack.Screen
//           name="BuatStandarKompetensi"
//           component={BuatStandarKompetensi}
//         />
//         <Stack.Screen name="BuatTugasHarian" component={BuatTugasHarian} />
//         <Stack.Screen name="BuatMiniProject" component={BuatMiniProject} />
//         <Stack.Screen name="BuatVideoCheck" component={BuatVideoCheck} />
//         <Stack.Screen name="QRScanner" component={QRScanner} />
//         <Stack.Screen name="DaftarSantri" component={DaftarSantri} />
//         <Stack.Screen name="DompetSaya" component={DompetSaya} />
//         <Stack.Screen name="Toko" component={Toko} />
//         <Stack.Screen name="IDCard" component={IDCard} />
//         <Stack.Screen name="SOP" component={SOP} />
//         <Stack.Screen name="Kurikulum" component={Kurikulum} />
//         <Stack.Screen name="MateriDasar" component={MateriDasar} />
//         <Stack.Screen name="TugasHarian" component={TugasHarian} />
//         <Stack.Screen name="MiniProject" component={MiniProject} />
//         <Stack.Screen name="VideoCheck" component={VideoCheck} />
//         <Stack.Screen name="Portofolio" component={Portofolio} />
//         <Stack.Screen
//           name="CatatanPelanggaran"
//           component={CatatanPelanggaran}
//         />
//         <Stack.Screen name="Raport" component={Raport} />
//         <Stack.Screen name="ImpianSaya" component={ImpianSaya} />
//         <Stack.Screen name="DetailMateriDasar" component={DetailMateriDasar} />
//         <Stack.Screen name="dailyTask" component={dailyTask} />
//         <Stack.Screen name="DetailMiniProject" component={DetailMiniProject} />
//         <Stack.Screen name="DetailVideoCheck" component={DetailVideoCheck} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default NavigationScreen;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import BuatVideoCheck2 from '../screen/BuatVideoCheck2';
import DaftarSantri from '../screen/DaftarSantri';
import BuatKelas from '../screen/BuatKelas';
import BuatKelasCreate from '../screen/BuatKelasCreate';
import BuatMateriPembelajaranCreate from '../screen/BuatMateriPembelajaranCreate';
import BuatTopik from '../screen/BuatTopik';
import BuatTopikCreate from '../screen/BuatTopikCreate';
import BuatKurikulum from '../screen/BuatKurikulum';
import BuatKurikulumCreate from '../screen/BuatKurikulumCreate';
import PreviewKurikulum from '../screen/PreviewKurikulum';
import PreviewMateri from '../screen/PreviewMateri';
import PreviewKelas from '../screen/PreviewKelas';
import BuatStandarKompetensiCreate from '../screen/BuatStandarKompetensiCreate';
import BuatStandarKompetensiCreate2 from '../screen/BuatStandarKompetensiCreate2';
import BuatStandarKompetensiCreate3 from '../screen/BuatStandarKompetensiCreate3';

// Dashboard Santri
import DompetSaya from '../components/Santri/DS';
import Toko from '../components/Santri/Toko';
import IDCard from '../components/Santri/IDC';
import SOP from '../components/Santri/SOP';
import Kurikulum from '../components/Santri/Kurikulum';
import MasukKelas from '../components/Santri/MK';
import MateriDasar from '../components/Santri/PMD';
import TugasHarian from '../components/Santri/TH';
import TopikTugasHarian from '../components/Santri/TH/topik';
import MiniProject from '../components/Santri/MP';
import VideoCheck from '../components/Santri/VC';
import Portofolio from '../components/Santri/Portofolio';
import CatatanPelanggaran from '../components/Santri/CP';
import Raport from '../components/Santri/Raport';
import ImpianSaya from '../components/Santri/IM';
import TopikMateriDasar from '../components/Santri/PMD/topik';
import DetailMiniProject from '../components/Santri/MP/detail';
import DetailAcceptedMentor from '../components/Santri/VC/detail_acc_mentor';
import DetailMasukKelas from '../components/Santri/MK/detail';
import SplashScreen from '../components/SplashScreen';
import DetailDailyTask from '../components/Santri/TH/DetailDailyTask'
import TopikKurikulum from '../components/Santri/Kurikulum/topik'
import DetailTopikKurikulum from '../components/Santri/Kurikulum/detail'
import VideoPilihSantri from '../components/mentor/DaftarSantri/video'
import KompotensiPilihSantri from '../components/mentor/DaftarSantri/kompotensi'
import MenuPilihSantri from '../components/mentor/DaftarSantri/'

const Stack = createStackNavigator();

function MainMentor() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="DashboardMentor" component={DashboardMentor} />
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
      <Stack.Screen name="BuatTopik" component={BuatTopik} />
      <Stack.Screen name="BuatTopikCreate" component={BuatTopikCreate} />
      <Stack.Screen name="PreviewMateri" component={PreviewMateri} />
      <Stack.Screen
        name="BuatMateriPembelajaranCreate"
        component={BuatMateriPembelajaranCreate}
      />
      <Stack.Screen
        name="BuatStandarKompetensi"
        component={BuatStandarKompetensi}
      />
      <Stack.Screen
        name="BuatStandarKompetensiCreate"
        component={BuatStandarKompetensiCreate}
      />
      <Stack.Screen
        name="BuatStandarKompetensiCreate2"
        component={BuatStandarKompetensiCreate2}
      />
      <Stack.Screen
        name="BuatStandarKompetensiCreate3"
        component={BuatStandarKompetensiCreate3}
      />
      <Stack.Screen name="BuatTugasHarian" component={BuatTugasHarian} />
      <Stack.Screen name="BuatMiniProject" component={BuatMiniProject} />
      <Stack.Screen name="BuatVideoCheck" component={BuatVideoCheck} />
      <Stack.Screen name="BuatVideoCheck2" component={BuatVideoCheck2} />
      <Stack.Screen name="BuatKelas" component={BuatKelas} />
      <Stack.Screen name="BuatKelasCreate" component={BuatKelasCreate} />
      <Stack.Screen name="PreviewKelas" component={PreviewKelas} />
      <Stack.Screen name="DaftarSantri" component={DaftarSantri} />
      <Stack.Screen name="MenuPilihSantri" component={MenuPilihSantri} />
      <Stack.Screen name="VideoPilihSantri" component={VideoPilihSantri} />
      <Stack.Screen name="KompotensiPilihSantri" component={KompotensiPilihSantri} />
    </Stack.Navigator>
  );
}

function MainSantri() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="DashboardSantri" component={DashboardSantri} />
      <Stack.Screen name="DompetSaya" component={DompetSaya} />
      <Stack.Screen name="Toko" component={Toko} />
      <Stack.Screen name="IDCard" component={IDCard} />
      <Stack.Screen name="SOP" component={SOP} />
      <Stack.Screen name="Kurikulum" component={Kurikulum} />
      <Stack.Screen name="MateriDasar" component={MateriDasar} />
      <Stack.Screen name="TugasHarian" component={TugasHarian} />
      <Stack.Screen name="MiniProject" component={MiniProject} />
      <Stack.Screen name="VideoCheck" component={VideoCheck} />
      <Stack.Screen name="Portofolio" component={Portofolio} />
      <Stack.Screen name="CatatanPelanggaran" component={CatatanPelanggaran} />
      <Stack.Screen name="Raport" component={Raport} />
      <Stack.Screen name="ImpianSaya" component={ImpianSaya} />
      <Stack.Screen name="DetailMiniProject" component={DetailMiniProject} />
      <Stack.Screen
        name="DetailAcceptedMentor"
        component={DetailAcceptedMentor}
      />
      <Stack.Screen name="MasukKelas" component={MasukKelas} />
      <Stack.Screen name="TopikMateriDasar" component={TopikMateriDasar} />
      <Stack.Screen name="TopikTugasHarian" component={TopikTugasHarian} />
      <Stack.Screen name="DetailMasukKelas" component={DetailMasukKelas} />
      <Stack.Screen name="DetailDailyTask" component={DetailDailyTask} />
      <Stack.Screen name="TopikKurikulum" component={TopikKurikulum} />
      <Stack.Screen name="DetailTopikKurikulum" component={DetailTopikKurikulum} />
    </Stack.Navigator>
  );
}
function Main() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="DashboardUtama" component={DashboardUtama} />
      <Stack.Screen name="ProfilePondok" component={ProfilePondok} />
      <Stack.Screen name="ProgramPondok" component={ProgramPondok} />
      <Stack.Screen
        name="ProgramPondokContent"
        component={ProgramPondokContent}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MainMentor" component={MainMentor} />
        <Stack.Screen name="MainSantri" component={MainSantri} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationScreen;
