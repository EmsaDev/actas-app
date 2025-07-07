/*import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importación del ícono
import Inicio from './screens/Inicio';
import FormularioCliente from './screens/FormularioCliente';
import Formulario2 from './screens/Formulario2';
import Formulario3 from './screens/Formulario3';
import Resumen from './screens/Resumen';
import Ayuda from './screens/Ayuda';
import FirmasScreen from './screens/FirmasScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Inicio"
        screenOptions={({ navigation }) => ({ // Recibimos navigation como parámetro
          headerShown: false, // Oculta toda la barra superior
          drawerStyle: {
            width: 0, // Hace el menú completamente invisible
            backgroundColor: 'transparent',
          },
          drawerContent: () => null, // Elimina el contenido del menú
          gestureEnabled: true, // Permite gestos para abrir
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.toggleDrawer()}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
          drawerPosition: 'right',
          drawerStyle: {
            width: 200,
          },
        })}
      >
        {/* Pantalla de Ayuda (única visible en el menú) 
          name="Ayuda" 
          component={Ayuda}
          options={{
            title: 'Ayuda',
            drawerLabel: 'Ayuda'
          }}
        />

        <Drawer.Screen 
          name="Inicio" 
          component={Inicio}
          options={{
            title: 'Inicio',
            drawerLabel: 'Inicio'
          }}
        />

        {/* Pantallas principales (ocultas del menú) }
        <Drawer.Screen 
          name="FormularioCliente" 
          component={FormularioCliente}
          options={{ 
            title: 'Datos del Cliente'
          }}
        />
        
        <Drawer.Screen 
          name="Formulario2" 
          component={Formulario2}
          options={{ 
            title: 'Información Técnica',
            drawerItemStyle: { display: 'none' }
          }}
        />
        
        <Drawer.Screen 
          name="Formulario3" 
          component={Formulario3}
          options={{ 
            title: 'Generar Acta',
            drawerItemStyle: { display: 'none' }
          }}
        />
        
        <Drawer.Screen 
          name="Resumen" 
          component={Resumen}
          options={{ 
            title: 'Resumen Final',
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen 
          name="Firmas" 
          component={FirmasScreen}
          options={{ 
            title: 'Captura de Firmas',
            drawerItemStyle: { display: 'none' }
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}*/

import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'; // Nuevo
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Inicio from './screens/Inicio';
import FormularioCliente from './screens/FormularioCliente';
import Formulario2 from './screens/Formulario2';
import Formulario3 from './screens/Formulario3';
import Resumen from './screens/Resumen';
import Ayuda from './screens/Ayuda';
import FirmasScreen from './screens/FirmasScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Nuevo

// Nuevo: Stack de formularios
function FormulariosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="FormularioCliente" component={FormularioCliente} 
        options={{ 
          title: 'Datos del Cliente',
          headerShown: false,  // Oculta el header nativo
        }}
      />
      <Stack.Screen name="Formulario2" component={Formulario2} 
        options={{ 
          title: 'Informacion Tecnica',
          headerShown: false,  // Oculta el header nativo
        }}
      />
      <Stack.Screen name="Formulario3" component={Formulario3}
        options={{ 
            title: 'Datos representante',
            headerShown: false,  // Oculta el header nativo
          }}
      />
      <Stack.Screen name="Resumen" component={Resumen}
        options={{ 
            title: 'Datos representante',
            headerShown: false,  // Oculta el header nativo
          }}
      />
      <Stack.Screen name="Firmas" component={FirmasScreen} 
        options={{ 
            title: 'Datos representante',
            headerShown: false,  // Oculta el header nativo
          }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerStyle: { width: 200 },
        }}
      >
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen 
          name="Formularios" 
          component={FormulariosStack} 
          options={{ drawerLabel: 'Formularios' }}
        />
        
        <Drawer.Screen name="Ayuda" component={Ayuda} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}