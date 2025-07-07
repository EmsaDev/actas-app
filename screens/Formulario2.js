import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView,Platform} from 'react-native';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Formulario2 = ({ navigation, route }) => {
  // Recibimos los datos del formulario anterior
  const { formData } = route.params;
  
  // Estado para los campos de este formulario
  const [nivelTension, setNivelTension] = useState(formData.nivelTension || '');
  const [transformadorNo, setTransformadorNo] = useState(formData.transformadorNo || '');
  const [nodoTransformadorNo, setNodoTransformadorNo] = useState(formData.nodoTransformadorNo || '');
  const [nodoAcometida, setNodoAcometida] = useState(formData.nodoAcometida || '');
  const [capacidad, setCapacidad] = useState(formData.capacidad || '');
  const [razonSocial, setRazonSocial] = useState(formData.razonSocial || '');
  const [subestacion, setSubestacion] = useState(formData.subestacion || '');
  const [circuito, setCircuito] = useState(formData.circuito || '');

  const handleSubmit = () => {
    // Combinamos los datos del formulario 1 con los nuevos
    const allData = {
      ...formData,
      nivelTension,
      transformadorNo,
      nodoTransformadorNo,
      nodoAcometida,
      capacidad,
      razonSocial,
      subestacion,
      circuito,
    };
    
    // Navegamos al formulario 3 con todos los datos
    navigation.navigate('Formulario3', { formData: allData });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Botón de menú */}
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={24} color="#333ff0" />
        </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Información Técnica</Text>
        
        <Text style={styles.label}>Nivel de Tensión</Text>
        <TextInput
          style={styles.input}
          value={nivelTension}
          onChangeText={setNivelTension}
          placeholder="Ej: 110V, 220V"
        />
        
        <Text style={styles.label}>Transformador No.</Text>
        <TextInput
          style={styles.input}
          value={transformadorNo}
          onChangeText={setTransformadorNo}
          placeholder="Número del transformador"
        />
        
        <Text style={styles.label}>Nodo de Transformador No.</Text>
        <TextInput
          style={styles.input}
          value={nodoTransformadorNo}
          onChangeText={setNodoTransformadorNo}
          placeholder="Número del nodo"
        />
        
        <Text style={styles.label}>Nodo Acometida</Text>
        <TextInput
          style={styles.input}
          value={nodoAcometida}
          onChangeText={setNodoAcometida}
          placeholder="Nodo de acometida"
        />
        
        <Text style={styles.label}>Capacidad</Text>
        <TextInput
          style={styles.input}
          value={capacidad}
          onChangeText={setCapacidad}
          placeholder="Capacidad en kVA"
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Razón Social</Text>
        <TextInput
          style={styles.input}
          value={razonSocial}
          onChangeText={setRazonSocial}
          placeholder="Razón social completa"
        />
        
        <Text style={styles.label}>Subestación</Text>
        <TextInput
          style={styles.input}
          value={subestacion}
          onChangeText={setSubestacion}
          placeholder="Nombre de la subestación"
        />
        
        <Text style={styles.label}>Circuito</Text>
        <TextInput
          style={styles.input}
          value={circuito}
          onChangeText={setCircuito}
          placeholder="Circuito asociado"
        />
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Siguiente</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Estilos (similar a los otros formularios)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
   contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60, // Espacio para el botón de menú
    paddingBottom: 30,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold', // Coherencia con otros formularios
    color: '#2c3e50',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333ff0', // Azul consistente
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    elevation: 3, // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  secondaryButton: {
    backgroundColor: 'white',      // Fondo blanco
    borderWidth: 2,               // Grosor del borde
    borderColor: '#333ff0',       // Color azul del borde
  },
  primaryButtonText: {
    textAlign: 'center',
    color: 'white',   
    fontSize: 16,
    fontWeight: '600',            // Texto blanco para el botón principal
  },
  secondaryButtonText: {
    textAlign: 'center',
    color: '#333ff0', 
    fontSize: 16,
    fontWeight: '600',            // Texto azul para el botón "Atrás"
  },
});

export default Formulario2;