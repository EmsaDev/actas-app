import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';

const Ventana1 = ({ navigation }) => {
  const handlePress = () => {
    console.log("Navegando a Ventana2...");
    navigation.navigate('Formularios');
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>¡Bienvenido!{"\n"}Acta de Revisión - Clientes Destacados</Text>
        
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.image} 
          resizeMode="contain"
        />
        
          <TouchableOpacity 
            style={styles.button}
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Iniciar visita</Text>
          </TouchableOpacity>
      </View>
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  image: {
    width: '80%',
    height: '40%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Ventana1;