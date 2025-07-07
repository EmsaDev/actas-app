import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView, KeyboardAvoidingView,Platform } from 'react-native';
import { getMonthName } from '../utils/dateHelpers';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';

const Formulario3 = ({ navigation, route }) => {
  const { formData } = route.params || {};
  const [representante1, setRepresentante1] = useState('');
  const [representante2, setRepresentante2] = useState('');
  const [empresa1, setEmpresa1] = useState('');
  const [empresa2, setEmpresa2] = useState('');
  const [derecho, setDerecho] = useState(''); // SI o NO
  const [fronteraComercial, setFronteraComercial] = useState('');
  const ciudad = formData?.ciudad;
  
  

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    const allData = {
      ...route.params?.formData,
      representante1,
      representante2,
      empresa1,
      empresa2,
      derecho,
      fronteraComercial,
    };
    navigation.navigate('Firmas', { formData: allData });
  };
  // Estado para manejar errores
  const [errors, setErrors] = useState({
    representante1: null,
    representante2: null,
    empresa1: null,
    empresa2: null,
    fronteraComercial: null
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    if (!representante1) {
      newErrors.representante1 = 'Representante 1 es requerido';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Los meses empiezan en 0
  const monthName = getMonthName(month);
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

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
            <Text style={styles.title}>Representantes</Text>
            
            <Text style={styles.label}>Representante 1</Text>
            <TextInput
              style={styles.input}
              value={representante1}
              onChangeText={setRepresentante1}
              placeholder="Nombre del representante"
            />
            
            <Text style={styles.label}>Representante 2</Text>
            <TextInput
              style={styles.input}
              value={representante2}
              onChangeText={setRepresentante2}
              placeholder="Nombre del representante"
            />
            
            <Text style={styles.label}>Empresa 1</Text>
            <TextInput
              style={styles.input}
              value={empresa1}
              onChangeText={setEmpresa1}
              placeholder="Nombre de la empresa"
            />
            
            <Text style={styles.label}>Empresa 2</Text>
            <TextInput
              style={styles.input}
              value={empresa2}
              onChangeText={setEmpresa2}
              placeholder="Nombre de la empresa"
            />
            
            <Text style={styles.label}>Frontera Comercial</Text>
            <TextInput
              style={styles.input}
              value={fronteraComercial}
              onChangeText={setFronteraComercial}
              placeholder="Frontera comercial"
            />
            
            <Text style={styles.label}>El suscriptor hace uso de su derecho</Text>
            <View style={styles.radioGroup}>
              
              <TouchableOpacity 
                style={[styles.radioButton, derecho === 'SI' && styles.radioButtonSelected]}
                onPress={() => setDerecho('SI')}
              >
                <Text style={[styles.radioButtonText, derecho === 'SI' && styles.radioButtonTextSelected]} >SI</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.radioButton, derecho === 'NO' && styles.radioButtonSelected]}
                onPress={() => setDerecho('NO')}
              >
                <Text style={[styles.radioButtonText, derecho === 'NO' && styles.radioButtonTextSelected]} >NO</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.sectionTitle}>Texto generado:</Text>
            <Text style={styles.generatedText}>
              En {ciudad}, a los {day} días de {monthName} del año {year}, a las {formattedTime} horas se hicieron presentes los Sres. {representante1} y {representante2} en representación de las empresas {empresa1} y {empresa2} respectivamente, con el fin de realizar una revisión al equipo de sistema de medida del inmueble. Se informa al suscriptor y/o usuario su derecho de solicitar la asesoría o participación de un técnico particular conforme a lo establecido en las Condiciones Uniformes del Contrato de Servicio Público suscrito con el Representante de la frontera. Cumplido este tiempo se procede a efectuar la revisión. El suscriptor hace uso de su derecho SÍ({derecho === 'SI' ? 'X' : ' '}) NO ({derecho === 'NO' ? 'X' : ' '}).
            </Text>
            <Text style={styles.generatedText}>
              En las mediciones correspondientes a fronteras comerciales representadas por {fronteraComercial || '"    "'}, se procede a conformidad con las Resoluciones emitidas por la CREG, en particular lo establecido en el reglamento de comercialización y código de medida.
            </Text>
            
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Atrás</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Finalizar</Text>
              </TouchableOpacity>
            </View>
            <Footer/>
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,  // Espacio para el botón de menú
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
    fontWeight: 'bold',
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#333ff0',
    borderRadius: 5,
    alignItems: 'center', // Para centrar el texto
    justifyContent: 'center', // 
  },
  radioButtonSelected: {
    backgroundColor: '#333ff0',
    borderColor: '#333ff0',
  },
  radioButtonText: {
    color: '#333ff0', // Texto azul cuando no está seleccionado
  },
  radioButtonTextSelected: {
    color: 'white', // Texto blanco cuando está seleccionado
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2c3e50',
  },
  generatedText: {
    marginBottom: 15,
    lineHeight: 20,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333ff0',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#333ff0',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#333ff0',
  },
});

export default Formulario3;